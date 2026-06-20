import os
import json
import joblib
import pandas as pd
import numpy as np
from backend.impact_scoring import compute_impact_score

# Define high-volume causes matching train_models.py
HIGH_VOLUME_CAUSES = [
    'vehicle_breakdown', 'others', 'pot_holes', 'construction', 
    'water_logging', 'accident', 'tree_fall', 'road_conditions', 
    'congestion'
]

class EventPredictor:
    def __init__(self):
        self.models_dir = r"d:\Coding\gridlock\Round 2\backend\models"
        self.cleaned_csv = r"d:\Coding\gridlock\Round 2\backend\artifacts\cleaned_events.csv"
        
        # Load models if they exist
        self.duration_model = None
        self.priority_model = None
        self.closure_model = None
        
        dur_path = os.path.join(self.models_dir, "duration_model.joblib")
        clf_path = os.path.join(self.models_dir, "priority_model.joblib")
        closure_path = os.path.join(self.models_dir, "closure_model.joblib")
        
        if os.path.exists(dur_path):
            self.duration_model = self._limit_parallelism(joblib.load(dur_path))
        if os.path.exists(clf_path):
            self.priority_model = self._limit_parallelism(joblib.load(clf_path))
        if os.path.exists(closure_path):
            self.closure_model = self._limit_parallelism(joblib.load(closure_path))
            
        # Policy Adjustments logic
        self.adjustments_path = r"d:\Coding\gridlock\Round 2\backend\artifacts\policy_adjustments.json"
        self.load_adjustments()

        # Load database for similarity retrieval, junctions, hotspots, and corridor risks
        if os.path.exists(self.cleaned_csv):
            self.df = pd.read_csv(self.cleaned_csv)
            
            # 1. Junction Vulnerability Index calculation
            junc_df = self.df.dropna(subset=['junction']).copy()
            dur_med = junc_df['duration'].median() if not junc_df['duration'].empty else 64.5
            junc_df['duration_clean'] = junc_df['duration'].fillna(dur_med)
            
            junc_stats = junc_df.groupby('junction').agg(
                lat=('latitude', 'mean'),
                lon=('longitude', 'mean'),
                incident_count=('id', 'count'),
                avg_duration=('duration_clean', 'mean')
            ).reset_index()
            
            city_med = self.df['duration'].median() if not self.df['duration'].empty else 64.5
            if city_med <= 0:
                city_med = 64.5
                
            junc_stats['raw_score'] = np.log1p(junc_stats['incident_count']) * (junc_stats['avg_duration'] / city_med)
            max_score = junc_stats['raw_score'].max()
            if max_score > 0:
                junc_stats['vulnerability_score'] = ((junc_stats['raw_score'] / max_score) * 100).round(1)
            else:
                junc_stats['vulnerability_score'] = 0.0
                
            self.junctions = junc_stats.to_dict(orient='records')
            
            # 2. Hotspots (Police Stations) Risk Score
            hotspots_df = self.df.groupby('police_station_clean').agg(
                incident_count=('id', 'count'),
                avg_duration=('duration', lambda x: float(x[x >= 0].mean()) if not x[x >= 0].empty else 64.5),
                road_closure_rate=('requires_road_closure', lambda x: float(x.mean() * 100) if len(x) > 0 else 0.0),
                high_priority_rate=('priority_clean', lambda x: float((x == 'high').mean() * 100) if len(x) > 0 else 0.0)
            ).reset_index()
            max_inc = hotspots_df['incident_count'].max() or 1
            hotspots_df['risk_score'] = ((hotspots_df['incident_count'] / max_inc) * 50 + 
                                         (hotspots_df['road_closure_rate'] / 100) * 30 + 
                                         (hotspots_df['high_priority_rate'] / 100) * 20).round(1)
            self.hotspots = hotspots_df.sort_values(by='incident_count', ascending=False).to_dict(orient='records')
            
            # 3. Corridor Risks Risk Score
            corridors_df = self.df.groupby('corridor_clean').agg(
                incident_count=('id', 'count'),
                avg_duration=('duration', lambda x: float(x[x >= 0].mean()) if not x[x >= 0].empty else 64.5),
                road_closure_rate=('requires_road_closure', lambda x: float(x.mean() * 100) if len(x) > 0 else 0.0),
                high_priority_rate=('priority_clean', lambda x: float((x == 'high').mean() * 100) if len(x) > 0 else 0.0)
            ).reset_index()
            max_corr = corridors_df['incident_count'].max() or 1
            corridors_df['risk_score'] = ((corridors_df['incident_count'] / max_corr) * 40 + 
                                          (corridors_df['road_closure_rate'] / 100) * 30 + 
                                          (corridors_df['high_priority_rate'] / 100) * 30).round(1)
            self.corridor_risks = corridors_df.sort_values(by='risk_score', ascending=False).to_dict(orient='records')
        else:
            self.df = None
            self.junctions = []
            self.hotspots = []
            self.corridor_risks = []

    def load_adjustments(self):
        self.multipliers = {
            "manpower_multiplier": 1.0,
            "barricades_multiplier": 1.0,
            "duration_multiplier": 1.0
        }
        if os.path.exists(self.adjustments_path):
            try:
                with open(self.adjustments_path, 'r', encoding='utf-8') as f:
                    self.multipliers = json.load(f)
            except Exception:
                pass

    def update_policy_multipliers(self):
        feedback_csv = r"d:\Coding\gridlock\Round 2\dataset\feedback_data.csv"
        if not os.path.exists(feedback_csv) or self.df is None:
            return
        
        try:
            feedback_df = pd.read_csv(feedback_csv)
            if feedback_df.empty:
                return
                
            merged = feedback_df.merge(self.df, left_on='event_id', right_on='id', how='inner')
            if merged.empty:
                return
                
            duration_ratios = []
            manpower_ratios = []
            barricades_ratios = []
            
            for idx, row in merged.iterrows():
                # Get baseline prediction without adjustments
                base_pred = self.predict(
                    cause=row['event_cause_clean'],
                    event_type=row['event_type'],
                    lat=row['latitude'],
                    lon=row['longitude'],
                    requires_road_closure=str(row['requires_road_closure']),
                    corridor=row['corridor_clean'],
                    hour=int(row['local_hour']) if pd.notnull(row['local_hour']) else 9,
                    day_of_week=int(row['local_day_of_week']) if pd.notnull(row['local_day_of_week']) else 1,
                    apply_adjustments=False
                )
                
                # Duration comparison
                actual_dur = float(row['actual_duration'])
                pred_dur = base_pred['predicted_duration_minutes']
                if pred_dur and pred_dur > 0 and actual_dur >= 0:
                    duration_ratios.append(actual_dur / pred_dur)
                    
                # Manpower comparison
                actual_mp = int(row['actual_manpower_total'])
                rec_mp = base_pred['resources']['manpower']['total_officers']
                if rec_mp and rec_mp > 0 and actual_mp >= 0:
                    manpower_ratios.append(actual_mp / rec_mp)
                    
                # Barricades comparison
                actual_bc = int(row['actual_barricades'])
                rec_bc = base_pred['resources']['barricades']
                if rec_bc and rec_bc > 0 and actual_bc >= 0:
                    barricades_ratios.append(actual_bc / rec_bc)
            
            # Compute new multipliers (with fallback to 1.0 if empty, and clipping to reasonable bounds, e.g. 0.2 to 5.0)
            new_dur_mult = float(np.mean(duration_ratios)) if duration_ratios else 1.0
            new_mp_mult = float(np.mean(manpower_ratios)) if manpower_ratios else 1.0
            new_bc_mult = float(np.mean(barricades_ratios)) if barricades_ratios else 1.0
            
            # Clip multipliers to stay stable and reasonable
            new_dur_mult = max(0.2, min(5.0, new_dur_mult))
            new_mp_mult = max(0.2, min(5.0, new_mp_mult))
            new_bc_mult = max(0.2, min(5.0, new_bc_mult))
            
            self.multipliers = {
                "manpower_multiplier": round(new_mp_mult, 3),
                "barricades_multiplier": round(new_bc_mult, 3),
                "duration_multiplier": round(new_dur_mult, 3)
            }
            
            # Save multipliers to adjustments_path
            os.makedirs(os.path.dirname(self.adjustments_path), exist_ok=True)
            with open(self.adjustments_path, 'w', encoding='utf-8') as f:
                json.dump(self.multipliers, f, indent=2)
                
        except Exception as e:
            print(f"Error updating policy multipliers: {e}")

    def _limit_parallelism(self, model):
        # RandomForest artifacts are trained with n_jobs=-1. In constrained Windows
        # environments that can fail at inference when joblib creates worker pipes.
        # Force loaded estimators to single-thread mode for reliable local demos.
        candidates = [model]
        if hasattr(model, "steps"):
            candidates.extend(step for _, step in model.steps)
        if hasattr(model, "named_steps"):
            candidates.extend(model.named_steps.values())
        for candidate in candidates:
            if hasattr(candidate, "n_jobs"):
                try:
                    candidate.n_jobs = 1
                except Exception:
                    pass
        return model

    def find_nearest_junctions(self, lat, lon, k=3):
        if not self.junctions:
            return []
            
        distances = []
        for j in self.junctions:
            # Simple Euclidean distance as proxy (valid for local city level)
            dist = np.sqrt((j['lat'] - lat)**2 + (j['lon'] - lon)**2)
            # Convert degrees to approximate meters (1 degree lat ~= 111,000m)
            dist_meters = dist * 111000.0
            distances.append({
                "name": j['junction'],
                "latitude": j['lat'],
                "longitude": j['lon'],
                "distance_meters": round(dist_meters, 1),
                "vulnerability_score": j.get('vulnerability_score', 0.0)
            })
            
        distances.sort(key=lambda x: x['distance_meters'])
        return distances[:k]

    def similarity_retrieval(self, cause, lat, lon, k=5):
        if self.df is None:
            return [], None
            
        # Filter by cause
        subset = self.df[self.df['event_cause_clean'] == cause].copy()
        if subset.empty:
            return [], None
            
        subset['dist'] = np.sqrt((subset['latitude'] - lat)**2 + (subset['longitude'] - lon)**2)
        subset['dist_meters'] = subset['dist'] * 111000.0
        
        # Sort and take top k
        top_matches = subset.sort_values(by='dist_meters').head(k)
        
        matches = []
        durations = []
        
        for idx, row in top_matches.iterrows():
            duration_val = row['duration'] if pd.notnull(row['duration']) else None
            if duration_val is not None and duration_val >= 0:
                durations.append(duration_val)
                
            matches.append({
                "id": row['id'],
                "address": row['address'] if pd.notnull(row['address']) else "Unknown address",
                "description": row['description'] if pd.notnull(row['description']) else "No description",
                "distance_meters": round(row['dist_meters'], 1),
                "actual_duration_minutes": round(duration_val, 1) if duration_val else None,
                "priority": row['priority_clean']
            })
            
        avg_duration = float(np.mean(durations)) if durations else None
        return matches, avg_duration

    def _class_probability(self, model, input_data, positive_label):
        if not model or not hasattr(model, "predict_proba"):
            return None
        try:
            classes = list(model.classes_)
            if positive_label not in classes:
                return None
            index = classes.index(positive_label)
            return float(model.predict_proba(input_data)[0][index])
        except Exception:
            return None

    def predict_base(self, cause, event_type, lat, lon, requires_road_closure, corridor, hour, day_of_week):
        return self.predict(cause, event_type, lat, lon, requires_road_closure, corridor, hour, day_of_week, apply_adjustments=False)

    def predict(self, cause, event_type, lat, lon, requires_road_closure, corridor, hour, day_of_week, apply_adjustments=True):
        cause_clean = str(cause).strip().lower()
        event_type_clean = str(event_type).strip().lower()
        requires_closure_bool = str(requires_road_closure).strip().upper() == 'TRUE'
        corridor_clean = str(corridor).strip()
        if not corridor_clean or corridor_clean == 'nan':
            corridor_clean = 'Non-corridor'
            
        is_peak_hour = 1 if (8 <= hour <= 11) or (17 <= hour <= 20) else 0

        # Construct input DataFrame for ML models
        input_data = pd.DataFrame([{
            'event_cause_clean': cause_clean,
            'event_type': event_type_clean,
            'latitude': float(lat),
            'longitude': float(lon),
            'police_station_clean': 'unknown',
            'corridor_clean': corridor_clean,
            'is_peak_hour': is_peak_hour,
            'local_hour': int(hour),
            'local_day_of_week': int(day_of_week)
        }])

        # Determine prediction route based on class volume
        data_basis = "policy_only"
        predicted_duration = None
        predicted_priority = "low"
        priority_probability = None
        closure_probability = None
        similar_events = []

        if cause_clean in HIGH_VOLUME_CAUSES:
            # 1. High Volume Causes: Use trained ML Models
            data_basis = "learned"
            if self.duration_model:
                predicted_duration = float(self.duration_model.predict(input_data)[0])
            else:
                predicted_duration = 64.5
                
            if self.priority_model:
                predicted_priority = str(self.priority_model.predict(input_data)[0]).lower()
                priority_probability = self._class_probability(self.priority_model, input_data, "high")
            else:
                predicted_priority = "high" if corridor_clean != 'Non-corridor' else "low"
                priority_probability = 0.75 if predicted_priority == "high" else 0.25
        else:
            # 2. Low Volume Causes: Use Similarity Retrieval
            matches, avg_dur = self.similarity_retrieval(cause_clean, float(lat), float(lon), k=5)
            if matches:
                data_basis = "similarity_retrieval"
                similar_events = matches
                predicted_duration = avg_dur if avg_dur else 120.0
                predicted_priority = "high" if (corridor_clean != 'Non-corridor' or cause_clean in ['vip_movement', 'procession']) else "low"
                priority_probability = 0.70 if predicted_priority == "high" else 0.30
            else:
                # 3. Completely Unknown: Fall back to Policy Heuristic
                data_basis = "policy_only"
                predicted_priority = "high" if corridor_clean != 'Non-corridor' else "low"
                policy_durations = {
                    'vip_movement': 30.0,
                    'procession': 60.0,
                    'protest': 120.0,
                    'public_event': 240.0,
                    'debris': 90.0,
                    'others': 60.0
                }
                predicted_duration = policy_durations.get(cause_clean, 60.0)
                priority_probability = 0.70 if predicted_priority == "high" else 0.30

        # Closure prediction
        closure_probability = self._class_probability(self.closure_model, input_data, True)
        if closure_probability is None:
            if requires_closure_bool:
                closure_probability = 0.80
            elif cause_clean in ['public_event', 'procession', 'protest', 'construction', 'water_logging']:
                closure_probability = 0.45
            else:
                closure_probability = 0.20

        closure_recommended = closure_probability >= 0.50 or requires_closure_bool

        # ----------------------------------------------------
        # 3. Apply Resource Recommendations Policies
        # ----------------------------------------------------
        is_high_priority = predicted_priority == 'high'
        
        # Base Manpower
        if is_high_priority and closure_recommended:
            si_count, hc_count, pc_count = 1, 2, 4
        elif is_high_priority and not closure_recommended:
            si_count, hc_count, pc_count = 0, 1, 2
        elif not is_high_priority and closure_recommended:
            si_count, hc_count, pc_count = 0, 1, 2
        else:
            si_count, hc_count, pc_count = 0, 0, 1
            
        # Cause-specific adjustments
        if cause_clean == 'accident':
            hc_count += 1
            pc_count += 1
        elif cause_clean == 'vip_movement':
            si_count += 1
            hc_count += 1
            pc_count += 2
        elif cause_clean in ['procession', 'protest', 'public_event']:
            hc_count += 2
            pc_count += 4
        elif cause_clean == 'construction':
            pc_count += 1
        elif cause_clean == 'water_logging':
            pc_count += 2

        # Base Barricades
        barricades_count = 15 if closure_recommended else 2
        
        # Cause-specific barricade adjustments
        if cause_clean == 'construction':
            barricades_count += 20
        elif cause_clean in ['water_logging', 'pot_holes', 'road_conditions']:
            barricades_count += 6
        elif cause_clean in ['public_event', 'procession', 'protest']:
            barricades_count += 30
        elif cause_clean == 'accident':
            barricades_count += 3

        # Apply Feedback Learning Adjustments if requested
        if apply_adjustments:
            manpower_mul = self.multipliers.get("manpower_multiplier", 1.0)
            barricades_mul = self.multipliers.get("barricades_multiplier", 1.0)
            duration_mul = self.multipliers.get("duration_multiplier", 1.0)
            
            si_count = max(0, int(round(si_count * manpower_mul)))
            hc_count = max(0, int(round(hc_count * manpower_mul)))
            pc_count = max(0, int(round(pc_count * manpower_mul)))
            barricades_count = max(0, int(round(barricades_count * barricades_mul)))
            predicted_duration = predicted_duration * duration_mul

        # 4. Nearest Junctions & Cascading Spillover Congestion Risk calculation
        nearest_junctions = self.find_nearest_junctions(float(lat), float(lon), k=3)
        for j in nearest_junctions:
            dist = j['distance_meters']
            if is_high_priority and closure_recommended:
                if dist < 200:
                    risk = 90
                elif dist < 500:
                    risk = 65
                elif dist < 1000:
                    risk = 40
                else:
                    risk = 15
            else:
                if dist < 200:
                    risk = 45
                elif dist < 500:
                    risk = 30
                elif dist < 1000:
                    risk = 15
                else:
                    risk = 5
            j['spillover_risk_percentage'] = risk

        # Compute Conformal Prediction Interval (Uncertainty bounds using decision tree predictions variance)
        interval_min = predicted_duration
        interval_max = predicted_duration
        if self.duration_model and data_basis == "learned":
            try:
                reg = self.duration_model.named_steps['regressor']
                prep = self.duration_model.named_steps['preprocessor']
                X_prep = prep.transform(input_data)
                
                # Retrieve individual tree predictions
                tree_preds = [tree.predict(X_prep)[0] for tree in reg.estimators_]
                pred_std = np.std(tree_preds)
                margin = 1.645 * pred_std # 90% confidence bounds
                
                # Apply multipliers if active
                if apply_adjustments:
                    margin = margin * self.multipliers.get("duration_multiplier", 1.0)
                    
                interval_min = max(0.1, predicted_duration - margin)
                interval_max = predicted_duration + margin
            except Exception:
                # Fallback to standard deviation proxy of 20%
                interval_min = max(0.1, predicted_duration * 0.8)
                interval_max = predicted_duration * 1.2
        else:
            # Non-ML model fallback standard bounds of 20%
            interval_min = max(0.1, predicted_duration * 0.8)
            interval_max = predicted_duration * 1.2

        impact = compute_impact_score(
            predicted_duration_minutes=predicted_duration,
            priority_probability=priority_probability,
            closure_probability=closure_probability,
            predicted_priority=predicted_priority,
            corridor=corridor_clean,
            cause=cause_clean,
            is_peak_hour=bool(is_peak_hour),
            data_basis=data_basis,
        )

        return {
            "predicted_duration_minutes": round(predicted_duration, 1) if predicted_duration else None,
            "predicted_duration_interval": {
                "min": round(interval_min, 1),
                "max": round(interval_max, 1)
            },
            "duration_band": impact["duration_band"],
            "predicted_priority": predicted_priority,
            "priority_probability": round(priority_probability, 3) if priority_probability is not None else None,
            "closure_probability": round(closure_probability, 3) if closure_probability is not None else None,
            "closure_recommended": closure_recommended,
            "impact": {
                "score": impact["score"],
                "class": impact["class"],
                "confidence": impact["confidence"],
                "explanations": impact["explanations"]
            },
            "data_basis": data_basis,
            "requires_road_closure": requires_closure_bool,
            "resources": {
                "manpower": {
                    "sub_inspector": si_count,
                    "head_constable": hc_count,
                    "constable": pc_count,
                    "total_officers": si_count + hc_count + pc_count
                },
                "barricades": barricades_count
            },
            "nearest_junction_checkpoints": nearest_junctions,
            "similar_historical_events": similar_events
        }

if __name__ == "__main__":
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    predictor = EventPredictor()
    # Test high-volume cause
    print("Test high-volume prediction (accident):")
    res_accident = predictor.predict(
        cause="accident", event_type="unplanned", lat=12.9218, lon=77.6451, 
        requires_road_closure="False", corridor="ORR East 1", hour=9, day_of_week=1
    )
    import pprint
    pprint.pprint(res_accident)
    
    print("\nTest low-volume prediction (protest):")
    res_protest = predictor.predict(
        cause="protest", event_type="unplanned", lat=12.9740, lon=77.5452, 
        requires_road_closure="True", corridor="Non-corridor", hour=18, day_of_week=4
    )
    pprint.pprint(res_protest)

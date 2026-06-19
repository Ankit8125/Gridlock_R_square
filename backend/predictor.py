import os
import joblib
import pandas as pd
import numpy as np

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
        
        dur_path = os.path.join(self.models_dir, "duration_model.joblib")
        clf_path = os.path.join(self.models_dir, "priority_model.joblib")
        
        if os.path.exists(dur_path):
            self.duration_model = joblib.load(dur_path)
        if os.path.exists(clf_path):
            self.priority_model = joblib.load(clf_path)
            
        # Load database for similarity retrieval and junctions
        if os.path.exists(self.cleaned_csv):
            self.df = pd.read_csv(self.cleaned_csv)
            # Create a clean junction dataset
            junc_df = self.df.dropna(subset=['junction'])
            self.junctions = junc_df.groupby('junction').agg(
                lat=('latitude', 'mean'),
                lon=('longitude', 'mean')
            ).reset_index().to_dict(orient='records')
        else:
            self.df = None
            self.junctions = []

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
                "distance_meters": round(dist_meters, 1)
            })
            
        distances.sort(key=lambda x: x['distance_meters'])
        return distances[:k]

    def similarity_retrieval(self, cause, lat, lon, k=5):
        if self.df is None:
            return [], None
            
        # Filter by cause
        subset = self.df[self.df['event_cause_clean'] == cause].copy()
        if subset.empty:
            # Try matching broad types
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

    def predict(self, cause, event_type, lat, lon, requires_road_closure, corridor, hour, day_of_week):
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
            'police_station_clean': 'unknown', # Default placeholder
            'corridor_clean': corridor_clean,
            'is_peak_hour': is_peak_hour,
            'local_hour': int(hour),
            'local_day_of_week': int(day_of_week)
        }])

        # Determine prediction route based on class volume
        data_basis = "policy_only"
        predicted_duration = None
        predicted_priority = "low"
        similar_events = []

        if cause_clean in HIGH_VOLUME_CAUSES:
            # 1. High Volume Causes: Use trained ML Models
            data_basis = "learned"
            if self.duration_model:
                predicted_duration = float(self.duration_model.predict(input_data)[0])
            else:
                # Fallback to median
                predicted_duration = 64.5
                
            if self.priority_model:
                predicted_priority = str(self.priority_model.predict(input_data)[0]).lower()
            else:
                predicted_priority = "high" if corridor_clean != 'Non-corridor' else "low"
        else:
            # 2. Low Volume Causes: Use Similarity Retrieval
            matches, avg_dur = self.similarity_retrieval(cause_clean, float(lat), float(lon), k=5)
            if matches:
                data_basis = "similarity_retrieval"
                similar_events = matches
                predicted_duration = avg_dur if avg_dur else 120.0 # fallback
                # Priority policy fallback for rare causes
                predicted_priority = "high" if (corridor_clean != 'Non-corridor' or cause_clean in ['vip_movement', 'procession']) else "low"
            else:
                # 3. Completely Unknown: Fall back to Policy Heuristic
                data_basis = "policy_only"
                predicted_priority = "high" if corridor_clean != 'Non-corridor' else "low"
                # Policy default durations
                policy_durations = {
                    'vip_movement': 30.0,
                    'procession': 60.0,
                    'protest': 120.0,
                    'public_event': 240.0,
                    'debris': 90.0,
                    'others': 60.0
                }
                predicted_duration = policy_durations.get(cause_clean, 60.0)

        # ----------------------------------------------------
        # 3. Apply Resource Recommendations Policies
        # ----------------------------------------------------
        is_high_priority = predicted_priority == 'high'
        
        # Base Manpower
        if is_high_priority and requires_closure_bool:
            si_count, hc_count, pc_count = 1, 2, 4
        elif is_high_priority and not requires_closure_bool:
            si_count, hc_count, pc_count = 0, 1, 2
        elif not is_high_priority and requires_closure_bool:
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
        barricades_count = 15 if requires_closure_bool else 2
        
        # Cause-specific barricade adjustments
        if cause_clean == 'construction':
            barricades_count += 20
        elif cause_clean in ['water_logging', 'pot_holes', 'road_conditions']:
            barricades_count += 6
        elif cause_clean in ['public_event', 'procession', 'protest']:
            barricades_count += 30
        elif cause_clean == 'accident':
            barricades_count += 3

        # 4. Nearest Junctions for diversion
        nearest_junctions = self.find_nearest_junctions(float(lat), float(lon), k=3)

        return {
            "predicted_duration_minutes": round(predicted_duration, 1) if predicted_duration else None,
            "predicted_priority": predicted_priority,
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

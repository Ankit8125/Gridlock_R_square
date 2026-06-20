import os
import json
import joblib
import pandas as pd
import numpy as np
from math import radians, cos, sin, asin, sqrt
from backend.impact_scoring import compute_impact_score


def haversine_meters(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Return the Haversine distance in metres between two (lat, lon) points."""
    R = 6_371_000.0
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    return 2 * R * asin(sqrt(max(0.0, min(1.0, a))))

# Define high-volume causes matching train_models.py
HIGH_VOLUME_CAUSES = [
    'vehicle_breakdown', 'others', 'pot_holes', 'construction', 
    'water_logging', 'accident', 'tree_fall', 'road_conditions', 
    'congestion'
]

class EventPredictor:
    def __init__(self):
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(backend_dir)
        
        # Load .env file manually if it exists
        env_path = os.path.join(backend_dir, ".env")
        if os.path.exists(env_path):
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        key, val = line.split("=", 1)
                        os.environ[key.strip()] = val.strip()
        
        self.models_dir = os.path.join(backend_dir, "models")
        self.cleaned_csv = os.path.join(backend_dir, "artifacts", "cleaned_events.csv")
        
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
        self.adjustments_path = os.path.join(backend_dir, "artifacts", "policy_adjustments.json")
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

            # 4. Hotspot lat/lon lookup (for station-level allocation)
            station_latlon = self.df.groupby('police_station_clean').agg(
                lat=('latitude', 'mean'),
                lon=('longitude', 'mean')
            ).reset_index()
            self._station_latlon = {
                row['police_station_clean']: (row['lat'], row['lon'])
                for _, row in station_latlon.iterrows()
                if pd.notnull(row['lat']) and pd.notnull(row['lon'])
            }
            # Attach lat/lon to hotspots records
            for hs in self.hotspots:
                ps = hs.get('police_station_clean', '')
                if ps in self._station_latlon:
                    hs['lat'], hs['lon'] = self._station_latlon[ps]

            # 5. Venue Recurrence — locations that repeatedly generate incidents
            venue_df = self.df.dropna(subset=['latitude', 'longitude']).copy()
            venue_df['grid_cell'] = (
                venue_df['latitude'].round(3).astype(str) + ',' +
                venue_df['longitude'].round(3).astype(str)
            )
            venue_agg = venue_df.groupby('grid_cell').agg(
                incident_count=('id', 'count'),
                lat=('latitude', 'mean'),
                lon=('longitude', 'mean'),
                top_cause=('event_cause_clean', lambda x: x.value_counts().index[0] if len(x) > 0 else 'unknown'),
                avg_duration=('duration', lambda x: float(x[x >= 0].mean()) if not x[x >= 0].empty else 0.0),
                road_closure_rate=('requires_road_closure', lambda x: float(x.mean() * 100))
            ).reset_index()
            venue_agg = venue_agg[venue_agg['incident_count'] >= 3]
            max_v = venue_agg['incident_count'].max() or 1
            venue_agg['recurrence_score'] = ((venue_agg['incident_count'] / max_v) * 100).round(1)
            # Replace any remaining NaN with 0 for JSON safety
            venue_agg = venue_agg.fillna(0)
            self.venue_recurrence = venue_agg.sort_values('incident_count', ascending=False).head(50).to_dict(orient='records')

            # 6. Weekly Heatmap (7 × 24 grid: day of week × hour of day)
            weekly = self.df.dropna(subset=['local_day_of_week', 'local_hour']).copy()
            weekly['local_day_of_week'] = weekly['local_day_of_week'].astype(int)
            weekly['local_hour'] = weekly['local_hour'].astype(int)
            weekly_counts = weekly.groupby(['local_day_of_week', 'local_hour']).size().reset_index(name='count')
            self.weekly_heatmap = weekly_counts.to_dict(orient='records')

            # 7. Surge Anomaly Detection — corridors/stations with recent spike vs. historical baseline
            self.surge_alerts = self._compute_surge_alerts()
        else:
            self.df = None
            self.junctions = []
            self.hotspots = []
            self.corridor_risks = []
            self._station_latlon = {}
            self.venue_recurrence = []
            self.weekly_heatmap = []
            self.surge_alerts = []

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

    def _compute_surge_alerts(self):
        """Detect corridors with abnormally high incident rates in recent data vs baseline."""
        if self.df is None or 'local_month' not in self.df.columns:
            return []
        try:
            df = self.df.copy()
            df['local_month'] = df['local_month'].fillna(-1).astype(int)
            recent_months = sorted(df['local_month'].unique())[-2:]
            recent = df[df['local_month'].isin(recent_months)]
            baseline = df[~df['local_month'].isin(recent_months)]
            if recent.empty or baseline.empty:
                return []
            baseline_months_n = len(baseline['local_month'].unique()) or 1
            recent_months_n = len(recent['local_month'].unique()) or 1
            base_rate = baseline.groupby('corridor_clean').size() / baseline_months_n
            recent_rate = recent.groupby('corridor_clean').size() / recent_months_n
            alerts = []
            for corridor in recent_rate.index:
                r = recent_rate.get(corridor, 0)
                b = base_rate.get(corridor, 0)
                if b > 0 and r > 0:
                    surge_factor = r / b
                    if surge_factor >= 1.5 and r >= 2:
                        alerts.append({
                            "corridor": corridor,
                            "baseline_monthly_rate": round(float(b), 1),
                            "recent_monthly_rate": round(float(r), 1),
                            "surge_factor": round(float(surge_factor), 2),
                            "severity": "Critical" if surge_factor >= 2.5 else "High" if surge_factor >= 1.8 else "Moderate"
                        })
            alerts.sort(key=lambda x: x['surge_factor'], reverse=True)
            return alerts[:15]
        except Exception as e:
            print(f"Surge detection error: {e}")
            return []

    def get_station_allocation(self, lat: float, lon: float, total_officers: int, k: int = 3) -> list:
        """Find k nearest police stations and allocate officers proportionally by inverse distance."""
        if not self._station_latlon or total_officers == 0:
            return []
        station_distances = []
        for station, (slat, slon) in self._station_latlon.items():
            dist = haversine_meters(lat, lon, slat, slon)
            station_distances.append((station, dist))
        station_distances.sort(key=lambda x: x[1])
        nearest = station_distances[:k]
        total_inv = sum(1.0 / max(d, 1) for _, d in nearest) or 1.0
        allocations = []
        remaining = total_officers
        for i, (station, dist) in enumerate(nearest):
            if i == len(nearest) - 1:
                count = max(0, remaining)
            else:
                weight = (1.0 / max(dist, 1)) / total_inv
                count = max(1, round(total_officers * weight))
                remaining -= count
            allocations.append({
                "station": station,
                "officers": count,
                "distance_meters": round(dist, 0)
            })
        return allocations

    def fetch_weather(self, lat: float, lon: float) -> dict:
        """Fetch current weather data for coordinates using Open-Meteo API (free, no key required)."""
        import urllib.request
        import json
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=weather_code,rain,showers,temperature_2m"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=3.0) as response:
                data = json.loads(response.read().decode('utf-8'))
                current = data.get("current", {})
                weather_code = current.get("weather_code", 0)
                rain = current.get("rain", 0.0)
                showers = current.get("showers", 0.0)
                temp = current.get("temperature_2m", 25.0)
                
                # Interpret WMO codes
                is_raining = rain > 0.0 or showers > 0.0 or weather_code >= 51
                description = "Clear"
                if weather_code in [1, 2, 3]:
                    description = "Cloudy"
                elif weather_code in [45, 48]:
                    description = "Foggy"
                elif weather_code in [51, 53, 55]:
                    description = "Drizzle"
                elif weather_code in [61, 63, 65, 80, 81, 82]:
                    description = "Rainy"
                elif weather_code in [95, 96, 99]:
                    description = "Thunderstorm"
                    
                return {
                    "temperature": temp,
                    "weather_code": weather_code,
                    "description": description,
                    "is_raining": is_raining,
                    "rain_mm": rain + showers,
                    "source": "Open-Meteo"
                }
        except Exception as e:
            return {
                "temperature": 27.0,
                "weather_code": 0,
                "description": "Clear (Fallback)",
                "is_raining": False,
                "rain_mm": 0.0,
                "source": "Fallback"
            }

    def generate_diversion_plan(self, cause: str, corridor: str, lat: float, lon: float, nearest_junctions: list, is_raining: bool) -> dict:
        """Generate a step-by-step tactical diversion plan for field officers."""
        import os
        import urllib.request
        import json

        cause_clean = str(cause).strip().lower()
        corridor_clean = str(corridor).strip()
        if not corridor_clean or corridor_clean == 'nan':
            corridor_clean = 'Non-corridor'

        api_key = os.environ.get("GEMINI_API_KEY")
        if api_key:
            prompt = (
                f"You are the ASTRAM Traffic Command Center AI for Bengaluru. "
                f"An event of type '{cause_clean}' occurred on corridor '{corridor_clean}' at coordinates ({lat}, {lon}). "
                f"The nearest traffic junctions are: {', '.join([j['name'] for j in nearest_junctions])}. "
                f"Current weather is {'Rainy' if is_raining else 'Clear'}. "
                f"Provide a tactical diversion plan in JSON format with two keys: "
                f"1. 'summary': A concise 1-sentence briefing summary. "
                f"2. 'steps': A list of 3-4 specific tactical steps for police constables "
                f"directing traffic at the nearest junctions (using the junction names provided). "
                f"Respond ONLY with raw JSON."
            )
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
            try:
                body = {
                    "contents": [{
                        "parts": [{"text": prompt}]
                    }],
                    "generationConfig": {
                        "responseMimeType": "application/json"
                    }
                }
                req = urllib.request.Request(
                    url,
                    data=json.dumps(body).encode('utf-8'),
                    headers={'Content-Type': 'application/json'}
                )
                with urllib.request.urlopen(req, timeout=5.0) as response:
                    res_data = json.loads(response.read().decode('utf-8'))
                    text = res_data['candidates'][0]['content']['parts'][0]['text']
                    plan = json.loads(text)
                    if "summary" in plan and "steps" in plan:
                        print("[GEMINI] Successful API call: Tactical Diversion Plan generated successfully.")
                        return plan
            except Exception as e:
                print(f"Gemini API error: {e}, falling back to rule-based.")

        # Heuristic fallback
        j1 = nearest_junctions[0]['name'] if len(nearest_junctions) > 0 else "Nearest Checkpoint"
        j2 = nearest_junctions[1]['name'] if len(nearest_junctions) > 1 else "Secondary Link Junction"
        j3 = nearest_junctions[2]['name'] if len(nearest_junctions) > 2 else "Outer Loop Junction"

        steps = []
        if cause_clean == 'accident':
            summary = f"Accident on {corridor_clean} requires immediate local diversion to clear lanes."
            steps = [
                f"Stage emergency vehicles and a heavy tow-crane at {j1} to expedite vehicle removal.",
                f"Close affected lanes and redirect light vehicular traffic via {j2} to prevent backup.",
                f"Deploy 2 manual signal override constables at {j3} to clear downstream spillover."
            ]
        elif cause_clean == 'water_logging':
            summary = f"Waterlogging on {corridor_clean} has reduced road capacity; diverting heavy traffic."
            steps = [
                f"Erect high-visibility warning barricades at {j1} to indicate deep water zones.",
                f"Divert all heavy commercial vehicles at {j2} onto the elevated bypass or outer loop.",
                f"Deploy BBMP pump coordination team at {j1} and manual traffic routing at {j3}."
            ]
        elif cause_clean in ['protest', 'procession', 'public_event']:
            summary = f"Public gathering on {corridor_clean} requires a wider perimeter corridor closure."
            steps = [
                f"Enforce full road closure at {j1}; restrict transit of all private passenger vehicles.",
                f"Establish major diversion points at {j2} and {j3} redirecting traffic towards parallel arterials.",
                f"Coordinate with local station patrol cars to manage pedestrian spillover safely."
            ]
        elif cause_clean == 'construction':
            summary = f"Ongoing construction on {corridor_clean} causes bottlenecks; staging lane restrictions."
            steps = [
                f"Place reflective traffic cones and safety hazard markers at {j1} to merge lanes safely.",
                f"Redirect peak-hour traffic volumes at {j2} to secondary arterial routes.",
                f"Deploy constable at {j3} during morning/evening peaks to override standard timers."
            ]
        else:
            summary = f"Traffic obstruction at {corridor_clean} coordinates {lat:.4f}, {lon:.4f}; active monitoring."
            steps = [
                f"Deploy a field scout to {j1} to assess the bottleneck size and severity.",
                f"If tailbacks exceed 500m, initiate soft diversion at {j2} towards outer link roads.",
                f"Ensure signal cycle extension at {j3} is active to flush outbound traffic."
            ]

        if is_raining:
            summary = "🌧️ [Rain Alert] " + summary
            steps.append("Increase all signal green times by 20% to account for wet-weather speed reduction.")

        return {
            "summary": summary,
            "steps": steps
        }

    def compute_cascade_probability(self, is_high_priority: bool, closure_recommended: bool,
                                    cause: str, corridor: str, is_peak_hour: bool,
                                    predicted_duration: float, is_raining: bool = False) -> dict:
        """Estimate probability this incident cascades to neighboring junctions and time to escalation."""
        base = 0.10
        if is_high_priority:
            base += 0.25
        if closure_recommended:
            base += 0.20
        if is_peak_hour:
            base += 0.15
        if is_raining:
            base += 0.15
        from backend.impact_scoring import ARTERIAL_CORRIDORS, HIGH_RISK_CAUSES
        if str(corridor).strip().lower() in ARTERIAL_CORRIDORS or 'orr' in str(corridor).lower():
            base += 0.15
        if str(cause).strip().lower() in HIGH_RISK_CAUSES:
            base += 0.10
        if predicted_duration and predicted_duration > 180:
            base += 0.10
        elif predicted_duration and predicted_duration > 60:
            base += 0.05
        cascade_prob = min(0.98, max(0.02, base))
        if predicted_duration and cascade_prob > 0.4:
            pon = max(5, round(predicted_duration * (1 - cascade_prob) * 0.5))
        else:
            pon = None
        return {
            "cascade_probability": round(cascade_prob, 3),
            "cascade_class": "Critical" if cascade_prob >= 0.7 else "High" if cascade_prob >= 0.5 else "Moderate" if cascade_prob >= 0.3 else "Low",
            "point_of_no_return_minutes": pon,
        }

    def simulate_what_if(self, base_prediction: dict, scenario: dict) -> dict:
        """Simulate resource change scenarios and return modified impact estimates."""
        extra_barricades = int(scenario.get('extra_barricades', 0))
        close_road = bool(scenario.get('close_road', False))
        extra_officers = int(scenario.get('extra_officers', 0))
        duration = base_prediction.get('predicted_duration_minutes') or 60.0
        cascade = base_prediction.get('cascade', {}).get('cascade_probability', 0.5)
        barricade_reduction = min(0.40, extra_barricades * 0.005)
        officer_reduction = min(0.30, extra_officers * 0.01)
        closure_duration_effect = 0.05 if close_road else 0.0
        closure_cascade_reduction = 0.35 if close_road else 0.0
        new_duration = max(5.0, duration * (1 - barricade_reduction - officer_reduction + closure_duration_effect))
        new_cascade = max(0.02, cascade - closure_cascade_reduction - barricade_reduction * 0.5)
        new_barricades = base_prediction['resources']['barricades'] + extra_barricades
        new_officers = base_prediction['resources']['manpower']['total_officers'] + extra_officers
        duration_delta = round(new_duration - duration, 1)
        return {
            "scenario": scenario,
            "modified_duration_minutes": round(new_duration, 1),
            "duration_change_minutes": duration_delta,
            "duration_change_pct": round((duration_delta / duration) * 100, 1) if duration else 0,
            "modified_cascade_probability": round(new_cascade, 3),
            "cascade_change": round(new_cascade - cascade, 3),
            "total_officers": new_officers,
            "total_barricades": new_barricades,
            "recommendation": (
                "Recommended — significant improvement predicted." if duration_delta < -15
                else "Marginal improvement — consider prioritising elsewhere." if duration_delta < 0
                else "No benefit predicted."
            )
        }

    def update_policy_multipliers(self):
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(backend_dir)
        feedback_csv = os.path.join(project_root, "dataset", "feedback_data.csv")
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
            dist_meters = haversine_meters(lat, lon, j['lat'], j['lon'])
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

        # Haversine distance — geographically correct at Bengaluru latitude
        subset['dist_meters'] = subset.apply(
            lambda row: haversine_meters(lat, lon, row['latitude'], row['longitude'])
            if pd.notnull(row['latitude']) and pd.notnull(row['longitude']) else float('inf'),
            axis=1
        )

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

        # Fetch current weather
        weather = self.fetch_weather(float(lat), float(lon))
        is_raining = weather["is_raining"]

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

        # Apply weather-based increases if it is raining
        if is_raining:
            predicted_duration = predicted_duration * 1.25  # +25% duration
            pc_count += 1
            barricades_count += 5

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
            
            if is_raining:
                risk = min(95, risk + 10)  # +10% risk in rain
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

        # Cascade probability and time-to-escalation
        cascade = self.compute_cascade_probability(
            is_high_priority=is_high_priority,
            closure_recommended=closure_recommended,
            cause=cause_clean,
            corridor=corridor_clean,
            is_peak_hour=bool(is_peak_hour),
            predicted_duration=predicted_duration,
            is_raining=is_raining
        )

        # Station-level officer allocation
        total_officers = si_count + hc_count + pc_count
        station_allocations = self.get_station_allocation(float(lat), float(lon), total_officers, k=3)

        # Generate diversion plan
        diversion_plan = self.generate_diversion_plan(
            cause=cause_clean,
            corridor=corridor_clean,
            lat=float(lat),
            lon=float(lon),
            nearest_junctions=nearest_junctions,
            is_raining=is_raining
        )

        result = {
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
            "cascade": cascade,
            "data_basis": data_basis,
            "requires_road_closure": requires_closure_bool,
            "weather": weather,
            "diversion_plan": diversion_plan,
            "resources": {
                "manpower": {
                    "sub_inspector": si_count,
                    "head_constable": hc_count,
                    "constable": pc_count,
                    "total_officers": total_officers
                },
                "barricades": barricades_count,
                "station_allocations": station_allocations
            },
            "nearest_junction_checkpoints": nearest_junctions,
            "similar_historical_events": similar_events
        }
        return result

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

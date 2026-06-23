import os
import sys
# Add project root first so imports always resolve to this workspace.
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

# Load .env file manually if it exists
backend_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(backend_dir, ".env")
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ[key.strip()] = val.strip()

import csv
import json
import time
import random
from fastapi import FastAPI, HTTPException, BackgroundTasks, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np

# Import our custom predictor
from backend.predictor import EventPredictor

app = FastAPI(title="Bengaluru Traffic Obstruction & Event Intelligence API")

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from backend.path_config import get_path, initialize_writable_filesystem

# Initialize Vercel writable tmp structure
initialize_writable_filesystem()

# Initialize predictor
predictor = EventPredictor()

FEEDBACK_CSV_PATH = get_path("dataset/feedback_data.csv")

# Request Pydantic models
class PredictionRequest(BaseModel):
    cause: str
    event_type: str
    latitude: float
    longitude: float
    requires_road_closure: bool
    corridor: str
    hour: int
    day_of_week: int

class FeedbackRequest(BaseModel):
    event_id: str
    actual_duration: float
    actual_manpower_total: int
    actual_barricades: int
    police_station: str
    notes: str = ""

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timezone": "Asia/Kolkata"}

@app.get("/api/analytics")
def get_analytics():
    cleaned_csv = get_path("backend/artifacts/cleaned_events.csv")
    if not os.path.exists(cleaned_csv):
        raise HTTPException(status_code=500, detail="Cleaned dataset not found. Run pipeline first.")
        
    df = pd.read_csv(cleaned_csv)
    
    # 1. Core KPIs
    total_events = len(df)
    planned_events = int((df['event_type'] == 'planned').sum())
    unplanned_events = int((df['event_type'] == 'unplanned').sum())
    
    valid_dur = df[(df['status'] != 'active') & (df['duration'].notnull()) & (df['duration'] >= 0)]
    avg_duration = float(valid_dur['duration'].mean())
    median_duration = float(valid_dur['duration'].median())
    
    road_closure_pct = float((df['requires_road_closure'] == True).mean() * 100)
    high_priority_pct = float((df['priority_clean'] == 'high').mean() * 100)

    # 2. Event Cause Breakdown
    cause_breakdown = []
    cause_grp = df.groupby('event_cause_clean')
    for cause, group in cause_grp:
        group_valid_dur = group[(group['status'] != 'active') & (group['duration'].notnull()) & (group['duration'] >= 0)]
        avg_dur_cause = float(group_valid_dur['duration'].mean()) if not group_valid_dur.empty else None
        median_dur_cause = float(group_valid_dur['duration'].median()) if not group_valid_dur.empty else None
        
        cause_breakdown.append({
            "cause": cause,
            "count": int(len(group)),
            "average_duration_minutes": round(avg_dur_cause, 1) if avg_dur_cause is not None else None,
            "median_duration_minutes": round(median_dur_cause, 1) if median_dur_cause is not None else None
        })
    cause_breakdown.sort(key=lambda x: x['count'], reverse=True)

    # 3. Vehicle Breakdowns Breakdown
    veh_breakdown = []
    veh_df = df[df['event_cause_clean'] == 'vehicle_breakdown'].dropna(subset=['veh_type'])
    veh_counts = veh_df['veh_type'].value_counts()
    for veh, count in veh_counts.items():
        veh_breakdown.append({
            "vehicle_type": str(veh),
            "count": int(count),
            "percentage": float((count / len(veh_df)) * 100)
        })

    # 4. Hourly Peak-Hour Distribution
    hourly_distribution = df['local_hour'].value_counts().sort_index().to_dict()
    hourly_distribution_clean = {int(k): int(v) for k, v in hourly_distribution.items()}

    # 5. Police Station Distribution (Top 15)
    police_stations = []
    ps_counts = df['police_station_clean'].value_counts().head(15)
    for ps, count in ps_counts.items():
        police_stations.append({
            "police_station": str(ps),
            "count": int(count)
        })

    return {
        "kpis": {
            "total_events": total_events,
            "planned_events": planned_events,
            "unplanned_events": unplanned_events,
            "average_duration_minutes": round(avg_duration, 1),
            "median_duration_minutes": round(median_duration, 1),
            "road_closure_percentage": round(road_closure_pct, 1),
            "high_priority_percentage": round(high_priority_pct, 1)
        },
        "cause_breakdown": cause_breakdown,
        "vehicle_breakdown_types": veh_breakdown,
        "hourly_distribution": hourly_distribution_clean,
        "top_police_stations": police_stations
    }

@app.get("/api/correlation")
def get_correlation():
    cleaned_csv = get_path("backend/artifacts/cleaned_events.csv")
    if not os.path.exists(cleaned_csv):
        raise HTTPException(status_code=500, detail="Cleaned dataset not found.")
        
    try:
        df = pd.read_csv(cleaned_csv)
        # Select trainable subset for realistic durations
        df_corr = df[df['is_trainable_duration'] == True].copy()
        
        # Convert categoricals to integers
        df_corr['requires_road_closure_num'] = df_corr['requires_road_closure'].astype(int)
        df_corr['priority_num'] = (df_corr['priority_clean'] == 'high').astype(int)
        df_corr['cause_breakdown'] = (df_corr['event_cause_clean'] == 'vehicle_breakdown').astype(int)
        df_corr['cause_accident'] = (df_corr['event_cause_clean'] == 'accident').astype(int)
        df_corr['cause_construction'] = (df_corr['event_cause_clean'] == 'construction').astype(int)
        df_corr['cause_water_logging'] = (df_corr['event_cause_clean'] == 'water_logging').astype(int)
        df_corr['cause_potholes'] = (df_corr['event_cause_clean'] == 'pot_holes').astype(int)
        df_corr['cause_tree_fall'] = (df_corr['event_cause_clean'] == 'tree_fall').astype(int)
        
        cols = [
            'duration_capped', 'requires_road_closure_num', 'priority_num', 
            'is_peak_hour', 'local_hour', 'local_day_of_week', 
            'latitude', 'longitude', 'cause_breakdown', 'cause_accident',
            'cause_construction', 'cause_water_logging', 'cause_potholes', 'cause_tree_fall'
        ]
        
        labels = [
            'Duration', 'Road Closure', 'Priority', 
            'Peak Hour', 'Hour of Day', 'Day of Week', 
            'Latitude', 'Longitude', 'Breakdown', 'Accident', 
            'Construction', 'Water Logging', 'Potholes', 'Tree Fall'
        ]
        
        corr_matrix = df_corr[cols].corr().fillna(0).values.tolist()
        # Round correlation matrix for clean transfer
        corr_matrix_rounded = [[round(val, 3) for val in row] for row in corr_matrix]
        
        return {
            "labels": labels,
            "matrix": corr_matrix_rounded
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to calculate correlation: {str(e)}")

@app.get("/api/junctions")
def get_junctions():
    return {"junctions": predictor.junctions}

@app.get("/api/hotspots")
def get_hotspots():
    return {"hotspots": predictor.hotspots}

@app.get("/api/corridor-risk")
def get_corridor_risk():
    return {"corridor_risks": predictor.corridor_risks}

RESOURCE_CAPACITIES = {
    "yelahanka": {"officers": 60, "barricades": 120},
    "hal old airport": {"officers": 50, "barricades": 100},
    "sadashivanagar": {"officers": 45, "barricades": 90},
    "halasuru gate": {"officers": 55, "barricades": 110},
    "byatarayanapura": {"officers": 40, "barricades": 80},
    "yeshwanthpura": {"officers": 45, "barricades": 90},
    "hennuru": {"officers": 40, "barricades": 80},
    "kodigehalli": {"officers": 35, "barricades": 70},
    "default": {"officers": 40, "barricades": 80}
}

active_incidents = []

def cleanup_expired_incidents():
    global active_incidents
    now = time.time()
    active_incidents = [inc for inc in active_incidents if inc["expires_at"] > now]

def add_active_incident(station: str, officers: int, barricades: int, duration_minutes: float):
    cleanup_expired_incidents()
    real_duration_sec = max(5.0, duration_minutes * 0.1)
    expires_at = time.time() + real_duration_sec
    active_incidents.append({
        "station": station,
        "officers": officers,
        "barricades": barricades,
        "expires_at": expires_at
    })

def get_committed_resources(station: str, simulate_concurrent: bool = False):
    cleanup_expired_incidents()
    committed_officers = sum(inc["officers"] for inc in active_incidents if inc["station"] == station)
    committed_barricades = sum(inc["barricades"] for inc in active_incidents if inc["station"] == station)
    if simulate_concurrent:
        committed_officers += random.randint(15, 25)
        committed_barricades += random.randint(30, 60)
    return committed_officers, committed_barricades

@app.post("/api/predict")
def predict_event_impact(req: PredictionRequest, testing: bool = False):
    try:
        prediction = predictor.predict(
            cause=req.cause,
            event_type=req.event_type,
            lat=req.latitude,
            lon=req.longitude,
            requires_road_closure=str(req.requires_road_closure),
            corridor=req.corridor,
            hour=req.hour,
            day_of_week=req.day_of_week,
            generate_diversion=not testing,
            fetch_weather=not testing
        )
        
        # Identify closest police station sector
        station_name = "default"
        if predictor._station_latlon:
            try:
                from backend.predictor import haversine_meters
                closest = min(
                    predictor._station_latlon.items(),
                    key=lambda item: haversine_meters(float(req.latitude), float(req.longitude), item[1][0], item[1][1])
                )
                station_name = closest[0]
            except Exception:
                station_name = "default"
                
        station_clean = station_name.strip().lower()
        caps = RESOURCE_CAPACITIES.get(station_clean, RESOURCE_CAPACITIES["default"])
        cap_officers = caps["officers"]
        cap_barricades = caps["barricades"]
        
        # Get committed resources
        simulate_concurrent = (req.cause in ['protest', 'water_logging', 'vip_movement', 'public_event'])
        comm_off, comm_bar = get_committed_resources(station_clean, simulate_concurrent=simulate_concurrent)
        
        manpower = prediction.get("resources", {}).get("manpower", {})
        curr_off = manpower.get("total_officers", 0)
        curr_bar = prediction.get("resources", {}).get("barricades", 0)
        
        total_comm_off = comm_off + curr_off
        total_comm_bar = comm_bar + curr_bar
        
        officer_strain = min(100.0, round((total_comm_off / cap_officers) * 100, 1))
        barricade_strain = min(100.0, round((total_comm_bar / cap_barricades) * 100, 1))
        resource_strain_pct = max(officer_strain, barricade_strain)
        
        # Add to active incidents list
        add_active_incident(station_clean, curr_off, curr_bar, prediction.get("predicted_duration_minutes", 60.0))
        
        # Build warnings
        warning = ""
        is_warning_active = False
        if resource_strain_pct >= 80.0:
            is_warning_active = True
            warning = f"CRITICAL STRAIN WARNING: Sector '{station_clean.title()}' is under heavy load. Committed officers: {total_comm_off}/{cap_officers} ({officer_strain}%), committed barricades: {total_comm_bar}/{cap_barricades} ({barricade_strain}%)."
        elif resource_strain_pct >= 50.0:
            warning = f"MODERATE STRAIN ALERT: Sector '{station_clean.title()}' is approaching capacity. Committed officers: {total_comm_off}/{cap_officers} ({officer_strain}%), committed barricades: {total_comm_bar}/{cap_barricades} ({barricade_strain}%)."
            
        prediction["resource_balancer"] = {
            "sector": station_clean.title(),
            "capacity_officers": cap_officers,
            "capacity_barricades": cap_barricades,
            "committed_officers": total_comm_off,
            "committed_barricades": total_comm_bar,
            "officer_strain_pct": officer_strain,
            "barricade_strain_pct": barricade_strain,
            "resource_strain_pct": resource_strain_pct,
            "warning": warning,
            "is_warning_active": is_warning_active
        }
        
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/api/feedback")
def log_feedback(req: FeedbackRequest, background_tasks: BackgroundTasks):
    try:
        file_exists = os.path.exists(FEEDBACK_CSV_PATH)
        os.makedirs(os.path.dirname(FEEDBACK_CSV_PATH), exist_ok=True)
        
        with open(FEEDBACK_CSV_PATH, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            if not file_exists:
                # Write header
                writer.writerow(['event_id', 'actual_duration', 'actual_manpower_total', 'actual_barricades', 'police_station', 'notes'])
            
            writer.writerow([
                req.event_id,
                req.actual_duration,
                req.actual_manpower_total,
                req.actual_barricades,
                req.police_station,
                req.notes
            ])
            
        # Trigger policy multipliers updates asynchronously (non-blocking)
        background_tasks.add_task(predictor.update_policy_multipliers)
        
        # Build detailed log entry to return to client immediately
        detailed_log = {
            "event_id": req.event_id,
            "cause": "unknown",
            "police_station": req.police_station,
            "notes": req.notes,
            "duration": {
                "predicted": None,
                "actual": float(req.actual_duration)
            },
            "manpower": {
                "recommended": None,
                "actual": int(req.actual_manpower_total)
            },
            "barricades": {
                "recommended": None,
                "actual": int(req.actual_barricades)
            }
        }
        
        cleaned_csv = get_path("backend/artifacts/cleaned_events.csv")
        if os.path.exists(cleaned_csv):
            events_df = pd.read_csv(cleaned_csv)
            matching = events_df[events_df['id'] == req.event_id]
            if not matching.empty:
                row = matching.iloc[0]
                pred_out = predictor.predict(
                    cause=row['event_cause_clean'],
                    event_type=row['event_type'],
                    lat=row['latitude'],
                    lon=row['longitude'],
                    requires_road_closure=str(row['requires_road_closure']),
                    corridor=row['corridor_clean'],
                    hour=int(row['local_hour']) if pd.notnull(row['local_hour']) else 9,
                    day_of_week=int(row['local_day_of_week']) if pd.notnull(row['local_day_of_week']) else 1,
                    generate_diversion=False,
                    fetch_weather=False
                )
                detailed_log.update({
                    "cause": row['event_cause_clean'],
                    "duration": {
                        "predicted": pred_out['predicted_duration_minutes'],
                        "actual": float(req.actual_duration)
                    },
                    "manpower": {
                        "recommended": pred_out['resources']['manpower']['total_officers'],
                        "actual": int(req.actual_manpower_total)
                    },
                    "barricades": {
                        "recommended": pred_out['resources']['barricades'],
                        "actual": int(req.actual_barricades)
                    }
                })
            
        return {"status": "success", "message": "Feedback successfully logged", "log_entry": detailed_log}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Feedback log error: {str(e)}")

@app.get("/api/feedback/summary")
def get_feedback_summary():
    if not os.path.exists(FEEDBACK_CSV_PATH):
        return {"logs": []}
        
    try:
        feedback_df = pd.read_csv(FEEDBACK_CSV_PATH)
        logs = feedback_df.to_dict(orient='records')
        
        # Add basic stats comparison if clean database exists
        cleaned_csv = get_path("backend/artifacts/cleaned_events.csv")
        if os.path.exists(cleaned_csv):
            events_df = pd.read_csv(cleaned_csv)
            # Join matching actual feedback with details
            merged = feedback_df.merge(events_df, left_on='event_id', right_on='id', how='inner')
            
            detailed_logs = []
            for idx, row in merged.iterrows():
                # Re-run predictor logic to see what was recommended
                pred_out = predictor.predict(
                    cause=row['event_cause_clean'],
                    event_type=row['event_type'],
                    lat=row['latitude'],
                    lon=row['longitude'],
                    requires_road_closure=str(row['requires_road_closure']),
                    corridor=row['corridor_clean'],
                    hour=int(row['local_hour']) if pd.notnull(row['local_hour']) else 9,
                    day_of_week=int(row['local_day_of_week']) if pd.notnull(row['local_day_of_week']) else 1,
                    generate_diversion=False,
                    fetch_weather=False
                )
                
                detailed_logs.append({
                    "event_id": row['event_id'],
                    "cause": row['event_cause_clean'],
                    "police_station": row['police_station_clean'],
                    "notes": row['notes'] if pd.notnull(row['notes']) else "",
                    "duration": {
                        "predicted": pred_out['predicted_duration_minutes'],
                        "actual": float(row['actual_duration'])
                    },
                    "manpower": {
                        "recommended": pred_out['resources']['manpower']['total_officers'],
                        "actual": int(row['actual_manpower_total'])
                    },
                    "barricades": {
                        "recommended": pred_out['resources']['barricades'],
                        "actual": int(row['actual_barricades'])
                    }
                })
            return {"logs": detailed_logs}
        else:
            return {"logs": logs}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read feedback summary: {str(e)}")


# ──────────────────────────────────────────────────────────────
# New endpoints added in improvement sprint
# ──────────────────────────────────────────────────────────────

@app.get("/api/surge-alerts")
def get_surge_alerts():
    """Return corridors with abnormal recent incident rate spikes."""
    try:
        return {"surge_alerts": predictor.surge_alerts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/venue-recurrence")
def get_venue_recurrence():
    """Return locations with the highest repeat-incident counts."""
    try:
        return {"venue_recurrence": predictor.venue_recurrence}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/weekly-heatmap")
def get_weekly_heatmap():
    """Return 7×24 day-of-week × hour-of-day incident count grid."""
    try:
        return {"weekly_heatmap": predictor.weekly_heatmap}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/monthly-distribution")
def get_monthly_distribution():
    """Return per-month incident counts for seasonal trend analysis."""
    try:
        if predictor.df is None:
            return {"monthly": []}
        df = predictor.df.copy()
        if 'local_month' not in df.columns:
            return {"monthly": []}
        month_counts = df.groupby('local_month').size().reset_index(name='count')
        month_names = {1:'Jan',2:'Feb',3:'Mar',4:'Apr',5:'May',6:'Jun',
                       7:'Jul',8:'Aug',9:'Sep',10:'Oct',11:'Nov',12:'Dec'}
        monthly = [
            {
                "month": int(row['local_month']),
                "month_name": month_names.get(int(row['local_month']), str(row['local_month'])),
                "count": int(row['count'])
            }
            for _, row in month_counts.iterrows()
        ]
        return {"monthly": monthly}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class WhatIfRequest(BaseModel):
    # Base prediction inputs (same as PredictionRequest)
    cause: str
    event_type: str
    latitude: float
    longitude: float
    requires_road_closure: bool
    corridor: str
    hour: int
    day_of_week: int
    # Scenario tweaks
    extra_barricades: int = 0
    extra_officers: int = 0
    close_road: bool = False


@app.post("/api/what-if")
def what_if_simulation(req: WhatIfRequest):
    """Simulate what-if resource scenarios on top of the base prediction."""
    try:
        base = predictor.predict(
            cause=req.cause,
            event_type=req.event_type,
            lat=req.latitude,
            lon=req.longitude,
            requires_road_closure=str(req.requires_road_closure),
            corridor=req.corridor,
            hour=req.hour,
            day_of_week=req.day_of_week,
            generate_diversion=False
        )
        scenario = {
            "extra_barricades": req.extra_barricades,
            "extra_officers": req.extra_officers,
            "close_road": req.close_road,
        }
        simulated = predictor.simulate_what_if(base, scenario)
        return {
            "base_prediction": base,
            "simulation": simulated,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"What-if simulation error: {str(e)}")


class AgentCommandRequest(BaseModel):
    text_report: str


def parse_incident_report_regex(text: str) -> dict:
    import datetime
    t = text.lower()
    
    # 1. Parse Cause
    cause = "others"
    if "accident" in t or "crash" in t or "collision" in t:
        cause = "accident"
    elif "waterlogging" in t or "water logging" in t or "flood" in t or "water-logging" in t:
        cause = "water_logging"
    elif "tree" in t and ("fall" in t or "fell" in t or "down" in t):
        cause = "tree_fall"
    elif "pothole" in t or "pot hole" in t:
        cause = "pot_holes"
    elif "construction" in t or "roadwork" in t or "metro work" in t or "metro construction" in t:
        cause = "construction"
    elif "breakdown" in t or "broken down" in t or "stalled" in t:
        cause = "vehicle_breakdown"
    elif "vip" in t or "convoy" in t or "minister" in t or "governor" in t:
        cause = "vip_movement"
    elif "protest" in t or "strike" in t or "dharna" in t or "rally" in t:
        cause = "protest"
    elif "procession" in t or "march" in t or "parade" in t:
        cause = "procession"
    elif "event" in t or "concert" in t or "match" in t or "stadium" in t:
        cause = "public_event"
    elif "congest" in t or "traffic jam" in t or "slow" in t or "gridlock" in t:
        cause = "congestion"
        
    # 2. Event type (planned/unplanned)
    event_type = "unplanned"
    if cause in ["vip_movement", "procession", "public_event", "construction"]:
        event_type = "planned"
        
    # 3. Corridor lookup and coordinates mapping
    corridor = "Non-corridor"
    lat, lon = 12.9716, 77.5946 # Default Bengaluru center (Vidhana Soudha / MG Road area)
    
    if "orr east 1" in t or "bellandur" in t or "ecospace" in t or "marathahalli" in t:
        corridor = "ORR East 1"
        lat, lon = 12.9279, 77.6809
    elif "orr east 2" in t or "hsr" in t or "sarjapur" in t:
        corridor = "ORR East 2"
        lat, lon = 12.9116, 77.6472
    elif "orr north" in t or "hebbal" in t or "manyata" in t or "nagawara" in t:
        corridor = "ORR North 1"
        lat, lon = 13.0359, 77.5978
    elif "orr west" in t or "banashankari" in t or "nayandahalli" in t:
        corridor = "ORR West"
        lat, lon = 12.9150, 77.5361
    elif "hosur road" in t or "electronic city" in t or "silboard" in t or "silk board" in t:
        corridor = "Hosur Road"
        lat, lon = 12.9172, 77.6228
    elif "tumkur road" in t or "peenya" in t or "yeshwanthpur" in t:
        corridor = "Tumkur Road"
        lat, lon = 13.0285, 77.5195
    elif "mysore road" in t or "kengeri" in t or "nayandahalli" in t:
        corridor = "Mysore Road"
        lat, lon = 12.9230, 77.5020
    elif "bellary road" in t or "yelahanka" in t or "mekhri" in t:
        corridor = "Bellary Road 1"
        lat, lon = 13.0142, 77.5895
    elif "airport road" in t or "kia" in t or "kempegowda" in t:
        corridor = "Airport Road"
        lat, lon = 13.1986, 77.7066
    elif "old madras road" in t or "indiranagar" in t or "kr puram" in t:
        corridor = "Old Madras Road"
        lat, lon = 12.9784, 77.6408
    elif "bannerghatta" in t or "bg road" in t or "jp nagar" in t:
        corridor = "Bannerghata Road"
        lat, lon = 12.8950, 77.5980
        
    # 4. Requires road closure
    requires_road_closure = False
    if any(w in t for w in ["close", "blocked", "shut", "full block", "no entry", "barricaded"]):
        requires_road_closure = True
        
    # 5. Hour and Day of Week
    now = datetime.datetime.now()
    hour = now.hour
    day_of_week = now.weekday() # 0=Monday, 6=Sunday
    
    return {
        "cause": cause,
        "event_type": event_type,
        "latitude": lat,
        "longitude": lon,
        "requires_road_closure": requires_road_closure,
        "corridor": corridor,
        "hour": hour,
        "day_of_week": day_of_week
    }


def parse_incident_report_gemini(text: str, api_key: str) -> dict:
    import urllib.request
    import json
    import datetime
    now = datetime.datetime.now()
    prompt = (
        f"You are the ASTRAM Traffic Command Agent Parser for Bengaluru. "
        f"Extract the following traffic incident parameters from this report: '{text}'. "
        f"Current local hour is {now.hour}, day of week is {now.weekday()}. "
        f"Allowed causes: 'vehicle_breakdown', 'others', 'pot_holes', 'construction', 'water_logging', 'accident', 'tree_fall', 'road_conditions', 'congestion', 'vip_movement', 'procession', 'protest', 'public_event'. "
        f"Allowed corridors: 'ORR East 1', 'ORR East 2', 'ORR North 1', 'ORR North 2', 'ORR West', 'Hosur Road', 'Tumkur Road', 'Mysore Road', 'Bellary Road 1', 'Bellary Road 2', 'Old Madras Road', 'Bannerghata Road', 'Airport Road', or 'Non-corridor'. "
        f"Find the coordinates if mentioned (otherwise map to coordinates of a key area in Bengaluru matching the corridor or description. E.g. Bellary Road: 13.0142, 77.5895; ORR East 1: 12.9279, 77.6809; Hosur Road: 12.9172, 77.6228; Default coordinates: 12.9716, 77.5946). "
        f"Return a JSON object with these keys: "
        f"1. 'cause': string "
        f"2. 'event_type': 'planned' or 'unplanned' "
        f"3. 'latitude': float "
        f"4. 'longitude': float "
        f"5. 'requires_road_closure': boolean "
        f"6. 'corridor': string "
        f"7. 'hour': integer (0-23) "
        f"8. 'day_of_week': integer (0-6) "
        f"Respond ONLY with raw JSON."
    )
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
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
    with urllib.request.urlopen(req, timeout=30.0) as response:
        res_data = json.loads(response.read().decode('utf-8'))
        text = res_data['candidates'][0]['content']['parts'][0]['text']
        params = json.loads(text)
        print("[GEMINI] Successful API call: Incident report text parsed successfully.")
        return params


def generate_dispatch_briefing(params: dict, pred: dict) -> str:
    import datetime
    cause = params["cause"].replace("_", " ").title()
    corridor = params["corridor"]
    duration = pred["predicted_duration_minutes"]
    severity = pred["impact"]["class"]
    officers = pred["resources"]["manpower"]["total_officers"]
    barricades = pred["resources"]["barricades"]
    allocations = ", ".join([f"{a['officers']} officers from {a['station']}" for a in pred["resources"]["station_allocations"]])
    
    weather_alert = ""
    if pred.get("weather", {}).get("is_raining"):
        weather_alert = f"\n⚠️ WEATHER WARNING: Severe rain ({pred['weather']['rain_mm']}mm) reported at scene. Road friction reduced. Expect an extra 25% delay."
        
    briefing = (
        f"🚨 BENGALURU TRAFFIC POLICE COMMAND CENTER DISPATCH BRIEFING\n"
        f"-----------------------------------------------------------------\n"
        f"INCIDENT: {cause} on corridor '{corridor}' at {datetime.datetime.now().strftime('%H:%M IST')}.\n"
        f"SEVERITY: {severity} impact score ({pred['impact']['score']}/100).\n"
        f"ESTIMATED CLEARANCE TIME: {duration:.15g} minutes (Interval: {pred['predicted_duration_interval']['min']:.15g} - {pred['predicted_duration_interval']['max']:.15g} min).\n"
        f"ROAD CLOSURE STATUS: {'RECOMMENDED' if pred['closure_recommended'] else 'MONITORING'}.\n"
        f"WEATHER STATUS: {pred.get('weather', {}).get('description', 'Clear')}.\n"
        f"{weather_alert}\n"
        f"TACTICAL DEPLOYMENT ORDER:\n"
        f"- Dispatch a total of {officers} officers: {allocations}.\n"
        f"- Deploy {barricades} warning barricades to redirect local traffic.\n\n"
        f"DIVERSION DIRECTIONS:\n"
        f"{pred['diversion_plan']['summary']}\n"
        f"Steps:\n"
    )
    for i, step in enumerate(pred["diversion_plan"]["steps"], 1):
        if isinstance(step, dict):
            junc_str = f"[{step.get('junction')}] " if step.get('junction') else ""
            briefing += f"  {i}. {junc_str}{step.get('instruction', step.get('step', step))}\n"
        else:
            briefing += f"  {i}. {step}\n"
        
    briefing += (
        f"\n-----------------------------------------------------------------\n"
        f"REPORT GENERATED BY ASTRAM AI AGENT FOR URBAN MOBILITY"
    )
    return briefing


def generate_dispatch_briefing_gemini(params: dict, pred: dict, api_key: str) -> str:
    import urllib.request
    import json
    cause = params["cause"].replace("_", " ").title()
    corridor = params["corridor"]
    duration = pred["predicted_duration_minutes"]
    severity = pred["impact"]["class"]
    officers = pred["resources"]["manpower"]["total_officers"]
    barricades = pred["resources"]["barricades"]
    allocations = ", ".join([f"{a['officers']} officers from {a['station']}" for a in pred["resources"]["station_allocations"]])
    diversion_steps = "\n".join([
        f"- [{s.get('junction')}] {s.get('instruction', s.get('step', s))}" if isinstance(s, dict) else f"- {s}"
        for s in pred["diversion_plan"]["steps"]
    ])
    
    prompt = (
        f"You are the ASTRAM Traffic Command Center AI for Bengaluru. "
        f"An incident of type '{cause}' occurred on corridor '{corridor}'. "
        f"The prediction model estimated a clearance duration of {duration:.15g} minutes, "
        f"an impact class of '{severity}', requiring {officers} officers and {barricades} barricades. "
        f"The station allocations are: {allocations}. "
        f"The tactical diversion steps are:\n{diversion_steps}. "
        f"The weather is {pred.get('weather', {}).get('description', 'Clear')}. "
        f"Write a professional, concise, and commanding dispatch order memo for police radio or field briefing. "
        f"Include a clear header, incident detail summary, tactical deployment orders, and diversion steps. "
        f"Be direct and tactical. Do NOT include markdown styling like asterisks or hashtags. Return plain text."
    )
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    body = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req, timeout=30.0) as response:
        res_data = json.loads(response.read().decode('utf-8'))
        briefing = res_data['candidates'][0]['content']['parts'][0]['text']
        print("[GEMINI] Successful API call: Dispatch briefing generated successfully.")
        return briefing.strip()


@app.post("/api/agent/command")
def ai_agent_command(req: AgentCommandRequest, testing: bool = False):
    """Parse raw text incident report and return full predictions, allocations, and dispatch order briefing using Gemini."""
    try:
        if testing:
            # Mock parsed parameters for offline testing/bypassing Gemini
            parsed = {
                "cause": "water_logging",
                "event_type": "unplanned",
                "latitude": 13.0142,
                "longitude": 77.5895,
                "requires_road_closure": True,
                "corridor": "Bellary Road 1",
                "hour": 9,
                "day_of_week": 1
            }
            prediction = predictor.predict(
                cause=parsed["cause"],
                event_type=parsed["event_type"],
                lat=parsed["latitude"],
                lon=parsed["longitude"],
                requires_road_closure=str(parsed["requires_road_closure"]),
                corridor=parsed["corridor"],
                hour=parsed["hour"],
                day_of_week=parsed["day_of_week"],
                generate_diversion=False,
                fetch_weather=False
            )
            # Inject mock diversion plan for UI compatibility
            prediction["diversion_plan"] = {
                "summary": "Mock tactical diversion plan for testing.",
                "steps": [
                    "Deploy warning barricades at nearest junction",
                    "Divert light traffic to alternative route",
                    "Monitor traffic flow"
                ]
            }
            briefing = "Mock dispatch briefing for testing."
            return {
                "parsed_parameters": parsed,
                "prediction": prediction,
                "dispatch_briefing": briefing
            }

        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=400, detail="Missing GEMINI_API_KEY environment variable. Cannot parse report.")
        
        # 1. Parse text report using Gemini (no fallback to regex)
        parsed = parse_incident_report_gemini(req.text_report, api_key)
        if not parsed:
            raise ValueError("[GEMINI] Failed to parse incident report text.")
            
        # 2. Run prediction model with parsed parameters
        prediction = predictor.predict(
            cause=parsed["cause"],
            event_type=parsed["event_type"],
            lat=parsed["latitude"],
            lon=parsed["longitude"],
            requires_road_closure=str(parsed["requires_road_closure"]),
            corridor=parsed["corridor"],
            hour=parsed["hour"],
            day_of_week=parsed["day_of_week"]
        )
        
        # 3. Generate natural language briefing using Gemini (no fallback to template)
        briefing = generate_dispatch_briefing_gemini(parsed, prediction, api_key)
        if not briefing:
            raise ValueError("[GEMINI] Failed to generate dispatch briefing.")
            
        return {
            "parsed_parameters": parsed,
            "prediction": prediction,
            "dispatch_briefing": briefing
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/upload-csv")
async def upload_csv_data(file: UploadFile = File(...)):
    """Upload additional CSV data, merge it with existing dataset, and retrain models automatically."""
    try:
        # 1. Read uploaded CSV contents
        new_df = pd.read_csv(file.file)
        if new_df.empty:
            raise HTTPException(status_code=400, detail="Uploaded CSV file is empty.")
            
        # 2. Load existing dataset
        source_csv_path = get_path("dataset/Astram event data_anonymized.csv")
        if os.path.exists(source_csv_path):
            existing_df = pd.read_csv(source_csv_path, low_memory=False)
        else:
            raise HTTPException(status_code=500, detail="Base dataset not found in storage.")
            
        # 3. Standardize/align columns of the new DataFrame
        required_cols = {
            'event_cause': 'others',
            'start_datetime': pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S+00:00'),
            'closed_datetime': pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S+00:00'),
            'resolved_datetime': pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S+00:00'),
            'status': 'resolved',
            'latitude': 12.9716,
            'longitude': 77.5946,
            'police_station': 'no_police_station',
            'corridor': 'Non-corridor',
            'junction': 'unknown',
            'zone': 'unknown',
            'event_type': 'unplanned',
            'requires_road_closure': 'False'
        }
        
        # Ensure all columns exist in new dataframe, filling defaults if missing
        for col, default_val in required_cols.items():
            if col not in new_df.columns:
                new_df[col] = default_val
                
        # Fill missing values within columns that do exist
        for col, default_val in required_cols.items():
            new_df[col] = new_df[col].fillna(default_val)
            
        # If ID column is missing or empty, generate unique ones
        if 'id' not in new_df.columns:
            new_df['id'] = ''
        
        existing_max_id = 0
        for val in existing_df['id'].dropna():
            val_str = str(val)
            if val_str.startswith('FKID') and val_str[4:].isdigit():
                existing_max_id = max(existing_max_id, int(val_str[4:]))
                
        new_ids = []
        for idx in range(len(new_df)):
            new_ids.append(f"FKID{existing_max_id + 1 + idx:06d}")
        new_df['id'] = np.where(new_df['id'].astype(str).str.strip() == '', new_ids, new_df['id'])
        
        # Ensure all columns in existing_df exist in new_df (defaulting to NaN for missing ones)
        for col in existing_df.columns:
            if col not in new_df.columns:
                new_df[col] = np.nan
                
        # Select matching columns to align with existing dataset
        new_df = new_df[existing_df.columns]
        
        # 4. Concatenate and save to writable path
        combined_df = pd.concat([existing_df, new_df], ignore_index=True)
        combined_df.to_csv(source_csv_path, index=False)
        
        # 5. Run data cleaning pipeline
        from backend.data_pipeline import clean_and_preprocess_data
        clean_and_preprocess_data(source_csv_path)
        
        # 6. Run model retraining
        from backend.train_models import train_and_save_models
        train_and_save_models()
        
        # 7. Hot-reload models in predictor
        predictor.reload_models()
        
        return {
            "status": "success",
            "message": "CSV uploaded, merged, and models retrained successfully.",
            "uploaded_records_count": len(new_df),
            "total_records_count": len(combined_df)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"CSV Upload & Retraining error: {str(e)}")


@app.get("/api/model-diagnostic")
def get_model_diagnostic():
    """Return model training comparison results and metrics."""
    results_path = get_path("backend/artifacts/model_comparison_results.json")
    if os.path.exists(results_path):
        try:
            with open(results_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error reading model diagnostics: {str(e)}")
    return {"error": "Model diagnostics not found."}


if __name__ == "__main__":
    import uvicorn
    # Run the server on port 8000
    uvicorn.run(app, host="127.0.0.1", port=8000)

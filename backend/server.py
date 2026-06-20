import os
import sys
# Add parent directory to sys.path to allow absolute imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import csv
import json
from fastapi import FastAPI, HTTPException
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

# Initialize predictor
predictor = EventPredictor()

FEEDBACK_CSV_PATH = r"d:\Coding\gridlock\Round 2\dataset\feedback_data.csv"

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
    cleaned_csv = r"d:\Coding\gridlock\Round 2\backend\artifacts\cleaned_events.csv"
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
    cleaned_csv = r"d:\Coding\gridlock\Round 2\backend\artifacts\cleaned_events.csv"
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

@app.post("/api/predict")
def predict_event_impact(req: PredictionRequest):
    try:
        prediction = predictor.predict(
            cause=req.cause,
            event_type=req.event_type,
            lat=req.latitude,
            lon=req.longitude,
            requires_road_closure=str(req.requires_road_closure),
            corridor=req.corridor,
            hour=req.hour,
            day_of_week=req.day_of_week
        )
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/api/feedback")
def log_feedback(req: FeedbackRequest):
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
            
        return {"status": "success", "message": "Feedback successfully logged"}
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
        cleaned_csv = r"d:\Coding\gridlock\Round 2\backend\artifacts\cleaned_events.csv"
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
                    day_of_week=int(row['local_day_of_week']) if pd.notnull(row['local_day_of_week']) else 1
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

if __name__ == "__main__":
    import uvicorn
    # Run the server on port 8000
    uvicorn.run(app, host="127.0.0.1", port=8000)

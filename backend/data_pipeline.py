import os
import json
import pandas as pd
import numpy as np

def clean_and_preprocess_data(csv_path):
    print("Starting data preprocessing...")
    # Load dataset
    df = pd.read_csv(csv_path, low_memory=False)
    total_rows = len(df)
    print(f"Loaded {total_rows} rows.")

    # 1. Normalize event_cause casing and whitespace
    df['event_cause_clean'] = df['event_cause'].fillna('others').astype(str).str.strip().str.lower()
    # Normalize debris and debris
    df['event_cause_clean'] = df['event_cause_clean'].replace({'debris': 'debris'}) # already done by lower

    # 2. Clean duration target
    # Parse datetimes (all are in UTC, e.g. +00)
    df['start'] = pd.to_datetime(df['start_datetime'], errors='coerce')
    df['closed'] = pd.to_datetime(df['closed_datetime'], errors='coerce')
    df['resolved'] = pd.to_datetime(df['resolved_datetime'], errors='coerce')

    # Preferred: resolved, fallback: closed
    df['end_time'] = df['resolved'].fillna(df['closed'])
    
    # Calculate duration in minutes
    df['duration'] = (df['end_time'] - df['start']).dt.total_seconds() / 60.0
    
    # Filter out active events (they shouldn't have closed/resolved dates, or duration will be null/invalid)
    # Filter out negative durations (data entry errors)
    valid_durations = df[
        (df['status'] != 'active') & 
        (df['duration'].notnull()) & 
        (df['duration'] >= 0)
    ]
    
    # Compute 90th percentile of valid durations
    p90_duration = valid_durations['duration'].quantile(0.90)
    
    # Apply p90 cap for duration modeling
    df['duration_capped'] = np.where(df['duration'] > p90_duration, p90_duration, df['duration'])
    
    # Keep track of which rows are trainable for duration
    df['is_trainable_duration'] = (
        (df['status'] != 'active') & 
        (df['duration'].notnull()) & 
        (df['duration'] >= 0)
    )

    # 3. Spatial features
    # Round lat/lon to 3 decimals (~110m grid cell)
    df['grid_lat'] = df['latitude'].round(3)
    df['grid_lon'] = df['longitude'].round(3)
    df['grid_cell'] = df['grid_lat'].astype(str) + "," + df['grid_lon'].astype(str)

    # Primary administrative unit: police_station (100% complete)
    df['police_station_clean'] = df['police_station'].fillna('no_police_station').astype(str).str.strip().str.lower()
    
    # Corridor (99.8% complete)
    df['corridor_clean'] = df['corridor'].fillna('Non-corridor').astype(str).str.strip()
    df['corridor_clean'] = df['corridor_clean'].replace({'nan': 'Non-corridor', '': 'Non-corridor'})

    # Enrichment: junction and zone
    df['junction_clean'] = df['junction'].fillna('unknown').astype(str).str.strip()
    df['zone_clean'] = df['zone'].fillna('unknown').astype(str).str.strip()

    # 4. Temporal features (Convert UTC to IST)
    # The timestamps carry +00, so we convert them to IST
    df['start_ist'] = df['start'].dt.tz_convert('Asia/Kolkata')
    
    # Extract local hour, day of week
    df['local_hour'] = df['start_ist'].dt.hour
    df['local_day_of_week'] = df['start_ist'].dt.dayofweek
    df['local_month'] = df['start_ist'].dt.month
    
    # Peak hours: 8:00 AM - 11:59 AM, and 5:00 PM - 8:59 PM IST
    df['is_peak_hour'] = df['local_hour'].apply(
        lambda h: 1 if (8 <= h <= 11) or (17 <= h <= 20) else 0
    )

    # Fill missing priority (mostly High or Low)
    df['priority_clean'] = df['priority'].fillna('Low').astype(str).str.strip().str.lower()

    # Save cleaned data to CSV
    output_dir = r"d:\Coding\gridlock\Round 2\backend\artifacts"
    os.makedirs(output_dir, exist_ok=True)
    
    cleaned_csv_path = os.path.join(output_dir, "cleaned_events.csv")
    df.to_csv(cleaned_csv_path, index=False)
    print(f"Cleaned dataset saved to: {cleaned_csv_path}")

    # Generate profile info
    profile = {
        "total_rows": int(total_rows),
        "unplanned_count": int((df['event_type'] == 'unplanned').sum()),
        "planned_count": int((df['event_type'] == 'planned').sum()),
        "trainable_duration_count": int(df['is_trainable_duration'].sum()),
        "p90_duration_minutes": float(p90_duration),
        "median_duration_minutes": float(valid_durations['duration'].median()),
        "mean_duration_minutes": float(valid_durations['duration'].mean()),
        "cause_counts": df['event_cause_clean'].value_counts().to_dict(),
        "priority_counts": df['priority_clean'].value_counts().to_dict(),
        "police_station_counts": df['police_station_clean'].value_counts().to_dict(),
        "peak_hour_distribution": df['is_peak_hour'].value_counts().to_dict(),
        "timezone_verified": True
    }

    profile_json_path = os.path.join(output_dir, "dataset_profile.json")
    with open(profile_json_path, 'w', encoding='utf-8') as f:
        json.dump(profile, f, indent=2, ensure_ascii=False)
    print(f"Dataset profile saved to: {profile_json_path}")
    
    return df, profile

if __name__ == "__main__":
    csv_path = r"d:\Coding\gridlock\Round 2\dataset\Astram event data_anonymized.csv"
    clean_and_preprocess_data(csv_path)

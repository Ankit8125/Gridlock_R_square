import os
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, accuracy_score, f1_score

# High-volume causes that have at least 100 rows in the dataset
HIGH_VOLUME_CAUSES = [
    'vehicle_breakdown', 'others', 'pot_holes', 'construction', 
    'water_logging', 'accident', 'tree_fall', 'road_conditions', 
    'congestion'
]

def train_and_save_models():
    print("Loading cleaned dataset...")
    cleaned_csv = r"d:\Coding\gridlock\Round 2\backend\artifacts\cleaned_events.csv"
    if not os.path.exists(cleaned_csv):
        raise FileNotFoundError(f"Cleaned dataset not found at {cleaned_csv}. Please run data_pipeline.py first.")
        
    df = pd.read_csv(cleaned_csv)
    
    # Filter dataset for high-volume causes for model training
    df_hv = df[df['event_cause_clean'].isin(HIGH_VOLUME_CAUSES)].copy()
    print(f"High-volume causes dataset size: {len(df_hv)} rows.")

    # Features list
    features = [
        'event_cause_clean', 'event_type', 'latitude', 'longitude', 
        'police_station_clean', 'corridor_clean', 'is_peak_hour', 
        'local_hour', 'local_day_of_week'
    ]
    
    categorical_features = ['event_cause_clean', 'event_type', 'police_station_clean', 'corridor_clean']
    numerical_features = ['latitude', 'longitude', 'is_peak_hour', 'local_hour', 'local_day_of_week']

    # Prep models directory
    models_dir = r"d:\Coding\gridlock\Round 2\backend\models"
    os.makedirs(models_dir, exist_ok=True)

    # ----------------------------------------------------
    # 1. Train Duration Model (Regression)
    # ----------------------------------------------------
    print("\n--- Training Duration Model ---")
    # Only train on rows where duration is trainable
    df_duration = df_hv[df_hv['is_trainable_duration'] == True].copy()
    print(f"Trainable duration rows for high-volume causes: {len(df_duration)}.")
    
    X_dur = df_duration[features]
    y_dur = df_duration['duration_capped']
    
    X_train_dur, X_test_dur, y_train_dur, y_test_dur = train_test_split(
        X_dur, y_dur, test_size=0.2, random_state=42
    )
    
    # Preprocessor
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features)
        ],
        remainder='passthrough'
    )
    
    # Pipeline
    duration_pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, max_depth=15, random_state=42, n_jobs=-1))
    ])
    
    duration_pipeline.fit(X_train_dur, y_train_dur)
    
    # Evaluate
    y_pred_dur = duration_pipeline.predict(X_test_dur)
    mae = mean_absolute_error(y_test_dur, y_pred_dur)
    median_err = np.median(np.abs(y_test_dur - y_pred_dur))
    print(f"Duration Model MAE: {mae:.2f} minutes")
    print(f"Duration Model Median Error: {median_err:.2f} minutes")
    
    # Save duration model
    dur_model_path = os.path.join(models_dir, "duration_model.joblib")
    joblib.dump(duration_pipeline, dur_model_path)
    print(f"Duration model saved to {dur_model_path}")

    # ----------------------------------------------------
    # 2. Train Priority Model (Classification)
    # ----------------------------------------------------
    print("\n--- Training Priority Model ---")
    X_clf = df_hv[features]
    y_clf = df_hv['priority_clean'] # 'high' or 'low'
    
    X_train_clf, X_test_clf, y_train_clf, y_test_clf = train_test_split(
        X_clf, y_clf, test_size=0.2, random_state=42, stratify=y_clf
    )
    
    priority_pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(n_estimators=100, max_depth=15, random_state=42, n_jobs=-1))
    ])
    
    priority_pipeline.fit(X_train_clf, y_train_clf)
    
    # Evaluate
    y_pred_clf = priority_pipeline.predict(X_test_clf)
    acc = accuracy_score(y_test_clf, y_pred_clf)
    f1 = f1_score(y_test_clf, y_pred_clf, average='weighted')
    print(f"Priority Model Accuracy: {acc:.2%}")
    print(f"Priority Model F1 Score: {f1:.4f}")
    
    # Save priority model
    clf_model_path = os.path.join(models_dir, "priority_model.joblib")
    joblib.dump(priority_pipeline, clf_model_path)
    print(f"Priority model saved to {clf_model_path}")
    
    print("\nModel training and saving completed successfully!")

if __name__ == "__main__":
    train_and_save_models()

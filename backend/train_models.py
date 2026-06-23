import os
import json
import joblib
import pandas as pd
import numpy as np
from backend.path_config import get_path
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier, GradientBoostingRegressor, GradientBoostingClassifier
from sklearn.ensemble import HistGradientBoostingRegressor, HistGradientBoostingClassifier
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, accuracy_score, f1_score, precision_score, recall_score, roc_auc_score

# High-volume causes that have at least 100 rows in the dataset
HIGH_VOLUME_CAUSES = [
    'vehicle_breakdown', 'others', 'pot_holes', 'construction', 
    'water_logging', 'accident', 'tree_fall', 'road_conditions', 
    'congestion'
]

def train_and_save_models():
    print("Loading cleaned dataset...")
    cleaned_csv = get_path("backend/artifacts/cleaned_events.csv")
    if not os.path.exists(cleaned_csv):
        raise FileNotFoundError(f"Cleaned dataset not found at {cleaned_csv}. Please run data_pipeline.py first.")
        
    df = pd.read_csv(cleaned_csv)
    
    # Filter dataset for high-volume causes for model training
    df_hv = df[df['event_cause_clean'].isin(HIGH_VOLUME_CAUSES)].copy()
    print(f"High-volume causes dataset size: {len(df_hv)} rows.")

    # Features list (for duration and road closure models)
    features = [
        'event_cause_clean', 'event_type', 'latitude', 'longitude', 
        'police_station_clean', 'corridor_clean', 'is_peak_hour', 
        'local_hour_sin', 'local_hour_cos', 'local_day_sin', 'local_day_cos'
    ]
    
    categorical_features = ['event_cause_clean', 'event_type', 'police_station_clean', 'corridor_clean']
    numerical_features = ['latitude', 'longitude', 'is_peak_hour', 'local_hour_sin', 'local_hour_cos', 'local_day_sin', 'local_day_cos']

    # Features list (for priority classification model - corridor_clean is excluded)
    features_clf = [
        'event_cause_clean', 'event_type', 'latitude', 'longitude', 
        'police_station_clean', 'is_peak_hour', 'local_hour_sin', 'local_hour_cos', 'local_day_sin', 'local_day_cos'
    ]
    
    categorical_features_clf = ['event_cause_clean', 'event_type', 'police_station_clean']
    numerical_features_clf = ['latitude', 'longitude', 'is_peak_hour', 'local_hour_sin', 'local_hour_cos', 'local_day_sin', 'local_day_cos']

    # Prep models directory
    models_dir = get_path("backend/models")
    os.makedirs(models_dir, exist_ok=True)
    
    # Preprocessor with SimpleImputer for numerical values to handle coordinates NaNs robustly
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features),
            ('num', SimpleImputer(strategy='median'), numerical_features)
        ],
        remainder='drop'
    )

    # Preprocessor specifically for Priority model (excludes corridor_clean)
    preprocessor_clf = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features_clf),
            ('num', SimpleImputer(strategy='median'), numerical_features_clf)
        ],
        remainder='drop'
    )

    comparison_results = {
        "regression": [],
        "classification": [],
        "closure_classification": []
    }

    # ----------------------------------------------------
    # 1. Train & Tune Duration Models (Regression)
    # ----------------------------------------------------
    print("\n--- Model Tuning & Selection for Duration (Regression) ---")
    df_duration = df_hv[df_hv['is_trainable_duration'] == True].copy()
    print(f"Trainable duration rows: {len(df_duration)}.")
    
    X_dur = df_duration[features]
    y_dur = df_duration['duration_capped']
    
    X_train_dur, X_test_dur, y_train_dur, y_test_dur = train_test_split(
        X_dur, y_dur, test_size=0.2, random_state=42
    )

    # Define candidate regressors and parameter grids
    reg_candidates = [
        {
            "name": "Random Forest Regressor",
            "model": RandomForestRegressor(random_state=42),
            "grid": {
                "regressor__n_estimators": [30],
                "regressor__max_depth": [8, 12, None],
                "regressor__min_samples_split": [2, 5],
                "regressor__min_samples_leaf": [1, 2]
            }
        },
        {
            "name": "Gradient Boosting Regressor",
            "model": GradientBoostingRegressor(random_state=42),
            "grid": {
                "regressor__n_estimators": [30],
                "regressor__learning_rate": [0.05, 0.1],
                "regressor__max_depth": [3, 5],
                "regressor__min_samples_split": [2, 5],
                "regressor__min_samples_leaf": [1, 2]
            }
        },
        {
            "name": "Hist Gradient Boosting Regressor",
            "model": HistGradientBoostingRegressor(random_state=42),
            "grid": {
                "regressor__max_iter": [30],
                "regressor__learning_rate": [0.05, 0.1],
                "regressor__max_depth": [5, 8],
                "regressor__min_samples_leaf": [10, 20]
            }
        }
    ]

    best_dur_score = float('inf')
    best_dur_pipeline = None
    best_dur_name = ""

    for candidate in reg_candidates:
        print(f"\nTuning {candidate['name']}...")
        pipeline = Pipeline([
            ('preprocessor', preprocessor),
            ('regressor', candidate['model'])
        ])
        
        search = RandomizedSearchCV(
            pipeline, 
            param_distributions=candidate['grid'], 
            n_iter=3, 
            cv=2, 
            scoring='neg_mean_absolute_error', 
            random_state=42, 
            n_jobs=1
        )
        search.fit(X_train_dur, y_train_dur)
        
        # Evaluate on test set
        test_pred = search.predict(X_test_dur)
        mae = mean_absolute_error(y_test_dur, test_pred)
        median_err = np.median(np.abs(y_test_dur - test_pred))
        
        print(f"Best Params: {search.best_params_}")
        print(f"Test MAE: {mae:.2f} minutes | Test Median Error: {median_err:.2f} minutes")
        
        comparison_results["regression"].append({
            "model_name": candidate['name'],
            "best_params": {k.replace("regressor__", ""): v for k, v in search.best_params_.items()},
            "test_mae_minutes": float(mae),
            "test_median_error_minutes": float(median_err)
        })
        
        # We select the model that minimizes the test MAE
        if mae < best_dur_score:
            best_dur_score = mae
            best_dur_pipeline = search.best_estimator_
            best_dur_name = candidate['name']

    print(f"\nWinner for Duration Model: {best_dur_name} (MAE: {best_dur_score:.2f} minutes)")
    # Save the winner
    dur_model_path = os.path.join(models_dir, "duration_model.joblib")
    joblib.dump(best_dur_pipeline, dur_model_path)
    print(f"Duration model saved to {dur_model_path}")

    # ----------------------------------------------------
    # 2. Train & Tune Priority Models (Classification)
    # ----------------------------------------------------
    print("\n--- Model Tuning & Selection for Priority (Classification) ---")
    X_clf = df_hv[features_clf]
    y_clf = df_hv['priority_clean']
    
    X_train_clf, X_test_clf, y_train_clf, y_test_clf = train_test_split(
        X_clf, y_clf, test_size=0.2, random_state=42, stratify=y_clf
    )

    clf_candidates = [
        {
            "name": "Random Forest Classifier",
            "model": RandomForestClassifier(random_state=42),
            "grid": {
                "classifier__n_estimators": [30],
                "classifier__max_depth": [6, 10, None],
                "classifier__min_samples_split": [2, 4],
                "classifier__min_samples_leaf": [1, 2]
            }
        },
        {
            "name": "Gradient Boosting Classifier",
            "model": GradientBoostingClassifier(random_state=42),
            "grid": {
                "classifier__n_estimators": [30],
                "classifier__learning_rate": [0.05, 0.1],
                "classifier__max_depth": [3, 5],
                "classifier__min_samples_split": [2, 4],
                "classifier__min_samples_leaf": [1, 2]
            }
        },
        {
            "name": "Hist Gradient Boosting Classifier",
            "model": HistGradientBoostingClassifier(random_state=42),
            "grid": {
                "classifier__max_iter": [30],
                "classifier__learning_rate": [0.05, 0.1],
                "classifier__max_depth": [5, 8],
                "classifier__min_samples_leaf": [10, 20]
            }
        }
    ]

    best_clf_score = 0.0
    best_clf_pipeline = None
    best_clf_name = ""

    for candidate in clf_candidates:
        print(f"\nTuning {candidate['name']}...")
        pipeline = Pipeline([
            ('preprocessor', preprocessor_clf),
            ('classifier', candidate['model'])
        ])
        
        search = RandomizedSearchCV(
            pipeline, 
            param_distributions=candidate['grid'], 
            n_iter=3, 
            cv=2, 
            scoring='f1_weighted', 
            random_state=42, 
            n_jobs=1
        )
        search.fit(X_train_clf, y_train_clf)
        
        # Evaluate on test set
        test_pred = search.predict(X_test_clf)
        acc = accuracy_score(y_test_clf, test_pred)
        f1 = f1_score(y_test_clf, test_pred, average='weighted')
        
        print(f"Best Params: {search.best_params_}")
        print(f"Test Accuracy: {acc:.2%} | Test F1-Score: {f1:.4f}")
        
        comparison_results["classification"].append({
            "model_name": candidate['name'],
            "best_params": {k.replace("classifier__", ""): v for k, v in search.best_params_.items()},
            "test_accuracy": float(acc),
            "test_f1_score": float(f1)
        })
        
        # We select the model that maximizes the test F1-score
        if f1 > best_clf_score:
            best_clf_score = f1
            best_clf_pipeline = search.best_estimator_
            best_clf_name = candidate['name']

    print(f"\nWinner for Priority Model: {best_clf_name} (F1-Score: {best_clf_score:.4f})")
    # Save the winner
    clf_model_path = os.path.join(models_dir, "priority_model.joblib")
    joblib.dump(best_clf_pipeline, clf_model_path)
    print(f"Priority model saved to {clf_model_path}")


    # ----------------------------------------------------
    # 3. Train & Tune Road Closure Models (Classification)
    # ----------------------------------------------------
    print("\n--- Model Tuning & Selection for Road Closure (Classification) ---")
    df_closure = df.copy()
    df_closure['closure_target'] = df_closure['requires_road_closure'].astype(str).str.upper().isin(['TRUE', '1', 'YES'])
    X_closure = df_closure[features]
    y_closure = df_closure['closure_target']

    X_train_close, X_test_close, y_train_close, y_test_close = train_test_split(
        X_closure, y_closure, test_size=0.2, random_state=42, stratify=y_closure
    )

    close_candidates = [
        {
            "name": "Random Forest Closure Classifier",
            "model": RandomForestClassifier(random_state=42, class_weight='balanced'),
            "grid": {
                "classifier__n_estimators": [30],
                "classifier__max_depth": [8, 12, None],
                "classifier__min_samples_split": [2, 4],
                "classifier__min_samples_leaf": [1, 2]
            }
        },
        {
            "name": "Gradient Boosting Closure Classifier",
            "model": GradientBoostingClassifier(random_state=42),
            "grid": {
                "classifier__n_estimators": [30],
                "classifier__learning_rate": [0.05, 0.1],
                "classifier__max_depth": [3, 5],
                "classifier__min_samples_split": [2, 4],
                "classifier__min_samples_leaf": [1, 2]
            }
        },
        {
            "name": "Hist Gradient Boosting Closure Classifier",
            "model": HistGradientBoostingClassifier(random_state=42),
            "grid": {
                "classifier__max_iter": [30],
                "classifier__learning_rate": [0.05, 0.1],
                "classifier__max_depth": [4, 8],
                "classifier__min_samples_leaf": [10, 20]
            }
        }
    ]

    best_close_score = -1.0
    best_close_pipeline = None
    best_close_name = ""

    for candidate in close_candidates:
        print(f"\nTuning {candidate['name']}...")
        pipeline = Pipeline([
            ('preprocessor', preprocessor),
            ('classifier', candidate['model'])
        ])

        search = RandomizedSearchCV(
            pipeline,
            param_distributions=candidate['grid'],
            n_iter=3,
            cv=2,
            scoring='f1',
            random_state=42,
            n_jobs=1
        )
        search.fit(X_train_close, y_train_close)

        test_pred = search.predict(X_test_close)
        try:
            true_index = list(search.classes_).index(True)
            test_prob = search.predict_proba(X_test_close)[:, true_index]
            auc = roc_auc_score(y_test_close, test_prob)
        except Exception:
            auc = None

        acc = accuracy_score(y_test_close, test_pred)
        f1 = f1_score(y_test_close, test_pred, zero_division=0)
        precision = precision_score(y_test_close, test_pred, zero_division=0)
        recall = recall_score(y_test_close, test_pred, zero_division=0)

        print(f"Best Params: {search.best_params_}")
        print(
            f"Test Accuracy: {acc:.2%} | F1: {f1:.4f} | "
            f"Precision: {precision:.4f} | Recall: {recall:.4f}"
        )

        comparison_results["closure_classification"].append({
            "model_name": candidate['name'],
            "best_params": {k.replace("classifier__", ""): v for k, v in search.best_params_.items()},
            "test_accuracy": float(acc),
            "test_f1_score": float(f1),
            "test_precision": float(precision),
            "test_recall": float(recall),
            "test_roc_auc": float(auc) if auc is not None else None
        })

        if f1 > best_close_score:
            best_close_score = f1
            best_close_pipeline = search.best_estimator_
            best_close_name = candidate['name']

    print(f"\nWinner for Road Closure Model: {best_close_name} (F1-Score: {best_close_score:.4f})")
    closure_model_path = os.path.join(models_dir, "closure_model.joblib")
    joblib.dump(best_close_pipeline, closure_model_path)
    print(f"Road closure model saved to {closure_model_path}")

    # Extract and save feature importances for all 3 winning models
    def extract_importance(pipeline, step_name):
        try:
            preprocessor = pipeline.named_steps['preprocessor']
            feature_names = list(preprocessor.get_feature_names_out())
        except Exception as e:
            print(f"Error getting feature names: {e}")
            return {}
            
        estimator = pipeline.named_steps.get(step_name)
        if estimator is None:
            return {}
            
        importances = None
        if hasattr(estimator, 'feature_importances_'):
            importances = list(estimator.feature_importances_)
        elif hasattr(estimator, 'coef_'):
            importances = list(np.abs(estimator.coef_))
            
        if not importances or len(importances) != len(feature_names):
            return {}
            
        feat_imp = {name: float(imp) for name, imp in zip(feature_names, importances)}
        
        # Group one-hot encoded features back to bases
        grouped = {}
        for name, imp in feat_imp.items():
            clean_name = name.replace("cat__", "").replace("num__", "")
            base_name = clean_name
            for orig in ['event_cause_clean', 'event_type', 'police_station_clean', 'corridor_clean']:
                if clean_name.startswith(orig):
                    base_name = orig
                    break
            grouped[base_name] = grouped.get(base_name, 0.0) + imp
            
        total = sum(grouped.values()) or 1.0
        grouped_norm = {k: round(v / total, 4) for k, v in grouped.items()}
        sorted_imp = sorted(grouped_norm.items(), key=lambda x: x[1], reverse=True)
        return {k: v for k, v in sorted_imp}

    importance_data = {
        "duration_model": extract_importance(best_dur_pipeline, 'regressor'),
        "priority_model": extract_importance(best_clf_pipeline, 'classifier'),
        "closure_model": extract_importance(best_close_pipeline, 'classifier')
    }
    
    importance_path = get_path("backend/artifacts/feature_importance.json")
    os.makedirs(os.path.dirname(importance_path), exist_ok=True)
    with open(importance_path, 'w', encoding='utf-8') as f:
        json.dump(importance_data, f, indent=2)
    print(f"Feature importances saved to: {importance_path}")

    # Save results profile metadata
    results_path = get_path("backend/artifacts/model_comparison_results.json")
    with open(results_path, 'w', encoding='utf-8') as f:
        json.dump(comparison_results, f, indent=2)
    print(f"\nModel comparison results saved to: {results_path}")

if __name__ == "__main__":
    train_and_save_models()

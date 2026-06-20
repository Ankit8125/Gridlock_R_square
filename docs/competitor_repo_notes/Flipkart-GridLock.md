# Flipkart-GridLock

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\Flipkart-GridLock`
- Git remote: `https://github.com/deepanshu70001/Flipkart-GridLock.git`
- Git branch: `main`
- Git HEAD: `57447a5a0933c3126ba797f24eab71b483e62a3e`
- Fingerprint: `d0b9ed4c311fd5d14153d068cc05d7ac8e86b0ca3a88613141a6725e5a53aa96`
- Files indexed: `35`
- Indexed size: `19069781` bytes

## Stack Signals

- `Streamlit`

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, constable, diversion, manpower, police, resource
- models: calibration, catboost, classifier, lightgbm, random forest, randomforest, regressor, xgboost
- routing: google maps, osrm

## Manifests

- `requirements.txt`

## Python Dependencies

### `requirements.txt`
- `pandas>=2.0.0`
- `numpy>=1.24.0`
- `scikit-learn>=1.3.0`
- `lightgbm>=4.0.0`
- `xgboost>=2.0.0`
- `catboost>=1.2.0`
- `shap>=0.43.0`
- `hdbscan>=0.8.33`
- `h3>=3.7.0`
- `folium>=0.14.0`
- `plotly>=5.15.0`
- `matplotlib>=3.7.0`
- `seaborn>=0.12.0`
- `streamlit>=1.28.0`
- `pyyaml>=6.0`
- `joblib>=1.3.0`
- `imbalanced-learn>=0.11.0`

## README Headings

- `README.md`: # Event-Driven Congestion: ML Pipeline for Traffic Impact Forecasting & Resource Optimization
- `README.md`: ## 🚦 Executive Summary
- `README.md`: ## 🏗️ Architecture & Data Flow
- `README.md`: ### 1. Data Preprocessing
- `README.md`: ### 2. Feature Engineering (55+ Features)
- `README.md`: ### 3. Machine Learning Models
- `README.md`: ### 4. Actionable Resource Recommender
- `README.md`: ### 5. Post-Event Learning System (Feedback Loop)
- `README.md`: ## 💻 Dashboard Interface
- `README.md`: ## 🚀 Quick Start & Installation
- `README.md`: ### 1. Install Dependencies
- `README.md`: ### 2. Run the Training Pipeline
- `README.md`: ### 3. Launch the Dashboard
- `README.md`: ## 📂 Project Structure
- `README.md`: ## 💡 Key Innovations summary

## README Claims and Operational Notes

- `README.md`: This project is an end-to-end Machine Learning prototype that predicts event-related traffic impact (congestion, duration, severity) in Bengaluru and recommends optimal **manpower**, **barricading**, and **diversion p...
- `README.md`: B --> C(Feature Engineering)
- `README.md`: C --> D1[Impact Severity Model]
- `README.md`: C --> D2[Duration Prediction Model]
- `README.md`: C --> D3[Road Closure Model]
- `README.md`: D1 --> E(Resource Recommender)
- `README.md`: E --> F[Dashboard & Actionable Plans]
- `README.md`: G -. Feedback Loop .-> E
- `README.md`: - Defines clear targets for ML models:
- `README.md`: ### 2. Feature Engineering (55+ Features)
- `README.md`: The system automatically generates a rich feature set to capture complex traffic dynamics:
- `README.md`: ### 3. Machine Learning Models
- `README.md`: The core of the prototype relies on four complementary predictive tasks:
- `README.md`: | Model | Task | Architecture | Details |
- `README.md`: | **Resolution Duration** | Predict Resolution Time | LightGBM Quantile Regressor | Predicts the mean duration *plus* uncertainty intervals (P10, P25, P50, P75, P90). We specifically fine-tuned this model with robust ...
- `README.md`: | **Road Closure** | Binary Closure Prediction | CatBoost Classifier | Utilizes balanced class weights to predict rare road closure events. Evaluated via F1 and Recall to ensure no closures are missed. |
- `README.md`: ### 4. Actionable Resource Recommender
- `README.md`: - **Manpower Planning**: Calculates required personnel based on base event cause, scaled by rush hour, severity, and closure multipliers. Computes total shifts needed based on the predicted *duration*.
- `README.md`: - **Barricading**: Recommends the number of barricades needed based on whether a full, partial, or no closure is predicted.
- `README.md`: - **Diversion Plans**: Suggests pre-computed Bengaluru-specific alternate routes.
- `README.md`: - **Cost Estimation**: Estimates the operational cost of the recommended deployment.
- `README.md`: ### 5. Post-Event Learning System (Feedback Loop)
- `README.md`: - After an event resolves, the system compares its predictions against actual outcomes.
- `README.md`: - It calculates bias (e.g., "The model consistently under-predicts duration for tree falls by 20%").
- `README.md`: - It automatically generates **Correction Factors** that update the multipliers in the Resource Recommender, ensuring the system becomes smarter over time without requiring manual model retraining.
- `README.md`: ## 💻 Dashboard Interface
- `README.md`: The prototype includes an interactive Streamlit dashboard (`dashboard/app.py`) that acts as the control center for operators.
- `README.md`: - **Live Event Simulation**: Allows operators to input new events and instantly receive predicted severity, duration ranges, and complete resource deployment plans.
- `README.md`: - **Model Explainability**: SHAP value plots explaining *why* the models made specific predictions.
- `README.md`: - **Post-Event Analytics**: Dashboards tracking the accuracy of the models over time.
- `README.md`: ### 2. Run the Training Pipeline
- `README.md`: To execute data preprocessing, feature engineering, and model training/evaluation:
- `README.md`: ### 3. Launch the Dashboard
- `README.md`: streamlit run dashboard/app.py
- `README.md`: │   ├── feature_engineering.py          # 55+ engineered features
- `README.md`: │   ├── resource_recommender.py         # Manpower/barricading/diversion plans
- `README.md`: │   ├── post_event_learning.py          # Feedback loop & correction factors
- `README.md`: │   ├── tune_duration_model.py          # RandomizedSearch hyperparameter tuning
- `README.md`: │   └── models/
- `README.md`: │       ├── impact_severity_model.py    # Stacked ensemble architecture
- `README.md`: │       ├── duration_model.py           # LightGBM Quantile regression
- `README.md`: │       ├── road_closure_model.py       # Closure prediction
- `README.md`: ├── dashboard/
- `README.md`: │   └── app.py                          # Streamlit interactive dashboard UI
- `README.md`: │   ├── models/                         # Saved .joblib model artifacts
- `README.md`: 1. **Multi-Task Learning**: 4 complementary prediction tasks provide holistic event understanding.
- `README.md`: 2. **Quantile Duration Estimation**: We don't just predict a single number for duration; we predict uncertainty bands (P10–P90) which is critical for risk-averse resource planning.
- `README.md`: 3. **Post-Event Learning Loop**: Auto-generates correction factors from prediction errors.
- `README.md`: 4. **Actionable Resource Recommendations**: Converts abstract ML probabilities into concrete deployment plans (personnel, barricades, cost estimates).

## Data Assets

- `Astram event data_anonymized - Astram event data_anonymizedb40ac87 (1).csv`
- `outputs\processed_events.parquet`
- `outputs\reports\final_metrics.json`
- `outputs\reports\post_event_report.json`

## Model and Artifact Assets

- `outputs\models\closure_model.joblib`
- `outputs\models\clustering_model.joblib`
- `outputs\models\duration_model.joblib`
- `outputs\models\severity_model.joblib`

## Notebooks

- None detected

## API Endpoints

- None detected

## Python Source Signals

### `dashboard\app.py`
- Functions: `load_data`, `load_metrics`, `load_post_event_report`, `compute_data_driven_stats`, `load_recommender`, `get_osrm_route`, `main`, `render_dashboard`, `render_event_map`, `render_prediction_interface`, `render_model_performance`, `render_post_event_learning`, `get_circle`
- Imports: `json`, `math`, `numpy`, `os`, `pandas`, `plotly`, `requests`, `src`, `streamlit`, `sys`, `yaml`

### `src\data_preprocessing.py`
- Classes: `DataPreprocessor`
- Functions: `__init__`, `load_raw`, `_parse_datetimes`, `_normalize_event_causes`, `_validate_coordinates`, `_compute_durations`, `_handle_missing_values`, `_create_binary_targets`, `_add_computed_columns`, `_haversine`, `process`, `_print_summary`
- Imports: `numpy`, `os`, `pandas`, `pathlib`, `warnings`, `yaml`

### `src\eda_visualizations.py`
- Classes: `EDAVisualizer`
- Functions: `__init__`, `generate_all`, `plot_event_cause_distribution`, `plot_temporal_heatmap`, `plot_hourly_distribution`, `plot_corridor_analysis`, `plot_severity_by_cause`, `plot_duration_distribution`, `plot_spatial_scatter`, `plot_closure_analysis`, `plot_zone_analysis`, `plot_planned_vs_unplanned`, `plot_model_results`
- Imports: `data_preprocessing`, `matplotlib`, `numpy`, `os`, `pandas`, `seaborn`, `warnings`, `yaml`

### `src\feature_engineering.py`
- Classes: `FeatureEngine`
- Functions: `__init__`, `_temporal_features`, `_spatial_features`, `_haversine`, `_event_profile_features`, `_historical_features`, `_rolling_count`, `_rolling_count_global`, `_interaction_features`, `_target_encode`, `fit_transform`, `transform`, `get_feature_names`, `get_severity_features`, `get_duration_features`, `get_closure_features`, `_original_cols`
- Imports: `collections`, `data_preprocessing`, `h3`, `numpy`, `pandas`, `warnings`, `yaml`

### `src\models\duration_model.py`
- Classes: `DurationModel`
- Functions: `__init__`, `fit`, `predict`, `predict_single`, `evaluate`, `get_top_features`, `save`, `load`
- Imports: `joblib`, `lightgbm`, `numpy`, `os`, `pandas`, `sklearn`, `warnings`, `yaml`

### `src\models\impact_severity_model.py`
- Classes: `SeverityModel`
- Functions: `__init__`, `_build_base_models`, `fit`, `predict_proba`, `predict`, `evaluate`, `get_top_features`, `save`, `load`, `_clone_model`
- Imports: `catboost`, `joblib`, `lightgbm`, `numpy`, `os`, `pandas`, `sklearn`, `warnings`, `xgboost`, `yaml`

### `src\models\road_closure_model.py`
- Classes: `RoadClosureModel`
- Functions: `__init__`, `fit`, `_optimize_threshold`, `predict_proba`, `predict`, `evaluate`, `get_top_features`, `save`, `load`
- Imports: `catboost`, `joblib`, `lightgbm`, `numpy`, `os`, `pandas`, `sklearn`, `warnings`, `yaml`

### `src\models\spatial_temporal_clustering.py`
- Classes: `SpatialTemporalClustering`
- Functions: `__init__`, `fit`, `predict`, `_prepare_features`, `_compute_cluster_stats`, `_assign_nearest_centroid`, `get_hotspots`, `get_high_risk_clusters`, `save`, `load`
- Imports: `hdbscan`, `joblib`, `numpy`, `os`, `pandas`, `sklearn`, `warnings`, `yaml`

### `src\pipeline.py`
- Classes: `CongestionPipeline`
- Functions: `main`, `__init__`, `run_training`, `_demo_predictions`, `predict_event`
- Imports: `argparse`, `json`, `numpy`, `os`, `pandas`, `pathlib`, `src`, `sys`, `warnings`, `yaml`

### `src\post_event_learning.py`
- Classes: `PostEventLearningSystem`
- Functions: `__init__`, `log_prediction`, `update_actuals`, `analyze_from_dataset`, `_compute_correction_factors`, `get_correction_factors`, `get_worst_predictions`
- Imports: `datetime`, `json`, `numpy`, `os`, `pandas`, `yaml`

### `src\resource_recommender.py`
- Classes: `ResourceRecommender`
- Functions: `__init__`, `recommend`, `_determine_alert_level`, `_calculate_manpower`, `_calculate_barricading`, `_suggest_diversions`, `_format_duration`, `_recommend_equipment`, `_recommend_communication`, `_estimate_cost`, `update_correction_factors`
- Imports: `numpy`, `yaml`

### `src\tune_duration_model.py`
- Functions: `main`
- Imports: `numpy`, `os`, `pandas`, `sklearn`, `src`, `sys`, `warnings`, `yaml`

## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `README.md`

## Test Files

- None detected

## File Inventory

- `Astram event data_anonymized - Astram event data_anonymizedb40ac87 (1).csv` | 4547022 bytes | `11469a7450fd`
- `config.yaml` | 2825 bytes | `d5ccfd6c11ac`
- `dashboard\app.py` | 77658 bytes | `9c67161c7021`
- `outputs\models\closure_model.joblib` | 1044192 bytes | `1df9ab325da0`
- `outputs\models\clustering_model.joblib` | 1002832 bytes | `bdd485d14c79`
- `outputs\models\duration_model.joblib` | 5974884 bytes | `275a06da7474`
- `outputs\models\severity_model.joblib` | 2950445 bytes | `063c0e8d716c`
- `outputs\plots\01_event_cause_distribution.png` | 138232 bytes | `6f974c3547ab`
- `outputs\plots\02_temporal_heatmap.png` | 301330 bytes | `bc8f1764c9e3`
- `outputs\plots\03_hourly_distribution.png` | 321419 bytes | `a36c44967acb`
- `outputs\plots\04_corridor_analysis.png` | 131893 bytes | `8d1e92499f27`
- `outputs\plots\05_severity_by_cause.png` | 78980 bytes | `c4461f8add31`
- `outputs\plots\06_duration_distribution.png` | 141524 bytes | `ce9be9068d52`
- `outputs\plots\07_spatial_scatter.png` | 486169 bytes | `43e89b9e2030`
- `outputs\plots\08_closure_analysis.png` | 190095 bytes | `d821f2c534db`
- `outputs\plots\09_zone_analysis.png` | 76339 bytes | `279e2364fd61`
- `outputs\plots\10_planned_vs_unplanned.png` | 193505 bytes | `dfd7d601bc04`
- `outputs\processed_events.parquet` | 1261355 bytes | `f5bff219eabd`
- `outputs\reports\final_metrics.json` | 683 bytes | `8d3565becb0c`
- `outputs\reports\post_event_report.json` | 3622 bytes | `c80ba8b28a44`
- `README.md` | 7926 bytes | `e5f31da5ba2f`
- `requirements.txt` | 284 bytes | `f21ad187c941`
- `src\__init__.py` | 39 bytes | `f07e30464172`
- `src\data_preprocessing.py` | 9836 bytes | `f398a85e6fc3`
- `src\eda_visualizations.py` | 18962 bytes | `6dd694c549aa`
- `src\feature_engineering.py` | 24242 bytes | `1d273ae6734a`
- `src\models\__init__.py` | 21 bytes | `789ff2777d13`
- `src\models\duration_model.py` | 7964 bytes | `d6892ad43ab8`
- `src\models\impact_severity_model.py` | 9697 bytes | `88af0f1b926a`
- `src\models\road_closure_model.py` | 7170 bytes | `4b83a19e8016`
- `src\models\spatial_temporal_clustering.py` | 8590 bytes | `dbb17cd2fada`
- `src\pipeline.py` | 16770 bytes | `1ef3f2649ffa`
- `src\post_event_learning.py` | 11114 bytes | `c965eef14ca9`
- `src\resource_recommender.py` | 18016 bytes | `a801ceeb5127`
- `src\tune_duration_model.py` | 4146 bytes | `5bc1ccecdb22`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

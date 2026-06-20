# NammaTraffic

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\NammaTraffic`
- Git remote: `https://github.com/nivanjain123-tech/NammaTraffic.git`
- Git branch: `main`
- Git HEAD: `7f4899149f9fcf5d1e3d436ab08fe09b6c2c304b`
- Fingerprint: `d0c3503439388a3e66872c0f94e9e72192bf9eccc3f7134cc31685ce827edb31`
- Files indexed: `20`
- Indexed size: `22569074` bytes

## Stack Signals

- `Streamlit`

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, police, resource
- models: catboost, classifier, lightgbm, regressor
- routing: none

## Manifests

- `requirements.txt`

## Python Dependencies

### `requirements.txt`
- `streamlit>=1.28.0`
- `folium>=0.14.0`
- `streamlit-folium>=0.15.0`
- `plotly>=5.18.0`
- `pandas>=2.0.0`
- `numpy>=1.24.0`
- `scikit-learn>=1.3.0`
- `catboost>=1.2.0`
- `lightgbm>=4.0.0`

## README Headings

- `README.md`: # NammaTraffic
- `README.md`: ## Quick Start
- `README.md`: ### 1. Setup Environment
- `README.md`: ### 2. Train the Models
- `README.md`: ### 3. Start the Command Center
- `README.md`: ## Demo Walkthrough
- `README.md`: ## Folder Structure
- `README.md`: ## Core Capabilities
- `README.md`: ## Machine Learning Models
- `README.md`: ## The Dataset
- `README.md`: ## Why We Built This

## README Claims and Operational Notes

- `README.md`: NammaTraffic is a predictive command platform designed to shift Bengaluru's traffic incident management from a reactive approach to a proactive one. Built using 8,173 real Astram incident records, the system forecasts...
- `README.md`: ### 2. Train the Models
- `README.md`: This script takes about 2 minutes to run. It generates the trained models, similarity matrix, hotspot clusters, and corridor risk scores, saving them all in the `artifacts/` directory.
- `README.md`: streamlit run app.py
- `README.md`: The dashboard will be available at http://localhost:8501.
- `README.md`: If you are evaluating the project, here is a quick way to test the core features:
- `README.md`: 1. **Operations Dashboard:** Check the live incident feed, KPI metrics, and post-event analytics to see trends and station performance.
- `README.md`: 3. **Incident Predictor:** Select "Scenario 1: Severe Accident — Silk Board (6 PM)" and click Predict. You will see the model's predictions, the reasoning behind them, and suggested diversion routes.
- `README.md`: │   ├── train_pipeline.py    # ML training and feature engineering
- `README.md`: ├── artifacts/               # Saved models, matrices, and stats (generated after training)
- `README.md`: *(Note: We have removed the heavy raw data files from the repository to keep the submission clean and within size limits. The models run inference directly from the generated artifacts.)*
- `README.md`: - **Dashboard:** Live feeds, KPIs, hourly breakdown charts, and corridor risk rankings.
- `README.md`: - **Predictor:** Runs CatBoost and LightGBM models to predict resolution times and severity, complete with SHAP-like explanations and diversion logic.
- `README.md`: ## Machine Learning Models
- `README.md`: We built three primary models evaluated using 5-fold cross validation:
- `README.md`: - **Severity Prediction:** Classifies events into High/Low priority using CatBoost. (F1 = 0.999)
- `README.md`: - **Road Closure Prediction:** Estimates the probability that a road will require complete closure using LightGBM. (AUC = 0.796)
- `README.md`: - **Resolution Time:** Predicts the total minutes required to resolve an incident using CatBoost. Our optimized model achieved an MAE of ~2.2 hours.
- `README.md`: Current traffic systems tell you there is a jam after it happens. We built NammaTraffic to calculate the risk of closure before the first tow truck is even dispatched. By training entirely on real Bengaluru operationa...

## Data Assets

- `artifacts\cleaned_data.csv`
- `artifacts\copilot_context.json`
- `artifacts\corridor_risk.csv`
- `artifacts\feature_config.json`
- `artifacts\hotspot_clusters.csv`
- `artifacts\model_performance.json`

## Model and Artifact Assets

- `artifacts\closure_model.lgb`
- `artifacts\label_encoders.pkl`
- `artifacts\model_performance.json`
- `artifacts\resolution_model.cbm`
- `artifacts\severity_model.cbm`
- `artifacts\tfidf_vectorizer.pkl`

## Notebooks

- None detected

## API Endpoints

- None detected

## Python Source Signals

### `code\app.py`
- Functions: `load_data`, `load_corridor_risk`, `load_hotspot_clusters`, `load_model_performance`, `load_similarity_features`, `load_copilot_context`, `load_ml_models`, `find_similar_incidents`, `estimate_resources`, `build_feature_row`, `predict_incident`, `explain_prediction`, `suggest_diversion`, `risk_color`, `get_live_feed_html`, `copilot_chart`, `get_copilot_answer`, `call_llm`, `compute_corridor_risk`
- Imports: `catboost`, `folium`, `json`, `lightgbm`, `numpy`, `os`, `pandas`, `pickle`, `plotly`, `random`, `sklearn`, `streamlit`, `streamlit_folium`, `urllib`

### `code\train_pipeline.py`
- Functions: `geohash_encode`
- Imports: `catboost`, `collections`, `json`, `lightgbm`, `numpy`, `os`, `pandas`, `pickle`, `sklearn`, `warnings`

## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `NAMMATRAFFIC_PITCHDECK.key`
- `NAMMATRAFFIC_PITCHDECK.pptx`
- `README.md`

## Test Files

- None detected

## File Inventory

- `.gitignore` | 547 bytes | `7949abd4524b`
- `artifacts\cleaned_data.csv` | 5562087 bytes | `8aa64d57a2fa`
- `artifacts\closure_model.lgb` | 2131037 bytes | `4c56fc0939ad`
- `artifacts\copilot_context.json` | 6999 bytes | `c7073f11b177`
- `artifacts\corridor_risk.csv` | 3046 bytes | `4f39888a8e80`
- `artifacts\feature_config.json` | 882 bytes | `236c550c94f1`
- `artifacts\hotspot_clusters.csv` | 4709 bytes | `a51a68f8d874`
- `artifacts\label_encoders.pkl` | 1582 bytes | `0cd6dfef5d4a`
- `artifacts\model_performance.json` | 866 bytes | `88da8e86d681`
- `artifacts\resolution_model.cbm` | 919312 bytes | `7e1f48048a7e`
- `artifacts\severity_model.cbm` | 1043236 bytes | `1be78049f61c`
- `artifacts\similarity_features.npy` | 5753920 bytes | `a16c9166acdf`
- `artifacts\tfidf_vectorizer.pkl` | 2581 bytes | `3bde2aa0aea7`
- `code\app.py` | 79195 bytes | `a2fbd17c1348`
- `code\data_audit.py` | 43728 bytes | `66508aa8971a`
- `code\train_pipeline.py` | 20090 bytes | `9c505b0b32c6`
- `NAMMATRAFFIC_PITCHDECK.key` | 4231157 bytes | `9227d92e5543`
- `NAMMATRAFFIC_PITCHDECK.pptx` | 2759633 bytes | `13b405470cbb`
- `README.md` | 4305 bytes | `7861ea958ea7`
- `requirements.txt` | 162 bytes | `72b7e85714fb`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

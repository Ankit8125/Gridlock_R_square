# Flipkart_Gridlock_Hackathon_2.0_Astram-Event-Optimizer

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\Flipkart_Gridlock_Hackathon_2.0_Astram-Event-Optimizer`
- Git remote: `https://github.com/10Aryan07/Flipkart_Gridlock_Hackathon_2.0_Astram-Event-Optimizer.git`
- Git branch: `main`
- Git HEAD: `430e916cd2cabdcea6613025fe784f735cdb3161`
- Fingerprint: `78e617a9dfb70c3ba3cd5a121d143e4eae109503e848cd750d53e64e6e7a103d`
- Files indexed: `18`
- Indexed size: `1059770` bytes

## Stack Signals

- `FastAPI`
- `Node/Express`
- `Streamlit`

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, gridlock, traffic
- operations: barricade, diversion, manpower, police, resource
- models: catboost, lightgbm, random forest, regressor, xgboost
- routing: none

## Manifests

- `requirements.txt`

## Python Dependencies

### `requirements.txt`
- `streamlit==1.32.0`
- `fastapi==0.110.0`
- `uvicorn==0.28.0`
- `scikit-learn==1.4.1.post1`
- `pandas==2.2.1`
- `numpy==1.26.4`
- `joblib==1.3.2`
- `requests==2.31.0`
- `pydeck==0.8.1b0`
- `pydantic==2.6.4`

## README Headings

- `README.md`: # ASTraM Event Optimizer
- `README.md`: ## System Architecture & ML Strategy
- `README.md`: ## Core Intelligence Features
- `README.md`: ### 1. Cyclical Feature Engineering
- `README.md`: ### 2. Continuous Resource Optimization
- `README.md`: ### 3. Interactive Simulation Mode
- `README.md`: ## Repository Structure
- `README.md`: ## Installation & Execution

## README Claims and Operational Notes

- `README.md`: The ASTraM Event Optimizer is a real-time, machine-learning-driven command center designed to shift municipal traffic management from *reactive* to *proactive*. By predicting the spatiotemporal impact of localized eve...
- `README.md`: * **Backend API(FastAPI + Uvicorn):** A lightning-fast, asynchronous bridge that houses the live intelligence engine.
- `README.md`: * **Machine Learning Pipeline(Scikit-Learn):** * **Phase 1 (Archive):** Our initial data science heavy-lifting involved training complex offline ensembles(LightGBM/CatBoost) to establish baseline predictions and featu...
- `README.md`: * **Phase 2 (Live Inference):** For real-time API deployment, we transitioned to a lightweight, structural **Random Forest Regressor**. This live model dynamically calculates severity scores on the fly rather than rel...
- `README.md`: ## Core Intelligence Features
- `README.md`: ### 1. Cyclical Feature Engineering
- `README.md`: This allows the model to inherently understand Bengaluru's natural traffic cycles and apply dynamic penalties when events intersect with peak rush hours (8 AM - 11 AM, 5 PM - 9 PM).
- `README.md`: Resource allocation replaces rigid heuristic step-logic with continuous algorithmic scaling based on the model's live Severity Index (0.0 to 1.0):
- `README.md`: * **Manpower Scaling:** Officers deployed scale linearly with severity.
- `README.md`: * **Physical Assets:** Barricade deployment scales exponentially based on critical severity thresholds, ensuring massive resources are only deployed for systemic threats.
- `README.md`: * **Diversion Mapping:** Dynamically calculates perimeter radii up to 3.5km based on predicted event sprawl.
- `README.md`: ├── backend/                 # FastAPI logic & Inference Engine
- `README.md`: │   ├── main.py              # API Endpoints
- `README.md`: │   └── inference.py         # Cyclical feature engineering & Model loading
- `README.md`: ├── models/                  # Live deployment binaries (.pkl)
- `README.md`: │   ├── astram_rf_model.pkl  # Structural Random Forest Regressor
- `README.md`: │   ├── experiments/         # Individual model training scripts
- `README.md`: │   ├── scripts/             # Out-of-fold predictions and ensembling
- `README.md`: Ensure your terminal is in the root Gridlock - P2 directory, then start the FastAPI server:
- `README.md`: (You should see a confirmation log: ASTraM Random Forest Model Loaded Successfully.)
- `README.md`: Open a second terminal, navigate into the frontend directory, and start the Streamlit dashboard:
- `README.md`: streamlit run app.py
- `archive_phase1\README.md`: This folder contains our offline batch-processing models and ensemble experiments(LightGBM/CatBoost) from Phase 1. Our Phase 2 live API deployment utilizes a lightweight Random Forest model, located in the main /model...

## Data Assets

- `data\processed\events_cleaned.csv`
- `data\processed\zone_intelligence.json`

## Model and Artifact Assets

- `models\astram_rf_model.pkl`
- `models\le_cause.pkl`
- `models\le_zone.pkl`

## Notebooks

- None detected

## API Endpoints

- `GET /health`
- `POST /simulate_event`
- `app.GET /health`
- `app.POST /simulate_event`

## Python Source Signals

### `archive_phase1\experiments\01_lightgbm.py`
- Functions: `preprocess_data`
- Imports: `lightgbm`, `numpy`, `pandas`, `sklearn`, `warnings`

### `archive_phase1\experiments\02_catboost.py`
- Functions: `preprocess_for_catboost`
- Imports: `catboost`, `numpy`, `pandas`, `sklearn`

### `archive_phase1\experiments\03_xgboost.py`
- Functions: `preprocess_data`
- Imports: `numpy`, `pandas`, `sklearn`, `warnings`, `xgboost`

### `archive_phase1\scripts\01_oof_lightgbm.py`
- Functions: `preprocess_data`, `create_oof_target_encoding`
- Imports: `lightgbm`, `numpy`, `pandas`, `sklearn`, `warnings`

### `archive_phase1\scripts\02_oof_catboost.py`
- Functions: `preprocess_data`, `create_oof_target_encoding`
- Imports: `catboost`, `numpy`, `pandas`, `sklearn`, `warnings`

### `backend\inference.py`
- Classes: `TrafficInferenceEngine`
- Functions: `__init__`, `calculate_time_waves`, `predict_event_impact`
- Imports: `joblib`, `math`, `os`, `pandas`

### `backend\main.py`
- Classes: `EventRequest`
- Functions: `simulate_event`, `health_check`
- Endpoints: `POST /simulate_event`, `GET /health`, `app.POST /simulate_event`, `app.GET /health`
- Imports: `backend`, `datetime`, `fastapi`, `pydantic`, `typing`

### `frontend\app.py`
- Functions: `load_zones`
- Imports: `datetime`, `os`, `pandas`, `pydeck`, `requests`, `streamlit`

## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `archive_phase1\README.md`
- `README.md`

## Test Files

- None detected

## File Inventory

- `.gitignore` | 232 bytes | `fbb349c238c4`
- `archive_phase1\experiments\01_lightgbm.py` | 3764 bytes | `c50a6016a42c`
- `archive_phase1\experiments\02_catboost.py` | 2664 bytes | `f0694998407c`
- `archive_phase1\experiments\03_xgboost.py` | 2906 bytes | `579af689c0e6`
- `archive_phase1\README.md` | 264 bytes | `21c062add3bc`
- `archive_phase1\scripts\01_oof_lightgbm.py` | 3925 bytes | `6503906766d7`
- `archive_phase1\scripts\02_oof_catboost.py` | 3506 bytes | `f02a7eddabb3`
- `archive_phase1\scripts\03_ensemble.py` | 329 bytes | `ca3c01bbe0b2`
- `backend\inference.py` | 2603 bytes | `fee8a6ab6827`
- `backend\main.py` | 2336 bytes | `4cba8107e510`
- `data\processed\events_cleaned.csv` | 955347 bytes | `55ab6c9a09dc`
- `data\processed\zone_intelligence.json` | 20438 bytes | `2de08bdaf4da`
- `frontend\app.py` | 6093 bytes | `d22096c4473b`
- `models\astram_rf_model.pkl` | 48385 bytes | `ff88e131e77a`
- `models\le_cause.pkl` | 735 bytes | `dff057d08def`
- `models\le_zone.pkl` | 943 bytes | `560f7587f524`
- `README.md` | 5124 bytes | `358a76976a25`
- `requirements.txt` | 176 bytes | `5cff7ef5feee`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

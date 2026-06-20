# Gridlock_2.0

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\Gridlock_2.0`
- Git remote: `https://github.com/arpan0926/Gridlock_2.0.git`
- Git branch: `main`
- Git HEAD: `111bc6c066eada394a4cb1302c77252bad2114d1`
- Fingerprint: `408a993773399dc0273f899899cc59e2cdc6a5912b57813ad5f105e8098866cd`
- Files indexed: `20`
- Indexed size: `46130` bytes

## Stack Signals

- `FastAPI`
- `Node/Express`
- `Streamlit`

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, gridlock, traffic
- operations: barricade, diversion, manpower, police
- models: lightgbm, regressor
- routing: google maps

## Manifests

- `gridlock-event-congestion\backend\requirements.txt`
- `gridlock-event-congestion\frontend\requirements.txt`

## Python Dependencies

### `gridlock-event-congestion\backend\requirements.txt`
- `fastapi`
- `uvicorn[standard]`
- `lightgbm`
- `pandas`
- `numpy`
- `scikit-learn`
- `osmnx`
- `networkx`
- `pydantic`

### `gridlock-event-congestion\frontend\requirements.txt`
- `streamlit`
- `folium`
- `streamlit-folium`
- `requests`
- `pandas`

## README Headings

- `gridlock-event-congestion\README.md`: # Gridlock Event Congestion Prototype
- `gridlock-event-congestion\README.md`: ## Project Overview
- `gridlock-event-congestion\README.md`: ### **The 3 Pillars**
- `gridlock-event-congestion\README.md`: #### **Pillar 1: Impact Forecasting (The Brain)**
- `gridlock-event-congestion\README.md`: #### **Pillar 2: Operational Recommendations (The Differentiator)**
- `gridlock-event-congestion\README.md`: #### **Pillar 3: Post-Event Learning Loop (The Unique Angle)**
- `gridlock-event-congestion\README.md`: ## Repository Structure
- `gridlock-event-congestion\README.md`: ## Quick Start
- `gridlock-event-congestion\README.md`: ### **Prerequisites**
- `gridlock-event-congestion\README.md`: ### **1. Install Dependencies**
- `gridlock-event-congestion\README.md`: ### **2. Download OSM Road Network**
- `gridlock-event-congestion\README.md`: ### **3. Train the Model**
- `gridlock-event-congestion\README.md`: ### **4. Start the API Server**
- `gridlock-event-congestion\README.md`: ### **5. Test an Endpoint**
- `gridlock-event-congestion\README.md`: ## API Endpoints
- `gridlock-event-congestion\README.md`: ### **POST `/api/forecast`**
- `gridlock-event-congestion\README.md`: ### **POST `/api/feedback`**
- `gridlock-event-congestion\README.md`: ### **GET `/api/metrics`**
- `gridlock-event-congestion\README.md`: ## Model Training Pipeline
- `gridlock-event-congestion\README.md`: ### **Feature Engineering**
- `gridlock-event-congestion\README.md`: ### **Training Details**
- `gridlock-event-congestion\README.md`: ### **Output**
- `gridlock-event-congestion\README.md`: ## Project Architecture
- `gridlock-event-congestion\README.md`: ### **Backend Stack**
- `gridlock-event-congestion\README.md`: ### **Data Flow**
- `gridlock-event-congestion\README.md`: ## Team Responsibilities
- `gridlock-event-congestion\README.md`: ### **Backend (This Repo)**
- `gridlock-event-congestion\README.md`: ### **Frontend (React — Your Teammate)**
- `gridlock-event-congestion\README.md`: ## Handling Unplanned Events
- `gridlock-event-congestion\README.md`: ## Development Notes
- `gridlock-event-congestion\README.md`: ### **Project History**
- `gridlock-event-congestion\README.md`: ### **Known Limitations**
- `gridlock-event-congestion\README.md`: ### **Future Enhancements**

## README Claims and Operational Notes

- `gridlock-event-congestion\README.md`: **Flipkart Gridlock Hackathon Round 2** — A segment-level traffic impact forecasting and operational recommendation system for planned events in Bengaluru.
- `gridlock-event-congestion\README.md`: - **What we do:** Predict % speed degradation **per road segment**, not just "area around event"
- `gridlock-event-congestion\README.md`: - **Features:** Event type, footfall, venue capacity, day/time, road network topology, historical baselines
- `gridlock-event-congestion\README.md`: #### **Pillar 2: Operational Recommendations (The Differentiator)**
- `gridlock-event-congestion\README.md`: - **Diversion Routes:** Pre-computed alternate routes ranked by capacity & detour length using OSMnx/NetworkX
- `gridlock-event-congestion\README.md`: - **Output:** Actionable deployment guidelines backed by network analysis
- `gridlock-event-congestion\README.md`: - **Feedback Collection:** Log actual vs predicted congestion after each event
- `gridlock-event-congestion\README.md`: - **Accuracy Tracking:** Per-event-type model performance dashboard
- `gridlock-event-congestion\README.md`: - **Storage:** Simple JSON feedback log with metrics aggregation
- `gridlock-event-congestion\README.md`: ├── .gitignore                     # Ignore data, models, caches
- `gridlock-event-congestion\README.md`: │   ├── train_model.py            # Entry point for model training
- `gridlock-event-congestion\README.md`: │   ├── models/                   # Saved ML models (.pkl)
- `gridlock-event-congestion\README.md`: │       ├── main.py               # FastAPI app & routing
- `gridlock-event-congestion\README.md`: │       ├── api/
- `gridlock-event-congestion\README.md`: │       │   ├── forecast.py       # POST /api/forecast endpoint
- `gridlock-event-congestion\README.md`: │       │   └── feedback.py       # POST /api/feedback, GET /api/metrics
- `gridlock-event-congestion\README.md`: │       │   ├── model_pipeline.py # SegmentImpactModel (training & inference)
- `gridlock-event-congestion\README.md`: │       │   ├── recommendation.py # ManpowerRecommendation, Barricade, Routes
- `gridlock-event-congestion\README.md`: │       │   └── feedback.py       # FeedbackTracker (persistence)
- `gridlock-event-congestion\README.md`: └── frontend/                      # React dashboard (built by teammate)
- `gridlock-event-congestion\README.md`: - ~2GB disk space for OSM graph + models
- `gridlock-event-congestion\README.md`: ### **3. Train the Model**
- `gridlock-event-congestion\README.md`: python backend/train_model.py
- `gridlock-event-congestion\README.md`: - Extracts features for each event→segment pair
- `gridlock-event-congestion\README.md`: - Saves model to `backend/models/impact_model.pkl`
- `gridlock-event-congestion\README.md`: ### **4. Start the API Server**
- `gridlock-event-congestion\README.md`: - Runs on `http://127.0.0.1:8000`
- `gridlock-event-congestion\README.md`: curl -X POST http://127.0.0.1:8000/api/forecast \
- `gridlock-event-congestion\README.md`: ## API Endpoints
- `gridlock-event-congestion\README.md`: ### **POST `/api/forecast`**
- `gridlock-event-congestion\README.md`: Forecast segment-level impact and operational recommendations for an event.
- `gridlock-event-congestion\README.md`: "predicted_speed_degradation": 0.35,
- `gridlock-event-congestion\README.md`: "diversion_routes": [
- `gridlock-event-congestion\README.md`: "route_id": "route-1",
- `gridlock-event-congestion\README.md`: ### **POST `/api/feedback`**
- `gridlock-event-congestion\README.md`: Log actual vs predicted congestion after an event.
- `gridlock-event-congestion\README.md`: "predicted_speed_degradation": 0.35,
- `gridlock-event-congestion\README.md`: "notes": "Actual impact was lower due to early police deployment."
- `gridlock-event-congestion\README.md`: "message": "Feedback recorded."
- `gridlock-event-congestion\README.md`: ### **GET `/api/metrics`**
- `gridlock-event-congestion\README.md`: Retrieve aggregated model accuracy per event type.
- `gridlock-event-congestion\README.md`: ## Model Training Pipeline
- `gridlock-event-congestion\README.md`: ### **Feature Engineering**
- `gridlock-event-congestion\README.md`: The model uses temporal, geospatial, and event features:
- `gridlock-event-congestion\README.md`: **Temporal Features:**
- `gridlock-event-congestion\README.md`: **Geospatial Features:**
- `gridlock-event-congestion\README.md`: **Event Features:**
- `gridlock-event-congestion\README.md`: **Road Segment Features:**
- `gridlock-event-congestion\README.md`: - Highway type (motorway, trunk, primary, secondary, etc.)
- `gridlock-event-congestion\README.md`: - OneHotEncoding for categorical features
- `gridlock-event-congestion\README.md`: - StandardScaler for numeric features
- `gridlock-event-congestion\README.md`: - Serialized Pipeline (sklearn + LightGBM): `backend/models/impact_model.pkl`
- `gridlock-event-congestion\README.md`: - Can be loaded and used for batch predictions
- `gridlock-event-congestion\README.md`: | Web Framework | FastAPI 0.129 |
- `gridlock-event-congestion\README.md`: | ML Model | LightGBM 4.6 |
- `gridlock-event-congestion\README.md`: Feature Engineering (temporal, geospatial, event, road)
- `gridlock-event-congestion\README.md`: Serialized Model (.pkl)
- `gridlock-event-congestion\README.md`: FastAPI /forecast Endpoint
- `gridlock-event-congestion\README.md`: Predictions + Recommendations → Frontend / Client
- `gridlock-event-congestion\README.md`: Feedback Log (actual vs predicted)
- `gridlock-event-congestion\README.md`: - ✅ Model training pipeline
- `gridlock-event-congestion\README.md`: - ✅ Forecasting API (`/api/forecast`)
- `gridlock-event-congestion\README.md`: - ✅ Feedback & metrics API (`/api/feedback`, `/api/metrics`)
- `gridlock-event-congestion\README.md`: - ✅ Recommendation engine (manpower, barricades, routes)
- `gridlock-event-congestion\README.md`: - [ ] Dashboard layout
- `gridlock-event-congestion\README.md`: - [ ] Manpower/barricade/routes display
- `gridlock-event-congestion\README.md`: - [ ] Feedback submission UI
- `gridlock-event-congestion\README.md`: - `POST /api/forecast` with event details
- `gridlock-event-congestion\README.md`: - `GET /api/metrics` for accuracy tracking
- `gridlock-event-congestion\README.md`: - `POST /api/feedback` to log outcomes
- `gridlock-event-congestion\README.md`: Per the problem statement, unplanned events (accidents, VIP movement, flash gatherings) cannot be predicted directly.
- `gridlock-event-congestion\README.md`: 2. **Rapid Response Playbook:** Pre-configured deployment templates
- `gridlock-event-congestion\README.md`: - **Round 1:** Built segment-level demand model using LightGBM on Astram data
- `gridlock-event-congestion\README.md`: - **Round 2:** Adapted Round 1 pipeline for impact forecasting (speed degradation), added recommendations & feedback loop
- `gridlock-event-congestion\README.md`: - Model trained on synthetic targets (no ground-truth speed labels in raw data)
- `gridlock-event-congestion\README.md`: - Pre-computed routes; no real-time routing
- `gridlock-event-congestion\README.md`: - Single-city model (Bengaluru); not generalizable to other cities without retraining
- `gridlock-event-congestion\README.md`: - Feedback metrics aggregated, not used to retrain in real-time
- `gridlock-event-congestion\README.md`: - [ ] Implement online learning (update model after each feedback)
- `gridlock-event-congestion\README.md`: - [ ] Multi-city model transfer learning

## Data Assets

- None detected

## Model and Artifact Assets

- None detected

## Notebooks

- None detected

## API Endpoints

- `GET /`
- `GET /metrics`
- `POST /feedback`
- `POST /forecast`
- `app.GET /`
- `router.GET /metrics`
- `router.POST /feedback`
- `router.POST /forecast`

## Python Source Signals

### `gridlock-event-congestion\backend\app\api\feedback.py`
- Classes: `FeedbackInput`, `MetricsResponse`
- Functions: `submit_feedback`, `get_feedback_metrics`
- Endpoints: `POST /feedback`, `GET /metrics`, `router.POST /feedback`, `router.GET /metrics`
- Imports: `backend`, `fastapi`, `pydantic`, `typing`

### `gridlock-event-congestion\backend\app\api\forecast.py`
- Classes: `ForecastInput`, `SegmentPrediction`, `ManpowerRecommendation`, `BarricadeCandidate`, `DiversionRoute`, `ForecastResponse`
- Functions: `forecast_event`
- Endpoints: `POST /forecast`, `router.POST /forecast`
- Imports: `backend`, `datetime`, `fastapi`, `pathlib`, `pydantic`, `typing`

### `gridlock-event-congestion\backend\app\core\feedback.py`
- Classes: `FeedbackTracker`
- Functions: `__init__`, `log_feedback`, `summary_metrics`, `_read_storage`, `_write_storage`
- Imports: `datetime`, `json`, `pathlib`, `typing`

### `gridlock-event-congestion\backend\app\core\model_pipeline.py`
- Classes: `SegmentImpactModel`
- Functions: `__init__`, `load_model`, `save_model`, `build_training_data`, `train_model`, `train_and_save`, `predict_segment_impacts`, `_event_base_features`, `_edge_features`, `_road_name`, `_highway_type`, `_parse_maxspeed`, `_parse_lanes`, `_estimate_footfall`, `_estimate_capacity`, `_parse_datetime`, `_road_criticality_score`, `_synthetic_segment_target`
- Imports: `backend`, `datetime`, `json`, `lightgbm`, `networkx`, `numpy`, `pandas`, `pathlib`, `random`, `sklearn`, `typing`

### `gridlock-event-congestion\backend\app\core\recommendation.py`
- Classes: `ManpowerRecommendation`, `BarricadeCandidate`, `DiversionRoute`, `RecommendationEngine`
- Functions: `road_criticality_score`, `calculate_manpower`, `generate_barricade_candidates`, `plan_alternate_routes`, `_barricade_priority`, `_route_length`, `_route_capacity`, `_direct_line_distance`, `_road_name`, `_highway_type`
- Imports: `dataclasses`, `networkx`, `osmnx`, `typing`

### `gridlock-event-congestion\backend\app\main.py`
- Functions: `root`
- Endpoints: `GET /`, `app.GET /`
- Imports: `backend`, `fastapi`

### `gridlock-event-congestion\backend\app\services\osm_service.py`
- Classes: `OSMGraphService`
- Functions: `__init__`, `load_graph`, `nearest_node`, `nearby_subgraph`, `graph_stats`
- Imports: `networkx`, `osmnx`, `pathlib`, `typing`

## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `gridlock-event-congestion\README.md`

## Test Files

- None detected

## File Inventory

- `.gitignore` | 7 bytes | `d67104f42cea`
- `gridlock-event-congestion\.gitignore` | 284 bytes | `9b0278cb1533`
- `gridlock-event-congestion\backend\__init__.py` | 0 bytes | `e3b0c44298fc`
- `gridlock-event-congestion\backend\app\__init__.py` | 0 bytes | `e3b0c44298fc`
- `gridlock-event-congestion\backend\app\api\__init__.py` | 98 bytes | `5d42340ef38b`
- `gridlock-event-congestion\backend\app\api\feedback.py` | 1040 bytes | `bea400a316c4`
- `gridlock-event-congestion\backend\app\api\forecast.py` | 3916 bytes | `87a55d12ad6d`
- `gridlock-event-congestion\backend\app\core\__init__.py` | 0 bytes | `e3b0c44298fc`
- `gridlock-event-congestion\backend\app\core\feedback.py` | 2321 bytes | `98c007ca879e`
- `gridlock-event-congestion\backend\app\core\model_pipeline.py` | 14171 bytes | `5e8abc4d9154`
- `gridlock-event-congestion\backend\app\core\recommendation.py` | 7485 bytes | `376522dc0c4a`
- `gridlock-event-congestion\backend\app\main.py` | 706 bytes | `004897cbc23a`
- `gridlock-event-congestion\backend\app\services\__init__.py` | 0 bytes | `e3b0c44298fc`
- `gridlock-event-congestion\backend\app\services\osm_service.py` | 2427 bytes | `c9fd033a1df8`
- `gridlock-event-congestion\backend\requirements.txt` | 94 bytes | `f7d3a31f1e7d`
- `gridlock-event-congestion\backend\train_model.py` | 1264 bytes | `237df6de5a79`
- `gridlock-event-congestion\frontend\app.py` | 0 bytes | `e3b0c44298fc`
- `gridlock-event-congestion\frontend\requirements.txt` | 55 bytes | `e4db46707b4e`
- `gridlock-event-congestion\README.md` | 11943 bytes | `0b11c7b25be7`
- `gridlock-event-congestion\scripts\download_osm_data.py` | 319 bytes | `9e2027f70f8c`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

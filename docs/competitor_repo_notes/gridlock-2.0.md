# gridlock-2.0

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock-2.0`
- Git remote: `https://github.com/Penquinz01/gridlock-2.0.git`
- Git branch: `main`
- Git HEAD: `f322b95a32d243b329ed45f776ff2e906905f41a`
- Fingerprint: `0919b1bc26fc987f240c944a9cc9dd96f58b7dcd4fb27ff805802e7077a05409`
- Files indexed: `52`
- Indexed size: `49508377` bytes

## Stack Signals

- `FastAPI`
- `Node/Express`
- `Notebook`

## Traffic Problem Signals

- traffic: bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, police, resource
- models: classifier, knn, nearest neighbor, random forest, randomforest
- routing: none

## Manifests

- `backend\requirements.txt`

## Python Dependencies

### `backend\requirements.txt`
- `fastapi==0.115.0`
- `uvicorn==0.30.6`
- `pydantic==2.9.0`
- `scikit-learn==1.5.1`
- `joblib==1.4.2`
- `pandas==2.2.2`
- `numpy==1.26.4`
- `folium==0.17.0`
- `pytest==8.3.2`
- `httpx==0.27.2`

## README Headings

- `README.md`: # ARES: AI-Powered Incident Response Copilot for Bengaluru Traffic Police
- `README.md`: ## 🛠️ Technology Stack
- `README.md`: ## 🚀 Key Features & Pipeline Flow
- `README.md`: ### 📊 Risk & Resource Calculation Logic
- `README.md`: ## 📥 Setup and Installation
- `README.md`: ### Prerequisites
- `README.md`: ### Installation Steps
- `README.md`: # Windows
- `README.md`: # macOS / Linux
- `README.md`: ## 💻 Running the Backend
- `README.md`: ## 🔍 How to Test the API
- `README.md`: ### 1. Running the Automated Tests
- `README.md`: # From the backend/ folder
- `README.md`: ### 2. Manual Endpoint Testing
- `README.md`: #### **Endpoint**: `POST http://localhost:8000/api/report`
- `README.md`: ## 🗺️ Optional: MapmyIndia (Mappls) Integration
- `README.md`: # Windows (Command Prompt)
- `README.md`: # Windows (PowerShell)
- `README.md`: ## 🚔 Police Station Portal & Retrospective Feedback (Learning Loop)
- `README.md`: ### 1. Police Station Login
- `README.md`: ### 2. Station-Specific Active Queues
- `README.md`: ### 3. Post-Incident Retrospective Feedback

## README Claims and Operational Notes

- `README.md`: ARES is an AI-powered backend decision-support system designed to help the Bengaluru Traffic Police prioritize traffic incidents, predict operational requirements, allocate resources, and generate diversion maps in re...
- `README.md`: Designed for speed, simplicity, and ease of demonstration, this backend uses pre-trained Machine Learning models and deterministic rules to deliver instant incident insights.
- `README.md`: * **Web Framework**: FastAPI (Asynchronous, self-documenting REST API)
- `README.md`: * **Machine Learning**: Scikit-Learn (Random Forest classifiers for priority and road closure prediction)
- `README.md`: * **Nearest Neighbors**: Scikit-Learn KNN (Euclidean distance on coordinates and incident features to find similar incidents)
- `README.md`: * **Testing**: Pytest (Comprehensive unit and API endpoint test suites)
- `README.md`: ## 🚀 Key Features & Pipeline Flow
- `README.md`: When an incident is reported, the backend runs a multi-step analytical pipeline:
- `README.md`: 2. Road Closure Prediction (Random Forest Model)
- `README.md`: 3. Priority Assessment (Random Forest Model: HIGH / LOW)
- `README.md`: 5. Resource Recommendation (Officers, Barricades, Escalation steps)
- `README.md`: 7. Diversion Map Generation (Folium interactive route diversion HTML)
- `README.md`: 1. **Priority & Road Closure Prediction**: Executes pre-trained Random Forest models loaded via `joblib` from `backend/models/`.
- `README.md`: 2. **Operational Risk Assessment**: Scores incident severity based on traffic peak hours, vehicle types, corridor bottlenecks, and predicted closures.
- `README.md`: 3. **Resource Recommendation**: Determines the required deployment of traffic police officers, barricades, and standard escalation procedures based on the computed risk.
- `README.md`: 4. **Similar Incident Retrieval**: Retrieves the top-K historically similar traffic incidents using a KNN model fitted on the preprocessed dataset.
- `README.md`: The resource recommendation engine calculates an operational risk score (capped at 100) using the following scoring points:
- `README.md`: * **High Priority** predicted by ML: **+25 points**
- `README.md`: * **Road Closure** predicted by ML: **+20 points**
- `README.md`: | Risk Score | Risk Level | Recommended Officers | Recommended Barricades | Escalation Contact |
- `README.md`: * Virtual environment (recommended)
- `README.md`: ## 💻 Running the Backend
- `README.md`: * **API Base URL**: `http://localhost:8000`
- `README.md`: ## 🔍 How to Test the API
- `README.md`: ### 1. Running the Automated Tests
- `README.md`: Run the entire unit and API testing suite containing 33 tests:
- `README.md`: The main endpoint designed for the frontend is `/api/report`. It accepts a simplified request containing only the essential details the user provides.
- `README.md`: #### **Endpoint**: `POST http://localhost:8000/api/report`
- `README.md`: * **Feature Imputation**: Automatically infers `event_type` from severity classifications and assigns standard `veh_type` defaults.
- `README.md`: * **Pipeline Run**: Feeds these inferred variables into the ML models to output:
- `README.md`: * Predicted priority (HIGH/LOW) and road closure needs.
- `README.md`: * Operational risk levels and recommendations.
- `README.md`: If you want to use the live MapmyIndia (Mappls) Places API to find actual, real-world police stations nearby instead of matching from the preprocessed dataset:
- `README.md`: 3. When running the server, `/api/report` will automatically query Mappls for live coordinates. If the API keys are not set, it gracefully falls back to the local nearest-neighbor lookup.
- `README.md`: ## 🚔 Police Station Portal & Retrospective Feedback (Learning Loop)
- `README.md`: To support station-level incident queues and post-incident learning, ARES includes a dedicated Station Portal API.
- `README.md`: * **Endpoint**: `POST /api/portal/login`
- `README.md`: * **Endpoint**: `GET /api/portal/incidents/{station_id}`
- `README.md`: ### 3. Post-Incident Retrospective Feedback
- `README.md`: When an incident is cleared, the station officer submits a feedback form (post-learning loop) detailing what resources were *actually* needed versus what the model recommended. This stores the true labels in the datab...
- `README.md`: * **Endpoint**: `POST /api/portal/incidents/{incident_id}/feedback`
- `README.md`: "feedback_notes": "Heavy rains made a road closure absolutely necessary. Deployed 5 officers."
- `README.md`: * **Effect**: Saves feedback details to the database and transitions the incident `status` from `'ACTIVE'` to `'RESOLVED'` in real-time.

## Data Assets

- `backend\preprocessed_data\preprocessed_data.csv`
- `Data.csv`

## Model and Artifact Assets

- `backend\models\priority_model.pkl`
- `backend\models\road_closure_model.pkl`

## Notebooks

### `backend\jupyter_files\data_preprocess.ipynb`
- Cells: `32`
- Imports: `numpy`, `pandas`, `sklearn`
- Keywords: `closure`, `gridlock`, `police`

### `backend\jupyter_files\priority_model.ipynb`
- Cells: `39`
- Imports: `joblib`, `pandas`, `sklearn`
- Keywords: `classifier`, `closure`, `randomforest`

### `backend\jupyter_files\road_closure_model.ipynb`
- Cells: `30`
- Imports: `joblib`, `numpy`, `pandas`, `sklearn`
- Keywords: `classifier`, `closure`, `randomforest`


## API Endpoints

- `GET /`
- `GET /health`
- `GET /hotspots`
- `POST /analyze`
- `POST /diversion`
- `POST /recommendation`
- `POST /report`
- `POST /risk`
- `POST /similar-incidents`
- `app.GET /`
- `router.GET /health`
- `router.GET /hotspots`
- `router.POST /analyze`
- `router.POST /diversion`
- `router.POST /recommendation`
- `router.POST /report`
- `router.POST /risk`
- `router.POST /similar-incidents`

## Python Source Signals

### `backend\app\database.py`
- Functions: `init_db`, `get_connection`, `save_incident`, `get_all_incidents`, `get_incident_by_id`, `get_incidents_by_station`, `save_feedback_and_resolve`, `get_feedback_for_incident`, `init_other_db`, `save_other_incident`, `get_other_incident`
- Imports: `app`, `sqlite3`

### `backend\app\main.py`
- Functions: `lifespan`, `root`
- Endpoints: `GET /`, `app.GET /`
- Imports: `app`, `contextlib`, `fastapi`

### `backend\app\ml\__init__.py`
- Functions: `load_models`, `get_priority_model`, `get_road_closure_model`, `get_dataset`, `models_loaded`
- Imports: `app`, `joblib`, `pandas`

### `backend\app\routes\analyze.py`
- Functions: `_generate_incident_id`, `analyze_incident`
- Endpoints: `POST /analyze`, `router.POST /analyze`
- Imports: `app`, `datetime`, `fastapi`

### `backend\app\routes\diversion.py`
- Functions: `generate_diversion_map`
- Endpoints: `POST /diversion`, `router.POST /diversion`
- Imports: `app`, `fastapi`

### `backend\app\routes\health.py`
- Functions: `health_check`
- Endpoints: `GET /health`, `router.GET /health`
- Imports: `app`, `fastapi`

### `backend\app\routes\hotspots.py`
- Functions: `get_hotspots`
- Endpoints: `GET /hotspots`, `router.GET /hotspots`
- Imports: `app`, `fastapi`, `typing`

### `backend\app\routes\recommendation.py`
- Functions: `get_recommendation`
- Endpoints: `POST /recommendation`, `router.POST /recommendation`
- Imports: `app`, `fastapi`

### `backend\app\routes\report.py`
- Functions: `_infer_event_type`, `_parse_time`, `_generate_incident_id`, `report_incident`
- Endpoints: `POST /report`, `router.POST /report`
- Imports: `app`, `datetime`, `fastapi`

### `backend\app\routes\risk.py`
- Functions: `assess_risk`
- Endpoints: `POST /risk`, `router.POST /risk`
- Imports: `app`, `fastapi`

### `backend\app\routes\similar.py`
- Functions: `find_similar_incidents`
- Endpoints: `POST /similar-incidents`, `router.POST /similar-incidents`
- Imports: `app`, `fastapi`

### `backend\app\rules\risk_rules.py`
- Functions: `get_risk_level`

### `backend\app\schemas\__init__.py`
- Classes: `IncidentInput`, `PriorityResult`, `RoadClosureResult`, `RiskInput`, `RiskResult`, `RecommendationInput`, `RecommendationResult`, `SimilarIncidentInput`, `SimilarIncident`, `SimilarIncidentResponse`, `Hotspot`, `HotspotResponse`, `DiversionInput`, `DiversionResponse`, `AnalyzeResponse`, `HealthResponse`, `SimplifiedIncidentInput`, `LocationInfo`, `InferredFields`, `SimplifiedAnalyzeResponse`, `LoginRequest`, `LoginResponse`, `FeedbackInput`, `FeedbackResponse`
- Imports: `pydantic`, `typing`

### `backend\app\services\diversion_service.py`
- Functions: `generate_diversion_map`
- Imports: `app`, `folium`

### `backend\app\services\hotspot_service.py`
- Functions: `get_hotspots`
- Imports: `app`, `numpy`

### `backend\app\services\location_service.py`
- Functions: `resolve_location_features`, `_get_mappls_token`, `search_nearby_police_station`, `resolve_full_location`
- Imports: `app`, `numpy`, `requests`

### `backend\app\services\priority_service.py`
- Functions: `predict_priority`
- Imports: `app`, `pandas`

### `backend\app\services\recommendation_service.py`
- Functions: `get_recommendation`
- Imports: `app`

### `backend\app\services\risk_service.py`
- Functions: `assess_risk`
- Imports: `app`

### `backend\app\services\road_closure_service.py`
- Functions: `predict_road_closure`
- Imports: `app`, `pandas`

### `backend\app\services\similarity_service.py`
- Functions: `_ensure_fitted`, `find_similar`
- Imports: `app`, `numpy`, `sklearn`

### `backend\app\utils\mappings.py`
- Functions: `get_label`

### `backend\tests\conftest.py`
- Functions: `setup_app`
- Imports: `app`, `pytest`

### `backend\tests\test_analyze.py`
- Functions: `test_analyze_returns_200`, `test_analyze_validation_error`, `test_analyze_out_of_range`
- Imports: `app`, `fastapi`, `pytest`

### `backend\tests\test_api.py`
- Functions: `test_root`, `test_health`, `test_hotspots_no_filter`, `test_hotspots_with_filter`, `test_recommendation`, `test_diversion`
- Imports: `app`, `fastapi`, `pytest`

### `backend\tests\test_report.py`
- Classes: `TestTimeParsing`, `TestEventTypeInference`, `TestLocationResolution`, `TestFullPipeline`, `TestValidation`, `TestOtherIncident`
- Functions: `test_valid_iso_format`, `test_invalid_time_format`, `test_time_with_date_only`, `test_minor_cause_maps_to_minor`, `test_major_cause_maps_to_major`, `test_corridor_is_resolved`, `test_police_station_is_resolved`, `test_response_has_all_fields`, `test_priority_has_label_and_confidence`, `test_road_closure_has_required_and_confidence`, `test_default_veh_type_is_car`, `test_custom_veh_type`, `test_missing_required_field`, `test_latitude_out_of_range`, `test_other_incident_description_saved`, `test_other_incident_no_description_defaults`
- Imports: `app`, `datetime`, `fastapi`, `pytest`

### `backend\tests\test_risk.py`
- Classes: `TestRiskService`, `TestRiskEndpoint`
- Functions: `test_high_priority_adds_points`, `test_road_closure_adds_points`, `test_peak_hour_adds_points`, `test_critical_threshold`, `test_low_risk`, `test_score_capped_at_100`, `test_risk_endpoint_200`, `test_risk_endpoint_validation`
- Imports: `app`, `fastapi`, `pytest`

### `backend\tests\test_similarity.py`
- Functions: `test_similar_incidents_returns_results`, `test_similar_incidents_custom_top_k`, `test_similar_incidents_validation`
- Imports: `app`, `fastapi`, `pytest`

## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `README.md`

## Test Files

- `backend\tests\__init__.py`
- `backend\tests\conftest.py`
- `backend\tests\test_analyze.py`
- `backend\tests\test_api.py`
- `backend\tests\test_report.py`
- `backend\tests\test_risk.py`
- `backend\tests\test_similarity.py`

## File Inventory

- `backend\app\__init__.py` | 20 bytes | `edd3961d7a8c`
- `backend\app\config.py` | 1552 bytes | `57a18d33ffbe`
- `backend\app\database.py` | 7581 bytes | `72429dd970f2`
- `backend\app\main.py` | 2574 bytes | `a544136b9a48`
- `backend\app\ml\__init__.py` | 1662 bytes | `26f5f73ae13f`
- `backend\app\routes\__init__.py` | 18 bytes | `28baff8e79da`
- `backend\app\routes\analyze.py` | 3444 bytes | `a145f074d94d`
- `backend\app\routes\diversion.py` | 829 bytes | `739846c015fe`
- `backend\app\routes\health.py` | 884 bytes | `0c64038a525a`
- `backend\app\routes\hotspots.py` | 1117 bytes | `99b70f0b6d59`
- `backend\app\routes\recommendation.py` | 680 bytes | `563eafb593ee`
- `backend\app\routes\report.py` | 7714 bytes | `81cd142377c7`
- `backend\app\routes\risk.py` | 490 bytes | `d009996c6a2a`
- `backend\app\routes\similar.py` | 728 bytes | `6992a7b2efad`
- `backend\app\rules\__init__.py` | 17 bytes | `9c4ae36652f6`
- `backend\app\rules\recommendation_rules.py` | 1137 bytes | `bece822de0ca`
- `backend\app\rules\risk_rules.py` | 1212 bytes | `ddf51ee866cb`
- `backend\app\schemas\__init__.py` | 10820 bytes | `fc1b176fcc65`
- `backend\app\services\__init__.py` | 20 bytes | `84e20e9a7165`
- `backend\app\services\diversion_service.py` | 3897 bytes | `4fd804792479`
- `backend\app\services\hotspot_service.py` | 2507 bytes | `8872555ff289`
- `backend\app\services\location_service.py` | 5318 bytes | `58e64d07358c`
- `backend\app\services\priority_service.py` | 896 bytes | `d234aa14a0d0`
- `backend\app\services\recommendation_service.py` | 1233 bytes | `9a40993c2b48`
- `backend\app\services\risk_service.py` | 967 bytes | `911f672b4a86`
- `backend\app\services\road_closure_service.py` | 833 bytes | `69ff4dac54e1`
- `backend\app\services\similarity_service.py` | 2471 bytes | `7123743e5bfc`
- `backend\app\utils\__init__.py` | 19 bytes | `443164b21869`
- `backend\app\utils\mappings.py` | 3929 bytes | `6ac788ca8b85`
- `backend\ares.db` | 20480 bytes | `df8bf336bf82`
- `backend\generated_maps\INC-20260619-144624.html` | 11265 bytes | `3b8fe6b255c5`
- `backend\generated_maps\INC-20260619-151825.html` | 11265 bytes | `c956725bb2b1`
- `backend\generated_maps\INC-20260619-154243.html` | 11267 bytes | `fe772213ce18`
- `backend\generated_maps\INC-20260619-154244.html` | 11267 bytes | `8ee316184916`
- `backend\generated_maps\INC-20260619-154256.html` | 11267 bytes | `aabbb87552f5`
- `backend\generated_maps\INC-20260619-154607.html` | 11263 bytes | `8cb83d16248f`
- `backend\jupyter_files\data_preprocess.ipynb` | 54394 bytes | `d8130ded89a0`
- `backend\jupyter_files\priority_model.ipynb` | 136276 bytes | `5d51ce796482`
- `backend\jupyter_files\road_closure_model.ipynb` | 131798 bytes | `49dbef88dac6`
- `backend\models\priority_model.pkl` | 30900809 bytes | `e4c4cf02b67e`
- `backend\models\road_closure_model.pkl` | 13183673 bytes | `5ab2bc005638`
- `backend\preprocessed_data\preprocessed_data.csv` | 374574 bytes | `66b7b5ccbe7a`
- `backend\requirements.txt` | 164 bytes | `9039bc2f3fe7`
- `backend\tests\__init__.py` | 17 bytes | `71f6a156ee15`
- `backend\tests\conftest.py` | 387 bytes | `575c64586d83`
- `backend\tests\test_analyze.py` | 2017 bytes | `f7c077625675`
- `backend\tests\test_api.py` | 1841 bytes | `601e6f1c5ac2`
- `backend\tests\test_report.py` | 9956 bytes | `f0d15edb57b5`
- `backend\tests\test_risk.py` | 2840 bytes | `2c21aeca7dd0`
- `backend\tests\test_similarity.py` | 1314 bytes | `2f913116ee36`
- `Data.csv` | 4547022 bytes | `11469a7450fd`
- `README.md` | 8652 bytes | `df4d85d8c980`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

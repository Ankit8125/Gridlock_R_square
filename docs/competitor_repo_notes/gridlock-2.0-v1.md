# gridlock-2.0-v1

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock-2.0-v1`
- Git remote: `https://github.com/lohithabandirala/gridlock-2.0.git`
- Git branch: `main`
- Git HEAD: `dbb70b9d91a04240c8ffb1ae85f749c7e84a0f0f`
- Fingerprint: `41ee91a01f5cac45535435c0050bd5901650e0447c79c2b4fa54c2e5fa76b454`
- Files indexed: `77`
- Indexed size: `14624654` bytes

## Stack Signals

- `Docker`
- `FastAPI`
- `Node/Express`
- `Streamlit`

## Traffic Problem Signals

- traffic: astram, bangalore, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, manpower, police, resource
- models: calibration, classifier, lightgbm, regressor, xgboost
- routing: none

## Manifests

- `Dockerfile`
- `Procfile`
- `requirements.txt`

## Python Dependencies

### `requirements.txt`
- `pandas>=2.3,<3`
- `numpy>=2.3,<3`
- `matplotlib>=3.10,<4`
- `scikit-learn>=1.8,<2`
- `lightgbm>=4.6,<5`
- `scipy>=1.17,<2`
- `networkx>=3.6,<4`
- `ortools>=9.15,<10`
- `streamlit>=1.58,<2`
- `folium>=0.20,<1`
- `joblib>=1.5,<2`
- `requests>=2.34,<3`
- `plotly>=6.8,<7`
- `fastapi>=0.125,<1`
- `uvicorn>=0.38,<1`
- `xgboost>=3.3,<4`
- `httpx>=0.28,<1          # required by FastAPI TestClient and the dashboard API client`
- `fpdf2>=2.8,<3           # used by make_project_report.py to render the PDF`
- `pytest>=8.0,<9          # test suite under tests/`

## README Headings

- `README.md`: # Predictive Incident & Response Platform - Bengaluru
- `README.md`: ## What this project does
- `README.md`: ## Quick start
- `README.md`: ## Project structure
- `README.md`: ## Day-by-day summary
- `README.md`: ## Outputs you should expect
- `README.md`: ## Technology stack
- `README.md`: ## Notes
- `README.md`: ## Deployment
- `README.md`: ## Requirements

## README Claims and Operational Notes

- `README.md`: # Predictive Incident & Response Platform - Bengaluru
- `README.md`: - an event input dashboard
- `README.md`: - XGBoost-based congestion prediction
- `README.md`: - heatmap and route visualisation
- `README.md`: - police deployment guidance
- `README.md`: - FastAPI prediction endpoints
- `README.md`: - SQLite logging for predictions and model metrics
- `README.md`: - trains prediction models for clearance time and severity
- `README.md`: - plans diversion routes
- `README.md`: - logs predicted-vs-actual outcomes into SQLite
- `README.md`: - exposes the results in a Streamlit dashboard
- `README.md`: python run_all.py
- `README.md`: streamlit run app/dashboard.py
- `README.md`: Smart City backend API:
- `README.md`: uvicorn backend.api:app --reload
- `README.md`: Run a single stage:
- `README.md`: python pipelines/run_day1.py
- `README.md`: python pipelines/run_day2.py
- `README.md`: python pipelines/run_day3.py
- `README.md`: python pipelines/run_day4.py
- `README.md`: python pipelines/run_day5.py
- `README.md`: data/processed/events_features.csv Day-1 cleaned + engineered dataset
- `README.md`: app/dashboard.py                  Streamlit dashboard
- `README.md`: outputs/models                    Trained models and road graph files
- `README.md`: run_all.py                        Orchestrates Day 1 -> Day 5
- `README.md`: | 1 | `data_loader`, `features`, `eda`, `weather` | cleaned data, weather join, engineered features, EDA report, figures |
- `README.md`: | 2 | `models`, `impact`, `anomaly` | clearance model, severity classifier, blackspots, corridor risk, junction forecast, planned-event score, surge alerts |
- `README.md`: | 4 | `simulate`, `app/dashboard` | time-stepped micro-sim, SUMO-ready bundle, dashboard |
- `README.md`: After `python run_all.py`, the project writes:
- `README.md`: - `outputs/models/*.joblib`
- `README.md`: - `outputs/models/road_graph.gml`
- `README.md`: - `TF-IDF` + dense embeddings for text features
- `README.md`: - `Streamlit` and `Folium` for the dashboard
- `README.md`: - The simulator uses a time-stepped queue model and also writes a SUMO-ready scenario bundle.
- `README.md`: - Weather features are joined from Open-Meteo archive data with a deterministic offline fallback.
- `README.md`: ## Deployment
- `README.md`: That makes it straightforward to deploy to Streamlit Cloud, Render, or Docker-based hosting.

## Data Assets

- `data\processed\events_features.csv`
- `data\raw\astram_events.csv`
- `data\sample\smart_city_events.csv`
- `outputs\reports\blackspots.csv`
- `outputs\reports\corridor_risk.csv`
- `outputs\reports\day2_metrics.json`
- `outputs\reports\day5_report_card.json`
- `outputs\reports\diversion_summary.csv`
- `outputs\reports\junction_time_forecast.csv`
- `outputs\reports\manpower_allocation.csv`
- `outputs\reports\planned_event_impact.csv`
- `outputs\reports\planned_event_impact_summary.json`
- `outputs\reports\smart_city_model_metrics.json`
- `outputs\reports\surge_alerts.csv`
- `outputs\reports\surge_summary.json`
- `outputs\reports\whatif_demo.json`
- `outputs\sumo\outer_ring_road_closure\scenario_manifest.json`
- `outputs\sumo\scenario_manifest.json`

## Model and Artifact Assets

- `outputs\models\clearance_regressor.joblib`
- `outputs\models\clearance_regressor_learned.joblib`
- `outputs\models\priority_classifier.joblib`
- `outputs\models\smart_city_xgb_pipeline.joblib`
- `outputs\reports\smart_city_model_metrics.json`

## Notebooks

- None detected

## API Endpoints

- `GET /health`
- `POST /predict`
- `POST /train`
- `app.GET /health`
- `app.POST /predict`
- `app.POST /train`

## Python Source Signals

### `app\dashboard.py`
- Functions: `inject_css`, `metric_card`, `load_metrics`, `bootstrap`, `_center_for`, `_folium_html`, `render_heatmap`, `render_diversion_map`, `render_deployment_map`, `render_ai_panel`, `apply_scenario`, `prediction_confidence`, `gauge_figure`, `render_city_overview`, `city_kpis`, `render_alert_banner`, `main`
- Imports: `__future__`, `datetime`, `folium`, `json`, `pandas`, `pathlib`, `plotly`, `src`, `streamlit`, `sys`

### `backend\api.py`
- Classes: `PredictRequest`
- Functions: `lifespan`, `health`, `train_model`, `predict`
- Endpoints: `GET /health`, `POST /train`, `POST /predict`, `app.GET /health`, `app.POST /train`, `app.POST /predict`
- Imports: `__future__`, `contextlib`, `fastapi`, `pydantic`, `src`

### `make_project_report.py`
- Classes: `ReportPDF`
- Functions: `_read_json`, `h1`, `h2`, `para`, `bullet`, `table`, `callout`, `header`, `footer`
- Imports: `__future__`, `fpdf`, `json`, `pathlib`

### `pipelines\run_day1.py`
- Functions: `main`
- Imports: `_bootstrap`, `src`, `sys`

### `pipelines\run_day2.py`
- Functions: `main`
- Imports: `_bootstrap`, `pandas`, `src`, `sys`

### `pipelines\run_day3.py`
- Functions: `main`
- Imports: `_bootstrap`, `pandas`, `src`, `sys`

### `pipelines\run_day4.py`
- Functions: `main`
- Imports: `_bootstrap`, `src`, `sys`

### `pipelines\run_day5.py`
- Functions: `main`
- Imports: `_bootstrap`, `pandas`, `src`, `sys`

### `run_all.py`
- Functions: `main`
- Imports: `os`, `pathlib`, `pipelines`, `sys`

### `src\anomaly.py`
- Functions: `_robust_zscore`, `detect_surge`
- Imports: `__future__`, `json`, `numpy`, `pandas`

### `src\command_center\client.py`
- Functions: `_as_payload`, `using_api`, `get_prediction`
- Imports: `__future__`, `dataclasses`, `os`, `requests`, `service`

### `src\command_center\db.py`
- Functions: `get_connection`, `init_db`, `log_prediction`, `log_metrics`, `recent_predictions`
- Imports: `__future__`, `config`, `datetime`, `json`, `sqlite3`

### `src\command_center\ml.py`
- Functions: `_model`, `_pipeline`, `build_dataset`, `train`, `load_model`, `predict_one`
- Imports: `__future__`, `config`, `db`, `joblib`, `json`, `numpy`, `os`, `pandas`, `sample_data`, `sklearn`, `xgboost`

### `src\command_center\sample_data.py`
- Classes: `RoadPoint`
- Functions: `_event_weights`, `_weather_weights`, `_hour_weights`, `_location_row`, `_load_report_roads`, `historical_traffic_profile`, `build_training_frame`, `build_road_snapshot`, `build_trend_frame`
- Imports: `__future__`, `config`, `dataclasses`, `math`, `numpy`, `pandas`

### `src\command_center\service.py`
- Classes: `EventRequest`
- Functions: `_risk_level`, `ensure_model`, `_parse_hour`, `_prediction_input`, `_resource_plan`, `_route_plan`, `_ai_summary`, `predict_event`, `demo_request`, `dashboard_snapshot`
- Imports: `__future__`, `config`, `dataclasses`, `datetime`, `db`, `math`, `ml`, `numpy`, `pandas`, `sample_data`

### `src\data_loader.py`
- Functions: `load_raw`, `_normalise_na`, `clean`, `load_clean`
- Imports: `numpy`, `pandas`

### `src\diversion.py`
- Functions: `_haversine`, `_nearest_node`, `build_graph`, `plan_diversion`, `run`
- Imports: `math`, `networkx`, `numpy`, `osmnx`, `pandas`

### `src\eda.py`
- Functions: `_save_bar`, `make_figures`, `make_report`
- Imports: `matplotlib`, `pandas`

### `src\features.py`
- Functions: `add_time_features`, `add_weather_features`, `add_clearance_time`, `add_frequency_features`, `add_text_keyword_flags`, `add_planning_placeholders`, `build_features`, `slot`
- Imports: `numpy`, `pandas`

### `src\impact.py`
- Functions: `_scale`, `score_planned_events`
- Imports: `__future__`, `json`, `numpy`, `pandas`, `pathlib`

### `src\learn.py`
- Functions: `_init_db`, `log_and_score`
- Imports: `joblib`, `json`, `numpy`, `pandas`, `sklearn`, `sqlite3`, `warnings`

### `src\models.py`
- Classes: `TextEmbeddingTransformer`
- Functions: `_fuse_text`, `_build_preprocessor`, `_prep_frame`, `_reg`, `_clf`, `train_clearance`, `train_priority`, `mine_blackspots`, `build_risk_table`, `build_junction_time_forecast`, `train_all`, `predict_clearance_minutes`, `__init__`, `_to_text`, `fit`, `transform`
- Imports: `joblib`, `json`, `lightgbm`, `numpy`, `pandas`, `sklearn`, `warnings`

### `src\optimize.py`
- Functions: `_greedy`, `_cpsat`, `allocate`, `run`
- Imports: `heapq`, `ortools`, `pandas`

### `src\simulate.py`
- Classes: `Segment`
- Functions: `bpr_time`, `what_if`, `micro_simulate`, `prepare_sumo_case`, `demo`
- Imports: `dataclasses`, `json`, `math`, `pathlib`, `shutil`

### `src\weather.py`
- Functions: `_cache_path`, `_fallback_weather`, `fetch_daily_weather`, `join_weather`
- Imports: `__future__`, `datetime`, `json`, `numpy`, `pandas`, `pathlib`, `requests`, `typing`

### `tests\test_api_and_db.py`
- Functions: `client`, `test_health`, `test_predict_endpoint`, `test_predict_validation_rejects_negative_crowd`, `test_db_logging_roundtrip`
- Imports: `backend`, `fastapi`, `pathlib`, `pytest`, `src`, `sys`

### `tests\test_service.py`
- Functions: `test_risk_bands_monotonic`, `test_demo_prediction_is_high_and_in_range`, `test_prediction_has_required_fields`, `test_resources_scale_with_crowd`, `test_dict_input_accepted`
- Imports: `pathlib`, `pytest`, `src`, `sys`

## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `outputs\reports\day1_eda_report.md`
- `outputs\sumo\outer_ring_road_closure\README.md`
- `Project-Report.pdf`
- `README.md`

## Test Files

- `tests\test_api_and_db.py`
- `tests\test_service.py`

## File Inventory

- `.gitignore` | 167 bytes | `537d325f6e9a`
- `.streamlit\config.toml` | 217 bytes | `a2c85ccd926d`
- `app\dashboard.py` | 33451 bytes | `5ffe8a01671e`
- `backend\__init__.py` | 64 bytes | `c619e9d7981c`
- `backend\api.py` | 1185 bytes | `0cb0f13d08f8`
- `data\processed\events_features.csv` | 5067900 bytes | `ddb9e47155d3`
- `data\raw\astram_events.csv` | 4547022 bytes | `11469a7450fd`
- `data\sample\smart_city_events.csv` | 396 bytes | `d0bc08497e20`
- `Dockerfile` | 250 bytes | `09901198ab48`
- `make_project_report.py` | 10008 bytes | `c70e2b321845`
- `outputs\figures\cause.png` | 27567 bytes | `b0574694307f`
- `outputs\figures\clearance.png` | 18945 bytes | `01dadc0651f6`
- `outputs\figures\corridor.png` | 29179 bytes | `6cf77ff4347f`
- `outputs\figures\hour.png` | 18416 bytes | `13fae1accdf3`
- `outputs\figures\zone.png` | 25313 bytes | `60e1c8d1dc3f`
- `outputs\models\clearance_regressor.joblib` | 1048727 bytes | `5c8b8df893c7`
- `outputs\models\clearance_regressor_learned.joblib` | 1053934 bytes | `cc5e74598151`
- `outputs\models\priority_classifier.joblib` | 1515478 bytes | `c8a798456ca0`
- `outputs\models\road_graph.gml` | 50502 bytes | `d1d9057bad6a`
- `outputs\models\smart_city_xgb_pipeline.joblib` | 906440 bytes | `5d1e7fcff1bb`
- `outputs\reports\blackspots.csv` | 14120 bytes | `ad53c5fe2d6a`
- `outputs\reports\corridor_risk.csv` | 2697 bytes | `9dbf0d317c99`
- `outputs\reports\day1_eda_report.md` | 1130 bytes | `bbd71fb998d5`
- `outputs\reports\day2_metrics.json` | 675 bytes | `3cc85dbdf830`
- `outputs\reports\day5_report_card.json` | 124 bytes | `cba5bd518602`
- `outputs\reports\diversion_summary.csv` | 109 bytes | `c6b852847fc1`
- `outputs\reports\junction_time_forecast.csv` | 35900 bytes | `57e82be40df6`
- `outputs\reports\manpower_allocation.csv` | 1642 bytes | `f10d5e5c5a1b`
- `outputs\reports\planned_event_impact.csv` | 51555 bytes | `bb9e20cce9bc`
- `outputs\reports\planned_event_impact_summary.json` | 133 bytes | `ab78fcbb3f03`
- `outputs\reports\smart_city_model_metrics.json` | 1444 bytes | `7dccde4b6e20`
- `outputs\reports\surge_alerts.csv` | 43630 bytes | `086940c3e5f9`
- `outputs\reports\surge_summary.json` | 91 bytes | `3ea321ead1f5`
- `outputs\reports\whatif_demo.json` | 255 bytes | `866025783929`
- `outputs\sumo\outer_ring_road_closure\README.md` | 486 bytes | `40edfc3c6e2c`
- `outputs\sumo\outer_ring_road_closure\scenario.add.xml` | 122 bytes | `f8eba09417e9`
- `outputs\sumo\outer_ring_road_closure\scenario.edg.xml` | 273 bytes | `af455d0d6bb4`
- `outputs\sumo\outer_ring_road_closure\scenario.net.xml` | 160 bytes | `8c5ae84f3849`
- `outputs\sumo\outer_ring_road_closure\scenario.nod.xml` | 183 bytes | `b9e98f24c42d`
- `outputs\sumo\outer_ring_road_closure\scenario.rou.xml` | 418 bytes | `a53530dab059`
- `outputs\sumo\outer_ring_road_closure\scenario.sumocfg` | 301 bytes | `6173ebf8bd28`
- `outputs\sumo\outer_ring_road_closure\scenario_manifest.json` | 433 bytes | `e93c03c45323`
- `outputs\sumo\scenario_manifest.json` | 433 bytes | `e93c03c45323`
- `pipelines\_bootstrap.py` | 378 bytes | `bb21497c0cbf`
- `pipelines\run_day1.py` | 1677 bytes | `f9e3c5b51efb`
- `pipelines\run_day2.py` | 966 bytes | `5a68f4005884`
- `pipelines\run_day3.py` | 916 bytes | `dc1dad4c0941`
- `pipelines\run_day4.py` | 610 bytes | `6fc15242612f`
- `pipelines\run_day5.py` | 697 bytes | `cfed8f95de24`
- `Procfile` | 82 bytes | `c4bf16cbbcdb`
- `Project-Report.pdf` | 7254 bytes | `965dd4ffc9d0`
- `README.md` | 4818 bytes | `70f5ce7d8b0c`
- `requirements.txt` | 622 bytes | `1356f24f0353`
- `run_all.py` | 1176 bytes | `d9959cc28dd2`
- `src\__init__.py` | 0 bytes | `e3b0c44298fc`
- `src\anomaly.py` | 2889 bytes | `7da579c31361`
- `src\command_center\__init__.py` | 126 bytes | `a00442413ffd`
- `src\command_center\client.py` | 1577 bytes | `ce16271e690a`
- `src\command_center\config.py` | 3948 bytes | `2a23b8b2b3f2`
- `src\command_center\db.py` | 2675 bytes | `1a9ff6c44ff5`
- `src\command_center\ml.py` | 5351 bytes | `bb7d28e0c870`
- `src\command_center\sample_data.py` | 6949 bytes | `3d483d37044e`
- `src\command_center\service.py` | 8229 bytes | `348f2277bc8f`
- `src\config.py` | 2253 bytes | `736925908914`
- `src\data_loader.py` | 2351 bytes | `a9eab8495a08`
- `src\diversion.py` | 5660 bytes | `16e69a826671`
- `src\eda.py` | 4028 bytes | `16d2a7665d37`
- `src\features.py` | 3878 bytes | `4152a608adcd`
- `src\impact.py` | 4407 bytes | `796f5429a83e`
- `src\learn.py` | 3024 bytes | `91eaf80c2d55`
- `src\models.py` | 13126 bytes | `fd3a57ce9fcd`
- `src\optimize.py` | 3646 bytes | `64ff501dea60`
- `src\simulate.py` | 10656 bytes | `5f84afbdf481`
- `src\weather.py` | 4831 bytes | `dbdcbfa647c7`
- `tests\__init__.py` | 0 bytes | `e3b0c44298fc`
- `tests\test_api_and_db.py` | 1987 bytes | `aa1412da8a07`
- `tests\test_service.py` | 2392 bytes | `0faa86e02f2d`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

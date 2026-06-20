# gridlock

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock`
- Git remote: `https://github.com/agam1092005/gridlock.git`
- Git branch: `main`
- Git HEAD: `85b5c9ba538fd789c537d02e0818e3ad1a4740fa`
- Fingerprint: `26d8e8f092442f72ff8c50507b99dfb824ea1e0fa38ce9140fb705fe3c061622`
- Files indexed: `102`
- Indexed size: `654967` bytes

## Stack Signals

- `Docker`
- `Docker Compose`
- `FastAPI`
- `Node/Express`
- `Streamlit`

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, constable, diversion, manpower, police, resource
- models: calibration, gru, lightgbm, nearest neighbor
- routing: osrm

## Manifests

- `docker-compose.yml`
- `pyproject.toml`

## README Headings

- `README.md`: # Gridlock 2.0 🚦
- `README.md`: ## Getting Started
- `README.md`: ## Key Capabilities
- `docker\README.md`: # Docker Directory - Gridlock 2.0 Containerization
- `docker\README.md`: ## Files Overview
- `docker\README.md`: ### Dockerfiles (2 files)
- `docker\README.md`: #### `Dockerfile.api`
- `docker\README.md`: #### `Dockerfile.dashboard`
- `docker\README.md`: ### Startup Scripts (3 files)
- `docker\README.md`: #### `docker-entrypoint.sh`
- `docker\README.md`: #### `startup.py`
- `docker\README.md`: #### `init-db.sh`
- `docker\README.md`: ### Configuration Files (2 files)
- `docker\README.md`: #### `prometheus.yml`
- `docker\README.md`: #### `grafana-datasources.yml`
- `docker\README.md`: ## Build Instructions
- `docker\README.md`: ### Build Individual Images
- `docker\README.md`: # Build API image
- `docker\README.md`: # Build Dashboard image
- `docker\README.md`: ### Build with Docker Compose
- `docker\README.md`: # Build all images
- `docker\README.md`: # Build specific service
- `docker\README.md`: # Force rebuild (no cache)
- `docker\README.md`: ## Directory Structure
- `docker\README.md`: ## Service Startup Flow
- `docker\README.md`: ## Environment Variables
- `docker\README.md`: ### Startup Configuration
- `docker\README.md`: ### Database Configuration
- `docker\README.md`: ### Cache Configuration
- `docker\README.md`: ### API Configuration
- `docker\README.md`: ### ML Models Configuration
- `docker\README.md`: ## Health Checks
- `docker\README.md`: ## Logging
- `docker\README.md`: ## Docker Compose Integration
- `docker\README.md`: ## Volume Mounts
- `docker\README.md`: ### Data Persistence
- `docker\README.md`: ### Source Code (Development)
- `docker\README.md`: ## Troubleshooting
- `docker\README.md`: ### Container won't start
- `docker\README.md`: # View detailed logs
- `docker\README.md`: # Check environment variables
- `docker\README.md`: # Rebuild image
- `docker\README.md`: ### Health check failing
- `docker\README.md`: # Check service health directly
- `docker\README.md`: # Inspect container
- `docker\README.md`: # Run healthcheck manually
- `docker\README.md`: ### Network issues
- `docker\README.md`: # Check network connectivity
- `docker\README.md`: # Test DNS resolution
- `docker\README.md`: ## Production Deployment
- `docker\README.md`: ### Pre-deployment Checklist
- `docker\README.md`: ### Resource Requirements
- `docker\README.md`: ## Support & Documentation
- `docker\README.md`: ## License & Attribution

## README Claims and Operational Notes

- `README.md`: An intelligent traffic incident management system capable of processing real-time telemetry to predict incident severities, durations, and secondary congestion ripples using a high-performance ensemble of LightGBM, Bi...
- `README.md`: 2. **Start the API:**
- `README.md`: poetry run uvicorn src.api.main:app --reload
- `README.md`: 3. **Start the Dashboard:**
- `README.md`: poetry run streamlit run src/dashboard/app.py
- `README.md`: - **Sub-150ms Predictions:** Achieved via an asynchronous `PredictionOrchestrator` that intelligently routes to the cache or inference engines.
- `README.md`: - **WebSocket Streaming:** A native React/Streamlit dashboard that automatically receives sub-50ms push updates for active incidents.
- `README.md`: - **MLOps Integrated:** Ships with built-in versioning (`ModelRegistry`), training orchestration, and a `ProductionModelMonitor` to track data drift.
- `README.md`: - **Production Telemetry:** Emits structured JSON logs and dynamic `/metrics` for Prometheus scraping.
- `docker\README.md`: This directory contains all Docker-related files for containerizing and deploying Gridlock 2.0.
- `docker\README.md`: #### `Dockerfile.api`
- `docker\README.md`: - **Purpose:** FastAPI backend service
- `docker\README.md`: - **Ports:** 8000 (API), 9090 (Prometheus metrics)
- `docker\README.md`: - **Startup:** Uses `/app/docker/docker-entrypoint.sh` with SERVICE_NAME=api
- `docker\README.md`: #### `Dockerfile.dashboard`
- `docker\README.md`: - **Purpose:** Streamlit real-time dashboard
- `docker\README.md`: - **Startup:** Uses `/app/docker/docker-entrypoint.sh` with SERVICE_NAME=dashboard
- `docker\README.md`: - Route to correct service startup (api, dashboard, migration)
- `docker\README.md`: - Create models directory
- `docker\README.md`: - **Purpose:** Prometheus metrics scraping configuration
- `docker\README.md`: - Gridlock API metrics (/metrics endpoint)
- `docker\README.md`: - PostgreSQL metrics (if exporter deployed)
- `docker\README.md`: - Redis metrics (if exporter deployed)
- `docker\README.md`: - **Intervals:** API: 5s, Others: 15s
- `docker\README.md`: # Build API image
- `docker\README.md`: docker build -f docker/Dockerfile.api -t gridlock:api:latest .
- `docker\README.md`: # Build Dashboard image
- `docker\README.md`: docker build -f docker/Dockerfile.dashboard -t gridlock:dashboard:latest .
- `docker\README.md`: docker-compose build api
- `docker\README.md`: docker-compose build dashboard
- `docker\README.md`: ├── Dockerfile.api                 # FastAPI backend container
- `docker\README.md`: ├── Dockerfile.dashboard           # Streamlit dashboard container
- `docker\README.md`: db-migrate runs (one-time service)
- `docker\README.md`: API service starts (SERVICE_NAME=api)
- `docker\README.md`: ├─ Loads ML models
- `docker\README.md`: Dashboard service starts (SERVICE_NAME=dashboard)
- `docker\README.md`: ├─ Waits for API healthy
- `docker\README.md`: SERVICE_NAME=api|dashboard|migration  # Determines startup behavior
- `docker\README.md`: ### API Configuration
- `docker\README.md`: API_HOST=0.0.0.0
- `docker\README.md`: API_PORT=8000
- `docker\README.md`: API_WORKERS=4
- `docker\README.md`: ### ML Models Configuration
- `docker\README.md`: MODEL_ARTIFACTS_DIR=./models/artifacts
- `docker\README.md`: PREDICTION_CACHE_TTL_SECONDS=604800
- `docker\README.md`: api:            # FastAPI backend
- `docker\README.md`: dashboard:      # Streamlit frontend
- `docker\README.md`: grafana_data: data/grafana/          # Dashboards
- `docker\README.md`: - ./models:/app/models
- `docker\README.md`: # Run healthcheck manually
- `docker\README.md`: ## Production Deployment
- `docker\README.md`: ### Pre-deployment Checklist
- `docker\README.md`: | API | 2 cores | 2GB | 1GB |
- `docker\README.md`: | Dashboard | 1 core | 1GB | 500MB |
- `docker\README.md`: Gridlock 2.0 - Real-time Incident Severity and Congestion Prediction System

## Data Assets

- None detected

## Model and Artifact Assets

- None detected

## Notebooks

- None detected

## API Endpoints

- `GET /audit/logs`
- `GET /health`
- `GET /metrics`
- `GET /{incident_id}`
- `POST /`
- `POST /{incident_id}/feedback`
- `router.GET /audit/logs`
- `router.GET /health`
- `router.GET /metrics`
- `router.GET /{incident_id}`
- `router.POST /`
- `router.POST /{incident_id}/feedback`

## Python Source Signals

### `config\redis_init.py`
- Classes: `RedisInitializer`
- Functions: `main`, `__init__`, `connect`, `initialize`, `_set_configuration`, `_setup_cache_structures`, `_setup_queues`, `_setup_monitoring_keys`, `print_summary`
- Imports: `json`, `logging`, `os`, `redis`, `sys`, `typing`

### `docker\startup.py`
- Classes: `EnvironmentValidator`, `HealthChecker`, `InitializationTasks`
- Functions: `setup_logging`, `main`, `__init__`, `validate`, `_validate_database_url`, `_validate_ports`, `_mask_sensitive`, `__init__`, `check_database`, `check_redis`, `check_filesystem`, `__init__`, `init_database_migrations`, `init_cache_setup`, `init_models_directory`
- Imports: `asyncio`, `asyncpg`, `datetime`, `json`, `logging`, `os`, `pathlib`, `psycopg2`, `redis`, `sys`, `time`, `typing`

### `src\api\main.py`
- Functions: `lifespan`, `gridlock_exception_handler`, `validation_error_handler`, `validation_exception_handler`
- Imports: `asyncio`, `config`, `contextlib`, `fastapi`, `logging`, `middleware`, `monitoring`, `orchestration`, `queue_worker`, `routers`, `utils`, `uvicorn`

### `src\api\middleware.py`
- Classes: `TimingAndLoggingMiddleware`
- Functions: `verify_api_key`, `__init__`, `dispatch`
- Imports: `collections`, `datetime`, `fastapi`, `logging`, `starlette`, `time`, `uuid`

### `src\api\queue_worker.py`
- Classes: `BackgroundWorker`
- Functions: `__init__`, `process_incident`, `process_and_broadcast`, `run`, `stop`
- Imports: `asyncio`, `data_pipeline`, `datetime`, `logging`, `models`, `numpy`, `orchestration`, `pandas`, `time`, `typing`, `websocket`

### `src\api\routers\incidents.py`
- Functions: `get_api_key`, `submit_incident`, `submit_feedback`
- Endpoints: `POST /`, `POST /{incident_id}/feedback`, `router.POST /`, `router.POST /{incident_id}/feedback`
- Imports: `csv`, `datetime`, `fastapi`, `logging`, `middleware`, `os`, `schemas`, `uuid`

### `src\api\routers\predictions.py`
- Functions: `get_prediction`
- Endpoints: `GET /{incident_id}`, `router.GET /{incident_id}`
- Imports: `fastapi`, `incidents`, `logging`, `orchestration`, `schemas`

### `src\api\routers\system.py`
- Functions: `health_check`, `get_metrics`, `get_audit_logs`
- Endpoints: `GET /health`, `GET /metrics`, `GET /audit/logs`, `router.GET /health`, `router.GET /metrics`, `router.GET /audit/logs`
- Imports: `fastapi`, `logging`, `monitoring`, `os`, `schemas`, `time`

### `src\api\routers\ws.py`
- Functions: `websocket_endpoint`
- Imports: `fastapi`, `logging`, `websocket`

### `src\api\schemas.py`
- Classes: `LocationInput`, `FeedbackInput`, `IncidentInput`, `IncidentResponse`, `ComponentLatencies`, `PredictionResponse`, `HealthResponse`
- Imports: `datetime`, `pydantic`, `typing`

### `src\api\websocket.py`
- Classes: `WebSocketManager`
- Functions: `__init__`, `connect`, `disconnect`, `disconnect_all`, `broadcast`
- Imports: `asyncio`, `fastapi`, `json`, `logging`, `typing`

### `src\config\settings.py`
- Classes: `APISettings`, `ModelSettings`, `MonitoringSettings`, `AppSettings`
- Functions: `load_config`
- Imports: `os`, `pydantic_settings`, `yaml`

### `src\dashboard\app.py`
- Functions: `get_incident_store`, `get_latency_store`, `format_duration`, `get_limit_store`, `get_received_store`, `get_seen_store`, `websocket_thread`, `start_ws`, `listen_ws`, `format_incident_label`, `clear_incidents`
- Imports: `asyncio`, `datetime`, `json`, `os`, `pandas`, `pydeck`, `requests`, `st_theme`, `streamlit`, `streamlit_autorefresh`, `threading`, `time`, `websockets`

### `src\data_pipeline\audit.py`
- Classes: `AuditLogger`, `AuditContext`
- Functions: `get_audit_logger`, `__init__`, `log_operation`, `log_validation_batch`, `log_embedding_operation`, `log_imputation_operation`, `log_duplicate_detection`, `get_recent_entries`, `get_entries_by_operation`, `get_entries_by_incident`, `get_entries_by_status`, `get_operation_stats`, `get_validation_stats`, `get_summary_report`, `export_entries`, `clear`, `__init__`, `__enter__`, `__exit__`, `add_detail`, `set_details`
- Imports: `collections`, `datetime`, `json`, `src`, `typing`

### `src\data_pipeline\embedding_engine.py`
- Classes: `EmbeddingEngine`, `EmbeddingBatcher`, `EmbeddingCache`
- Functions: `__init__`, `_load_model_with_retry`, `_mean_pool`, `embed`, `_l2_normalize`, `compute_text_hash`, `__init__`, `add_and_wait`, `_scheduled_flush`, `flush`, `close`, `__init__`, `get`, `set`, `hit_rate`
- Imports: `asyncio`, `hashlib`, `numpy`, `os`, `redis`, `time`, `torch`, `transformers`, `typing`, `utils`

### `src\data_pipeline\feature_encoder.py`
- Classes: `FeatureEncoder`, `FeatureStore`
- Functions: `__init__`, `fit`, `_impute_missing_values`, `_generate_derived_features`, `_extract_day_of_week`, `encode`, `encode_batch`, `get_feature_statistics`, `__init__`, `add_feature_vector`, `get_feature_vector`, `has_feature_vector`, `get_all_incident_ids`, `get_statistics`, `clear`, `delete_feature_vector`
- Imports: `datetime`, `logging`, `numpy`, `pandas`, `sklearn`, `typing`

### `src\data_pipeline\models.py`
- Classes: `IncidentType`, `LocationData`, `WeatherData`, `IncidentInput`, `ValidationError`, `ValidationResult`, `AuditLogEntry`, `ValidationStats`
- Functions: `validate_timestamp_not_in_future`, `validate_end_datetime_after_start`, `validate_incident_consistency`
- Imports: `datetime`, `enum`, `pydantic`, `typing`, `uuid`

### `src\data_pipeline\news_fetcher.py`
- Classes: `NewsFetcher`
- Functions: `_build_query`, `__init__`, `fetch_for_incident`, `check_for_active_keywords`, `get_latest_news`, `_fetch`
- Imports: `datetime`, `email`, `logging`, `requests`, `time`, `typing`, `urllib`, `xml`

### `src\data_pipeline\survival_analysis.py`
- Classes: `SurvivalAnalyzer`
- Functions: `__init__`, `fit_models`, `impute_end_datetime`, `_has_cox_features`, `_get_cox_adjustment`, `_cache_models`, `load_models_from_cache`, `clear_cache`, `get_model_status`
- Imports: `datetime`, `json`, `lifelines`, `logging`, `numpy`, `pandas`, `pickle`, `redis`, `scipy`, `time`, `typing`

### `src\data_pipeline\validation_errors.py`
- Classes: `ErrorAggregator`, `ValidationErrorContext`, `ValidationErrorFormatter`
- Functions: `__init__`, `add_error`, `add_errors`, `add_pydantic_errors`, `has_errors`, `get_errors`, `get_errors_by_field`, `get_error_codes`, `get_field_names_with_errors`, `get_detailed_message`, `get_summary_message`, `clear`, `to_dict`, `__init__`, `__enter__`, `__exit__`, `has_errors`, `get_errors`, `get_summary`, `format_for_api`, `format_for_logging`, `format_for_console`
- Imports: `pydantic`, `src`, `typing`

### `src\data_pipeline\validators.py`
- Classes: `DuplicateDetector`, `IncidentValidator`
- Functions: `__init__`, `add_incident`, `find_duplicates`, `clear`, `__init__`, `validate_single`, `validate_batch`, `_validate_location_service_area`, `_validate_description_quality`, `validate_with_context`, `get_duplicate_detector_stats`, `clear_duplicate_history`
- Imports: `datetime`, `pydantic`, `src`, `time`, `typing`, `uuid`

### `src\models\model_monitor.py`
- Classes: `ProductionModelMonitor`
- Functions: `__init__`, `log_actual_outcome`, `_evaluate_drift`
- Imports: `collections`, `logging`

### `src\models\model_registry.py`
- Classes: `ModelRegistry`
- Functions: `__init__`, `_ensure_registry_exists`, `_load`, `_save`, `register_model`, `set_active_model`, `get_active_model`, `rollback_model`
- Imports: `datetime`, `json`, `logging`, `os`, `uuid`

### `src\models\model_trainer.py`
- Classes: `ModelTrainer`
- Functions: `__init__`, `submit_training_job`
- Imports: `datetime`, `json`, `logging`, `model_registry`, `os`

### `src\models\module_a\bigru_model.py`
- Classes: `BiGRUModel`, `SequenceEncoder`
- Functions: `train_bigru`, `save_model`, `load_model`, `__init__`, `forward`, `__init__`, `build_sequence`
- Imports: `logging`, `os`, `torch`

### `src\models\module_a\dataset.py`
- Classes: `AstramDataset`
- Functions: `__init__`, `load_data`, `preprocess`, `create_splits`
- Imports: `json`, `logging`, `numpy`, `os`, `pandas`, `pickle`, `sklearn`, `src`

### `src\models\module_a\ensemble.py`
- Classes: `ModuleAEnsemble`
- Functions: `__init__`, `calibrate_on_validation`, `load_models`, `predict`
- Imports: `bigru_model`, `json`, `lightgbm_models`, `logging`, `numpy`, `os`, `sklearn`, `torch`

### `src\models\module_a\inference.py`
- Classes: `ModuleAPredictor`
- Functions: `__init__`, `predict`
- Imports: `ensemble`, `logging`, `numpy`, `time`, `torch`

### `src\models\module_a\lightgbm_models.py`
- Classes: `LightGBMSeverityModel`, `LightGBMDurationModel`
- Functions: `__init__`, `train`, `predict`, `save`, `load`, `__init__`, `train`, `predict`, `save`, `load`
- Imports: `json`, `lightgbm`, `logging`, `numpy`, `os`, `pickle`, `sklearn`

### `src\models\module_b\dataset.py`
- Classes: `STGCNDataset`
- Functions: `prepare_dataloaders`, `__init__`, `__len__`, `__getitem__`
- Imports: `logging`, `numpy`, `torch`

### `src\models\module_b\graph_loader.py`
- Classes: `GraphLoader`
- Functions: `__init__`, `build_organic_graph`, `load_osm_graph`, `get_graph_data`
- Imports: `logging`, `numpy`, `pandas`, `scipy`, `torch`, `torch_geometric`

### `src\models\module_b\graph_maintainer.py`
- Classes: `GraphMaintainer`
- Functions: `__init__`, `perform_daily_update`, `perform_weekly_retraining`
- Imports: `dataset`, `graph_loader`, `logging`, `stgcn_model`, `time`, `trainer`

### `src\models\module_b\inference.py`
- Classes: `ModuleBPredictor`
- Functions: `__init__`, `generate_heatmap_geojson`, `predict`
- Imports: `graph_loader`, `logging`, `os`, `stgcn_model`, `time`, `torch`

### `src\models\module_b\stgcn_model.py`
- Classes: `STGCNModel`
- Functions: `__init__`, `forward`
- Imports: `logging`, `torch`, `torch_geometric`

### `src\models\module_b\trainer.py`
- Classes: `STGCNTrainer`
- Functions: `__init__`, `inject_incident_impact`, `train_epoch`, `validate`, `save`
- Imports: `dataset`, `graph_loader`, `logging`, `os`, `stgcn_model`, `torch`

## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `API.md`
- `ARCHITECTURE.md`
- `DEVELOPER.md`
- `docker\README.md`
- `README.md`
- `SETUP.md`

## Test Files

- `tests\conftest.py`
- `tests\data_pipeline\test_feature_encoder.py`
- `tests\data_pipeline\test_survival_analysis.py`
- `tests\data_pipeline\test_validation.py`
- `tests\test_circuit_breaker.py`
- `tests\test_config_loader.py`
- `tests\test_data_pipeline_integration.py`
- `tests\test_embedding_engine.py`
- `tests\test_embedding_engine_properties.py`
- `tests\test_errors.py`
- `tests\test_orchestrator_integration.py`
- `tests\test_retry.py`
- `tests\test_survival_orchestrator.py`

## File Inventory

- `.env.example` | 2584 bytes | `ba2e5c7cc817`
- `.github\workflows\ci.yml` | 689 bytes | `1e42a016f8c7`
- `.gitignore` | 1058 bytes | `629f5592327e`
- `API.md` | 1175 bytes | `b3104bbb0567`
- `ARCHITECTURE.md` | 1268 bytes | `c648a6fb83e8`
- `config\config.yaml` | 3046 bytes | `2070872346b4`
- `config\redis_init.py` | 12504 bytes | `8197b0e3677b`
- `config\schema.sql` | 22988 bytes | `56ba95ac1ee9`
- `DEVELOPER.md` | 1183 bytes | `746d9d192a4b`
- `docker-compose.yml` | 11897 bytes | `57132ecdf1b7`
- `docker\docker-entrypoint.sh` | 9261 bytes | `862103a61269`
- `docker\Dockerfile.api` | 1266 bytes | `2d58122e6b6c`
- `docker\Dockerfile.dashboard` | 1467 bytes | `5f7920f5e487`
- `docker\Dockerfile.postgres` | 176 bytes | `e52b428eeb84`
- `docker\grafana-dashboards.yml` | 231 bytes | `7101adf69913`
- `docker\grafana-datasources.yml` | 848 bytes | `2db9b7e1d73e`
- `docker\init-db.sh` | 2532 bytes | `28f6c149d4dc`
- `docker\prometheus.yml` | 1440 bytes | `fe970d00a988`
- `docker\README.md` | 9061 bytes | `8fa09c439205`
- `docker\startup.py` | 16228 bytes | `6b2750904a45`
- `pyproject.toml` | 3180 bytes | `03c035a35748`
- `README.md` | 1219 bytes | `5ace30294690`
- `SETUP.md` | 9981 bytes | `7401a4de0ab8`
- `src\__init__.py` | 139 bytes | `a8ebb3032a90`
- `src\api\__init__.py` | 0 bytes | `e3b0c44298fc`
- `src\api\main.py` | 4267 bytes | `6be1331098c1`
- `src\api\middleware.py` | 4616 bytes | `e7c06dda34ff`
- `src\api\queue_worker.py` | 13427 bytes | `2668a10afab2`
- `src\api\routers\incidents.py` | 4580 bytes | `55caa9edcedf`
- `src\api\routers\predictions.py` | 1829 bytes | `93d9f08a67ab`
- `src\api\routers\system.py` | 1628 bytes | `1a628f2a4685`
- `src\api\routers\ws.py` | 720 bytes | `3b4c0c2459a7`
- `src\api\schemas.py` | 1423 bytes | `1d3fb9cb2a60`
- `src\api\websocket.py` | 1751 bytes | `23574e4f325c`
- `src\config\config.yaml` | 340 bytes | `58d794afd6e7`
- `src\config\playbooks.yaml` | 4537 bytes | `82fb0030fb78`
- `src\config\settings.py` | 1051 bytes | `6e752bf75123`
- `src\dashboard\__init__.py` | 0 bytes | `e3b0c44298fc`
- `src\dashboard\app.py` | 32897 bytes | `5f52d8bcd313`
- `src\data_pipeline\__init__.py` | 694 bytes | `ec73f15a385d`
- `src\data_pipeline\audit.py` | 13837 bytes | `807ea17a796c`
- `src\data_pipeline\embedding_engine.py` | 18886 bytes | `52956f8cbc3c`
- `src\data_pipeline\feature_encoder.py` | 18985 bytes | `3cf0bde09a5f`
- `src\data_pipeline\models.py` | 10204 bytes | `fbce788259be`
- `src\data_pipeline\news_fetcher.py` | 7479 bytes | `e57c5dc425d4`
- `src\data_pipeline\survival_analysis.py` | 23574 bytes | `11165e37b41b`
- `src\data_pipeline\validation_errors.py` | 8392 bytes | `d827699a7e1e`
- `src\data_pipeline\validators.py` | 12621 bytes | `d03d7d980c24`
- `src\models\__init__.py` | 0 bytes | `e3b0c44298fc`
- `src\models\model_monitor.py` | 1361 bytes | `c26942d14698`
- `src\models\model_registry.py` | 2962 bytes | `c7c39cfd23ad`
- `src\models\model_trainer.py` | 2528 bytes | `f361f7b874c5`
- `src\models\module_a\__init__.py` | 12 bytes | `309cd0381f80`
- `src\models\module_a\bigru_model.py` | 5462 bytes | `ef9183aa6bfd`
- `src\models\module_a\dataset.py` | 5200 bytes | `f8acd0cf050d`
- `src\models\module_a\ensemble.py` | 5217 bytes | `4193aaa55f16`
- `src\models\module_a\inference.py` | 1736 bytes | `7a459e7beaa9`
- `src\models\module_a\lightgbm_models.py` | 4672 bytes | `8ed99f9f2660`
- `src\models\module_b\__init__.py` | 58 bytes | `5aa01f9e7d7c`
- `src\models\module_b\dataset.py` | 2143 bytes | `d59c960cf9ee`
- `src\models\module_b\graph_loader.py` | 3371 bytes | `6e9910511a8d`
- `src\models\module_b\graph_maintainer.py` | 1670 bytes | `c0c8c5b9d6f3`
- `src\models\module_b\inference.py` | 3660 bytes | `42b111aab113`
- `src\models\module_b\stgcn_model.py` | 2773 bytes | `1e47b6446106`
- `src\models\module_b\trainer.py` | 3177 bytes | `9db924c566e9`
- `src\monitoring\alerting.py` | 861 bytes | `2051d0d2996b`
- `src\monitoring\data_quality.py` | 1404 bytes | `daa2acefa739`
- `src\monitoring\logger.py` | 2001 bytes | `9c74959fa1a7`
- `src\monitoring\metrics.py` | 1879 bytes | `72810dfd97e7`
- `src\orchestration\latency_monitor.py` | 1169 bytes | `32dbb3b5ccad`
- `src\orchestration\orchestrator.py` | 20232 bytes | `87e8a31298f5`
- `src\orchestration\playbook.py` | 2919 bytes | `b4f152ab8345`
- `src\orchestration\resilience.py` | 1302 bytes | `fbd469c4e10d`
- `src\orchestration\shap_explainer.py` | 5573 bytes | `b5688389d7bf`
- `src\orchestration\survival_model.py` | 1736 bytes | `fb6a76711876`
- `src\scripts\simulator.py` | 4367 bytes | `1dd3d9c11d29`
- `src\scripts\train_module_a.py` | 7360 bytes | `e6edb5e1814e`
- `src\scripts\train_module_b.py` | 1630 bytes | `fef8b8883bd9`
- `src\scripts\train_survival.py` | 2729 bytes | `50bdae9b2b81`
- `src\utils\__init__.py` | 1648 bytes | `d7616ecef5c3`
- `src\utils\circuit_breaker.py` | 13730 bytes | `a776f5171123`
- `src\utils\config_loader.py` | 8504 bytes | `854a99e5a338`
- `src\utils\errors.py` | 5515 bytes | `7051fe35736f`
- `src\utils\logging_config.py` | 6728 bytes | `219a41046314`
- `src\utils\metrics.py` | 2191 bytes | `fc9a5a934878`
- `src\utils\retry.py` | 11176 bytes | `a017d2848e9d`
- `src\utils\timing.py` | 2526 bytes | `827dede6ed7a`
- `tests\__init__.py` | 0 bytes | `e3b0c44298fc`
- `tests\conftest.py` | 16573 bytes | `733ee3f87d9a`
- `tests\data_pipeline\__init__.py` | 39 bytes | `12b5768c5f7a`
- `tests\data_pipeline\test_feature_encoder.py` | 26803 bytes | `403bbf40c6c0`
- `tests\data_pipeline\test_survival_analysis.py` | 27905 bytes | `77a62e6f4f2f`
- `tests\data_pipeline\test_validation.py` | 26275 bytes | `232e25e5a92e`
- `tests\test_circuit_breaker.py` | 8007 bytes | `fe16c22ec2c8`
- `tests\test_config_loader.py` | 3997 bytes | `831c041cbbbf`
- `tests\test_data_pipeline_integration.py` | 40148 bytes | `5309d6258255`
- `tests\test_embedding_engine.py` | 16171 bytes | `d1e5b9ea4b25`
- `tests\test_embedding_engine_properties.py` | 14404 bytes | `5123423ff1dc`
- `tests\test_errors.py` | 4385 bytes | `4e5455c126a1`
- `tests\test_orchestrator_integration.py` | 1826 bytes | `ba84865e6c07`
- `tests\test_retry.py` | 8906 bytes | `886d8d0d18ca`
- `tests\test_survival_orchestrator.py` | 3187 bytes | `4900d0d5f8b4`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

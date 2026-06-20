# gridlock-prototype

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock-prototype`
- Git remote: `https://github.com/di35117/gridlock-prototype.git`
- Git branch: `main`
- Git HEAD: `bd989aaf1d2b4be1fa90d9d7855de254ac6bd7f6`
- Fingerprint: `ef3d9fdcac151773322c8dcf4332119e835feb07af6b18a89129f1c3db6834a8`
- Files indexed: `103`
- Indexed size: `29965830` bytes

## Stack Signals

- `Docker Compose`
- `FastAPI`
- `Next.js`
- `Node/Express`
- `React`
- `Tailwind CSS`

## Traffic Problem Signals

- traffic: astram, bangalore, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, manpower, police, resource
- models: calibration, classifier, gru, lightgbm
- routing: google maps, mapbox

## Manifests

- `backend\requirements.txt`
- `docker-compose.yml`
- `frontend\package.json`

## Package Files

### `frontend\package.json`
- Name: `frontend`
- Scripts:
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `eslint`
- Dependencies: `@tailwindcss/postcss`, `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, `eslint-config-next`, `lucide-react`, `next`, `react`, `react-dom`, `recharts`, `tailwindcss`, `typescript`

## Python Dependencies

### `backend\requirements.txt`
- `fastapi==0.111.0`
- `uvicorn[standard]==0.30.0`
- `sqlalchemy==2.0.30`
- `geoalchemy2==0.15.0`
- `asyncpg==0.29.0`
- `redis==5.0.4`
- `apscheduler==3.10.4`
- `pandas==2.2.2`
- `numpy==1.26.4`
- `lightgbm==4.3.0`
- `networkx==3.3`
- `pulp==2.8.0`
- `anthropic==0.28.0`
- `googlemaps==4.10.0`
- `httpx==0.27.0`
- `python-dotenv==1.0.1`
- `alembic==1.13.1`
- `scipy==1.13.1`
- `scikit-learn==1.5.0`
- `osmnx==1.9.3`
- `python-multipart==0.0.9`
- `optuna==3.6.1`
- `google-genai==0.1.0`
- `websockets==12.0`

## README Headings

- `frontend\README.md`: ## Getting Started
- `frontend\README.md`: # or
- `frontend\README.md`: # or
- `frontend\README.md`: # or
- `frontend\README.md`: ## Learn More
- `frontend\README.md`: ## Deploy on Vercel

## README Claims and Operational Notes

- `frontend\README.md`: This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
- `frontend\README.md`: First, run the development server:
- `frontend\README.md`: npm run dev
- `frontend\README.md`: - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- `frontend\README.md`: You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
- `frontend\README.md`: ## Deploy on Vercel
- `frontend\README.md`: The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the cre...
- `frontend\README.md`: Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Data Assets

- `data\models\model_metrics.json`

## Model and Artifact Assets

- `data\models\model_metrics.json`

## Notebooks

- None detected

## API Endpoints

- `GET /corridor-profiles`
- `GET /corridor-profiles/{corridor}`
- `GET /event-stats`
- `GET /metrics`
- `GET /station-mapping/{corridor}`
- `GET /status`
- `POST /check`
- `POST /detect`
- `POST /diversion`
- `POST /feedback`
- `POST /generate`
- `POST /optimize`
- `POST /predict`
- `POST /process`
- `POST /register`
- `POST /reload`
- `POST /tactical`
- `POST /train`
- `POST /webhook`
- `router.GET /corridor-profiles`
- `router.GET /corridor-profiles/{corridor}`
- `router.GET /event-stats`
- `router.GET /metrics`
- `router.GET /station-mapping/{corridor}`
- `router.GET /status`
- `router.POST /check`
- `router.POST /detect`
- `router.POST /diversion`
- `router.POST /feedback`
- `router.POST /generate`
- `router.POST /optimize`
- `router.POST /predict`
- `router.POST /process`
- `router.POST /register`
- `router.POST /reload`
- `router.POST /tactical`
- `router.POST /train`
- `router.POST /webhook`

## Python Source Signals

### `backend\database.py`
- Classes: `Base`
- Functions: `get_db`, `init_db`
- Imports: `config`, `os`, `sqlalchemy`

### `backend\main.py`
- Functions: `lifespan`
- Imports: `apscheduler`, `contextlib`, `database`, `dotenv`, `fastapi`, `logging`, `modules`

### `backend\modules\ai_copilot\models.py`
- Classes: `CopilotRequest`, `CopilotResponse`
- Imports: `datetime`, `pydantic`

### `backend\modules\ai_copilot\router.py`
- Functions: `generate`
- Endpoints: `POST /generate`, `router.POST /generate`
- Imports: `fastapi`, `modules`

### `backend\modules\ai_copilot\service.py`
- Functions: `get_gemini_client`, `_get_historical_stations`, `generate_operational_order`
- Imports: `config`, `database`, `datetime`, `fastapi`, `google`, `logging`, `modules`, `sqlalchemy`

### `backend\modules\cctv_ingestion\models.py`
- Classes: `CCTVResponse`
- Imports: `pydantic`

### `backend\modules\cctv_ingestion\router.py`
- Functions: `cctv_webhook`
- Endpoints: `POST /webhook`, `router.POST /webhook`
- Imports: `fastapi`, `logging`, `modules`

### `backend\modules\cctv_ingestion\service.py`
- Functions: `process_cctv_payload`
- Imports: `datetime`, `json`, `logging`, `modules`, `uuid`

### `backend\modules\compound_conflict\models.py`
- Classes: `ConflictRequest`, `ConflictResponse`
- Imports: `pydantic`, `typing`

### `backend\modules\compound_conflict\router.py`
- Functions: `detect`
- Endpoints: `POST /detect`, `router.POST /detect`
- Imports: `fastapi`, `modules`

### `backend\modules\compound_conflict\service.py`
- Functions: `detect_conflict`
- Imports: `database`, `logging`, `sqlalchemy`

### `backend\modules\data_foundation\models.py`
- Classes: `Incident`, `CorridorRiskProfile`, `StationCorridorMapping`, `EventCauseStat`
- Imports: `database`, `sqlalchemy`

### `backend\modules\data_foundation\router.py`
- Functions: `get_status`, `get_corridor_profiles`, `get_single_corridor_profile`, `get_event_stats`, `get_station_mapping`, `reload_data`
- Endpoints: `GET /status`, `GET /corridor-profiles`, `GET /corridor-profiles/{corridor}`, `GET /event-stats`, `GET /station-mapping/{corridor}`, `POST /reload`, `router.GET /status`, `router.GET /corridor-profiles`, `router.GET /corridor-profiles/{corridor}`, `router.GET /event-stats`, `router.GET /station-mapping/{corridor}`, `router.POST /reload`
- Imports: `database`, `fastapi`, `modules`, `sqlalchemy`

### `backend\modules\data_foundation\service.py`
- Functions: `_load_and_clean_csv`, `check_data_loaded`, `_load_incidents`, `_compute_corridor_profiles`, `_compute_station_mapping`, `_compute_event_cause_stats`, `_cast_numpy`, `initialize_data_foundation`, `reload_data_foundation`, `_tier`
- Imports: `config`, `database`, `logging`, `modules`, `numpy`, `pandas`, `sqlalchemy`

### `backend\modules\impact_forecaster\models.py`
- Classes: `ForecastRequest`, `ForecastResponse`, `TrainResponse`
- Functions: `strip_whitespace`
- Imports: `datetime`, `pydantic`, `typing`

### `backend\modules\impact_forecaster\router.py`
- Functions: `status`, `get_metrics`, `train`, `predict`
- Endpoints: `GET /status`, `GET /metrics`, `POST /train`, `POST /predict`, `router.GET /status`, `router.GET /metrics`, `router.POST /train`, `router.POST /predict`
- Imports: `fastapi`, `json`, `logging`, `modules`

### `backend\modules\impact_forecaster\service.py`
- Functions: `_ensure_models_loaded`, `reload_models`, `_get_corridor_context`, `_get_cause_context`, `_get_risk_score_bounds`, `_normalize_risk_score`, `_classify_risk_level`, `predict`
- Imports: `database`, `datetime`, `json`, `logging`, `modules`, `pandas`, `sqlalchemy`

### `backend\modules\impact_forecaster\trainer.py`
- Functions: `fetch_training_data`, `build_features`, `train_and_save`, `load_models`, `models_exist`, `_metrics`, `safe_transform`, `objective`
- Imports: `database`, `joblib`, `json`, `lightgbm`, `logging`, `numpy`, `optuna`, `pandas`, `pathlib`, `sklearn`, `sqlalchemy`

### `backend\modules\learning_engine\models.py`
- Classes: `EventRegistrationRequest`, `EventRegistrationResponse`, `PostEventFeedbackRequest`, `PostEventFeedbackResponse`
- Imports: `datetime`, `pydantic`, `typing`

### `backend\modules\learning_engine\router.py`
- Functions: `register_event`, `log_feedback`
- Endpoints: `POST /register`, `POST /feedback`, `router.POST /register`, `router.POST /feedback`
- Imports: `fastapi`, `modules`

### `backend\modules\learning_engine\service.py`
- Functions: `register_active_event`, `poll_live_congestion`, `process_learning_feedback`, `autonomous_event_learning_scan`
- Imports: `config`, `datetime`, `googlemaps`, `json`, `logging`, `random`, `redis`

### `backend\modules\osint_harvester\models.py`
- Classes: `OSINTRequest`, `OSINTResponse`
- Imports: `pydantic`, `typing`

### `backend\modules\osint_harvester\router.py`
- Functions: `process_intel`, `receive_social_webhook`
- Endpoints: `POST /process`, `POST /webhook`, `router.POST /process`, `router.POST /webhook`
- Imports: `fastapi`, `logging`, `modules`

### `backend\modules\osint_harvester\service.py`
- Functions: `process_osint_intel`
- Imports: `datetime`, `fastapi`, `json`, `logging`, `modules`, `uuid`

### `backend\modules\resource_recommender\models.py`
- Classes: `TacticalRequest`, `TacticalResponse`, `OptimizeRequest`, `OptimizeResponse`
- Imports: `pydantic`, `typing`

### `backend\modules\resource_recommender\router.py`
- Functions: `tactical_plan`, `optimize`
- Endpoints: `POST /tactical`, `POST /optimize`, `router.POST /tactical`, `router.POST /optimize`
- Imports: `fastapi`, `modules`

### `backend\modules\resource_recommender\service.py`
- Functions: `get_tactical_plan`, `optimize_manpower`
- Imports: `database`, `logging`, `pulp`, `sqlalchemy`

### `backend\modules\routing_engine\models.py`
- Classes: `RoutingRequest`, `RoutingResponse`
- Imports: `pydantic`, `typing`

### `backend\modules\routing_engine\router.py`
- Functions: `get_diversion`
- Endpoints: `POST /diversion`, `router.POST /diversion`
- Imports: `fastapi`, `modules`

### `backend\modules\routing_engine\service.py`
- Functions: `_get_graph`, `_get_construction_coordinates`, `calculate_tactical_diversion`
- Imports: `config`, `database`, `logging`, `networkx`, `osmnx`, `sqlalchemy`

### `backend\modules\surge_detector\models.py`
- Classes: `SurgeRequest`, `SurgeResponse`
- Imports: `pydantic`

### `backend\modules\surge_detector\router.py`
- Functions: `check_surge`
- Endpoints: `POST /check`, `router.POST /check`
- Imports: `fastapi`, `modules`

### `backend\modules\surge_detector\service.py`
- Functions: `check_for_surge`, `run_autonomous_surge_scan`
- Imports: `database`, `datetime`, `logging`, `modules`, `sqlalchemy`

### `backend\modules\websockets\manager.py`
- Classes: `ConnectionManager`
- Functions: `__init__`, `connect`, `disconnect`, `broadcast_alert`
- Imports: `fastapi`, `json`, `logging`

### `backend\modules\websockets\router.py`
- Functions: `dashboard_websocket`
- Imports: `fastapi`, `modules`

## JavaScript/TypeScript Source Signals

### `frontend\src\app\dashboard\page.tsx`
- Symbols: `DashboardPage`
- Imports: `@/components/modules/CongestionCommand`

### `frontend\src\app\forecasting\page.tsx`
- Symbols: `ForecastingPage`
- Imports: `@/components/modules/ImpactForecaster`, `@/components/modules/LearningEngine`, `@/components/modules/SurgeMonitor`

### `frontend\src\app\intelligence\page.tsx`
- Symbols: `IntelligencePage`
- Imports: `@/components/modules/CctvIngestion`, `@/components/modules/DataFoundation`, `@/components/modules/OsintHarvester`

### `frontend\src\app\layout.tsx`
- Symbols: `inter`, `RootLayout`
- Imports: `@/components/layouts/GlobalAlertOverlay`, `@/components/layouts/Sidebar`, `next`, `next/font/google`

### `frontend\src\app\operations\page.tsx`
- Symbols: `OperationsPage`
- Imports: `@/components/modules/ResourceOptimizer`, `@/components/modules/TacticalRouting`

### `frontend\src\app\page.tsx`
- Symbols: `Home`
- Imports: `next/navigation`

### `frontend\src\components\layouts\GlobalAlertOverlay.tsx`
- Symbols: `GlobalAlertOverlay`, `wsRef`, `connectWs`, `ws`, `payload`, `dismissAlert`, `styles`, `Icon`
- Imports: `lucide-react`, `react`

### `frontend\src\components\layouts\Sidebar.tsx`
- Symbols: `Sidebar`, `pathname`, `navItems`, `isActive`
- Imports: `lucide-react`, `next/link`, `next/navigation`, `react`

### `frontend\src\components\modules\CctvIngestion.tsx`
- Symbols: `CctvIngestion`, `rawSample`, `simulateIngestion`
- Imports: `lucide-react`, `react`

### `frontend\src\components\modules\CongestionCommand.tsx`
- Symbols: `CongestionCommandCenter`
- Imports: `lucide-react`, `react`, `recharts`

### `frontend\src\components\modules\DataFoundation.tsx`
- Symbols: `DataFoundationHub`, `handleReload`
- Imports: `lucide-react`, `react`

### `frontend\src\components\modules\ImpactForecaster.tsx`
- Symbols: `ImpactForecaster`, `handleRetrain`
- Imports: `lucide-react`, `react`, `recharts`

### `frontend\src\components\modules\LearningEngine.tsx`
- Symbols: `LearningEngineDashboard`, `simulateDaemonPoll`
- Imports: `lucide-react`, `react`

### `frontend\src\components\modules\OsintHarvester.tsx`
- Symbols: `OSINTHarvester`, `simulateWebhook`, `isActive`, `isPast`
- Imports: `lucide-react`, `react`

### `frontend\src\components\modules\ResourceOptimizer.tsx`
- Symbols: `ResourceRecommender`, `runOptimization`, `percentage`
- Imports: `lucide-react`, `react`

### `frontend\src\components\modules\SurgeMonitor.tsx`
- Symbols: `SurgeDetectorEngine`, `simulateDaemonWakeup`, `now`
- Imports: `lucide-react`, `react`

### `frontend\src\components\modules\TacticalRouting.tsx`
- Symbols: `TacticalRoutingEngine`, `triggerReroute`
- Imports: `lucide-react`, `react`

## Documentation and Presentation Files

- `frontend\AGENTS.md`
- `frontend\CLAUDE.md`
- `frontend\README.md`

## Test Files

- `backend\pytest.ini`
- `backend\tests\__init__.py`
- `backend\tests\conftest.py`
- `backend\tests\locustfile.py`
- `backend\tests\test_cctv.py`
- `backend\tests\test_copilot.py`
- `backend\tests\test_db_integration.py`
- `backend\tests\test_impact.py`
- `backend\tests\test_learning.py`
- `backend\tests\test_osint.py`
- `backend\tests\test_routing.py`
- `backend\tests\test_surge.py`
- `backend\tests\test_websocket.py`

## File Inventory

- `.env.example` | 584 bytes | `ec7dfda569b4`
- `.gitignore` | 2230 bytes | `0434c795773f`
- `backend\cache\bfd12fbb5335a2f29d3fb307fdc2421a79ad3021.json` | 29340614 bytes | `e1d98d12aa56`
- `backend\cache\f1e6ea0ba59974034d2f3a60aa923b7efa24c8fe.json` | 128971 bytes | `d8536ff94663`
- `backend\config.py` | 1008 bytes | `bb59c99c802a`
- `backend\database.py` | 1536 bytes | `de4f304c3a11`
- `backend\main.py` | 3916 bytes | `c194ff1dfce0`
- `backend\modules\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\modules\ai_copilot\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\modules\ai_copilot\models.py` | 674 bytes | `5227bbc22a51`
- `backend\modules\ai_copilot\router.py` | 699 bytes | `ef3928895db3`
- `backend\modules\ai_copilot\service.py` | 4138 bytes | `c679cf4a0917`
- `backend\modules\cctv_ingestion\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\modules\cctv_ingestion\models.py` | 207 bytes | `43dfb67558b6`
- `backend\modules\cctv_ingestion\router.py` | 1236 bytes | `95c0d7bf2fd6`
- `backend\modules\cctv_ingestion\service.py` | 5552 bytes | `26800a468458`
- `backend\modules\compound_conflict\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\modules\compound_conflict\models.py` | 600 bytes | `e1efe4c17639`
- `backend\modules\compound_conflict\router.py` | 522 bytes | `7612794b53c9`
- `backend\modules\compound_conflict\service.py` | 3401 bytes | `fbb7707df14f`
- `backend\modules\data_foundation\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\modules\data_foundation\models.py` | 4788 bytes | `ed602611b8f6`
- `backend\modules\data_foundation\router.py` | 5501 bytes | `678e6d058eba`
- `backend\modules\data_foundation\service.py` | 16367 bytes | `fe1ac53e51ae`
- `backend\modules\impact_forecaster\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\modules\impact_forecaster\models.py` | 2316 bytes | `98bb3b84665c`
- `backend\modules\impact_forecaster\router.py` | 2592 bytes | `1afcb02941e4`
- `backend\modules\impact_forecaster\service.py` | 7910 bytes | `a3028f90786f`
- `backend\modules\impact_forecaster\trainer.py` | 11337 bytes | `deb3340c6918`
- `backend\modules\learning_engine\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\modules\learning_engine\models.py` | 1464 bytes | `43b7d74d7cdd`
- `backend\modules\learning_engine\router.py` | 1362 bytes | `4d0b38638c18`
- `backend\modules\learning_engine\service.py` | 6113 bytes | `46f48672f2a6`
- `backend\modules\osint_harvester\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\modules\osint_harvester\models.py` | 425 bytes | `48154ce56d35`
- `backend\modules\osint_harvester\router.py` | 1297 bytes | `9147edfc7ea9`
- `backend\modules\osint_harvester\service.py` | 5167 bytes | `13c4b578cdda`
- `backend\modules\resource_recommender\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\modules\resource_recommender\models.py` | 894 bytes | `0e4a90848b12`
- `backend\modules\resource_recommender\router.py` | 847 bytes | `fd7dd50c5f4e`
- `backend\modules\resource_recommender\service.py` | 3223 bytes | `8776246ef78b`
- `backend\modules\routing_engine\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\modules\routing_engine\models.py` | 930 bytes | `cd5f1145b134`
- `backend\modules\routing_engine\router.py` | 873 bytes | `8bde3ac3c309`
- `backend\modules\routing_engine\service.py` | 4670 bytes | `bf50db71299f`
- `backend\modules\surge_detector\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\modules\surge_detector\models.py` | 485 bytes | `f16a6dea8430`
- `backend\modules\surge_detector\router.py` | 635 bytes | `f08b917c1196`
- `backend\modules\surge_detector\service.py` | 4963 bytes | `aa12403285ae`
- `backend\modules\websockets\manager.py` | 1641 bytes | `4d6cfae9b6d8`
- `backend\modules\websockets\router.py` | 933 bytes | `944ad9dfba9f`
- `backend\pytest.ini` | 97 bytes | `9ee2c36b8fea`
- `backend\requirements.txt` | 433 bytes | `cacc754143c3`
- `backend\reset_db.py` | 379 bytes | `de0be589fe6d`
- `backend\simulate_live_feed.py` | 1166 bytes | `39ccae9b6471`
- `backend\tests\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\tests\conftest.py` | 1419 bytes | `6585b2ea6706`
- `backend\tests\locustfile.py` | 1053 bytes | `b4ee2a58dec1`
- `backend\tests\test_cctv.py` | 875 bytes | `7f0a13cd6b20`
- `backend\tests\test_copilot.py` | 1446 bytes | `4173b0802f7b`
- `backend\tests\test_db_integration.py` | 1309 bytes | `5a470ed2a2b0`
- `backend\tests\test_impact.py` | 1297 bytes | `650cca725123`
- `backend\tests\test_learning.py` | 908 bytes | `e9787a45ed4f`
- `backend\tests\test_osint.py` | 1294 bytes | `70eb41a78219`
- `backend\tests\test_routing.py` | 946 bytes | `a6186df170a1`
- `backend\tests\test_surge.py` | 1179 bytes | `2322a6a67956`
- `backend\tests\test_websocket.py` | 768 bytes | `c870e47201b5`
- `data\models\model_metrics.json` | 818 bytes | `c974230f12c6`
- `docker-compose.yml` | 438 bytes | `989d4a53e1cc`
- `frontend\.gitignore` | 521 bytes | `cfdbd5a321f3`
- `frontend\AGENTS.md` | 332 bytes | `ceaa13d29db2`
- `frontend\CLAUDE.md` | 12 bytes | `d631d88045f7`
- `frontend\eslint.config.mjs` | 483 bytes | `275a07c13fc7`
- `frontend\next.config.ts` | 140 bytes | `a972c4f0ffa6`
- `frontend\package-lock.json` | 255679 bytes | `3d03b5423e9b`
- `frontend\package.json` | 615 bytes | `bea30bca01a8`
- `frontend\postcss.config.mjs` | 101 bytes | `7b299d3d3b16`
- `frontend\public\file.svg` | 391 bytes | `2b67812c325c`
- `frontend\public\globe.svg` | 1035 bytes | `b614b9bf1839`
- `frontend\public\next.svg` | 1375 bytes | `55995dfad6ec`
- `frontend\public\vercel.svg` | 128 bytes | `f081337b2fee`
- `frontend\public\window.svg` | 385 bytes | `644768c4aaeb`
- `frontend\README.md` | 1486 bytes | `3b3ed71ebf50`
- `frontend\src\app\dashboard\page.tsx` | 164 bytes | `f31ec8f5d576`
- `frontend\src\app\favicon.ico` | 25931 bytes | `2b8ad2d33455`
- `frontend\src\app\forecasting\page.tsx` | 602 bytes | `39257f932f4d`
- `frontend\src\app\globals.css` | 333 bytes | `2905d6a51830`
- `frontend\src\app\intelligence\page.tsx` | 574 bytes | `e3e76f330c41`
- `frontend\src\app\layout.tsx` | 1022 bytes | `40bd5d5be2ad`
- `frontend\src\app\operations\page.tsx` | 422 bytes | `d7bfc4f32f0b`
- `frontend\src\app\page.tsx` | 187 bytes | `2451bffce57f`
- `frontend\src\components\layouts\GlobalAlertOverlay.tsx` | 5636 bytes | `2de212326431`
- `frontend\src\components\layouts\Sidebar.tsx` | 2034 bytes | `ebee87cab73e`
- `frontend\src\components\modules\CctvIngestion.tsx` | 3856 bytes | `c12b5e6c9838`
- `frontend\src\components\modules\CongestionCommand.tsx` | 6475 bytes | `cc6c28cb71b9`
- `frontend\src\components\modules\DataFoundation.tsx` | 6888 bytes | `12fcc56c537d`
- `frontend\src\components\modules\ImpactForecaster.tsx` | 7866 bytes | `ed28001b727b`
- `frontend\src\components\modules\LearningEngine.tsx` | 8016 bytes | `b306a3d22a0a`
- `frontend\src\components\modules\OsintHarvester.tsx` | 9243 bytes | `93dfe0fbf8f8`
- `frontend\src\components\modules\ResourceOptimizer.tsx` | 8342 bytes | `20d0af47aabf`
- `frontend\src\components\modules\SurgeMonitor.tsx` | 8532 bytes | `f6a8327c65c0`
- `frontend\src\components\modules\TacticalRouting.tsx` | 7874 bytes | `9d3dd5156553`
- `frontend\tsconfig.json` | 704 bytes | `dbacf04aa5f3`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

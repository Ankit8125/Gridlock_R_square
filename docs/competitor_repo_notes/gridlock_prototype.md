# gridlock_prototype

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock_prototype`
- Git remote: `https://github.com/shantanu-1607/gridlock_prototype.git`
- Git branch: `main`
- Git HEAD: `8b9ffbc5b0bd7222eeffdc8a53569b5c6f75efea`
- Fingerprint: `e6369db12fc31af821d109118fd518975c40adfb444e4634c169029dbac48366`
- Files indexed: `150`
- Indexed size: `10043140` bytes

## Stack Signals

- `Docker`
- `Docker Compose`
- `FastAPI`
- `Node/Express`
- `React`
- `Tailwind CSS`
- `Vite`

## Traffic Problem Signals

- traffic: astram, bangalore, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, manpower, police, resource
- models: arima, calibration, catboost, conformal, gru, kmeans, lightgbm, prophet, randomforest, regressor, xgboost
- routing: google maps, mapbox

## Manifests

- `apps\backend\Dockerfile`
- `apps\backend\package.json`
- `apps\frontend\Dockerfile`
- `apps\frontend\package.json`
- `apps\ml\Dockerfile`
- `apps\ml\requirements.txt`
- `docker-compose.yml`
- `package.json`

## Package Files

### `apps\backend\package.json`
- Name: `gridlock-backend`
- Scripts:
  - `start`: `node dist/index.js`
  - `dev`: `nodemon -L src/index.ts`
  - `build`: `tsc`
  - `lint`: `eslint .`
  - `lint:fix`: `eslint . --fix`
  - `format`: `prettier --write .`
- Dependencies: `@eslint/js`, `@types/bcrypt`, `@types/cors`, `@types/express`, `@types/jsonwebtoken`, `@types/node`, `@types/pg`, `@types/ws`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `bcrypt`, `bullmq`, `cors`, `dotenv`, `eslint`, `eslint-config-prettier`, `eslint-plugin-prettier`, `eslint-plugin-simple-import-sort`, `eslint-plugin-unused-imports`, `express`, `globals`, `groq-sdk`, `husky`, `ioredis`, `jsonwebtoken`, `lint-staged`, `nodemon`, `pg`, `prettier`, `ts-node`, `typescript`, `ws`

### `apps\frontend\package.json`
- Name: `gridlock-frontend`
- Scripts:
  - `dev`: `vite`
  - `build`: `tsc && vite build`
  - `lint`: `eslint . --max-warnings 0`
  - `lint:fix`: `eslint . --fix`
  - `format`: `prettier --write .`
  - `preview`: `vite preview`
- Dependencies: `@eslint/js`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-label`, `@radix-ui/react-scroll-area`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`, `@tailwindcss/vite`, `@types/react`, `@types/react-dom`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `@vitejs/plugin-react`, `chart.js`, `class-variance-authority`, `clsx`, `eslint`, `eslint-config-prettier`, `eslint-plugin-prettier`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-simple-import-sort`, `eslint-plugin-unused-imports`, `globals`, `husky`, `lint-staged`, `lucide-react`, `prettier`, `react`, `react-chartjs-2`, `react-dom`, `react-router-dom`, `tailwind-merge`, `tailwindcss`, `typescript`, `vite`

### `package.json`
- Name: `gridlock-monorepo`
- Scripts:
  - `install:all`: `npm install`
  - `dev`: `docker compose up --build`
  - `prepare`: `husky`
- Dependencies: `husky`, `nodemon`

## Python Dependencies

### `apps\ml\requirements.txt`
- `fastapi`
- `uvicorn[standard]`
- `lightgbm`
- `catboost`
- `optuna`
- `scikit-learn`
- `pandas`
- `numpy`
- `pyyaml`
- `pyarrow`
- `matplotlib`
- `mlflow>=2.12`
- `dvc>=3.50`
- `category_encoders>=2.6`
- `torch>=2.2`
- `prophet`

## README Headings

- `README.md`: # gridlock_prototype
- `README.md`: # GridLock Project 2
- `README.md`: # Problem Statement
- `README.md`: # Users
- `README.md`: ## 1. Controller
- `README.md`: ## 2. Fleet Member
- `README.md`: # Features
- `README.md`: ## 1. Role-Based Access Control (RBAC)
- `README.md`: ### Controller
- `README.md`: ### Fleet Member
- `README.md`: ## 2. Ambient AI Engine
- `README.md`: ## 3. Congestion Propagation Engine
- `README.md`: ### Heatmap Generation
- `README.md`: ### Barricade Placement Optimizer
- `README.md`: ### Fleet Dispatch Engine
- `README.md`: ## 4. Planned and Unplanned Event Management
- `README.md`: ### Planned Events
- `README.md`: ### Unplanned Events
- `README.md`: ## 5. Time-Based Forecasting
- `README.md`: ## 6. AI Chatbot for Planned Events
- `README.md`: # Concise System Architecture
- `README.md`: # Tech Stack
- `README.md`: ## Frontend
- `README.md`: ## Backend
- `README.md`: ## Database
- `README.md`: ## AI & Intelligence
- `README.md`: # Core Workflow
- `README.md`: # Vision

## README Claims and Operational Notes

- `README.md`: An AI-powered Traffic Command Center for forecasting and managing event-driven congestion caused by planned and unplanned events. The system predicts congestion, simulates its propagation across the road network, reco...
- `README.md`: * Intelligent resource deployment
- `README.md`: * Deploying fleet members
- `README.md`: * Viewing assigned routes
- `README.md`: # Features
- `README.md`: * View analytics and predictions
- `README.md`: * Dynamic congestion prediction
- `README.md`: * Automatic intervention recommendations
- `README.md`: Predictions for:
- `README.md`: Recommends:
- `README.md`: Recommends:
- `README.md`: * Deployment locations
- `README.md`: The system automatically adjusts recommendations based on event type and severity.
- `README.md`: Predictions include:
- `README.md`: * Resource recommendations
- `README.md`: * Explainable predictions
- `README.md`: │   API Services      │              │   AI Chat Service   │
- `README.md`: │            │ Predictions │
- `README.md`: * TypeScript APIs
- `README.md`: * Recommendation Engine
- `README.md`: Barricade Recommendation
- `README.md`: Fleet Dispatch Recommendation
- `README.md`: GridLock aims to become an AI-powered traffic command platform capable of forecasting, simulating, and mitigating event-driven congestion through intelligent recommendations and real-time decision support.

## Data Assets

- `apps\ml\data\incidents.csv`
- `docs\Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv`

## Model and Artifact Assets

- None detected

## Notebooks

- None detected

## API Endpoints

- `GET /`
- `GET /:id`
- `GET /:id/assignments`
- `GET /:id/barricades`
- `GET /api/ml/health`
- `GET /autosuggest`
- `GET /edges`
- `GET /junctions`
- `POST /`
- `POST /api/ml/accuracy`
- `POST /api/ml/anomaly`
- `POST /api/ml/counterfactual`
- `POST /api/ml/deployment`
- `POST /api/ml/gating`
- `POST /api/ml/predict`
- `POST /api/ml/queue-analysis`
- `POST /api/ml/train-baselines`
- `POST /login`
- `POST /plan`
- `POST /refresh`
- `PUT /:id`
- `PUT /:id/assignments/:assignmentId`
- `PUT /:id/barricades/:barricadeId`
- `app.GET /api/ml/health`
- `app.POST /api/ml/accuracy`
- `app.POST /api/ml/anomaly`
- `app.POST /api/ml/counterfactual`
- `app.POST /api/ml/deployment`
- `app.POST /api/ml/gating`
- `app.POST /api/ml/predict`
- `app.POST /api/ml/queue-analysis`
- `app.POST /api/ml/train-baselines`

## Python Source Signals

### `apps\ml\demo.py`
- Functions: `main`
- Imports: `pathlib`, `src`, `sys`

### `apps\ml\experiments\evaluate.py`
- Functions: `evaluate_and_log`, `compute_fold_metrics`, `measure_inference_time`, `check_promotion_criteria`
- Imports: `mlflow`, `numpy`, `pandas`, `src`, `time`

### `apps\ml\experiments\feature_registry.py`
- Classes: `FeatureSet`
- Functions: `_haversine_km`, `_add_temporal_deep`, `_add_geospatial`, `_add_advanced_encodings`, `_add_interactions`, `_add_historical_lag`, `build_features`
- Imports: `category_encoders`, `dataclasses`, `numpy`, `pandas`, `sklearn`, `src`, `typing`

### `apps\ml\experiments\mlflow_config.py`
- Functions: `init_mlflow`, `get_or_create_experiment`, `generate_run_name`, `experiment_name`, `get_dvc_data_hash`, `log_run_artifacts`, `get_client`
- Imports: `datetime`, `hashlib`, `json`, `mlflow`, `pathlib`, `src`

### `apps\ml\experiments\model_registry.py`
- Classes: `ModelConfig`
- Functions: `_create_random_forest`, `_suggest_random_forest`, `_create_extra_trees`, `_suggest_extra_trees`, `_create_catboost`, `_suggest_catboost`, `create_model`, `suggest_params`, `get_model_config`, `list_models`
- Imports: `dataclasses`, `numpy`, `sklearn`, `src`, `typing`

### `apps\ml\experiments\promote.py`
- Classes: `StackingChampion`
- Functions: `_retrain_model`, `promote_ensemble_champion`, `_create_base_model`, `promote_champion`, `promote_to_production`, `export_champion_artifacts`, `__init__`, `predict`
- Imports: `catboost`, `cloudpickle`, `copy`, `datetime`, `feature_registry`, `json`, `lightgbm`, `mlflow`, `mlflow_config`, `model_registry`, `numpy`, `pathlib`, `pickle`, `run_experiment`, `shutil`, `sklearn`, `src`

### `apps\ml\experiments\run_experiment.py`
- Functions: `_train_sklearn_model`, `_train_neural_model`, `_train_lgb_cat_model`, `run_single_experiment`, `run_batch`, `main`, `objective`
- Imports: `argparse`, `catboost`, `copy`, `evaluate`, `feature_registry`, `json`, `lightgbm`, `mlflow`, `mlflow_config`, `model_registry`, `numpy`, `optuna`, `pandas`, `pathlib`, `pickle`, `sklearn`, `src`, `time`, `tournament`

### `apps\ml\experiments\tournament.py`
- Classes: `TournamentEntry`, `Tournament`
- Functions: `__init__`, `_result_to_entry`, `round_1_screening`, `round_2_features`, `round_3_tuning`, `round_4_head_to_head`, `round_5_ensemble`, `run_full_tournament`, `get_summary`
- Imports: `dataclasses`, `evaluate`, `feature_registry`, `json`, `mlflow`, `mlflow_config`, `model_registry`, `numpy`, `pandas`, `pathlib`, `run_experiment`, `scipy`, `sklearn`, `src`

### `apps\ml\src\anomaly.py`
- Functions: `train_corridor_baselines`, `load_corridor_baselines`, `_load_anomaly_thresholds`, `compute_anomaly_score`
- Imports: `constants`, `data`, `datetime`, `json`, `logger`, `numpy`, `pandas`, `pathlib`, `pickle`, `prophet`

### `apps\ml\src\api\main.py`
- Functions: `lifespan`, `health`, `predict`, `accuracy`, `queue_analysis`, `deployment`, `gating`, `anomaly`, `train_baselines`, `counterfactual`
- Endpoints: `GET /api/ml/health`, `POST /api/ml/predict`, `POST /api/ml/accuracy`, `POST /api/ml/queue-analysis`, `POST /api/ml/deployment`, `POST /api/ml/gating`, `POST /api/ml/anomaly`, `POST /api/ml/train-baselines`, `POST /api/ml/counterfactual`, `app.GET /api/ml/health`, `app.POST /api/ml/predict`, `app.POST /api/ml/accuracy`, `app.POST /api/ml/queue-analysis`, `app.POST /api/ml/deployment`, `app.POST /api/ml/gating`, `app.POST /api/ml/anomaly`, `app.POST /api/ml/train-baselines`, `app.POST /api/ml/counterfactual`
- Imports: `anomaly`, `contextlib`, `counterfactual`, `datetime`, `fastapi`, `predict`, `queue_model`, `schemas`, `service`

### `apps\ml\src\api\schemas.py`
- Classes: `PredictRequest`, `SimilarEvent`, `AggregatedFingerprint`, `PredictionInterval`, `ConfidenceFactors`, `PredictResponse`, `QueueAnalysisRequest`, `QueueAnalysisResponse`, `JunctionInput`, `DeploymentRequest`, `DeploymentItem`, `DeploymentResponse`, `UpstreamJunction`, `GatingRequest`, `GatingItem`, `GatingResponse`, `AnomalyRequest`, `AnomalyResponse`, `CounterfactualRequest`, `CounterfactualScenario`, `CounterfactualResponse`, `AccuracyRequest`, `AccuracyMetric`, `AccuracyResponse`
- Functions: `_normalize_aliases`
- Imports: `__future__`, `pydantic`

### `apps\ml\src\api\service.py`
- Functions: `run_prediction`, `compute_accuracy`
- Imports: `predict`, `schemas`

### `apps\ml\src\counterfactual.py`
- Functions: `run_counterfactual_analysis`
- Imports: `datetime`, `logger`, `queue_model`

### `apps\ml\src\data.py`
- Functions: `load_config`, `load_and_prepare`, `chrono_split`
- Imports: `constants`, `logger`, `pandas`, `yaml`

### `apps\ml\src\evaluate.py`
- Functions: `compute_metrics`, `check_overfit`, `severity_sanity`, `write_reference_table`, `learning_curve`, `_metrics`
- Imports: `constants`, `json`, `lightgbm`, `logger`, `matplotlib`, `numpy`, `pandas`, `pathlib`, `sklearn`

### `apps\ml\src\exception.py`
- Classes: `GridLockException`
- Functions: `__init__`
- Imports: `traceback`

### `apps\ml\src\features.py`
- Classes: `Encoders`
- Functions: `engineer_severity`, `_clean_cat`, `fit`, `transform`
- Imports: `constants`, `dataclasses`, `logger`, `numpy`, `pandas`

### `apps\ml\src\fingerprint.py`
- Classes: `Fingerprinter`
- Functions: `_haversine_km`, `__init__`, `find_similar`, `aggregate`
- Imports: `logger`, `numpy`, `pandas`

### `apps\ml\src\logger.py`
- Functions: `get_logger`
- Imports: `logging`, `pathlib`, `sys`

### `apps\ml\src\predict.py`
- Classes: `Predictor`
- Functions: `_severity_label`, `find_latest_artifacts`, `__init__`, `_load_conformal_calibration`, `_load_champion_artifacts`, `_load_legacy_artifacts`, `_compute_conformal_interval`, `_predict_regime_model`, `predict`
- Imports: `catboost`, `constants`, `features`, `fingerprint`, `json`, `lightgbm`, `logger`, `numpy`, `pandas`, `pathlib`, `pickle`, `scipy`

### `apps\ml\src\queue_model.py`
- Classes: `QueueResult`, `DeploymentRecommendation`, `GatingRecommendation`
- Functions: `_get_corridor_profile`, `_time_of_day_multiplier`, `_erlang_b`, `compute_queue_metrics`, `recommend_deployment`, `recommend_gating`
- Imports: `dataclasses`, `logger`, `math`

### `apps\ml\src\train.py`
- Classes: `_LGBWrapper`
- Functions: `_load_model_config`, `_make_encoders_for_fold`, `oof_predictions`, `_suggest_lgb`, `_suggest_cat`, `run_training`, `_suggest_lgb_from_best`, `_suggest_cat_from_best`, `lgb_objective`, `cat_objective`, `__init__`, `predict`
- Imports: `catboost`, `constants`, `data`, `datetime`, `evaluate`, `features`, `json`, `lightgbm`, `logger`, `numpy`, `optuna`, `pandas`, `pathlib`, `pickle`, `sklearn`, `yaml`

## JavaScript/TypeScript Source Signals

### `apps\backend\src\controllers\auth.controller.ts`
- Symbols: `login`, `userResult`, `user`, `isPasswordValid`, `payload`, `secret`, `token`, `refreshToken`, `refreshToken`, `secret`, `userResult`, `user`, `payload`, `newAccessToken`, `newRefreshToken`
- Imports: `../utils/db`, `bcrypt`, `express`, `jsonwebtoken`

### `apps\backend\src\controllers\events.controller.ts`
- Symbols: `ML_BASE`, `callMLPredict`, `response`, `data`, `callQueueAnalysis`, `response`, `callDeployment`, `response`, `callGating`, `response`, `callAnomalyDetection`, `response`, `callCounterfactual`, `response`, `buildPrestagingTimeline`, `start`, `timeline`, `barricadeJunctions`, `runPropagationForecast`, `state`, `currentState`, `checkpoints`, `ticksSoFar`, `ticksNeeded`, `i`, `planEvent`, `corridor`, `eventHour`, `insertQuery`, `insertResult`, `eventId`, `mlResult`, `queueResult`, `anomalyResult`, `propagationForecast`
- Imports: `../services/barricade.service`, `../services/conflict.service`, `../services/graph.service`, `../services/queue.service`, `../services/recommendation.service`, `../services/simulation.service`, `../utils/db`, `express`

### `apps\backend\src\controllers\health.controller.ts`
- Symbols: `getHealthStatus`
- Imports: `express`

### `apps\backend\src\index.ts`
- Symbols: `app`, `server`, `wss`, `subscriberRedis`, `PORT`
- Imports: `./routes/auth.routes`, `./routes/events.routes`, `./routes/graph.routes`, `./routes/health`, `./routes/map.routes`, `cors`, `dotenv`, `express`, `http`, `ioredis`, `ws`

### `apps\backend\src\middleware\auth.middleware.ts`
- Symbols: `authenticateToken`, `authHeader`, `token`, `secret`
- Imports: `express`, `jsonwebtoken`

### `apps\backend\src\routes\auth.routes.ts`
- Symbols: `router`
- Endpoints: `POST /login`, `POST /refresh`
- Imports: `../controllers/auth.controller`, `express`

### `apps\backend\src\routes\events.routes.ts`
- Symbols: `router`
- Endpoints: `POST /plan`, `POST /`, `GET /`, `GET /:id`, `PUT /:id`, `GET /:id/assignments`, `PUT /:id/assignments/:assignmentId`, `GET /:id/barricades`, `PUT /:id/barricades/:barricadeId`
- Imports: `../controllers/events.controller`, `../middleware/auth.middleware`, `express`

### `apps\backend\src\routes\graph.routes.ts`
- Symbols: `router`, `junctions`, `edges`
- Endpoints: `GET /junctions`, `GET /edges`
- Imports: `../services/graph.service`, `express`

### `apps\backend\src\routes\health.ts`
- Symbols: `router`
- Endpoints: `GET /`
- Imports: `../controllers/health.controller`, `express`

### `apps\backend\src\routes\map.routes.ts`
- Symbols: `router`, `query`, `MAPPLS_KEY`, `mapplsRes`, `data`, `fallbackRes`, `fallbackData`, `mapped`
- Endpoints: `GET /autosuggest`
- Imports: `../middleware/auth.middleware`, `express`

### `apps\backend\src\services\barricade.service.ts`
- Symbols: `SEVERITY_HIGH_THRESHOLD`, `CROWD_PERIMETER_THRESHOLD`, `PERIMETER_RADIUS_METERS`, `MAX_SEVERITY_PATH_BARRICADES`, `MAX_PERIMETER_BARRICADES`, `haversineMeters`, `R`, `toRad`, `dLat`, `dLon`, `a`, `ruleRoadClosure`, `epicenter`, `corridors`, `neighbors`, `segmentEdges`, `junction`, `ruleSeverityPath`, `entryIds`, `epicenter`, `t15Entry`, `junction`, `ruleCrowdPerimeter`, `perimeter`, `generateFallbackBarricadePlan`, `ordered`, `seen`, `rationale`, `isValidRawPlan`, `plan`, `buildSystemPrompt`, `buildUserPrompt`, `candidateLines`, `getGroqClient`, `callGroqBarricade`
- Imports: `./graph.service`, `./simulation.service`, `groq-sdk`

### `apps\backend\src\services\conflict.service.ts`
- Symbols: `VICINITY_RADIUS_KM`, `toRad`, `haversineKm`, `R`, `dLat`, `dLon`, `a`, `getEventWindow`, `start`, `end`, `checkSpatialTemporalOverlap`, `distanceKm`, `a`, `b`, `findConflicts`, `distance_km`, `name`

### `apps\backend\src\services\graph.service.ts`
- Symbols: `addEdge`, `minDistance`, `dist`, `edges`, `edge`, `prob`, `hour`, `graphService`

### `apps\backend\src\services\mappls.service.ts`
- Symbols: `MAPPLS_KEY`, `getDistanceMatrix`, `originStr`, `destStr`, `sources`, `targets`, `url`, `res`, `data`

### `apps\backend\src\services\queue.service.ts`
- Symbols: `redisConnection`, `propagationQueue`, `pubSubRedis`, `publishWsEvent`, `schedulePropagationJob`, `stateKey`, `existingState`, `initialState`, `removePropagationJob`, `jobName`, `repeatableJobs`, `jobToRemove`
- Imports: `./simulation.service`, `bullmq`, `dotenv`, `ioredis`

### `apps\backend\src\services\recommendation.service.ts`
- Symbols: `getHistoricalPrecedents`, `VALID_ROLES`, `VALID_PRIORITIES`, `assignNearestFleet`, `i`, `nearestIdx`, `minDist`, `dist`, `ESCALATION_TIERS`, `generateFallbackPlan`, `t15New`, `t30New`, `targets`, `fleetPool`, `junction`, `junctionIdx`, `fleetIdx`, `assignedFleet`, `corridorList`, `rationale`, `buildSystemPrompt`, `buildUserPrompt`, `nameOf`, `etas`, `mins`, `isValidRawPlan`, `plan`, `getGroqClient`, `callGroqDispatch`, `client`, `candidateJunctionNames`, `promptContent`, `completion`, `rawContent`, `cleaned`
- Imports: `./graph.service`, `./mappls.service`, `./simulation.service`, `groq-sdk`

### `apps\backend\src\services\simulation.service.ts`
- Symbols: `nearest`, `timeOfDay`, `nodesToPropagate`, `nodeData`, `neighbors`, `neighborId`, `spreadFactor`, `spreadChance`, `childIntensity`, `roll`, `totalTicks`, `decayFactor`, `activeCount`, `ticksPerMinute`, `state`, `t0Nodes`, `i`, `t15Nodes`, `i`, `t30Nodes`, `simulationService`
- Imports: `./graph.service`

### `apps\backend\src\utils\auth.middleware.ts`
- Symbols: `verifyToken`, `authHeader`, `token`, `secret`, `decoded`
- Imports: `express`, `jsonwebtoken`

### `apps\backend\src\utils\db.ts`
- Symbols: `pool`, `query`, `start`, `res`, `duration`
- Imports: `dotenv`, `pg`

### `apps\backend\src\workers\propagation.worker.ts`
- Symbols: `workerRedis`, `pubSubRedis`, `subscriberRedis`, `data`, `eventId`, `propagationWorker`, `stateKey`, `stateStr`, `interventions`, `interventionsStr`, `currentHour`, `timeOfDay`, `allKeys`, `otherStateStr`, `junction`, `payload`
- Imports: `../services/graph.service`, `../services/simulation.service`, `bullmq`, `dotenv`, `ioredis`

### `apps\frontend\src\App.tsx`
- Symbols: `router`, `App`
- Imports: `./context/AuthContext`, `./routes/router`, `react-router-dom`

### `apps\frontend\src\components\analysis\BarrierRecommendationCard.tsx`
- Symbols: `BarrierRecommendationCard`
- Imports: `../../types`, `lucide-react`

### `apps\frontend\src\components\analysis\FleetRecommendationCard.tsx`
- Symbols: `FleetRecommendationCard`
- Imports: `../../types`, `lucide-react`

### `apps\frontend\src\components\analysis\RiskGauge.tsx`
- Symbols: `RiskGauge`, `color`, `angle`

### `apps\frontend\src\components\analysis\Timeline.tsx`
- Symbols: `Timeline`, `color`, `isNow`, `time`, `timeStr`, `offsetLabel`
- Imports: `../../types`

### `apps\frontend\src\components\auth\ControllerLogin.tsx`
- Symbols: `navigate`, `validate`, `emailResult`, `passwordResult`, `handleSubmit`
- Imports: `../../hooks/useAuth`, `../../utils/validators`, `@/components/ui/button`, `@/components/ui/card`, `@/components/ui/checkbox`, `@/components/ui/input`, `@/components/ui/label`, `lucide-react`, `react`, `react-router-dom`

### `apps\frontend\src\components\auth\FleetLogin.tsx`
- Symbols: `navigate`, `validate`, `emailResult`, `passwordResult`, `handleSubmit`
- Imports: `../../hooks/useAuth`, `../../utils/validators`, `@/components/ui/button`, `@/components/ui/card`, `@/components/ui/checkbox`, `@/components/ui/input`, `@/components/ui/label`, `lucide-react`, `react`, `react-router-dom`

### `apps\frontend\src\components\charts\DeploymentBarChart.tsx`
- Symbols: `DeploymentBarChart`
- Imports: `../../types`, `chart.js`, `react-chartjs-2`

### `apps\frontend\src\components\charts\RiskDistributionChart.tsx`
- Symbols: `RISK_LEVELS`, `RiskDistributionChart`, `counts`, `total`
- Imports: `../../types`, `chart.js`, `react-chartjs-2`

### `apps\frontend\src\components\charts\SeverityTrendChart.tsx`
- Symbols: `SeverityTrendChart`, `recent`, `labels`
- Imports: `../../types`, `chart.js`, `react-chartjs-2`

### `apps\frontend\src\components\dashboard\AppLayout.tsx`
- Symbols: `AppLayout`, `fetchEvents`, `evts`, `interval`, `handlePlanSubmit`, `handleCloseEvent`, `handleEventSelect`, `activeEvents`, `context`
- Imports: `../../hooks/useWebSocket`, `../../types`, `../../utils/api`, `./AppSidebar`, `./ControlPanel`, `./Header`, `react`, `react-router-dom`

### `apps\frontend\src\components\dashboard\AppSidebar.tsx`
- Symbols: `NAV_ITEMS`, `AppSidebar`
- Imports: `@/lib/utils`, `lucide-react`, `react-router-dom`

### `apps\frontend\src\components\dashboard\ControlPanel.tsx`
- Symbols: `ControlPanel`, `navigate`, `handleEventSelect`, `handlePlanSubmit`, `success`
- Imports: `../../types`, `../events/EventList`, `../events/PlanEventForm`, `@/components/ui/scroll-area`, `@/components/ui/separator`, `lucide-react`, `react-router-dom`

### `apps\frontend\src\components\dashboard\FleetDashboard.tsx`
- Symbols: `STATUS_FLOW`, `FleetDashboard`, `updateStatus`, `currentIdx`, `getStatusLabel`, `getStatusIcon`
- Imports: `../../hooks/useAuth`, `../map/MapplsMap`, `@/components/ui/button`, `@/components/ui/card`, `@/components/ui/scroll-area`, `@/components/ui/separator`, `lucide-react`, `react`

### `apps\frontend\src\components\dashboard\Header.tsx`
- Symbols: `Header`
- Imports: `../../hooks/useAuth`, `@/components/ui/avatar`, `@/components/ui/button`, `lucide-react`

## Documentation and Presentation Files

- `CONTRIBUTING.md`
- `docs\api_testing_guide.md`
- `docs\Bengaluru Traffic Incident Dataset.pdf`
- `docs\Congestion Propagation Engine - Advanced Implementation Plan.md`
- `docs\differentiators.md`
- `docs\feature_plan.md`
- `docs\fleet_dispatch_implementation_plan.md`
- `docs\gridlock_feature_list.md`
- `docs\groq_recommendation_service_plan.md`
- `docs\mapmyindia_brainstorm.md`
- `docs\mapmyindia_integration_plan.md`
- `groq_recommendation_service_plan.md`
- `README.md`

## Test Files

- `docs\api_testing_guide.md`

## File Inventory

- `.env.example` | 269 bytes | `9ce69125c30c`
- `.github\workflows\ci.yml` | 4315 bytes | `21c339d70d79`
- `.gitignore` | 5273 bytes | `71ec370a6f25`
- `.husky\pre-commit` | 87 bytes | `b0c58b08df95`
- `apps\backend\.prettierignore` | 37 bytes | `679f5d92ffa6`
- `apps\backend\.prettierrc` | 114 bytes | `046ed72ffa3e`
- `apps\backend\database\migrations\002_events_schema.sql` | 1373 bytes | `49b9fdfee0c9`
- `apps\backend\database\migrations\003_fleet_dispatch.sql` | 2943 bytes | `89d3bdb31572`
- `apps\backend\database\migrations\003_planning_pipeline.sql` | 1455 bytes | `9a768a285da5`
- `apps\backend\database\migrations\004_barricades.sql` | 1675 bytes | `e3ba2202346b`
- `apps\backend\Dockerfile` | 154 bytes | `b16a15b9b967`
- `apps\backend\eslint.config.js` | 2012 bytes | `e56b5044a285`
- `apps\backend\package.json` | 1504 bytes | `e0bfba3fac36`
- `apps\backend\src\controllers\auth.controller.ts` | 3210 bytes | `2ea19c8f8734`
- `apps\backend\src\controllers\events.controller.ts` | 37493 bytes | `d0d8ebf5f8c6`
- `apps\backend\src\controllers\health.controller.ts` | 259 bytes | `51b9f4909fea`
- `apps\backend\src\index.ts` | 1763 bytes | `0f7fe2277029`
- `apps\backend\src\middleware\auth.middleware.ts` | 874 bytes | `cc11baa0244f`
- `apps\backend\src\routes\auth.routes.ts` | 229 bytes | `7aa0214b10a6`
- `apps\backend\src\routes\events.routes.ts` | 1062 bytes | `34346b122623`
- `apps\backend\src\routes\graph.routes.ts` | 559 bytes | `39b049671cfb`
- `apps\backend\src\routes\health.ts` | 192 bytes | `74ebb5496356`
- `apps\backend\src\routes\map.routes.ts` | 2067 bytes | `1629a17d201c`
- `apps\backend\src\services\barricade.service.ts` | 13535 bytes | `38087dc62c78`
- `apps\backend\src\services\conflict.service.ts` | 2630 bytes | `de600dba343f`
- `apps\backend\src\services\graph.service.ts` | 61573 bytes | `5379abace46c`
- `apps\backend\src\services\mappls.service.ts` | 1877 bytes | `187e49808367`
- `apps\backend\src\services\queue.service.ts` | 2664 bytes | `aadfea4d9336`
- `apps\backend\src\services\recommendation.service.ts` | 16021 bytes | `588c3df6eb6f`
- `apps\backend\src\services\simulation.service.ts` | 7380 bytes | `fc2ad572344b`
- `apps\backend\src\utils\auth.middleware.ts` | 1096 bytes | `b36b88ada1b5`
- `apps\backend\src\utils\db.ts` | 487 bytes | `4f54a792df80`
- `apps\backend\src\workers\propagation.worker.ts` | 5163 bytes | `665b466f1229`
- `apps\backend\tsconfig.json` | 322 bytes | `06442cf91166`
- `apps\frontend\.prettierignore` | 37 bytes | `679f5d92ffa6`
- `apps\frontend\.prettierrc` | 114 bytes | `046ed72ffa3e`
- `apps\frontend\Dockerfile` | 149 bytes | `5194cb85ec95`
- `apps\frontend\eslint.config.js` | 2542 bytes | `c273159943ed`
- `apps\frontend\index.html` | 567 bytes | `df96ba9eff4d`
- `apps\frontend\package.json` | 1822 bytes | `6066a6993e48`
- `apps\frontend\src\App.tsx` | 361 bytes | `89b1a2ae26c0`
- `apps\frontend\src\components\analysis\BarrierRecommendationCard.tsx` | 2939 bytes | `6ba0dfee985e`
- `apps\frontend\src\components\analysis\FleetRecommendationCard.tsx` | 3498 bytes | `ac368b043e0b`
- `apps\frontend\src\components\analysis\RiskGauge.tsx` | 3120 bytes | `09cfd2180d04`
- `apps\frontend\src\components\analysis\Timeline.tsx` | 2260 bytes | `e197c7658afb`
- `apps\frontend\src\components\auth\ControllerLogin.tsx` | 11119 bytes | `d5923d738366`
- `apps\frontend\src\components\auth\FleetLogin.tsx` | 11934 bytes | `a372d1516d3e`
- `apps\frontend\src\components\charts\DeploymentBarChart.tsx` | 1337 bytes | `89ee92581ce9`
- `apps\frontend\src\components\charts\RiskDistributionChart.tsx` | 1662 bytes | `aabf09765530`
- `apps\frontend\src\components\charts\SeverityTrendChart.tsx` | 1891 bytes | `d4decac8e984`
- `apps\frontend\src\components\dashboard\AppLayout.tsx` | 5331 bytes | `4d915c346342`
- `apps\frontend\src\components\dashboard\AppSidebar.tsx` | 1462 bytes | `73df8f7f7ce2`
- `apps\frontend\src\components\dashboard\ControlPanel.tsx` | 2658 bytes | `58426225c256`
- `apps\frontend\src\components\dashboard\FleetDashboard.tsx` | 13885 bytes | `5a0a76289e34`
- `apps\frontend\src\components\dashboard\Header.tsx` | 3902 bytes | `a635ed1f6cf5`
- `apps\frontend\src\components\dashboard\pages\DetailedReportsPage.tsx` | 7198 bytes | `9166d5fb8856`
- `apps\frontend\src\components\dashboard\pages\LiveMapPage.tsx` | 1121 bytes | `ddb2ece3c18d`
- `apps\frontend\src\components\dashboard\pages\OverviewPage.tsx` | 6311 bytes | `3735d0977592`
- `apps\frontend\src\components\dashboard\pages\PerformancePage.tsx` | 4655 bytes | `3d6d7f8f2237`
- `apps\frontend\src\components\dashboard\pages\SettingsPage.tsx` | 3511 bytes | `47c3abc9f14f`
- `apps\frontend\src\components\events\EventList.tsx` | 4738 bytes | `d9b72ca0531e`
- `apps\frontend\src\components\events\PlanEventForm.tsx` | 13082 bytes | `42fc7e7e5718`
- `apps\frontend\src\components\LandingPage.tsx` | 4956 bytes | `9ba7012ce14a`
- `apps\frontend\src\components\map\MapplsMap.tsx` | 17348 bytes | `9e4d663ab34a`
- `apps\frontend\src\components\ui\avatar.tsx` | 1082 bytes | `9b21442e11f5`
- `apps\frontend\src\components\ui\badge.tsx` | 1253 bytes | `d1235107dd92`
- `apps\frontend\src\components\ui\button.tsx` | 2209 bytes | `6480a7f9dac7`
- `apps\frontend\src\components\ui\card.tsx` | 1995 bytes | `611ebd2eb122`
- `apps\frontend\src\components\ui\checkbox.tsx` | 1252 bytes | `8c573dc21714`
- `apps\frontend\src\components\ui\input.tsx` | 989 bytes | `3723fd8b052e`
- `apps\frontend\src\components\ui\label.tsx` | 629 bytes | `2234c64d1bbf`
- `apps\frontend\src\components\ui\scroll-area.tsx` | 1682 bytes | `d658f36414e8`
- `apps\frontend\src\components\ui\separator.tsx` | 733 bytes | `77c3aedf8f12`
- `apps\frontend\src\components\ui\tabs.tsx` | 1796 bytes | `d40efbe2c2f4`
- `apps\frontend\src\context\AuthContext.tsx` | 2877 bytes | `222b4f997a0b`
- `apps\frontend\src\hooks\useAuth.ts` | 279 bytes | `09c11f916f01`
- `apps\frontend\src\hooks\useMapplsMap.ts` | 5475 bytes | `04fff7199468`
- `apps\frontend\src\hooks\useWebSocket.ts` | 1649 bytes | `2126a7ccd678`
- `apps\frontend\src\index.css` | 4858 bytes | `31f2ca99187d`
- `apps\frontend\src\lib\utils.ts` | 1109 bytes | `d9eb42f170c4`
- `apps\frontend\src\main.tsx` | 250 bytes | `3525a03be137`
- `apps\frontend\src\routes\router.tsx` | 2963 bytes | `cbf9c9c9b659`
- `apps\frontend\src\types\auth.ts` | 315 bytes | `4f212fcf5aee`
- `apps\frontend\src\types\index.ts` | 4623 bytes | `5ffcce2037b4`
- `apps\frontend\src\utils\api.ts` | 6124 bytes | `29293351fcec`
- `apps\frontend\src\utils\mappls.ts` | 798 bytes | `b4234ca3b604`
- `apps\frontend\src\utils\validators.ts` | 929 bytes | `22c81dafa777`
- `apps\frontend\src\vite-env.d.ts` | 39 bytes | `424faf9241dd`
- `apps\frontend\tsconfig.json` | 702 bytes | `f04e63edbd7e`
- `apps\frontend\tsconfig.node.json` | 244 bytes | `e2926034a7ed`
- `apps\frontend\vite.config.ts` | 753 bytes | `19947e42cc98`
- `apps\ml\.dockerignore` | 342 bytes | `75a46754b723`
- `apps\ml\.dvc\.gitignore` | 14 bytes | `896836ab6ca9`
- `apps\ml\.dvc\config` | 27 bytes | `80da08b45c82`
- `apps\ml\.dvcignore` | 142 bytes | `caf35ffe0032`
- `apps\ml\.gitignore` | 162 bytes | `071f2e2e0aaa`
- `apps\ml\config\experiment.yaml` | 742 bytes | `6de0db2cc271`
- `apps\ml\config\model.yaml` | 684 bytes | `6e7940c1bf42`
- `apps\ml\config\schema.yaml` | 491 bytes | `774ba1397790`
- `apps\ml\data\incidents.csv` | 4546990 bytes | `a5adac1326ad`
- `apps\ml\data\incidents.csv.dvc` | 101 bytes | `aa9ac11642de`
- `apps\ml\demo.py` | 647 bytes | `abe106f7a31a`
- `apps\ml\Dockerfile` | 360 bytes | `3a1f36251cef`
- `apps\ml\dvc.lock` | 699 bytes | `282027119192`
- `apps\ml\dvc.yaml` | 299 bytes | `1d8d9eca2107`
- `apps\ml\experiments\__init__.py` | 0 bytes | `e3b0c44298fc`
- `apps\ml\experiments\evaluate.py` | 4593 bytes | `624a2016697b`
- `apps\ml\experiments\feature_registry.py` | 12287 bytes | `1b80f22fef4b`
- `apps\ml\experiments\mlflow_config.py` | 2773 bytes | `bc9b415d1743`
- `apps\ml\experiments\model_registry.py` | 4526 bytes | `4f7807b444a4`
- `apps\ml\experiments\promote.py` | 15463 bytes | `1671cccd1eb5`
- `apps\ml\experiments\run_experiment.py` | 19607 bytes | `279fd622bc6e`
- `apps\ml\experiments\tournament.py` | 21733 bytes | `195ad87f9bdd`
- `apps\ml\requirements.txt` | 184 bytes | `3ace59fae0e7`
- `apps\ml\scripts\prepare_data.py` | 746 bytes | `90daf2ed0350`
- `apps\ml\src\__init__.py` | 0 bytes | `e3b0c44298fc`
- `apps\ml\src\anomaly.py` | 11831 bytes | `88bce89a7166`
- `apps\ml\src\api\__init__.py` | 0 bytes | `e3b0c44298fc`
- `apps\ml\src\api\main.py` | 6312 bytes | `359ad465904a`
- `apps\ml\src\api\schemas.py` | 6474 bytes | `7baebb5bd224`
- `apps\ml\src\api\service.py` | 2378 bytes | `b5eb328d1d1d`
- `apps\ml\src\constants.py` | 1757 bytes | `177358d751bd`
- `apps\ml\src\counterfactual.py` | 5579 bytes | `35fa03aea717`
- `apps\ml\src\data.py` | 1878 bytes | `6dc39ba6934f`
- `apps\ml\src\evaluate.py` | 6435 bytes | `1bb27fe3edaa`
- `apps\ml\src\exception.py` | 262 bytes | `d3d189b13e6a`
- `apps\ml\src\features.py` | 6158 bytes | `58a7db7c6c50`
- `apps\ml\src\fingerprint.py` | 4013 bytes | `10136e45a726`
- `apps\ml\src\logger.py` | 892 bytes | `873e3da07577`
- `apps\ml\src\predict.py` | 12965 bytes | `47cc3f94cba0`
- `apps\ml\src\queue_model.py` | 12113 bytes | `42bf98db9e51`
- `apps\ml\src\train.py` | 17441 bytes | `3eeebdfece54`
- `CONTRIBUTING.md` | 3802 bytes | `056914a102d4`
- `docker-compose.yml` | 1613 bytes | `a79e09b71b47`
- `docs\api_testing_guide.md` | 14832 bytes | `788e60f9f6ad`
- `docs\Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv` | 4546990 bytes | `a5adac1326ad`
- `docs\Bengaluru Traffic Incident Dataset.pdf` | 25311 bytes | `976360a9f262`
- `docs\Congestion Propagation Engine - Advanced Implementation Plan.md` | 4740 bytes | `fb3dd6252d38`
- `docs\differentiators.md` | 4663 bytes | `d07876b95903`
- `docs\feature_plan.md` | 6648 bytes | `2e5a26ded07d`
- `docs\fleet_dispatch_implementation_plan.md` | 7531 bytes | `57214582a24d`
- `docs\gridlock_feature_list.md` | 26122 bytes | `97e6e468bf48`
- `docs\groq_recommendation_service_plan.md` | 7072 bytes | `f3e4aef0491a`
- `docs\mapmyindia_brainstorm.md` | 13608 bytes | `55fee132e0f7`
- `docs\mapmyindia_integration_plan.md` | 24806 bytes | `8c6f5c024922`
- `groq_recommendation_service_plan.md` | 7072 bytes | `f3e4aef0491a`
- `LICENSE` | 1092 bytes | `6624a8aa54ff`
- `package-lock.json` | 244146 bytes | `047ce3460615`
- `package.json` | 324 bytes | `6564be2fbc38`
- `README.md` | 7884 bytes | `3cb7c12e140e`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

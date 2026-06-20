# gridlock-v3

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock-v3`
- Git remote: `https://github.com/vibhutidureja/gridlock.git`
- Git branch: `main`
- Git HEAD: `4e8cff80befd769c0bbc329dd3e69920baa89982`
- Fingerprint: `875d70f81b1f486adbbab85f1f4913e14a3bab5940dd3e5238b7d606866c4983`
- Files indexed: `131`
- Indexed size: `24477032` bytes

## Stack Signals

- `Docker`
- `Docker Compose`
- `FastAPI`
- `Next.js`
- `Node/Express`
- `Notebook`
- `React`
- `Tailwind CSS`

## Traffic Problem Signals

- traffic: astram, bangalore, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, police, resource
- models: catboost, classifier, gru, kmeans, lstm, random forest, randomforest
- routing: a*, google maps, osrm

## Manifests

- `backend\Dockerfile`
- `backend\requirements.txt`
- `docker-compose.yml`
- `frontend\Dockerfile`
- `frontend\package.json`

## Package Files

### `frontend\package.json`
- Name: `frontend`
- Scripts:
  - `dev`: `next dev --webpack`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `eslint`
  - `test`: `playwright test`
- Dependencies: `@playwright/test`, `@tailwindcss/postcss`, `@types/leaflet`, `@types/node`, `@types/react`, `@types/react-dom`, `axios`, `eslint`, `eslint-config-next`, `leaflet`, `lucide-react`, `next`, `react`, `react-dom`, `react-leaflet`, `tailwindcss`, `typescript`

## Python Dependencies

### `backend\requirements.txt`
- `fastapi>=0.100.0`
- `uvicorn>=0.23.0`
- `sqlalchemy>=2.0.0`
- `geoalchemy2>=0.14.0`
- `psycopg2-binary>=2.9.0`
- `networkx>=3.1`
- `neo4j>=5.10.0`
- `catboost>=1.2`
- `scikit-learn>=1.3.0`
- `ortools>=9.7`
- `langchain>=0.0.300`
- `langchain-openai>=0.0.2`
- `openai>=1.0.0`
- `pytest>=7.4.0`
- `fastapi>=0.100.0`
- `uvicorn>=0.23.0`
- `sqlalchemy>=2.0.0`
- `geoalchemy2>=0.14.0`
- `psycopg2-binary>=2.9.0`
- `networkx>=3.1`
- `neo4j>=5.10.0`
- `catboost>=1.2`
- `scikit-learn>=1.3.0`
- `ortools>=9.7`
- `langchain>=0.0.300`
- `langchain-openai>=0.0.2`
- `openai>=1.0.0`
- `pytest>=7.4.0`
- `httpx>=0.24.0`
- `hypothesis>=6.82.0`
- `alembic>=1.12.0`
- `pydantic>=2.0.0`
- `pydantic-settings>=2.0.0`
- `pandas>=2.0.0`
- `gymnasium>=0.29.0`
- `stable-baselines3[extra]>=2.1.0`
- `sb3-contrib>=2.1.0`

## README Headings

- `README.md`: # Gridlock: AI-Driven Traffic Management
- `README.md`: ## Problem Statement
- `README.md`: ## Architecture
- `README.md`: ### Dataset & Feature Engineering
- `README.md`: ### CatBoost & RL Architecture
- `README.md`: ## Competition-Ready Metrics
- `README.md`: ## Final Ablation Table
- `README.md`: ## Discoveries & Oracle Analysis
- `README.md`: ## Limitations & Future Work
- `frontend\README.md`: ## Getting Started
- `frontend\README.md`: # or
- `frontend\README.md`: # or
- `frontend\README.md`: # or
- `frontend\README.md`: ## Learn More
- `frontend\README.md`: ## Deploy on Vercel

## README Claims and Operational Notes

- `README.md`: Traffic management centers receive thousands of anomaly reports daily. Dispatching emergency services to every minor incident is prohibitively expensive, but ignoring early-warning signs leads to gridlock. Gridlock so...
- `README.md`: A[Raw Traffic Events] --> B[Feature Engineering]
- `README.md`: B --> C[CatBoost Risk Prediction]
- `README.md`: ### Dataset & Feature Engineering
- `README.md`: Trained on anonymized Astram event data. Features include:
- `README.md`: 1. **CatBoost Model**: Provides a real-time predictive probability of an event breaching the SLA.
- `README.md`: * **Best Cost Efficiency**: `7.45` Cost/Breach (Feature-Enriched Scenario A)
- `README.md`: | **Feature-Enriched PPO** | 44.60% | 7.45 | Added context features, peak efficiency |
- `README.md`: | **Scenario C PPO (No Masks)** | **60.00%** | **9.78** | **Final Production Model** |
- `frontend\README.md`: This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
- `frontend\README.md`: First, run the development server:
- `frontend\README.md`: npm run dev
- `frontend\README.md`: - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- `frontend\README.md`: You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
- `frontend\README.md`: ## Deploy on Vercel
- `frontend\README.md`: The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the cre...
- `frontend\README.md`: Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Data Assets

- `backend\models\final_model_config.json`
- `dataset\Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv`

## Model and Artifact Assets

- `backend\models\final_model_config.json`
- `backend\models\sla_model.cbm`
- `backend\models\time_model.cbm`
- `backend\models\vec_normalize.pkl`
- `backend\models\vec_normalize_b.pkl`
- `backend\models\vec_normalize_c.pkl`
- `backend\models\vec_normalize_feature.pkl`
- `backend\models\vec_normalize_final.pkl`
- `backend\models\vec_normalize_prevention.pkl`
- `backend\models\vec_normalize_risk.pkl`

## Notebooks

### `backend\models\updated_model.ipynb`
- Cells: `44`
- Imports: `catboost`, `matplotlib`, `numpy`, `pandas`, `seaborn`, `sklearn`
- Keywords: `astram`, `catboost`, `classifier`, `closure`, `kmeans`, `police`


## API Endpoints

- `GET /`
- `GET /health`
- `POST /`
- `POST /api/v1/event/ingest`
- `POST /api/v1/simulate`
- `PUT /{event_id}`
- `app.GET /`
- `app.GET /health`
- `app.POST /api/v1/event/ingest`
- `app.POST /api/v1/simulate`
- `router.GET /`
- `router.POST /`
- `router.PUT /{event_id}`

## Python Source Signals

### `backend\alembic\env.py`
- Functions: `include_object`, `run_migrations_offline`, `run_migrations_online`
- Imports: `alembic`, `app`, `logging`, `os`, `sqlalchemy`, `sys`

### `backend\alembic\versions\ac31f97df29f_sqlite_init.py`
- Functions: `upgrade`, `downgrade`
- Imports: `alembic`, `sqlalchemy`, `typing`

### `backend\app\ai_orchestrator.py`
- Classes: `AIOrchestrator`
- Functions: `query_graph`, `run_counterfactual`, `__init__`, `generate_operational_brief`
- Imports: `app`, `langchain`, `langchain_openai`, `os`

### `backend\app\causal_engine.py`
- Classes: `CausalEngine`
- Functions: `__init__`, `score_intervention`
- Imports: `time`

### `backend\app\database.py`
- Functions: `get_db`
- Imports: `os`, `sqlalchemy`

### `backend\app\knowledge_graph.py`
- Classes: `KnowledgeGraph`
- Functions: `__init__`, `close`, `find_successful_interventions`
- Imports: `neo4j`, `os`

### `backend\app\main.py`
- Classes: `EventIngestRequest`, `EventIngestResponse`, `SimulateRequest`, `SimulateResponse`
- Functions: `read_root`, `health_check`, `ingest_event`, `simulate_intervention`
- Endpoints: `GET /`, `GET /health`, `POST /api/v1/event/ingest`, `POST /api/v1/simulate`, `app.GET /`, `app.GET /health`, `app.POST /api/v1/event/ingest`, `app.POST /api/v1/simulate`
- Imports: `app`, `fastapi`, `pydantic`, `time`, `typing`, `uuid`

### `backend\app\ml_engine.py`
- Classes: `MLEngine`
- Functions: `__init__`, `predict`
- Imports: `app`, `catboost`, `os`

### `backend\app\models.py`
- Classes: `TrafficEvent`, `SimulatedIntervention`
- Imports: `app`, `datetime`, `sqlalchemy`, `uuid`

### `backend\app\network_graph.py`
- Classes: `TrafficGraph`
- Functions: `__init__`, `_build_silk_board_subgraph`, `reset_graph`, `inject_shockwave`, `shortest_path`
- Imports: `networkx`, `time`

### `backend\app\optimization.py`
- Classes: `InterventionOptimizer`
- Functions: `__init__`, `optimize_ties`
- Imports: `app`, `time`

### `backend\app\rl\traffic_env.py`
- Classes: `TrafficManagementEnv`
- Functions: `__init__`, `reset`, `step`, `action_masks`, `_get_obs`, `_generate_dummy_data`
- Imports: `gymnasium`, `numpy`

### `backend\app\rl_inference.py`
- Classes: `MockTrafficEnv`, `SimulationContext`, `RLInference`
- Functions: `__init__`, `reset`, `step`, `__init__`, `update`, `__init__`, `predict_action`, `get_strategy_mapping`, `get_resource_allocation`
- Imports: `gymnasium`, `numpy`, `os`, `sb3_contrib`, `stable_baselines3`, `sys`

### `backend\app\routers\events.py`
- Classes: `EventCreate`, `EventUpdate`, `EventResponse`
- Functions: `create_event`, `get_events`, `update_event`
- Endpoints: `POST /`, `GET /`, `PUT /{event_id}`, `router.POST /`, `router.GET /`, `router.PUT /{event_id}`
- Imports: `app`, `fastapi`, `pydantic`, `sqlalchemy`, `typing`, `uuid`

### `backend\app\routers\predict.py`
- Classes: `PredictRequest`, `PredictResponse`
- Functions: `predict_impact`
- Endpoints: `POST /`, `router.POST /`
- Imports: `app`, `fastapi`, `pydantic`

### `backend\app\simulation.py`
- Classes: `CounterfactualSimulator`
- Functions: `__init__`, `calculate_network_delay`, `simulate`
- Imports: `networkx`

### `backend\scripts\ceiling_analysis.py`
- Functions: `task_a`, `task_b`, `task_cd`
- Imports: `app`, `catboost`, `numpy`, `os`, `pandas`, `sb3_contrib`, `scripts`, `stable_baselines3`, `sys`

### `backend\scripts\evaluate_ablation.py`
- Functions: `evaluate_ablation_scenario`, `run_evaluation`
- Imports: `app`, `catboost`, `numpy`, `os`, `sb3_contrib`, `scripts`, `stable_baselines3`, `sys`

### `backend\scripts\evaluate_rl.py`
- Functions: `evaluate_policy`, `evaluate_baselines`
- Imports: `app`, `catboost`, `numpy`, `os`, `sb3_contrib`, `scripts`, `stable_baselines3`, `sys`

### `backend\scripts\feature_analysis.py`
- Functions: `feature_gap`
- Imports: `catboost`, `os`, `pandas`, `sys`

### `backend\scripts\fix_seed.py`
- Functions: `fix_events`
- Imports: `app`, `os`, `random`, `sys`

### `backend\scripts\freeze_model.py`
- Functions: `freeze_model`
- Imports: `json`, `os`, `shutil`

### `backend\scripts\mask_ablation_oracle.py`
- Functions: `get_valid_actions`, `get_modifier`, `get_cost`, `calculate_oracle_ceiling`, `run_oracle`
- Imports: `catboost`, `numpy`, `os`, `pandas`, `scripts`, `sys`

### `backend\scripts\oracle_analysis.py`
- Functions: `get_valid_actions`, `get_modifier`, `get_cost`, `run_oracle`
- Imports: `catboost`, `numpy`, `os`, `pandas`, `scripts`, `sys`

### `backend\scripts\plot_final_results.py`
- Functions: `plot_prevention_comparison`, `plot_cost_comparison`, `plot_oracle_gap`, `plot_mask_ablation`, `plot_action_distribution`
- Imports: `matplotlib`, `numpy`, `os`, `pandas`, `seaborn`

### `backend\scripts\plot_results.py`
- Functions: `generate_plots`
- Imports: `matplotlib`, `numpy`, `os`

### `backend\scripts\seed_dataset.py`
- Functions: `seed_data`
- Imports: `os`, `pandas`, `requests`

### `backend\scripts\seed_neo4j.py`
- Functions: `seed_db`
- Imports: `neo4j`, `os`

### `backend\scripts\temporal_analysis.py`
- Functions: `run_temporal_analysis`
- Imports: `app`, `catboost`, `numpy`, `os`, `pandas`, `scipy`, `scripts`, `sklearn`, `sys`

### `backend\scripts\train_ablation.py`
- Functions: `train_scenario`
- Imports: `app`, `catboost`, `os`, `sb3_contrib`, `scripts`, `stable_baselines3`, `sys`

### `backend\scripts\train_ml.py`
- Functions: `load_and_preprocess_data`, `train_and_save`
- Imports: `catboost`, `numpy`, `os`, `pandas`, `warnings`

### `backend\scripts\train_rl.py`
- Functions: `load_and_prepare_daily_data`, `train_rl_agent`
- Imports: `app`, `catboost`, `numpy`, `os`, `pandas`, `sb3_contrib`, `stable_baselines3`, `sys`

### `backend\scripts\tune_rl.py`
- Functions: `evaluate_model`, `objective`, `tune_with_optuna`
- Imports: `app`, `catboost`, `numpy`, `optuna`, `os`, `pandas`, `sb3_contrib`, `scripts`, `stable_baselines3`, `sys`

### `backend\test_stress.py`
- Functions: `run_tests`
- Imports: `app`, `fastapi`, `json`

### `backend\tests\test_ai.py`
- Functions: `test_generate_operational_brief`, `test_generate_operational_brief_fallback`
- Imports: `app`, `unittest`

## JavaScript/TypeScript Source Signals

### `frontend\playwright.config.ts`
- Symbols: `PORT`, `baseURL`
- Imports: `@playwright/test`, `path`

### `frontend\src\app\layout.tsx`
- Symbols: `geistSans`, `geistMono`, `RootLayout`
- Imports: `@/components/Navbar`, `@/components/Sidebar`, `next`, `next/font/google`

### `frontend\src\app\page.tsx`
- Symbols: `Home`, `fetchEvents`, `data`, `interval`
- Imports: `@/components/EventFeed`, `@/components/EventForm`, `@/components/KPICards`, `@/components/SimulationPanel`, `@/components/TrafficMap`, `@/lib/api`, `react`

### `frontend\src\components\EventFeed.tsx`
- Symbols: `EventFeed`, `CheckCircle`
- Imports: `lucide-react`

### `frontend\src\components\EventForm.tsx`
- Symbols: `EventForm`, `handleSubmit`
- Imports: `@/lib/api`, `lucide-react`, `react`

### `frontend\src\components\KPICards.tsx`
- Symbols: `KPICards`, `activeEvents`, `avgResolution`
- Imports: `lucide-react`

### `frontend\src\components\Navbar.tsx`
- Symbols: `Navbar`
- Imports: `lucide-react`

### `frontend\src\components\Sidebar.tsx`
- Symbols: `Sidebar`
- Imports: `lucide-react`, `next/link`

### `frontend\src\components\SimulationPanel.tsx`
- Symbols: `SimulationPanel`, `handleSimulate`, `targetEvent`, `res`
- Imports: `@/lib/api`, `lucide-react`, `react`

### `frontend\src\components\TrafficMap.tsx`
- Symbols: `TrafficMapInner`, `TrafficMap`
- Imports: `next/dynamic`, `react`

### `frontend\src\components\TrafficMapInner.tsx`
- Symbols: `icon`, `TrafficMapInner`, `mapKey`, `tileUrl`, `fetchedIds`, `fetchRoutes`, `lat`, `lon`, `coords`, `seed`, `dist`, `branches`, `res`, `data`, `coords`, `lat`, `lon`, `coords`, `sev`, `lineColor`, `eventPaths`
- Imports: `leaflet`, `react`, `react-leaflet`

### `frontend\src\lib\api.ts`
- Symbols: `envUrl`, `API_URL`, `baseURL`, `api`, `getEvents`, `response`, `createEvent`, `response`, `simulateImpact`, `response`, `predictImpact`, `response`
- Imports: `axios`

### `frontend\tests\app.spec.ts`
- Symbols: `json`, `json`, `markers`
- Imports: `@playwright/test`

### `frontend\tests\e2e.spec.ts`
- Symbols: `eventTypeSelect`, `submitButton`
- Imports: `@playwright/test`

### `frontend\tests\map.spec.ts`
- Symbols: `markers`
- Imports: `@playwright/test`

## Documentation and Presentation Files

- `design.md`
- `frontend\AGENTS.md`
- `frontend\CLAUDE.md`
- `frontend\README.md`
- `README.md`
- `REPORT.md`
- `requirements.md`
- `Tasks.md`

## Test Files

- `backend\pytest.ini`
- `backend\scripts\test_inflation.py`
- `backend\test_stress.py`
- `backend\tests\__init__.py`
- `backend\tests\test_ai.py`
- `backend\tests\test_kg.py`
- `backend\tests\test_main.py`
- `backend\tests\test_ml.py`
- `backend\tests\test_models.py`
- `backend\tests\test_optimization.py`
- `backend\tests\test_simulation.py`
- `frontend\tests\app.spec.ts`
- `frontend\tests\e2e.spec.ts`
- `frontend\tests\map.spec.ts`

## File Inventory

- `.gitignore` | 230 bytes | `d9cb955c42d1`
- `backend\alembic.ini` | 5157 bytes | `8a70641ffa66`
- `backend\alembic\env.py` | 2227 bytes | `b9f5db7011a8`
- `backend\alembic\README` | 38 bytes | `31595cf53626`
- `backend\alembic\script.py.mako` | 732 bytes | `a60ec5244369`
- `backend\alembic\versions\ac31f97df29f_sqlite_init.py` | 2686 bytes | `f84dc6b715e5`
- `backend\app\__init__.py` | 20 bytes | `3b34308f7c4e`
- `backend\app\ai_orchestrator.py` | 3061 bytes | `0bec91bf8b60`
- `backend\app\causal_engine.py` | 1196 bytes | `d37d03541e0a`
- `backend\app\database.py` | 545 bytes | `91cfff0b9cdd`
- `backend\app\knowledge_graph.py` | 1809 bytes | `3245c78902a5`
- `backend\app\main.py` | 5636 bytes | `0ce6caae7677`
- `backend\app\ml_engine.py` | 2764 bytes | `6309ff891dcd`
- `backend\app\models.py` | 1243 bytes | `714908b67462`
- `backend\app\network_graph.py` | 4341 bytes | `681e97531974`
- `backend\app\optimization.py` | 2224 bytes | `dc5d33a44f69`
- `backend\app\rl\traffic_env.py` | 7031 bytes | `d8bbf2009820`
- `backend\app\rl_inference.py` | 6161 bytes | `24fdcb7ef549`
- `backend\app\routers\__init__.py` | 25 bytes | `80df76ce8141`
- `backend\app\routers\events.py` | 1937 bytes | `2af55449ea42`
- `backend\app\routers\predict.py` | 716 bytes | `d3b517fbe9ca`
- `backend\app\simulation.py` | 2907 bytes | `90e56c7f00ec`
- `backend\Dockerfile` | 343 bytes | `924903863d87`
- `backend\logs\MaskablePPO_1\events.out.tfevents.1781898412.LAPTOP-6OB0VAML.5244.0` | 27483 bytes | `e4f90a285320`
- `backend\logs\MaskablePPO_2\events.out.tfevents.1781899476.LAPTOP-6OB0VAML.26032.0` | 27483 bytes | `cb6dddf815ef`
- `backend\logs\MaskablePPO_3\events.out.tfevents.1781900370.LAPTOP-6OB0VAML.24760.0` | 88 bytes | `5d0183275cde`
- `backend\logs\MaskablePPO_4\events.out.tfevents.1781900408.LAPTOP-6OB0VAML.27488.0` | 27483 bytes | `99f1ab6e65dc`
- `backend\models\extracted_code.py` | 14291 bytes | `58933f3ceba0`
- `backend\models\final_model_config.json` | 1241 bytes | `e80e09553c0e`
- `backend\models\ppo_feature_agent.zip` | 154141 bytes | `f6ed79a838b7`
- `backend\models\ppo_final.zip` | 154016 bytes | `63c4e2afc195`
- `backend\models\ppo_prevention_agent.zip` | 150969 bytes | `78d28b112a6a`
- `backend\models\ppo_risk_aware_agent.zip` | 150971 bytes | `fff19833430c`
- `backend\models\ppo_scenario_b.zip` | 154016 bytes | `c1f8c76420dd`
- `backend\models\ppo_scenario_c.zip` | 154016 bytes | `63c4e2afc195`
- `backend\models\ppo_traffic_agent.zip` | 150887 bytes | `4275497cc044`
- `backend\models\sla_model.cbm` | 12469908 bytes | `e2ff14ed54bf`
- `backend\models\time_model.cbm` | 3247492 bytes | `41ba90df35bf`
- `backend\models\updated_model.ipynb` | 768129 bytes | `6df9de2952b5`
- `backend\models\vec_normalize.pkl` | 2081 bytes | `37d9175c6885`
- `backend\models\vec_normalize_b.pkl` | 2120 bytes | `08c9ffa9cd89`
- `backend\models\vec_normalize_c.pkl` | 2120 bytes | `d8fbfd0d2277`
- `backend\models\vec_normalize_feature.pkl` | 2140 bytes | `44ffd6b6a759`
- `backend\models\vec_normalize_final.pkl` | 2120 bytes | `d8fbfd0d2277`
- `backend\models\vec_normalize_prevention.pkl` | 2080 bytes | `1ac062455c5f`
- `backend\models\vec_normalize_risk.pkl` | 2081 bytes | `30dbffe316f2`
- `backend\optuna_results.csv` | 1687 bytes | `61e32bb9fd13`
- `backend\pytest.ini` | 69 bytes | `023f02668eaf`
- `backend\requirements.txt` | 690 bytes | `87a6b8ccf801`
- `backend\scripts\action_dist_plot.png` | 129531 bytes | `ae34370e53a3`
- `backend\scripts\ceiling_analysis.py` | 7758 bytes | `5fa8749e5edf`
- `backend\scripts\cost_plot.png` | 84746 bytes | `bfdbcc238251`
- `backend\scripts\evaluate_ablation.py` | 3671 bytes | `2cb468aa902b`
- `backend\scripts\evaluate_rl.py` | 8354 bytes | `08d4c5412c20`
- `backend\scripts\feature_analysis.py` | 2359 bytes | `37e732f71769`
- `backend\scripts\fix_seed.py` | 1296 bytes | `fc87ea456e4e`
- `backend\scripts\freeze_model.py` | 2542 bytes | `7712d9f24b86`
- `backend\scripts\mask_ablation_oracle.py` | 4853 bytes | `e2e0f4a99acb`
- `backend\scripts\oracle_analysis.py` | 6020 bytes | `0aca0cb2c700`
- `backend\scripts\plot_final_results.py` | 6132 bytes | `3ac9ad60265e`
- `backend\scripts\plot_results.py` | 2514 bytes | `0101f030b44e`
- `backend\scripts\prevention_plot.png` | 92502 bytes | `9b9f760acadf`
- `backend\scripts\seed_dataset.py` | 1547 bytes | `4938cdea2b84`
- `backend\scripts\seed_neo4j.py` | 1940 bytes | `e20c0092bed4`
- `backend\scripts\temporal_analysis.py` | 6996 bytes | `d3bb1beec530`
- `backend\scripts\test_inflation.py` | 1489 bytes | `b3281d9ae6bb`
- `backend\scripts\train_ablation.py` | 2314 bytes | `27d3ae185244`
- `backend\scripts\train_ml.py` | 4381 bytes | `39e461b41595`
- `backend\scripts\train_rl.py` | 6452 bytes | `d57619212ca0`
- `backend\scripts\tune_rl.py` | 3847 bytes | `e8bdb2e4ccff`
- `backend\test_stress.py` | 1487 bytes | `f80ac793c066`
- `backend\tests\__init__.py` | 14 bytes | `2c9c007737ad`
- `backend\tests\test_ai.py` | 1129 bytes | `664f0141cc8d`
- `backend\tests\test_kg.py` | 1301 bytes | `0b40a259f46f`
- `backend\tests\test_main.py` | 958 bytes | `4a5dbe3118ba`
- `backend\tests\test_ml.py` | 595 bytes | `2d6066045dbf`
- `backend\tests\test_models.py` | 959 bytes | `e699bf34fc6c`
- `backend\tests\test_optimization.py` | 861 bytes | `7fe816415603`
- `backend\tests\test_simulation.py` | 466 bytes | `5c72e28fdfba`
- `backend\urbanflow.db` | 40960 bytes | `2f38ec897d0f`
- `charts\action_distribution.png` | 125825 bytes | `97704703b630`
- `charts\cost_comparison.png` | 151659 bytes | `1999af3d329f`
- `charts\mask_ablation_results.png` | 194851 bytes | `4650e031d505`
- `charts\oracle_vs_ppo_gap.png` | 133534 bytes | `113e9a240f47`
- `charts\prevention_comparison.png` | 152214 bytes | `aa9d5b1518c8`
- `dataset\Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv` | 4547022 bytes | `11469a7450fd`
- `design.md` | 5462 bytes | `6949b0590077`
- `docker-compose.yml` | 1016 bytes | `07a26de09b73`
- `extract_code.py` | 17949 bytes | `786b25bf1087`
- `frontend\.env.local` | 115 bytes | `a0cd8b945d9d`
- `frontend\AGENTS.md` | 332 bytes | `ceaa13d29db2`
- `frontend\CLAUDE.md` | 12 bytes | `d631d88045f7`
- `frontend\Dockerfile` | 222 bytes | `89b461b76a98`
- `frontend\eslint.config.mjs` | 483 bytes | `275a07c13fc7`
- `frontend\next-env.d.ts` | 257 bytes | `083e23c4c5e7`
- `frontend\next.config.ts` | 140 bytes | `a972c4f0ffa6`
- `frontend\package-lock.json` | 248725 bytes | `d2735c24326c`
- `frontend\package.json` | 789 bytes | `949620d894b1`
- `frontend\playwright-report\index.html` | 527855 bytes | `d9615997ca17`
- `frontend\playwright.config.ts` | 820 bytes | `8d8f52382745`
- `frontend\postcss.config.mjs` | 101 bytes | `7b299d3d3b16`
- `frontend\public\file.svg` | 391 bytes | `2b67812c325c`
- `frontend\public\globe.svg` | 1035 bytes | `b614b9bf1839`
- `frontend\public\next.svg` | 1375 bytes | `55995dfad6ec`
- `frontend\public\vercel.svg` | 128 bytes | `f081337b2fee`
- `frontend\public\window.svg` | 385 bytes | `644768c4aaeb`
- `frontend\README.md` | 1486 bytes | `3b3ed71ebf50`
- `frontend\src\app\favicon.ico` | 25931 bytes | `2b8ad2d33455`
- `frontend\src\app\globals.css` | 1311 bytes | `50171b3b77e4`
- `frontend\src\app\layout.tsx` | 1177 bytes | `564a8212230b`
- `frontend\src\app\page.tsx` | 3213 bytes | `891189afc81b`
- `frontend\src\components\EventFeed.tsx` | 3200 bytes | `4d2a5c1f725c`
- `frontend\src\components\EventForm.tsx` | 4485 bytes | `75c72a2c5370`
- `frontend\src\components\KPICards.tsx` | 2865 bytes | `1d5c0fc9f662`
- `frontend\src\components\Navbar.tsx` | 1336 bytes | `ffeb9cc65fe6`
- `frontend\src\components\Sidebar.tsx` | 1983 bytes | `021c5413a075`
- `frontend\src\components\SimulationPanel.tsx` | 6104 bytes | `952216987d60`
- `frontend\src\components\TrafficMap.tsx` | 791 bytes | `a152445cd732`
- `frontend\src\components\TrafficMapInner.tsx` | 5591 bytes | `f6f8f2a0a05e`
- `frontend\src\lib\api.ts` | 1106 bytes | `5b1e1558ed23`
- `frontend\test-results\.last-run.json` | 48 bytes | `d73c748bbd99`
- `frontend\tests\app.spec.ts` | 3012 bytes | `887e298c11c7`
- `frontend\tests\e2e.spec.ts` | 1387 bytes | `c9c4a9635165`
- `frontend\tests\map.spec.ts` | 1995 bytes | `76f44da1314e`
- `frontend\tsconfig.json` | 704 bytes | `dbacf04aa5f3`
- `frontend\tsconfig.tsbuildinfo` | 124913 bytes | `bc7e5c2d002f`
- `notebook_tail.py` | 5015 bytes | `ca2693ce1fac`
- `README.md` | 3559 bytes | `177798e71fd1`
- `REPORT.md` | 3923 bytes | `1ed77f5ef77d`
- `requirements.md` | 2869 bytes | `79642a371d86`
- `Tasks.md` | 3526 bytes | `ca82ef8b9cec`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

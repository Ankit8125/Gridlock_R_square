# gridlock-v2

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock-v2`
- Git remote: `https://github.com/Ayushvish2005/gridlock.git`
- Git branch: `main`
- Git HEAD: `06f3771bb516a2e315da22b19026904207f8cf9f`
- Fingerprint: `5ba56943924a83301d158f5413bdaa305714321c70447b5d84e276971f68506a`
- Files indexed: `71`
- Indexed size: `18822233` bytes

## Stack Signals

- `Docker Compose`
- `FastAPI`
- `Next.js`
- `Node/Express`
- `React`
- `Tailwind CSS`

## Traffic Problem Signals

- traffic: astram, bangalore, congestion, traffic
- operations: barricade, closure, diversion, manpower, police, resource
- models: catboost, classifier, gru, lightgbm, random forest, randomforest, regressor
- routing: osrm

## Manifests

- `backend\requirements.txt`
- `docker-compose.yml`
- `frontend\package.json`
- `render.yaml`

## Package Files

### `frontend\package.json`
- Name: `frontend`
- Scripts:
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `eslint`
- Dependencies: `@tailwindcss/postcss`, `@types/leaflet`, `@types/node`, `@types/react`, `@types/react-dom`, `axios`, `clsx`, `date-fns`, `eslint`, `eslint-config-next`, `leaflet`, `lucide-react`, `next`, `react`, `react-dom`, `react-leaflet`, `recharts`, `tailwind-merge`, `tailwindcss`, `typescript`

## Python Dependencies

### `backend\requirements.txt`
- `fastapi>=0.100.0`
- `uvicorn>=0.23.0`
- `pydantic>=2.0.0`
- `pydantic-settings>=2.0.0`
- `sqlalchemy>=2.0.0`
- `psycopg2-binary>=2.9.0`
- `python-dotenv>=1.0.0`
- `scikit-learn>=1.3.0`
- `pandas>=2.0.0`
- `numpy>=1.24.0`
- `joblib>=1.3.0`
- `httpx>=0.24.0`
- `pytest>=7.4.0`
- `python-multipart>=0.0.6`

## README Headings

- `README.md`: # AI Traffic Operations Platform MVP
- `README.md`: ## Features
- `README.md`: ## Tech Stack
- `README.md`: ## Local Setup & Development
- `README.md`: ### 1. Database
- `README.md`: ### 2. Backend (FastAPI)
- `README.md`: ### 3. Frontend (Next.js)
- `README.md`: ## Machine Learning Models (Optional MVP Enhancement)
- `README.md`: ## Deployment Guidelines
- `README.md`: ### Database (Neon PostgreSQL Free Tier)
- `README.md`: ### Backend (Render Free Tier / Railway)
- `README.md`: ### Frontend (Vercel Free Tier)
- `frontend\README.md`: ## Getting Started
- `frontend\README.md`: # or
- `frontend\README.md`: # or
- `frontend\README.md`: # or
- `frontend\README.md`: ## Learn More
- `frontend\README.md`: ## Deploy on Vercel

## README Claims and Operational Notes

- `README.md`: ## Features
- `README.md`: - **Deterministic Traffic Impact Assessment:** Fast, rule-based engine mapping event features to impact scores and severity.
- `README.md`: - **Recommendation Engine:** Rule-based generation of operational tasks (deploy officers, barricades, diversions).
- `README.md`: - **AI Explanation Service:** Uses OpenRouter LLMs to generate human-readable operational context.
- `README.md`: - **Next.js Traffic Command Center Dashboard:** Dark-mode dashboard visualizing metrics, incidents via an interactive map (Leaflet), and a scenario simulator.
- `README.md`: - **Backend:** Python 3.12, FastAPI, SQLAlchemy, scikit-learn (for future/optional ML).
- `README.md`: - **AI Integration:** OpenRouter (`openai/gpt-4o-mini`).
- `README.md`: ### 2. Backend (FastAPI)
- `README.md`: OPENROUTER_API_KEY=your_openrouter_api_key_here
- `README.md`: Run the backend server:
- `README.md`: npm run dev &
- `README.md`: The dashboard will be available at `http://localhost:3000`.
- `README.md`: ## Machine Learning Models (Optional MVP Enhancement)
- `README.md`: While the MVP strictly uses the deterministic rule-based engine (as per specs), we have included a robust training script (`scripts/train_model.py`) that learns the exact business logic from your historical Astram CSV...
- `README.md`: To train the models:
- `README.md`: python scripts/train_model.py --data path/to/your/astram_events.csv --out models/
- `README.md`: If the `models/` directory contains the generated `.pkl` files, the FastAPI application will attempt to load them on startup, proving the architecture is "ML Ready" for future congestion forecasting upgrades (CatBoost...
- `README.md`: ## Deployment Guidelines
- `README.md`: 5. Add `DATABASE_URL` and `OPENROUTER_API_KEY` to the Environment Variables.
- `README.md`: 3. Vercel will automatically detect Next.js and apply the correct build settings (`npm run build`).
- `README.md`: 4. Add any required environment variables (e.g., `NEXT_PUBLIC_API_URL` if you change the backend hosting URL from localhost).
- `frontend\README.md`: This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
- `frontend\README.md`: First, run the development server:
- `frontend\README.md`: npm run dev
- `frontend\README.md`: - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- `frontend\README.md`: You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
- `frontend\README.md`: ## Deploy on Vercel
- `frontend\README.md`: The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the cre...
- `frontend\README.md`: Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Data Assets

- `Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv`
- `models\feature_columns.json`

## Model and Artifact Assets

- `backend\app\services\duration_model.pkl`
- `models\feature_columns.json`
- `models\label_encoders.pkl`
- `models\priority_model.pkl`
- `models\severity_model.pkl`
- `models\training_report.txt`

## Notebooks

- None detected

## API Endpoints

- `GET /`
- `GET /alerts`
- `GET /analytics`
- `GET /forecast`
- `GET /heatmap-data`
- `GET /incidents`
- `GET /incidents/{incident_id}`
- `GET /post-event-report/{incident_id}`
- `GET /what-if-compare`
- `GET /zone-risk-ranking`
- `POST /copilot`
- `POST /incident`
- `POST /predict`
- `PUT /incidents/{incident_id}/resolve`
- `app.GET /`
- `router.GET /alerts`
- `router.GET /analytics`
- `router.GET /forecast`
- `router.GET /heatmap-data`
- `router.GET /incidents`
- `router.GET /incidents/{incident_id}`
- `router.GET /post-event-report/{incident_id}`
- `router.GET /what-if-compare`
- `router.GET /zone-risk-ranking`
- `router.POST /copilot`
- `router.POST /incident`
- `router.POST /predict`
- `router.PUT /incidents/{incident_id}/resolve`

## Python Source Signals

### `backend\app\database\config.py`
- Functions: `get_db`
- Imports: `os`, `sqlalchemy`

### `backend\app\main.py`
- Functions: `lifespan`, `read_root`
- Endpoints: `GET /`, `app.GET /`
- Imports: `app`, `contextlib`, `dotenv`, `fastapi`, `os`

### `backend\app\models\incident.py`
- Classes: `IncidentStatus`, `Incident`
- Imports: `app`, `enum`, `sqlalchemy`

### `backend\app\routers\analytics.py`
- Classes: `CopilotRequest`, `CopilotResponse`
- Functions: `_severity_from_score`, `_zone_risk_from_incidents`, `_deterministic_copilot_answer`, `get_forecast`, `get_zone_risk_ranking`, `get_heatmap_data`, `copilot`, `get_alerts`, `what_if_compare`, `get_post_event_report`, `_run_scenario`
- Endpoints: `GET /forecast`, `GET /zone-risk-ranking`, `GET /heatmap-data`, `POST /copilot`, `GET /alerts`, `GET /what-if-compare`, `GET /post-event-report/{incident_id}`, `router.GET /forecast`, `router.GET /zone-risk-ranking`, `router.GET /heatmap-data`, `router.POST /copilot`, `router.GET /alerts`, `router.GET /what-if-compare`, `router.GET /post-event-report/{incident_id}`
- Imports: `app`, `datetime`, `fastapi`, `httpx`, `json`, `os`, `pydantic`, `sqlalchemy`, `typing`

### `backend\app\routers\incidents.py`
- Functions: `predict_incident_impact`, `create_incident`, `get_incidents`, `get_incident`, `resolve_incident`, `get_analytics`
- Endpoints: `POST /predict`, `POST /incident`, `GET /incidents`, `GET /incidents/{incident_id}`, `PUT /incidents/{incident_id}/resolve`, `GET /analytics`, `router.POST /predict`, `router.POST /incident`, `router.GET /incidents`, `router.GET /incidents/{incident_id}`, `router.PUT /incidents/{incident_id}/resolve`, `router.GET /analytics`
- Imports: `app`, `datetime`, `fastapi`, `sqlalchemy`, `typing`

### `backend\app\schemas\incident.py`
- Classes: `IncidentCreate`, `PredictRequest`, `PredictResponse`, `IncidentResponse`
- Imports: `datetime`, `pydantic`, `typing`

### `backend\app\services\ai_explainer.py`
- Functions: `generate_explanation`
- Imports: `httpx`, `os`, `typing`

### `backend\app\services\forecasting_engine.py`
- Functions: `_parse_dt`, `_severity_from_score`, `_fmt_window`, `compute_congestion_forecast`
- Imports: `app`, `datetime`, `joblib`, `os`, `pandas`, `typing`

### `backend\app\services\impact_engine.py`
- Classes: `ImpactAssessment`
- Functions: `get_rule_based_impact`, `assess_impact`
- Imports: `datetime`, `joblib`, `json`, `numpy`, `os`, `pandas`, `pydantic`

### `backend\app\services\recommendation_engine.py`
- Functions: `get_deterministic_recommendations`, `generate_recommendations`
- Imports: `httpx`, `json`, `os`, `typing`

### `backend\app\services\similarity_engine.py`
- Functions: `get_similarity_engine_df`, `_compute_similarity_score`, `find_similar_events`
- Imports: `numpy`, `os`, `pandas`

### `backend\seed_db.py`
- Functions: `seed_data`
- Imports: `app`, `csv`, `datetime`

### `backend\test_main.py`
- Functions: `test_read_root`
- Imports: `app`, `fastapi`

### `backend\train_model.py`
- Functions: `train`, `impute_resolved`
- Imports: `joblib`, `numpy`, `os`, `pandas`, `sklearn`

### `scripts\train_model.py`
- Functions: `compute_impact_score`, `impact_score_to_severity`, `load_and_clean`, `engineer_features`, `train_model`, `feature_importance_report`, `save_artifacts`, `predict`, `parse_args`, `main`
- Imports: `argparse`, `joblib`, `json`, `numpy`, `os`, `pandas`, `pathlib`, `sklearn`, `sys`, `warnings`

### `train_model.py`
- Functions: `compute_impact_score`, `impact_score_to_severity`, `load_and_clean`, `engineer_features`, `train_model_rf`, `feature_importance_report`, `save_artifacts`, `predict`, `parse_args`, `main`
- Imports: `argparse`, `joblib`, `json`, `numpy`, `os`, `pandas`, `pathlib`, `sklearn`, `sys`, `warnings`

## JavaScript/TypeScript Source Signals

### `frontend\src\app\layout.tsx`
- Symbols: `RootLayout`
- Imports: `next`

### `frontend\src\app\page.tsx`
- Symbols: `TABS`, `Dashboard`, `interval`, `handleSimulate`, `handleDeploymentDetails`, `t`, `fetchData`
- Imports: `@/components/dashboard/AICopilot`, `@/components/dashboard/AlertsPanel`, `@/components/dashboard/AnalyticsCharts`, `@/components/dashboard/CongestionForecast`, `@/components/dashboard/IncidentMap`, `@/components/dashboard/IncidentTimeline`, `@/components/dashboard/PostEventReport`, `@/components/dashboard/ScenarioSimulator`, `@/components/dashboard/SummaryCards`, `@/components/dashboard/WhatIfSimulator`, `@/components/dashboard/ZoneRiskRanking`, `@/components/ui/card`, `axios`, `react`

### `frontend\src\components\dashboard\AICopilot.tsx`
- Symbols: `API_BASE`, `QUICK_QUESTIONS`, `LoadingDots`, `MessageBubble`, `isUser`, `AICopilot`, `messagesEndRef`, `inputRef`, `scrollToBottom`, `sendMessage`, `kept`, `res`, `data`, `handleSubmit`
- Imports: `lucide-react`, `react`

### `frontend\src\components\dashboard\AlertsPanel.tsx`
- Symbols: `API_BASE`, `formatTime`, `formatRelative`, `diff`, `mins`, `AlertsPanel`, `fetchAlerts`, `res`, `data`, `resData`, `interval`, `criticalCount`, `highCount`, `cfg`
- Imports: `lucide-react`, `react`

### `frontend\src\components\dashboard\AnalyticsCharts.tsx`
- Symbols: `API_BASE`, `VIBRANT_COLORS`, `darkTooltipStyle`, `axisStyle`, `ChartCard`, `CustomPieLegend`, `AnalyticsCharts`, `fetchZoneRisks`, `res`, `result`, `list`, `score`, `color`
- Imports: `lucide-react`, `react`, `recharts`

### `frontend\src\components\dashboard\CongestionForecast.tsx`
- Symbols: `API_BASE`, `EVENT_CAUSES`, `ZONES`, `PRIORITIES`, `getSeverityColor`, `getScoreColor`, `GaugeDisplay`, `normalizedScore`, `strokeColor`, `radius`, `cx`, `cy`, `circumference`, `progress`, `startAngle`, `endAngle`, `angle`, `polarToCartesian`, `angleRad`, `describeArc`, `start`, `end`, `largeArcFlag`, `bgArc`, `fgArc`, `needleAngle`, `needleTip`, `CongestionForecast`, `handleSubmit`, `params`, `res`, `data`, `inputCls`, `labelCls`
- Imports: `lucide-react`, `react`

### `frontend\src\components\dashboard\IncidentMap.tsx`
- Symbols: `IncidentMapClient`, `IncidentMap`
- Imports: `lucide-react`, `next/dynamic`, `react`

### `frontend\src\components\dashboard\IncidentMapClient.tsx`
- Symbols: `IncidentMapClient`, `mapRef`, `overlaysRef`, `token`, `script`, `barricadesPerPost`, `event`, `map`, `radiusInMeters`, `radiusInDegrees`, `bOffset`, `getIdealBarricades`, `query`, `res`, `data`, `sorted`, `distA`, `distB`, `targetSq`, `snapToRoad`, `snapped`, `successCount`, `res`, `data`, `newLat`, `newLng`, `locationName`, `geoRes`, `geoData`, `getDiversionRoute`, `R_deg`, `start`, `end`, `waypoint`, `url`
- Imports: `react`

### `frontend\src\components\dashboard\IncidentTimeline.tsx`
- Symbols: `getSeverityDot`, `getSeverityText`, `getStatusConfig`, `formatRelativeTime`, `diff`, `mins`, `hrs`, `IncidentTimeline`, `sorted`, `statusCfg`, `isActive`, `dotColor`, `textColor`
- Imports: `lucide-react`

### `frontend\src\components\dashboard\PostEventReport.tsx`
- Symbols: `API_BASE`, `PostEventReport`, `fetchReport`, `res`, `getEfficiencyIcon`, `getEfficiencyColor`
- Imports: `@/components/ui/button`, `@/components/ui/card`, `axios`, `lucide-react`, `react`

### `frontend\src\components\dashboard\ScenarioSimulator.tsx`
- Symbols: `API_BASE`, `ScenarioSimulator`, `handleSimulate`, `payload`, `res`, `inputCls`, `labelCls`
- Imports: `axios`, `lucide-react`, `react`

### `frontend\src\components\dashboard\SummaryCards.tsx`
- Symbols: `KPICard`, `SummaryCards`, `score`
- Imports: `lucide-react`

### `frontend\src\components\dashboard\WhatIfSimulator.tsx`
- Symbols: `API_BASE`, `EVENT_CAUSES`, `ZONES`, `getSeverityClass`, `CompareValue`, `aNum`, `bNum`, `aHigher`, `diff`, `fmt`, `WhatIfSimulator`, `handleCompare`, `params`, `res`, `data`, `inputCls`, `labelCls`
- Imports: `lucide-react`, `react`

### `frontend\src\components\dashboard\ZoneRiskRanking.tsx`
- Symbols: `API_BASE`, `getRiskColor`, `getRiskLabel`, `MEDALS`, `ZoneRiskRanking`, `fetchZones`, `res`, `data`, `list`, `interval`, `colors`, `label`, `pct`
- Imports: `lucide-react`, `react`

### `frontend\src\components\ui\button.tsx`
- Symbols: `Button`
- Imports: `@/lib/utils`, `react`

### `frontend\src\components\ui\card.tsx`
- Symbols: `Card`, `CardHeader`, `CardTitle`, `CardContent`
- Imports: `@/lib/utils`, `react`

### `frontend\src\lib\utils.ts`
- Symbols: `cn`
- Imports: `clsx`, `tailwind-merge`

## Documentation and Presentation Files

- `frontend\AGENTS.md`
- `frontend\CLAUDE.md`
- `frontend\README.md`
- `implemented_features.md`
- `problemstatement.md`
- `README.md`

## Test Files

- `backend\test_main.py`

## File Inventory

- `.gitignore` | 195 bytes | `599384f61165`
- `Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv` | 4546990 bytes | `a5adac1326ad`
- `backend\.gitignore` | 24 bytes | `ddfc241abe28`
- `backend\app\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\app\database\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\app\database\config.py` | 524 bytes | `8cb5c9e22599`
- `backend\app\main.py` | 1402 bytes | `edc7e54fef78`
- `backend\app\models\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\app\models\incident.py` | 2169 bytes | `96e379a0d761`
- `backend\app\routers\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\app\routers\analytics.py` | 22596 bytes | `c57cd85cbb7b`
- `backend\app\routers\incidents.py` | 7567 bytes | `c2d474326965`
- `backend\app\schemas\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\app\schemas\incident.py` | 1517 bytes | `70391a3210c3`
- `backend\app\services\__init__.py` | 0 bytes | `e3b0c44298fc`
- `backend\app\services\ai_explainer.py` | 2337 bytes | `becec6ceb99d`
- `backend\app\services\duration_model.pkl` | 3447802 bytes | `eb76ae85a29e`
- `backend\app\services\forecasting_engine.py` | 7812 bytes | `64b782d41ea8`
- `backend\app\services\impact_engine.py` | 7098 bytes | `a2a063325a08`
- `backend\app\services\recommendation_engine.py` | 5880 bytes | `f62957d15906`
- `backend\app\services\similarity_engine.py` | 6641 bytes | `aeca9431cb29`
- `backend\requirements.txt` | 264 bytes | `42cb02192d26`
- `backend\seed_db.py` | 3988 bytes | `bc5ff751319f`
- `backend\test_main.py` | 302 bytes | `527e15810659`
- `backend\train_model.py` | 4121 bytes | `ad85076f6dda`
- `docker-compose.yml` | 468 bytes | `a6b6fa89703d`
- `frontend\.gitignore` | 521 bytes | `cfdbd5a321f3`
- `frontend\AGENTS.md` | 332 bytes | `ceaa13d29db2`
- `frontend\CLAUDE.md` | 12 bytes | `d631d88045f7`
- `frontend\eslint.config.mjs` | 483 bytes | `275a07c13fc7`
- `frontend\next.config.ts` | 140 bytes | `a972c4f0ffa6`
- `frontend\package-lock.json` | 263064 bytes | `54159787076a`
- `frontend\package.json` | 815 bytes | `35ed09875bc8`
- `frontend\postcss.config.mjs` | 101 bytes | `7b299d3d3b16`
- `frontend\public\file.svg` | 391 bytes | `2b67812c325c`
- `frontend\public\globe.svg` | 1035 bytes | `b614b9bf1839`
- `frontend\public\next.svg` | 1375 bytes | `55995dfad6ec`
- `frontend\public\vercel.svg` | 128 bytes | `f081337b2fee`
- `frontend\public\window.svg` | 385 bytes | `644768c4aaeb`
- `frontend\README.md` | 1486 bytes | `3b3ed71ebf50`
- `frontend\src\app\favicon.ico` | 25931 bytes | `2b8ad2d33455`
- `frontend\src\app\globals.css` | 3534 bytes | `855ebe4b00c2`
- `frontend\src\app\layout.tsx` | 922 bytes | `81cddd213b4a`
- `frontend\src\app\page.tsx` | 21990 bytes | `645011d4daaf`
- `frontend\src\components\dashboard\AICopilot.tsx` | 8629 bytes | `1e1ff0dd4e2a`
- `frontend\src\components\dashboard\AlertsPanel.tsx` | 8666 bytes | `3558ed394215`
- `frontend\src\components\dashboard\AnalyticsCharts.tsx` | 9096 bytes | `17fafb498716`
- `frontend\src\components\dashboard\CongestionForecast.tsx` | 14515 bytes | `00f6a07dec00`
- `frontend\src\components\dashboard\IncidentMap.tsx` | 2588 bytes | `3c67c7b25eb6`
- `frontend\src\components\dashboard\IncidentMapClient.tsx` | 15762 bytes | `ad3165f43051`
- `frontend\src\components\dashboard\IncidentTimeline.tsx` | 8449 bytes | `c9d822df3317`
- `frontend\src\components\dashboard\PostEventReport.tsx` | 8436 bytes | `3304da94f5d7`
- `frontend\src\components\dashboard\ScenarioSimulator.tsx` | 9311 bytes | `b9f8ddc90ea9`
- `frontend\src\components\dashboard\SummaryCards.tsx` | 5104 bytes | `573bf4042239`
- `frontend\src\components\dashboard\WhatIfSimulator.tsx` | 12697 bytes | `69555b912f3c`
- `frontend\src\components\dashboard\ZoneRiskRanking.tsx` | 7759 bytes | `13a6ecf9169d`
- `frontend\src\components\ui\button.tsx` | 676 bytes | `bb26d943c35d`
- `frontend\src\components\ui\card.tsx` | 1232 bytes | `0dc53c06d05d`
- `frontend\src\lib\utils.ts` | 172 bytes | `7ff92063f648`
- `frontend\tsconfig.json` | 704 bytes | `dbacf04aa5f3`
- `implemented_features.md` | 3439 bytes | `92ff33189bb9`
- `models\feature_columns.json` | 221 bytes | `a100f0b1142b`
- `models\label_encoders.pkl` | 1914 bytes | `46f3e8d27545`
- `models\priority_model.pkl` | 975465 bytes | `a140f70d852a`
- `models\severity_model.pkl` | 9281721 bytes | `2233de671998`
- `models\training_report.txt` | 3017 bytes | `9b7ecd96a289`
- `problemstatement.md` | 597 bytes | `61e33cabb69f`
- `README.md` | 3695 bytes | `aa0f42d68d98`
- `render.yaml` | 343 bytes | `ceab1bfd331c`
- `scripts\train_model.py` | 23416 bytes | `b21ab41b5e6a`
- `train_model.py` | 22267 bytes | `6fe97f13d471`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

# gridlock-v1

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock-v1`
- Git remote: `https://github.com/habibsibtain/gridlock.git`
- Git branch: `main`
- Git HEAD: `0ea7a1eb30869b179e87cf126bc246d671d4211f`
- Fingerprint: `7b8432f8fc88a0a4468c8cb52bc0e1e6ca8937458157fdc41e85727ca14ea59f`
- Files indexed: `49`
- Indexed size: `9205014` bytes

## Stack Signals

- `FastAPI`
- `Node/Express`
- `React`
- `Tailwind CSS`
- `Vite`

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, traffic
- operations: closure, diversion, police, resource
- models: gru
- routing: none

## Manifests

- `backend\requirements.txt`
- `frontend\package.json`

## Package Files

### `frontend\package.json`
- Name: `frontend`
- Scripts:
  - `dev`: `vite`
  - `build`: `vite build`
  - `lint`: `eslint .`
  - `preview`: `vite preview`
- Dependencies: `@eslint/js`, `@tailwindcss/vite`, `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, `leaflet`, `lucide-react`, `react`, `react-dom`, `react-leaflet`, `react-router-dom`, `recharts`, `tailwindcss`, `vite`

## Python Dependencies

### `backend\requirements.txt`
- `fastapi==0.104.1`
- `uvicorn[standard]==0.24.0`
- `pandas==2.1.4`
- `pydantic==2.5.3`
- `httpx==0.25.2`
- `python-dateutil==2.8.2`

## README Headings

- `frontend\README.md`: # React + Vite
- `frontend\README.md`: ## React Compiler
- `frontend\README.md`: ## Expanding the ESLint configuration

## README Claims and Operational Notes

- `frontend\README.md`: If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-reac...

## Data Assets

- `Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv`

## Model and Artifact Assets

- None detected

## Notebooks

- None detected

## API Endpoints

- `GET /`
- `GET /active`
- `GET /calendar-events`
- `GET /calendar-monthly`
- `GET /calendar-risk`
- `GET /corridors`
- `GET /gravity`
- `GET /health`
- `GET /hotspots`
- `GET /incidents`
- `GET /incidents/{incident_id}`
- `GET /pois`
- `GET /stats`
- `POST /cascade`
- `POST /forecast`
- `POST /recommend`
- `app.GET /`
- `app.GET /health`
- `router.GET /active`
- `router.GET /calendar-events`
- `router.GET /calendar-monthly`
- `router.GET /calendar-risk`
- `router.GET /corridors`
- `router.GET /gravity`
- `router.GET /hotspots`
- `router.GET /incidents`
- `router.GET /incidents/{incident_id}`
- `router.GET /pois`
- `router.GET /stats`
- `router.POST /cascade`
- `router.POST /forecast`
- `router.POST /recommend`

## Python Source Signals

### `backend\database.py`
- Functions: `get_connection`, `init_database`, `_ensure_hotspots_table`, `_build_hotspots_table`, `query_incidents`, `get_active_incidents`, `get_hotspots`, `get_stats`, `get_incident_by_id`, `get_historical_stats_for_location`, `calc_ecrs`
- Imports: `datetime`, `math`, `os`, `pandas`, `services`, `sqlite3`, `typing`

### `backend\main.py`
- Functions: `startup`, `root`, `health`
- Endpoints: `GET /`, `GET /health`, `app.GET /`, `app.GET /health`
- Imports: `database`, `fastapi`, `os`, `routers`, `sys`

### `backend\models.py`
- Classes: `ForecastRequest`, `CascadeRequest`, `RecommendRequest`, `NewEventRequest`
- Imports: `pydantic`, `typing`

### `backend\routers\calendar_risk.py`
- Functions: `calendar_risk`, `calendar_events`, `monthly_events`
- Endpoints: `GET /calendar-risk`, `GET /calendar-events`, `GET /calendar-monthly`, `router.GET /calendar-risk`, `router.GET /calendar-events`, `router.GET /calendar-monthly`
- Imports: `fastapi`, `services`, `typing`

### `backend\routers\cascade.py`
- Functions: `run_cascade_simulation`, `list_corridors`
- Endpoints: `POST /cascade`, `GET /corridors`, `router.POST /cascade`, `router.GET /corridors`
- Imports: `datetime`, `fastapi`, `models`, `services`

### `backend\routers\forecast.py`
- Functions: `forecast_event`
- Endpoints: `POST /forecast`, `router.POST /forecast`
- Imports: `database`, `datetime`, `fastapi`, `models`, `services`

### `backend\routers\gravity.py`
- Functions: `get_gravity`, `list_pois`
- Endpoints: `GET /gravity`, `GET /pois`, `router.GET /gravity`, `router.GET /pois`
- Imports: `datetime`, `fastapi`, `services`, `typing`

### `backend\routers\incidents.py`
- Functions: `list_incidents`, `get_incident`, `list_active`, `list_hotspots`, `dashboard_stats`
- Endpoints: `GET /incidents`, `GET /incidents/{incident_id}`, `GET /active`, `GET /hotspots`, `GET /stats`, `router.GET /incidents`, `router.GET /incidents/{incident_id}`, `router.GET /active`, `router.GET /hotspots`, `router.GET /stats`
- Imports: `database`, `fastapi`, `typing`

### `backend\routers\llm_advisor.py`
- Functions: `get_recommendation`
- Endpoints: `POST /recommend`, `router.POST /recommend`
- Imports: `fastapi`, `models`, `services`

### `backend\services\calendar_intel.py`
- Functions: `load_calendar`, `get_events_for_date`, `get_calendar_risk`, `get_all_calendar_events`, `get_monthly_events`
- Imports: `datetime`, `json`, `os`, `typing`

### `backend\services\cascade_router.py`
- Functions: `load_corridor_graph`, `get_time_load_modifier`, `simulate_cascade`, `get_all_corridors`
- Imports: `json`, `os`, `typing`

### `backend\services\ecrs_engine.py`
- Functions: `get_corridor_weight`, `get_time_multiplier`, `compute_base_ecrs`, `normalize_ecrs`, `apply_gravity`, `apply_calendar`, `compute_full_ecrs`, `compute_resource_recommendation`
- Imports: `math`, `typing`

### `backend\services\gravity_model.py`
- Functions: `load_pois`, `get_pois`, `haversine`, `parse_time`, `minutes_from_midnight`, `gaussian_time_proximity`, `compute_gravity_score`, `get_all_pois_with_status`
- Imports: `datetime`, `json`, `math`, `os`, `typing`

### `backend\services\llm_service.py`
- Functions: `build_incident_brief`, `get_llm_recommendation`, `generate_template_response`
- Imports: `httpx`, `json`, `math`, `os`, `typing`

## JavaScript/TypeScript Source Signals

### `frontend\src\api\client.js`
- Symbols: `API_BASE`, `fetchJson`, `response`, `api`, `query`, `params`, `params`, `params`

### `frontend\src\App.jsx`
- Symbols: `App`
- Imports: `./components/Layout`, `./pages/AnalyticsPage`, `./pages/DashboardPage`, `./pages/EventPlannerPage`, `react`, `react-router-dom`

### `frontend\src\components\Dashboard\AlertFeed.jsx`
- Symbols: `causeIcons`, `AlertFeed`, `CauseIcon`, `address`, `shortAddress`
- Imports: `../shared/ECRSBadge`, `lucide-react`, `react`

### `frontend\src\components\Dashboard\CascadeSimulator.jsx`
- Symbols: `CascadeSimulator`, `handleSimulate`, `res`, `getRiskColor`
- Imports: `../../api/client`, `lucide-react`, `react`

### `frontend\src\components\Dashboard\MissionBrief.jsx`
- Symbols: `MissionBrief`
- Imports: `../shared/ECRSBadge`, `lucide-react`, `react`

### `frontend\src\components\Dashboard\ZoneSummaryBar.jsx`
- Symbols: `ZoneSummaryBar`, `zones`, `riskColor`
- Imports: `lucide-react`, `react`

### `frontend\src\components\Layout.jsx`
- Symbols: `navItems`, `Layout`
- Imports: `lucide-react`, `react`, `react-router-dom`

### `frontend\src\components\Map\IncidentMap.jsx`
- Symbols: `BENGALURU_CENTER`, `DARK_TILE_URL`, `getMarkerColor`, `getMarkerRadius`, `POICircles`, `color`, `opacity`, `CascadeOverlay`, `IncidentMap`, `displayIncidents`, `activeIds`, `others`, `lat`, `lng`, `isActive`, `color`, `radius`
- Imports: `../shared/ECRSBadge`, `lucide-react`, `react`, `react-leaflet`

### `frontend\src\components\shared\ECRSBadge.jsx`
- Symbols: `ECRS_CONFIG`, `getEcrsLevel`, `ECRSBadge`, `level`, `sizeClasses`
- Imports: `react`

### `frontend\src\components\shared\LoadingSpinner.jsx`
- Symbols: `LoadingSpinner`
- Imports: `lucide-react`, `react`

### `frontend\src\pages\AnalyticsPage.jsx`
- Symbols: `DARK_TILE_URL`, `PIE_COLORS`, `CustomTooltip`, `AnalyticsPage`, `hourlyData`, `causeData`, `corridorData`, `dayNames`, `dayData`, `intensity`, `r`, `color`, `maxCount`, `pct`
- Imports: `../api/client`, `../components/shared/ECRSBadge`, `../components/shared/LoadingSpinner`, `lucide-react`, `react`, `react-leaflet`, `recharts`

### `frontend\src\pages\DashboardPage.jsx`
- Symbols: `DashboardPage`, `loadData`, `handleGetRecommendation`, `result`, `handleCascadeResult`
- Imports: `../api/client`, `../components/Dashboard/AlertFeed`, `../components/Dashboard/CascadeSimulator`, `../components/Dashboard/MissionBrief`, `../components/Dashboard/ZoneSummaryBar`, `../components/Map/IncidentMap`, `../components/shared/LoadingSpinner`, `react`

### `frontend\src\pages\EventPlannerPage.jsx`
- Symbols: `MONTHS`, `DAYS`, `getTypeColor`, `getBaselineColor`, `EventPlannerPage`, `year`, `month`, `handleDateClick`, `risk`, `handleForecast`, `result`, `firstDay`, `lastDay`, `startPad`, `totalDays`, `calendarDays`, `i`, `d`, `prevMonth`, `nextMonth`, `dateStr`, `events`, `isSelected`
- Imports: `../api/client`, `../components/shared/ECRSBadge`, `../components/shared/LoadingSpinner`, `lucide-react`, `react`

## Documentation and Presentation Files

- `frontend\README.md`

## Test Files

- None detected

## File Inventory

- `Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv` | 4546990 bytes | `a5adac1326ad`
- `astram.db` | 4341760 bytes | `b3ed438cac8e`
- `backend\database.py` | 15842 bytes | `751c125d80fb`
- `backend\fixtures\calendar_matrix.json` | 3569 bytes | `34779ccdb820`
- `backend\fixtures\corridor_graph.json` | 3205 bytes | `047caafa049d`
- `backend\fixtures\poi_gravity.json` | 2742 bytes | `78031ba7802f`
- `backend\main.py` | 1783 bytes | `48fc30e9fc81`
- `backend\models.py` | 1507 bytes | `b0f3c5b543b7`
- `backend\requirements.txt` | 156 bytes | `7edbd4892e74`
- `backend\routers\__init__.py` | 19 bytes | `bd95551ad54d`
- `backend\routers\calendar_risk.py` | 1118 bytes | `e0b445584335`
- `backend\routers\cascade.py` | 1083 bytes | `1a409ce46814`
- `backend\routers\forecast.py` | 2936 bytes | `147a16e79259`
- `backend\routers\gravity.py` | 1946 bytes | `45d74e16a36a`
- `backend\routers\incidents.py` | 1929 bytes | `4cd551014c8d`
- `backend\routers\llm_advisor.py` | 1596 bytes | `642bb9628bbc`
- `backend\services\__init__.py` | 20 bytes | `3d298f92e00b`
- `backend\services\calendar_intel.py` | 7801 bytes | `365e7949c6a3`
- `backend\services\cascade_router.py` | 6266 bytes | `73bee56add39`
- `backend\services\ecrs_engine.py` | 6641 bytes | `078559d46fdc`
- `backend\services\gravity_model.py` | 5135 bytes | `0314f96044b6`
- `backend\services\llm_service.py` | 7808 bytes | `a0cfcf917deb`
- `frontend\.gitignore` | 277 bytes | `d50ab07e11fa`
- `frontend\eslint.config.js` | 589 bytes | `9f9b44b8e557`
- `frontend\index.html` | 1154 bytes | `9a5a218b43b5`
- `frontend\package-lock.json` | 116030 bytes | `3ca64677ee0d`
- `frontend\package.json` | 851 bytes | `dc5ed109b8b0`
- `frontend\public\favicon.svg` | 9522 bytes | `61bc9a161de5`
- `frontend\public\icons.svg` | 5055 bytes | `7ca2d67c9c3a`
- `frontend\README.md` | 1043 bytes | `a2648adf2f4e`
- `frontend\src\api\client.js` | 2221 bytes | `75d3394fb42b`
- `frontend\src\App.jsx` | 680 bytes | `e94a2c8c9b71`
- `frontend\src\assets\hero.png` | 13057 bytes | `881ffbcaafc2`
- `frontend\src\assets\react.svg` | 4126 bytes | `35ef61ed53b3`
- `frontend\src\assets\vite.svg` | 8710 bytes | `2f1f6c6f90a0`
- `frontend\src\components\Dashboard\AlertFeed.jsx` | 4341 bytes | `e685203ed2a5`
- `frontend\src\components\Dashboard\CascadeSimulator.jsx` | 6110 bytes | `758d14753a29`
- `frontend\src\components\Dashboard\MissionBrief.jsx` | 4988 bytes | `b0ae249403b2`
- `frontend\src\components\Dashboard\ZoneSummaryBar.jsx` | 2273 bytes | `98fd1b129c1f`
- `frontend\src\components\Layout.jsx` | 3626 bytes | `98d42b134ae2`
- `frontend\src\components\Map\IncidentMap.jsx` | 7100 bytes | `95d7ac9d204e`
- `frontend\src\components\shared\ECRSBadge.jsx` | 1461 bytes | `7af19ffba7d4`
- `frontend\src\components\shared\LoadingSpinner.jsx` | 611 bytes | `d5d9a65dddba`
- `frontend\src\index.css` | 12811 bytes | `af9de1d23fa2`
- `frontend\src\main.jsx` | 281 bytes | `5da905c8aaa5`
- `frontend\src\pages\AnalyticsPage.jsx` | 14869 bytes | `d4f57c76d8eb`
- `frontend\src\pages\DashboardPage.jsx` | 4240 bytes | `e33d11b2584e`
- `frontend\src\pages\EventPlannerPage.jsx` | 16798 bytes | `3e0e7e332618`
- `frontend\vite.config.js` | 338 bytes | `b67025cf7b16`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

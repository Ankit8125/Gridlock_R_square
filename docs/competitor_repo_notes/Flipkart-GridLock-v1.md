# Flipkart-GridLock-v1

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\Flipkart-GridLock-v1`
- Git remote: `https://github.com/Rahul69-aiiy/Flipkart-GridLock.git`
- Git branch: `main`
- Git HEAD: `6593c28a4e10fc60f4c006b6ea4dffd6f1f577e6`
- Fingerprint: `d981f9327edf73a34ca362fd6091555cd5a841d30dec4fa7ad512ecee304203b`
- Files indexed: `92`
- Indexed size: `401191` bytes

## Stack Signals

- `Docker`
- `Docker Compose`
- `FastAPI`
- `Node/Express`
- `React`
- `Tailwind CSS`
- `Vite`

## Traffic Problem Signals

- traffic: bengaluru, congestion, traffic
- operations: police, resource
- models: gru, knn, regressor, xgboost
- routing: a*

## Manifests

- `backend\Dockerfile`
- `backend\requirements.txt`
- `docker-compose.yml`
- `Dockerfile`
- `frontend\package.json`
- `requirements.txt`

## Package Files

### `frontend\package.json`
- Name: `parksight-ai-dashboard`
- Scripts:
  - `dev`: `vite`
  - `build`: `vite build`
  - `preview`: `vite preview`
- Dependencies: `@radix-ui/react-dropdown-menu`, `@radix-ui/react-select`, `@radix-ui/react-slot`, `@radix-ui/react-tooltip`, `@vitejs/plugin-react`, `autoprefixer`, `axios`, `class-variance-authority`, `clsx`, `framer-motion`, `leaflet`, `leaflet.heat`, `leaflet.markercluster`, `lucide-react`, `postcss`, `react`, `react-dom`, `react-leaflet`, `react-router-dom`, `recharts`, `tailwind-merge`, `tailwindcss`, `vite`, `zustand`

## Python Dependencies

### `backend\requirements.txt`
- `fastapi==0.115.6`
- `uvicorn[standard]==0.32.1`
- `pandas==2.2.3`
- `numpy==1.26.4`
- `scikit-learn==1.5.2`
- `xgboost==2.1.3`
- `ortools==9.11.4210`
- `joblib==1.4.2`
- `pydantic==2.10.3`
- `pydantic-settings==2.7.1`
- `python-dotenv==1.0.1`
- `kneed==0.8.5`
- `python-multipart==0.0.20`

### `requirements.txt`
- `fastapi==0.115.6`
- `uvicorn[standard]==0.32.1`
- `pandas==2.2.3`
- `numpy==1.26.4`
- `scikit-learn==1.5.2`
- `xgboost==2.1.3`
- `ortools==9.11.4210`
- `joblib==1.4.2`
- `pydantic==2.10.3`
- `pydantic-settings==2.7.1`
- `python-dotenv==1.0.1`
- `kneed==0.8.5`
- `python-multipart==0.0.20`

## README Headings

- `README.md`: # ParkSight AI
- `README.md`: ## Key Features
- `README.md`: ## System Architecture
- `README.md`: ### M0 — Data Validation
- `README.md`: ### M1 — Hotspot Intelligence
- `README.md`: ### M2 — Congestion Impact Potential (CIP) Engine
- `README.md`: ### M3 — Forecasting Engine
- `README.md`: ### M4 — Confidence Engine
- `README.md`: ### M5 — Opportunity Engine
- `README.md`: ### M6 — Resource-Constrained Planning
- `README.md`: ### M6b — Target-Coverage Planning
- `README.md`: ### M7 — Value Proof Engine
- `README.md`: ### M8 — Station Efficiency Analytics
- `README.md`: ### M9 — Coverage Curve Analysis
- `README.md`: ## Congestion Impact Potential (CIP)
- `README.md`: ## Data-Driven Officer Hour Estimation
- `README.md`: ## Machine Learning Pipeline
- `README.md`: ### Forecasting Features
- `README.md`: ### Models
- `README.md`: ### Model Selection
- `README.md`: ## Optimization Pipeline
- `README.md`: ## Technology Stack
- `README.md`: ### Backend
- `README.md`: ### Machine Learning
- `README.md`: ### Optimization
- `README.md`: ### Data Processing
- `README.md`: ### Analytics
- `README.md`: ## Quick Start
- `README.md`: ## Tested Endpoints
- `README.md`: ## Project Structure
- `README.md`: ## Frontend Dashboard
- `README.md`: ### Run Frontend
- `README.md`: ### Dashboard Pages
- `README.md`: ## Future Enhancements
- `backend\README.md`: # ParkSight AI
- `backend\README.md`: ## Architecture — 10 Analytical Modules
- `backend\README.md`: ## CIP Formula
- `backend\README.md`: ### Officer-Hours (Data-Driven)
- `backend\README.md`: ## Quick Start
- `backend\README.md`: ## Docker
- `backend\README.md`: ## Tech Stack
- `backend\README.md`: ## Project Structure
- `frontend\README.md`: # ParkSight AI Dashboard

## README Claims and Operational Notes

- `README.md`: ParkSight AI is a data-driven decision support system built on **298,450 Bengaluru Traffic Police parking violation records (Nov 2023 – Apr 2024)**. The platform identifies high-impact parking hotspots, predicts futur...
- `README.md`: ## Key Features
- `README.md`: * Resource-constrained deployment optimization
- `README.md`: **Endpoint:** `GET /api/summary`
- `README.md`: **Endpoint:** `GET /api/hotspots`
- `README.md`: **Endpoint:** `GET /api/cip`
- `README.md`: **Endpoint:** `GET /api/forecast`
- `README.md`: * Automatic model selection based on MAE
- `README.md`: Current implementation selects the model with lower prediction error.
- `README.md`: **Endpoint:** `GET /api/confidence`
- `README.md`: **Endpoint:** `GET /api/opportunities`
- `README.md`: Opportunity Score = Predicted CIP × Confidence Score
- `README.md`: **Endpoint:** `POST /api/plan/resource`
- `README.md`: **Endpoint:** `POST /api/plan/target`
- `README.md`: **Endpoint:** `GET /api/value-proof`
- `README.md`: Compares optimized deployment strategies against naïve allocation approaches.
- `README.md`: **Endpoint:** `GET /api/stations`
- `README.md`: **Endpoint:** `GET /api/coverage`
- `README.md`: ### Forecasting Features
- `README.md`: * Lag features (1–4 weeks)
- `README.md`: ### Models
- `README.md`: ### Model Selection
- `README.md`: The system automatically selects the model with the lower Mean Absolute Error (MAE).
- `README.md`: Deployment Plan
- `README.md`: * FastAPI
- `README.md`: for Swagger API documentation.
- `README.md`: 2. `/api/summary`
- `README.md`: 3. `/api/hotspots`
- `README.md`: 4. `/api/cip`
- `README.md`: 5. `/api/forecast`
- `README.md`: 6. `/api/confidence`
- `README.md`: 7. `/api/opportunities`
- `README.md`: 8. `/api/value-proof`
- `README.md`: 9. `/api/stations`
- `README.md`: 10. `/api/coverage`
- `README.md`: 11. `/api/plan/resource`
- `README.md`: 12. `/api/plan/target`
- `README.md`: frontend/          # React dashboard (Vite + Tailwind + Recharts + Leaflet)
- `README.md`: │   ├── api/       # Axios API client
- `README.md`: │   ├── pages/     # 10 dashboard pages + settings
- `README.md`: ├── routes/
- `README.md`: ├── models/
- `README.md`: └── trained_models/
- `README.md`: ## Frontend Dashboard
- `README.md`: Enterprise dark-theme command-center UI with sidebar navigation, live API integration, Leaflet maps, and Recharts visualizations.
- `README.md`: ### Run Frontend
- `README.md`: npm run dev
- `README.md`: Open **http://localhost:5173** (proxies `/api` → `http://localhost:8000`)
- `README.md`: ### Dashboard Pages
- `README.md`: | Page | Route | API |
- `README.md`: | Overview | `/` | `GET /api/summary` |
- `README.md`: | Hotspot Intelligence | `/hotspots` | `GET /api/hotspots` |
- `README.md`: | CIP Dashboard | `/cip` | `GET /api/cip` |
- `README.md`: | Forecasting | `/forecast` | `GET /api/forecast` |
- `README.md`: | Confidence Engine | `/confidence` | `GET /api/confidence` |
- `README.md`: | Opportunities | `/opportunities` | `GET /api/opportunities` |
- `README.md`: | Resource Planner | `/resource-planner` | `POST /api/plan/resource` |
- `README.md`: | Target Planner | `/target-planner` | `POST /api/plan/target` |
- `README.md`: | Value Proof | `/value-proof` | `GET /api/value-proof` |
- `README.md`: | Station Analytics | `/stations` | `GET /api/stations` |
- `README.md`: | Coverage Analysis | `/coverage` | `GET /api/coverage` |
- `README.md`: * Live officer deployment recommendations
- `backend\README.md`: | M0 | Data Validation | `GET /api/summary` | Dataset stats & quality audit |
- `backend\README.md`: | M1 | Hotspot Intelligence | `GET /api/hotspots` | Junction CIP ranking + DBSCAN clusters |
- `backend\README.md`: | M2 | CIP Engine | `GET /api/cip` | Congestion Impact Potential scores |
- `backend\README.md`: | M3 | Forecasting | `GET /api/forecast` | XGBoost vs moving-average predictions |
- `backend\README.md`: | M4 | Confidence Engine | `GET /api/confidence` | Data-reliability scores per junction |
- `backend\README.md`: | M5 | Opportunity Engine | `GET /api/opportunities` | Ranked enforcement opportunities |
- `backend\README.md`: | M6 | Enforcement Planning | `POST /api/plan/resource` | OR-Tools CP-SAT optimisation |
- `backend\README.md`: | M6b | Target Planning | `POST /api/plan/target` | Minimise hours for target coverage |
- `backend\README.md`: | M7 | Value Proof | `GET /api/value-proof` | Naive vs optimised comparison |
- `backend\README.md`: | M8 | Station Efficiency | `GET /api/stations` | Per-station performance metrics |
- `backend\README.md`: | M9 | Coverage Curve | `GET /api/coverage` | Optimal staffing knee-point analysis |
- `backend\README.md`: docker run -p 8000:8000 -v $(pwd)/../jan\ to\ may\ police\ violation_anonymized791b166.csv:/app/../jan\ to\ may\ police\ violation_anonymized791b166.csv parksight-ai
- `backend\README.md`: - **Framework**: FastAPI 0.115
- `backend\README.md`: ├── app.py                    # FastAPI entry point
- `backend\README.md`: ├── schemas/                  # Pydantic response models
- `backend\README.md`: ├── routes/                   # FastAPI routers
- `backend\README.md`: ├── models/
- `backend\README.md`: └── trained_models/

## Data Assets

- None detected

## Model and Artifact Assets

- None detected

## Notebooks

- None detected

## API Endpoints

- `GET /`
- `GET /cip`
- `GET /confidence`
- `GET /coverage`
- `GET /forecast`
- `GET /health`
- `GET /hotspots`
- `GET /opportunities`
- `GET /stations`
- `GET /summary`
- `GET /value-proof`
- `GET /{full_path:path}`
- `POST /plan/resource`
- `POST /plan/target`
- `app.GET /`
- `app.GET /health`
- `app.GET /{full_path:path}`
- `router.GET /cip`
- `router.GET /confidence`
- `router.GET /coverage`
- `router.GET /forecast`
- `router.GET /hotspots`
- `router.GET /opportunities`
- `router.GET /stations`
- `router.GET /summary`
- `router.GET /value-proof`
- `router.POST /plan/resource`
- `router.POST /plan/target`

## Python Source Signals

### `analyze_deep.py`
- Functions: `parse_json_list`
- Imports: `collections`, `json`, `numpy`, `pandas`

### `backend\app.py`
- Functions: `lifespan`, `health`, `serve_spa`, `root`
- Endpoints: `GET /health`, `GET /`, `GET /{full_path:path}`, `GET /`, `app.GET /health`, `app.GET /`, `app.GET /{full_path:path}`
- Imports: `contextlib`, `fastapi`, `logging`, `os`, `pathlib`, `routes`, `services`, `utils`

### `backend\models\training.py`
- Functions: `build_training_dataset`, `train_forecast_model`, `save_model`, `load_model`
- Imports: `joblib`, `logging`, `numpy`, `os`, `pandas`, `sklearn`, `utils`, `xgboost`

### `backend\routes\cip.py`
- Functions: `get_cip`
- Endpoints: `GET /cip`, `router.GET /cip`
- Imports: `fastapi`, `schemas`, `services`

### `backend\routes\confidence.py`
- Functions: `get_confidence`
- Endpoints: `GET /confidence`, `router.GET /confidence`
- Imports: `fastapi`, `schemas`, `services`

### `backend\routes\coverage.py`
- Functions: `get_coverage`
- Endpoints: `GET /coverage`, `router.GET /coverage`
- Imports: `fastapi`, `schemas`, `services`

### `backend\routes\forecast.py`
- Functions: `get_forecast`
- Endpoints: `GET /forecast`, `router.GET /forecast`
- Imports: `fastapi`, `schemas`, `services`

### `backend\routes\hotspots.py`
- Functions: `get_hotspots`
- Endpoints: `GET /hotspots`, `router.GET /hotspots`
- Imports: `fastapi`, `schemas`, `services`

### `backend\routes\opportunities.py`
- Functions: `get_opportunities`
- Endpoints: `GET /opportunities`, `router.GET /opportunities`
- Imports: `fastapi`, `schemas`, `services`

### `backend\routes\plan.py`
- Functions: `plan_resource`, `plan_target`
- Endpoints: `POST /plan/resource`, `POST /plan/target`, `router.POST /plan/resource`, `router.POST /plan/target`
- Imports: `fastapi`, `schemas`, `services`

### `backend\routes\stations.py`
- Functions: `get_stations`
- Endpoints: `GET /stations`, `router.GET /stations`
- Imports: `fastapi`, `schemas`, `services`

### `backend\routes\summary.py`
- Functions: `get_summary`
- Endpoints: `GET /summary`, `router.GET /summary`
- Imports: `fastapi`, `schemas`, `services`

### `backend\routes\value_proof.py`
- Functions: `get_value_proof`
- Endpoints: `GET /value-proof`, `router.GET /value-proof`
- Imports: `fastapi`, `schemas`, `services`

### `backend\schemas\cip.py`
- Classes: `TimeWeights`, `WeightsUsed`, `CIPJunction`, `CIPDistribution`, `CIPResponse`
- Imports: `pydantic`, `typing`

### `backend\schemas\confidence.py`
- Classes: `ConfidenceItem`, `ConfidenceResponse`
- Imports: `pydantic`, `typing`

### `backend\schemas\coverage.py`
- Classes: `CurvePoint`, `RecommendedStaffing`, `CoverageResponse`
- Imports: `pydantic`, `typing`

### `backend\schemas\forecast.py`
- Classes: `ForecastItem`, `ForecastResponse`
- Imports: `pydantic`, `typing`

### `backend\schemas\hotspot.py`
- Classes: `HotspotItem`, `DBSCANCluster`, `DBSCANInfo`, `HotspotResponse`
- Imports: `pydantic`, `typing`

### `backend\schemas\opportunity.py`
- Classes: `OpportunityItem`, `OpportunityResponse`
- Imports: `pydantic`, `typing`

### `backend\schemas\plan.py`
- Classes: `DeploymentItem`, `ResourcePlanRequest`, `ResourcePlanResponse`, `TargetPlanRequest`, `TargetPlanResponse`
- Imports: `pydantic`, `typing`

### `backend\schemas\station.py`
- Classes: `StationItem`, `StationResponse`
- Imports: `pydantic`, `typing`

### `backend\schemas\summary.py`
- Classes: `MissingValueInfo`, `DataQuality`, `DateRange`, `DataSummaryResponse`
- Imports: `pydantic`, `typing`

### `backend\schemas\value_proof.py`
- Classes: `ComparisonItem`, `ValueProofSummary`, `ValueProofResponse`
- Imports: `pydantic`, `typing`

### `backend\services\cip_service.py`
- Functions: `get_cip_scores`
- Imports: `logging`, `numpy`, `services`, `utils`

### `backend\services\confidence_service.py`
- Functions: `get_confidence_scores`
- Imports: `functools`, `logging`, `numpy`, `services`

### `backend\services\coverage_service.py`
- Functions: `get_coverage_curve`
- Imports: `kneed`, `logging`, `services`

### `backend\services\data_loader.py`
- Classes: `DataStore`
- Functions: `get_instance`, `df`, `junction_cip`, `junction_hours`, `raw_count`, `_load`, `_build_junction_cip`, `_compute_junction_officer_hours`
- Imports: `datetime`, `json`, `logging`, `numpy`, `pandas`, `services`, `typing`, `utils`

### `backend\services\forecast_service.py`
- Functions: `_build_weekly_df`, `_add_lag_features`, `get_forecasts`
- Imports: `functools`, `joblib`, `logging`, `numpy`, `os`, `pandas`, `services`, `sklearn`, `utils`, `xgboost`

### `backend\services\hotspot_service.py`
- Functions: `get_hotspots`
- Imports: `logging`, `numpy`, `services`, `sklearn`

### `backend\services\opportunity_service.py`
- Functions: `get_opportunities`
- Imports: `functools`, `logging`, `services`

### `backend\services\plan_service.py`
- Functions: `_get_solver_status_name`, `_format_window`, `_greedy_select_resource`, `_greedy_select_target`, `plan_by_resource`, `plan_by_target`
- Imports: `logging`, `ortools`, `services`

### `backend\services\preprocessing.py`
- Functions: `parse_violation_types`, `compute_ist_hour`, `normalize_range`
- Imports: `datetime`, `json`, `logging`, `numpy`, `pandas`

### `backend\services\station_service.py`
- Functions: `get_station_stats`
- Imports: `logging`, `pandas`, `services`

### `backend\services\summary_service.py`
- Functions: `get_summary`
- Imports: `collections`, `logging`, `services`

### `backend\services\value_proof_service.py`
- Functions: `get_value_proof`
- Imports: `logging`, `services`

## JavaScript/TypeScript Source Signals

### `frontend\src\api\client.js`
- Symbols: `api`, `message`, `fetchSummary`, `fetchHotspots`, `fetchCIP`, `fetchForecast`, `fetchConfidence`, `fetchOpportunities`, `fetchValueProof`, `fetchStations`, `fetchCoverage`, `postResourcePlan`, `postTargetPlan`, `fetchHealth`
- Imports: `axios`

### `frontend\src\App.jsx`
- Symbols: `App`
- Imports: `@/components/layout/DashboardLayout`, `@/pages/CIPDashboard`, `@/pages/ConfidenceEngine`, `@/pages/CoverageAnalysis`, `@/pages/Forecasting`, `@/pages/HotspotIntelligence`, `@/pages/Opportunities`, `@/pages/Overview`, `@/pages/ResourcePlanner`, `@/pages/Settings`, `@/pages/StationAnalytics`, `@/pages/TargetPlanner`, `@/pages/ValueProof`, `react-router-dom`

### `frontend\src\components\common\AnimatedCounter.jsx`
- Symbols: `AnimatedCounter`, `spring`, `rounded`
- Imports: `framer-motion`, `react`

### `frontend\src\components\common\DataStates.jsx`
- Symbols: `LoadingState`, `ErrorState`, `useFetchData`, `load`, `result`
- Imports: `framer-motion`, `lucide-react`, `react`

### `frontend\src\components\common\DataTable.jsx`
- Symbols: `DataTable`, `filtered`, `rows`, `q`, `val`, `col`, `av`, `bv`, `totalPages`, `paged`, `handleSort`, `SortIcon`
- Imports: `lucide-react`, `react`

### `frontend\src\components\common\KPICard.jsx`
- Symbols: `colorMap`, `KPICard`, `c`
- Imports: `./AnimatedCounter`, `framer-motion`, `lucide-react`

### `frontend\src\components\layout\DashboardLayout.jsx`
- Symbols: `DashboardLayout`, `location`, `sidebarCollapsed`
- Imports: `./Sidebar`, `./TopNav`, `@/components/common/ErrorBoundary`, `@/store/useStore`, `framer-motion`, `react-router-dom`

### `frontend\src\components\layout\Sidebar.jsx`
- Symbols: `navItems`, `Sidebar`
- Imports: `@/lib/utils`, `@/store/useStore`, `framer-motion`, `lucide-react`, `react-router-dom`

### `frontend\src\components\layout\TopNav.jsx`
- Symbols: `pageTitles`, `TopNav`, `location`, `title`
- Imports: `@/api/client`, `@/components/common/DataStates`, `@/lib/utils`, `@/store/useStore`, `lucide-react`, `react`, `react-router-dom`

### `frontend\src\components\maps\HotspotMap.jsx`
- Symbols: `BENGALURU_CENTER`, `createGlowIcon`, `HeatmapLayer`, `map`, `heatData`, `heat`, `ClusterLayer`, `map`, `cluster`, `color`, `marker`, `popupContent`, `MapResizer`, `map`, `timer`, `HotspotMap`, `validMarkers`, `maxCip`, `defaultGetColor`, `cip`, `ratio`, `enrichedMarkers`, `heatPoints`
- Imports: `@/lib/utils`, `leaflet`, `react`, `react-leaflet`

### `frontend\src\lib\utils.js`
- Symbols: `cn`, `formatNumber`, `formatPercent`, `formatDateRange`, `fmt`, `formatHourWindow`, `pad`, `getRiskColor`, `ratio`, `getTrendBadge`, `map`, `getConfidenceLevel`
- Imports: `clsx`, `tailwind-merge`

### `frontend\src\pages\CIPDashboard.jsx`
- Symbols: `chartTooltipStyle`, `PIE_COLORS`, `CIPDashboard`, `junctions`, `top10`, `dist`, `pieData`, `stationBreakdown`, `st`, `stationData`, `highImpact`, `columns`
- Imports: `@/api/client`, `@/components/common/DataStates`, `@/components/common/DataTable`, `@/components/common/KPICard`, `@/lib/utils`, `framer-motion`, `lucide-react`, `recharts`

### `frontend\src\pages\ConfidenceEngine.jsx`
- Symbols: `ReliabilityGauge`, `level`, `pct`, `radius`, `circumference`, `offset`, `ConfidenceEngine`, `scores`, `avgConfidence`, `highConf`, `lowConf`, `topScore`, `columns`, `level`
- Imports: `@/api/client`, `@/components/common/DataStates`, `@/components/common/DataTable`, `@/components/common/KPICard`, `@/lib/utils`, `framer-motion`, `lucide-react`

### `frontend\src\pages\CoverageAnalysis.jsx`
- Symbols: `chartTooltipStyle`, `CoverageAnalysis`, `curve`, `kneePoint`, `kneeEntry`, `marginalData`, `prev`, `marginal`, `hoursDelta`
- Imports: `@/api/client`, `@/components/common/DataStates`, `@/components/common/KPICard`, `@/lib/utils`, `framer-motion`, `lucide-react`, `recharts`

### `frontend\src\pages\Forecasting.jsx`
- Symbols: `TOOLTIP_STYLE`, `TREND_COLORS`, `TrendIcon`, `Forecasting`, `forecasts`, `chartData`, `trendCounts`, `trendPie`, `maeDiff`, `columns`, `badge`
- Imports: `@/api/client`, `@/components/common/DataStates`, `@/components/common/DataTable`, `@/components/common/KPICard`, `@/lib/utils`, `framer-motion`, `lucide-react`, `recharts`

### `frontend\src\pages\HotspotIntelligence.jsx`
- Symbols: `HotspotIntelligence`, `columns`
- Imports: `@/api/client`, `@/components/common/DataStates`, `@/components/common/DataTable`, `@/components/maps/HotspotMap`, `@/lib/utils`, `framer-motion`, `lucide-react`

### `frontend\src\pages\Opportunities.jsx`
- Symbols: `Opportunities`, `setTopOpportunity`, `opps`, `top`, `totalScore`, `columns`
- Imports: `@/api/client`, `@/components/common/DataStates`, `@/components/common/DataTable`, `@/components/common/KPICard`, `@/lib/utils`, `@/store/useStore`, `framer-motion`, `lucide-react`, `react`

### `frontend\src\pages\Overview.jsx`
- Symbols: `TOOLTIP_STYLE`, `Overview`, `setTopOpportunity`, `monthNames`, `temporalData`, `totalMissingCols`, `totalCols`, `qualityBars`, `vehicleData`, `topOppScore`
- Imports: `@/api/client`, `@/components/common/DataStates`, `@/components/common/KPICard`, `@/components/maps/HotspotMap`, `@/lib/utils`, `@/store/useStore`, `framer-motion`, `lucide-react`, `react`, `recharts`

### `frontend\src\pages\ResourcePlanner.jsx`
- Symbols: `ResourcePlanner`, `generatePlan`, `result`, `columns`
- Imports: `@/api/client`, `@/components/common/DataTable`, `@/components/common/KPICard`, `@/components/maps/HotspotMap`, `@/lib/utils`, `framer-motion`, `lucide-react`, `react`

### `frontend\src\pages\Settings.jsx`
- Symbols: `SettingsPage`
- Imports: `@/api/client`, `@/components/common/DataStates`, `@/lib/utils`, `@/store/useStore`, `framer-motion`, `lucide-react`

### `frontend\src\pages\StationAnalytics.jsx`
- Symbols: `chartTooltipStyle`, `PIE_COLORS`, `StationAnalytics`, `stations`, `top10`, `pieData`, `barData`, `columns`
- Imports: `@/api/client`, `@/components/common/DataStates`, `@/components/common/DataTable`, `@/components/common/KPICard`, `@/lib/utils`, `framer-motion`, `lucide-react`, `recharts`

### `frontend\src\pages\TargetPlanner.jsx`
- Symbols: `TargetPlanner`, `calculate`, `result`, `deploymentWithCumulative`, `cumulative`, `total`, `columns`
- Imports: `@/api/client`, `@/components/common/DataTable`, `@/components/common/KPICard`, `@/components/maps/HotspotMap`, `@/lib/utils`, `framer-motion`, `lucide-react`, `react`

### `frontend\src\pages\ValueProof.jsx`
- Symbols: `TOOLTIP_STYLE`, `ValueProof`, `comparison`, `summary`, `avgImprovement`, `maxImprovement`, `bestSize`, `bestEntry`, `barData`, `lineData`
- Imports: `@/api/client`, `@/components/common/DataStates`, `@/components/common/KPICard`, `@/lib/utils`, `framer-motion`, `lucide-react`, `recharts`

### `frontend\src\store\useStore.js`
- Symbols: `useStore`
- Imports: `zustand`

## Documentation and Presentation Files

- `backend\README.md`
- `frontend\README.md`
- `README.md`

## Test Files

- None detected

## File Inventory

- `.dockerignore` | 299 bytes | `8b37974f12af`
- `.gitignore` | 251 bytes | `7f1a13eeedca`
- `analyze_dataset.py` | 2927 bytes | `d86cbdaa21d5`
- `analyze_deep.py` | 3510 bytes | `1b471a9e22c7`
- `backend\.env.example` | 122 bytes | `421d4ab10ed7`
- `backend\__init__.py` | 32 bytes | `7bf4262cd7d0`
- `backend\app.py` | 4566 bytes | `47655da947d6`
- `backend\data\.gitkeep` | 3 bytes | `6bdf66b5bf2a`
- `backend\Dockerfile` | 1056 bytes | `6be4c0d4e1a3`
- `backend\models\__init__.py` | 33 bytes | `f719aac31132`
- `backend\models\training.py` | 4639 bytes | `8e21053b0db4`
- `backend\README.md` | 4376 bytes | `abf612dbc226`
- `backend\requirements.txt` | 253 bytes | `7fc084c94e8b`
- `backend\routes\__init__.py` | 33 bytes | `671211e84fc6`
- `backend\routes\cip.py` | 584 bytes | `03ce19cc7a24`
- `backend\routes\confidence.py` | 574 bytes | `c4c30099b115`
- `backend\routes\coverage.py` | 593 bytes | `18d8908eb2cc`
- `backend\routes\forecast.py` | 591 bytes | `a7f8670d993f`
- `backend\routes\hotspots.py` | 606 bytes | `df446c29f1b8`
- `backend\routes\opportunities.py` | 666 bytes | `b78dd1a65aff`
- `backend\routes\plan.py` | 1121 bytes | `3856dbbb3e1a`
- `backend\routes\stations.py` | 576 bytes | `2d0675f5451a`
- `backend\routes\summary.py` | 568 bytes | `65496a558618`
- `backend\routes\value_proof.py` | 602 bytes | `8c59ff01f9fe`
- `backend\schemas\__init__.py` | 24 bytes | `f5c337f85524`
- `backend\schemas\cip.py` | 912 bytes | `502f7bd26c22`
- `backend\schemas\confidence.py` | 424 bytes | `d153ed73d27f`
- `backend\schemas\coverage.py` | 523 bytes | `f4cf17f2235c`
- `backend\schemas\forecast.py` | 444 bytes | `d0ba02060bc0`
- `backend\schemas\hotspot.py` | 755 bytes | `89517fd69696`
- `backend\schemas\opportunity.py` | 521 bytes | `c226678f8ccb`
- `backend\schemas\plan.py` | 1045 bytes | `8f9cb33735d6`
- `backend\schemas\station.py` | 511 bytes | `406641c13bf3`
- `backend\schemas\summary.py` | 832 bytes | `6a85b02b4260`
- `backend\schemas\value_proof.py` | 485 bytes | `17fb62f286fc`
- `backend\services\__init__.py` | 35 bytes | `849e6d97aabc`
- `backend\services\cip_service.py` | 2820 bytes | `ac645326d74c`
- `backend\services\confidence_service.py` | 3933 bytes | `3a0443948f55`
- `backend\services\coverage_service.py` | 4414 bytes | `b86788c513bb`
- `backend\services\data_loader.py` | 10778 bytes | `66ec475c15a5`
- `backend\services\forecast_service.py` | 10206 bytes | `bc6a86336155`
- `backend\services\hotspot_service.py` | 3960 bytes | `c47447530e7d`
- `backend\services\opportunity_service.py` | 3808 bytes | `70c96fa5bec6`
- `backend\services\plan_service.py` | 9322 bytes | `194ed101b014`
- `backend\services\preprocessing.py` | 3485 bytes | `b07e64aaf89e`
- `backend\services\station_service.py` | 3956 bytes | `3c8832900d72`
- `backend\services\summary_service.py` | 4404 bytes | `f8b5d443a3f8`
- `backend\services\value_proof_service.py` | 5068 bytes | `b26b3851bc03`
- `backend\trained_models\.gitkeep` | 3 bytes | `6bdf66b5bf2a`
- `backend\utils\__init__.py` | 32 bytes | `7def585734c3`
- `backend\utils\config.py` | 888 bytes | `9375ff77af42`
- `backend\utils\weights.py` | 3696 bytes | `69fed99efab8`
- `docker-compose.yml` | 538 bytes | `828044e917fb`
- `Dockerfile` | 895 bytes | `499474cc7031`
- `frontend\index.html` | 994 bytes | `93cf9bc14db6`
- `frontend\jsconfig.json` | 126 bytes | `e95ac5263bc7`
- `frontend\package-lock.json` | 158847 bytes | `67acb28494da`
- `frontend\package.json` | 1047 bytes | `0492e376f0f2`
- `frontend\postcss.config.js` | 86 bytes | `374f669f08b1`
- `frontend\public\favicon.svg` | 312 bytes | `e1e81b6b4e7b`
- `frontend\README.md` | 1340 bytes | `18cf9bab0246`
- `frontend\src\api\client.js` | 1867 bytes | `2b3feb2a8fdb`
- `frontend\src\App.jsx` | 1818 bytes | `a392bc47158f`
- `frontend\src\components\common\AnimatedCounter.jsx` | 778 bytes | `ac09e75bde10`
- `frontend\src\components\common\DataStates.jsx` | 1665 bytes | `fddc0a457956`
- `frontend\src\components\common\DataTable.jsx` | 4699 bytes | `25d86978a54d`
- `frontend\src\components\common\ErrorBoundary.jsx` | 3228 bytes | `5324728b24f5`
- `frontend\src\components\common\KPICard.jsx` | 2599 bytes | `b425753c19c8`
- `frontend\src\components\layout\DashboardLayout.jsx` | 1209 bytes | `350d3ed544a5`
- `frontend\src\components\layout\Sidebar.jsx` | 4133 bytes | `99df46617778`
- `frontend\src\components\layout\TopNav.jsx` | 3224 bytes | `0d6112d6b972`
- `frontend\src\components\maps\HotspotMap.jsx` | 4665 bytes | `3035d9758ba8`
- `frontend\src\index.css` | 4390 bytes | `50d7d5c4588a`
- `frontend\src\lib\utils.js` | 1887 bytes | `e822f721a2cc`
- `frontend\src\main.jsx` | 234 bytes | `9af599f38753`
- `frontend\src\pages\CIPDashboard.jsx` | 6785 bytes | `c6f6ad7e47c9`
- `frontend\src\pages\ConfidenceEngine.jsx` | 7669 bytes | `b5d274004721`
- `frontend\src\pages\CoverageAnalysis.jsx` | 8363 bytes | `835410dd6744`
- `frontend\src\pages\Forecasting.jsx` | 7720 bytes | `3bf94dd8e0b9`
- `frontend\src\pages\HotspotIntelligence.jsx` | 4370 bytes | `5bc6c6f76ca6`
- `frontend\src\pages\Opportunities.jsx` | 5550 bytes | `e3da9eb0342d`
- `frontend\src\pages\Overview.jsx` | 11633 bytes | `a9bac6b7d669`
- `frontend\src\pages\ResourcePlanner.jsx` | 6533 bytes | `da6d1717992f`
- `frontend\src\pages\Settings.jsx` | 4356 bytes | `492905fc0303`
- `frontend\src\pages\StationAnalytics.jsx` | 5247 bytes | `ed895ee9cd58`
- `frontend\src\pages\TargetPlanner.jsx` | 6647 bytes | `e82468ea66e3`
- `frontend\src\pages\ValueProof.jsx` | 10171 bytes | `9207ef80eb7c`
- `frontend\src\store\useStore.js` | 462 bytes | `4da5c77ceb84`
- `frontend\tailwind.config.js` | 1365 bytes | `c599cfdf2b44`
- `frontend\vite.config.js` | 747 bytes | `1c17e263b7bf`
- `README.md` | 6874 bytes | `11d652aa4c7a`
- `requirements.txt` | 253 bytes | `7fc084c94e8b`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

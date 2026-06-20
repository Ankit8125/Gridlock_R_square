# Gridlock-Flipkart-v1

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\Gridlock-Flipkart-v1`
- Git remote: `https://github.com/anish-9387/Gridlock-Flipkart.git`
- Git branch: `main`
- Git HEAD: `37c17f21c63eddaf36f97802a994f1db65f74a46`
- Fingerprint: `4efe839d9ad6a329d922010c9ae1ef09b51792f249956093b43f3d5e825fd572`
- Files indexed: `62`
- Indexed size: `10768564` bytes

## Stack Signals

- `FastAPI`
- `Next.js`
- `Node/Express`
- `React`
- `Streamlit`
- `Tailwind CSS`

## Traffic Problem Signals

- traffic: bangalore, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, police, resource
- models: calibration, classifier, gru, knn, regressor, xgboost
- routing: dijkstra

## Manifests

- `frontend\package.json`
- `pyproject.toml`
- `requirements.txt`

## Package Files

### `frontend\package.json`
- Name: `rippl-frontend`
- Scripts:
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
- Dependencies: `@types/node`, `@types/react`, `@types/react-dom`, `autoprefixer`, `lucide-react`, `next`, `postcss`, `react`, `react-dom`, `recharts`, `tailwindcss`, `typescript`

## Python Dependencies

### `requirements.txt`
- `fastapi>=0.109.0`
- `uvicorn>=0.27.0`
- `pandas>=1.5.0`
- `numpy>=1.24.0`
- `xgboost>=2.0.0`
- `scikit-learn>=1.2.0`
- `networkx>=3.0`
- `scipy>=1.10.0`
- `joblib>=1.2.0`
- `shap>=0.41.0`
- `python-multipart>=0.0.6`

## README Headings

- `README.md`: ## What this looks like in practice
- `README.md`: ## Why this project is different
- `README.md`: ## Quickstart
- `README.md`: ## Model performance
- `README.md`: ### Why the numbers are trustworthy (and what we fixed)
- `README.md`: ## Signature features
- `README.md`: ## Dashboard modules
- `README.md`: ## Architecture
- `README.md`: ## Project structure
- `README.md`: ## Known limitations
- `README.md`: ## Roadmap

## README Claims and Operational Notes

- `README.md`: <strong>Predicting the impact of what happens next.</strong><br/>
- `README.md`: > Rippl predicts how disruptions spread, how much time authorities have before escalation,
- `README.md`: Most teams build an "event → congestion" classifier. Rippl models the real chain —
- `README.md`: - A **survival model** that handles censored resolution times instead of trusting corrupt administrative timestamps.
- `README.md`: - A **calibrated** cascade-risk model whose probabilities are trustworthy (Brier 0.24 → 0.038).
- `README.md`: - A **leakage-free** evaluation with a Model Card that states the limits up front.
- `README.md`: python train.py                        # build network, train models, write metrics
- `README.md`: cd frontend && pnpm install && pnpm dev # launch the dashboard
- `README.md`: poetry install && poetry run python train.py
- `README.md`: > **Reproducibility note:** all encoders and scalers are fit on the training slice only. Running `train.py` on a fresh clone produces the same `models/metrics.json` within floating-point tolerance.
- `README.md`: ## Model performance
- `README.md`: | Model | Task | Technique | Result |
- `README.md`: **1. Censored resolution times.** Only ~74 events have a real `resolved_datetime`. The rest fall back to `closed_datetime`, an administrative close (90th percentile ≈ 11.6 days). Rather than trust or discard these, th...
- `README.md`: The dashboard's Model Card page renders all of this live, including the cascade confusion matrix and the calibration curve.
- `README.md`: ## Signature features
- `README.md`: **Post-Event Learning loop** — predictions are stored, matched to outcomes, and scored over time. Closes the gap the brief identified: no existing post-event learning system.
- `README.md`: **Explainability** — exact tree-SHAP per prediction via XGBoost's native `pred_contribs`. No extra dependency. Surfaced as a driver waterfall so operators can see exactly why a risk score is high.
- `README.md`: ## Dashboard modules
- `README.md`: | 1 | Dashboard Overview | KPIs, distributions, time series, fragility leaderboard |
- `README.md`: | 2 | Event Impact Prediction | Impact + calibrated cascade % + TTF + tree-SHAP waterfall |
- `README.md`: | 3 | Early Warning System | Pre-event 0–100 risk index, deployment lead time, city-wide percolation risk |
- `README.md`: | 10 | Resource Recommendation | Officers / barricades / monitoring / diversion |
- `README.md`: | 13 | Post-Event Learning | Prediction-vs-actual log, calibration curve, accuracy drift |
- `README.md`: | 14 | Model Card | Held-out metrics, methodology, and stated limitations |
- `README.md`: ├─► Feature Pipeline ──── 28 leak-safe features (cyclical time, smoothed target encoding, centrality)
- `README.md`: ├─► AFT Resolution Model ──────── XGBoost survival:aft
- `README.md`: └─► Streamlit Decision-Support Dashboard (14 modules)
- `README.md`: app.py                     dashboard (14 pages)
- `README.md`: feature_engineering.py   leak-safe features, composite impact, survival bounds
- `README.md`: models.py                XGBoost classifiers, AFT survival, isotonic calibration, SHAP
- `README.md`: post_event.py            prediction log, history replay, drift tracking
- `README.md`: explain.py               SHAP waterfall + feature importance
- `README.md`: resources.py             context-aware resource recommendation
- `README.md`: models/                    trained artifacts + metrics.json
- `README.md`: **Resolution duration is intrinsically hard to predict** in this data. In-distribution AUC for "will it exceed 60 min?" is ~0.61 and near-random out-of-time, because the resolution target is largely censored. We surfa...
- `README.md`: - LLM "Traffic Commander" copilot grounded on model outputs (RAG)

## Data Assets

- `data\dataset.csv`
- `data\junction_centrality.csv`
- `data\junction_vulnerability.csv`
- `data\predictions_log.csv`
- `models\metrics.json`

## Model and Artifact Assets

- `models\cascade_calibrator.pkl`
- `models\cascade_classifier.pkl`
- `models\encoders.pkl`
- `models\hotspots.pkl`
- `models\impact_classifier.pkl`
- `models\metrics.json`
- `models\network.pkl`
- `models\prolonged_classifier.pkl`
- `models\resolution_regressor.pkl`
- `models\similarity.pkl`

## Notebooks

- None detected

## API Endpoints

- `GET /api/dashboard/stats`
- `GET /api/dashboard/vulnerability`
- `GET /api/events`
- `GET /api/health`
- `GET /api/hotspots`
- `POST /api/autopsy`
- `POST /api/predict`
- `POST /api/resources`
- `POST /api/similarity`
- `app.GET /api/dashboard/stats`
- `app.GET /api/dashboard/vulnerability`
- `app.GET /api/events`
- `app.GET /api/health`
- `app.GET /api/hotspots`
- `app.POST /api/autopsy`
- `app.POST /api/predict`
- `app.POST /api/resources`
- `app.POST /api/similarity`

## Python Source Signals

### `api.py`
- Classes: `PredictionInput`, `SimilarityInput`, `AutopsyInput`, `ResourceInput`
- Functions: `_load_all`, `_safe_val`, `_clean_json`, `_get_impact_label`, `_get_impact_color`, `health`, `dashboard_stats`, `get_vulnerability`, `predict`, `similarity_search`, `get_hotspots`, `get_events`, `run_autopsy_endpoint`, `get_resources`
- Endpoints: `GET /api/health`, `GET /api/dashboard/stats`, `GET /api/dashboard/vulnerability`, `POST /api/predict`, `POST /api/similarity`, `GET /api/hotspots`, `GET /api/events`, `POST /api/autopsy`, `POST /api/resources`, `app.GET /api/health`, `app.GET /api/dashboard/stats`, `app.GET /api/dashboard/vulnerability`, `app.POST /api/predict`, `app.POST /api/similarity`, `app.GET /api/hotspots`, `app.GET /api/events`, `app.POST /api/autopsy`, `app.POST /api/resources`
- Imports: `datetime`, `fastapi`, `joblib`, `json`, `numpy`, `os`, `pandas`, `pickle`, `pydantic`, `src`, `typing`, `uvicorn`

### `src\black_box.py`
- Functions: `_to_dt`, `reconstruct_timeline`, `avoidable_delay`, `root_cause_analysis`
- Imports: `datetime`, `numpy`, `pandas`, `src`

### `src\cascade_autopsy.py`
- Functions: `_peak`, `_score`, `run_autopsy`
- Imports: `datetime`, `numpy`, `pandas`, `src`

### `src\digital_twin.py`
- Functions: `run_scenario`, `compare_scenarios`, `scenarios_to_dataframe`
- Imports: `datetime`, `pandas`, `src`

### `src\early_warning.py`
- Functions: `_peak`, `assess_event`, `city_risk`
- Imports: `numpy`, `pandas`, `src`

### `src\explain.py`
- Functions: `humanize`, `drivers_text`, `waterfall_figure`, `importance_figure`
- Imports: `plotly`

### `src\feature_engineering.py`
- Functions: `parse_datetime`, `compute_resolution_time`, `compute_survival_bounds`, `duration_band`, `create_impact_target`, `create_prolonged_target`, `create_cascade_target`, `_normalize_cats`, `_time_features`, `_fit_encoders`, `_transform`, `cause_resolution_prior`, `display_resolution`, `engineer_features`
- Imports: `numpy`, `pandas`, `sklearn`, `warnings`

### `src\hotspot_detection.py`
- Functions: `detect_hotspots`, `analyze_cause_hotspots`, `detect_hotspots_by_cause`, `save_hotspot_models`, `load_hotspot_models`
- Imports: `numpy`, `os`, `pandas`, `pickle`, `sklearn`

### `src\knowledge_graph.py`
- Functions: `build_event_graph`, `get_graph_stats`
- Imports: `numpy`, `pandas`, `sklearn`, `warnings`

### `src\models.py`
- Functions: `_val_split`, `train_impact_classifier`, `train_duration_band_classifier`, `train_cascade_classifier`, `calibrate_binary`, `predict_cascade_proba`, `train_aft_resolution`, `predict_resolution`, `evaluate_classifier`, `evaluate_resolution`, `explain_prediction`, `feature_importance`, `save_model`, `load_model`, `make`
- Imports: `joblib`, `numpy`, `os`, `sklearn`, `warnings`, `xgboost`

### `src\network.py`
- Functions: `_normalize_junction`, `junction_centroids`, `_haversine`, `build_road_graph`, `compute_centrality`, `centrality_feature_map`, `simulate_propagation`, `percolation_early_warning`, `multi_source_percolation`, `diversion_candidates`, `save_network`, `load_network`
- Imports: `networkx`, `numpy`, `os`, `pandas`, `pickle`

### `src\post_event.py`
- Functions: `_empty`, `load_log`, `log_prediction`, `seed_from_history`, `learning_summary`, `accuracy_over_time`
- Imports: `numpy`, `os`, `pandas`, `src`

### `src\resources.py`
- Functions: `recommend_resources`, `log_recommendation`, `get_learning_summary`
- Imports: `numpy`, `pandas`

### `src\similarity.py`
- Functions: `build_event_text_profile`, `train_similarity_engine`, `find_similar_events`, `save_similarity_engine`, `load_similarity_engine`
- Imports: `numpy`, `os`, `pandas`, `pickle`, `sklearn`

### `src\ttf.py`
- Functions: `escalation_pressure`, `risk_level`, `estimate_ttf`
- Imports: `numpy`

### `src\vulnerability.py`
- Functions: `_norm`, `compute_junction_vulnerability`, `get_fragile_junctions`
- Imports: `numpy`, `pandas`

### `train.py`
- Functions: `main`
- Imports: `joblib`, `json`, `numpy`, `os`, `pandas`, `pickle`, `sklearn`, `src`, `warnings`, `xgboost`

## JavaScript/TypeScript Source Signals

### `frontend\next.config.js`
- Symbols: `nextConfig`

### `frontend\src\app\autopsy\page.tsx`
- Symbols: `AutopsyPage`, `runAutopsy`, `r`, `getStatusColor`, `d`, `AutopsyCard`, `TimelineDot`
- Imports: `@/lib/api`, `@/types`, `lucide-react`, `react`

### `frontend\src\app\hotspots\page.tsx`
- Symbols: `CAUSE_COLORS`, `HotspotsPage`, `d`, `keys`, `causeList`, `totalClusters`, `SummaryBox`, `LoadingHotspots`
- Imports: `@/lib/api`, `lucide-react`, `react`

### `frontend\src\app\layout.tsx`
- Symbols: `RootLayout`
- Imports: `@/components/Sidebar`, `next`

### `frontend\src\app\page.tsx`
- Symbols: `IMPACT_COLORS`, `CHART_COLORS`, `Dashboard`, `typeData`, `impactData`, `causeData`, `tsData`, `maxVal`, `pct`, `MetricCard`, `MetricBadge`, `LoadingSkeleton`, `ErrorState`
- Imports: `@/lib/api`, `@/types`, `lucide-react`, `react`, `recharts`

### `frontend\src\app\predict\page.tsx`
- Symbols: `EVENT_CAUSES`, `CORRIDORS`, `ZONES`, `IMPACT_COLORS_CHART`, `IMPACT_LABELS`, `PredictPage`, `handleSubmit`, `r`, `update`, `ResultCard`, `MiniCard`
- Imports: `@/lib/api`, `@/types`, `lucide-react`, `react`, `recharts`

### `frontend\src\app\resources\page.tsx`
- Symbols: `EVENT_CAUSES_LIST`, `CORRIDORS_LIST`, `ResourcesPage`, `handleSubmit`, `r`, `ResourceBox`
- Imports: `@/lib/api`, `@/types`, `lucide-react`, `react`, `recharts`

### `frontend\src\app\similarity\page.tsx`
- Symbols: `EVENT_CAUSES`, `CORRIDORS`, `ZONES`, `SimilarityPage`, `handleSearch`, `r`, `SimilarEventCard`, `simPct`
- Imports: `@/lib/api`, `@/types`, `lucide-react`, `react`

### `frontend\src\app\vulnerability\page.tsx`
- Symbols: `VulnerabilityPage`, `filtered`, `getRiskHex`, `LoadingSkeletonVuln`
- Imports: `@/lib/api`, `@/types`, `lucide-react`, `react`

### `frontend\src\components\Sidebar.tsx`
- Symbols: `links`, `Sidebar`, `pathname`, `sidebarContent`, `active`
- Imports: `lucide-react`, `next/link`, `next/navigation`, `react`

### `frontend\src\lib\api.ts`
- Symbols: `API_BASE`, `res`, `err`, `api`
- Imports: `@/types`

## Documentation and Presentation Files

- `AGENTS.md`
- `README.md`

## Test Files

- None detected

## File Inventory

- `.gitignore` | 575 bytes | `eea988cbf85b`
- `AGENTS.md` | 6826 bytes | `5331f619045e`
- `api.py` | 15705 bytes | `0a76885f5eb3`
- `assets\logo.png` | 64584 bytes | `396e5565cf51`
- `assets\logo.svg` | 625 bytes | `e8765121ff9c`
- `assets\wordmark.png` | 82092 bytes | `732dd237fb66`
- `assets\wordmark.svg` | 961 bytes | `fbfd67c6060e`
- `data\dataset.csv` | 4547022 bytes | `11469a7450fd`
- `data\junction_centrality.csv` | 37156 bytes | `6b7d7fcdc585`
- `data\junction_vulnerability.csv` | 38384 bytes | `20b6bb9e7ed6`
- `data\predictions_log.csv` | 78398 bytes | `4ba79f69dfbc`
- `frontend\.env.example` | 41 bytes | `196d99962af7`
- `frontend\next-env.d.ts` | 233 bytes | `e462a655754d`
- `frontend\next.config.js` | 155 bytes | `2d4c5b8dac94`
- `frontend\package.json` | 762 bytes | `5328e9db2d3a`
- `frontend\pnpm-lock.yaml` | 41880 bytes | `265321c5914e`
- `frontend\postcss.config.js` | 89 bytes | `b78f5d0a0a44`
- `frontend\src\app\autopsy\page.tsx` | 7815 bytes | `4f655bf28f87`
- `frontend\src\app\globals.css` | 4717 bytes | `1fdcb9e1eeed`
- `frontend\src\app\hotspots\page.tsx` | 5382 bytes | `44ca80e32efa`
- `frontend\src\app\icon.svg` | 541 bytes | `d7d3781c4aa0`
- `frontend\src\app\layout.tsx` | 656 bytes | `013411164c48`
- `frontend\src\app\page.tsx` | 11323 bytes | `e2d363e9eb4b`
- `frontend\src\app\predict\page.tsx` | 10249 bytes | `939d686fc525`
- `frontend\src\app\resources\page.tsx` | 10553 bytes | `64701552ab9c`
- `frontend\src\app\similarity\page.tsx` | 7435 bytes | `0c43abece2b6`
- `frontend\src\app\vulnerability\page.tsx` | 5239 bytes | `bfcf01e90c9a`
- `frontend\src\components\Sidebar.tsx` | 4834 bytes | `09467a80f5d6`
- `frontend\src\lib\api.ts` | 1794 bytes | `9ca0c803d223`
- `frontend\src\types\index.ts` | 3233 bytes | `d791cf180f4c`
- `frontend\tailwind.config.ts` | 2342 bytes | `ea81a3de99bb`
- `frontend\tsconfig.json` | 587 bytes | `408719ded139`
- `models\cascade_calibrator.pkl` | 703 bytes | `3d66b4671d05`
- `models\cascade_classifier.pkl` | 110553 bytes | `a6fb16485b2b`
- `models\encoders.pkl` | 44977 bytes | `f065a637ca07`
- `models\hotspots.pkl` | 29978 bytes | `1fb152804d20`
- `models\impact_classifier.pkl` | 1741450 bytes | `3613ecb1afb6`
- `models\metrics.json` | 2020 bytes | `f09eeaaa733f`
- `models\network.pkl` | 91888 bytes | `e28867da906c`
- `models\prolonged_classifier.pkl` | 109304 bytes | `b512a8c90b7b`
- `models\resolution_regressor.pkl` | 56 bytes | `02060f07fb10`
- `models\resolution_regressor.ubj` | 445031 bytes | `a4e2f712789a`
- `models\similarity.pkl` | 3090095 bytes | `1609f78b4e98`
- `pyproject.toml` | 1142 bytes | `08173167df48`
- `README.md` | 9845 bytes | `d0b52587a8e8`
- `requirements.txt` | 204 bytes | `fe88ed291941`
- `src\black_box.py` | 4954 bytes | `4aa9378b4ff8`
- `src\cascade_autopsy.py` | 4703 bytes | `b9411de57f27`
- `src\digital_twin.py` | 4289 bytes | `bd0effb8d922`
- `src\early_warning.py` | 4811 bytes | `41667c38ea11`
- `src\explain.py` | 3200 bytes | `fc8426c815b5`
- `src\feature_engineering.py` | 16019 bytes | `ffe7ff9c0638`
- `src\hotspot_detection.py` | 2520 bytes | `0bc2b396a3c4`
- `src\knowledge_graph.py` | 4009 bytes | `631ab0d12ed7`
- `src\models.py` | 11468 bytes | `8beebae1b34e`
- `src\network.py` | 14284 bytes | `96878dbba90c`
- `src\post_event.py` | 5590 bytes | `c1b44822224c`
- `src\resources.py` | 3456 bytes | `dff3dfb28313`
- `src\similarity.py` | 2501 bytes | `5197cc3d3006`
- `src\ttf.py` | 2751 bytes | `37e8479bf660`
- `src\vulnerability.py` | 4637 bytes | `b198753edfa3`
- `train.py` | 9938 bytes | `d35fca44532c`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

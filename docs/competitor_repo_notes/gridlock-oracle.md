# gridlock-oracle

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock-oracle`
- Git remote: `https://github.com/kashishrai12/gridlock-oracle.git`
- Git branch: `main`
- Git HEAD: `cfbefbeb72b09f73fbfeb450b766e5b99fd8166c`
- Fingerprint: `01247edf3ed4c5d6c8d8795f4313af40162f3743630a897c832bc32e94f6c69e`
- Files indexed: `76`
- Indexed size: `64828037` bytes

## Stack Signals

- `FastAPI`
- `Node/Express`
- `Streamlit`

## Traffic Problem Signals

- traffic: astram, bangalore, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, manpower, police, resource
- models: calibration, classifier, conformal, regressor, xgboost
- routing: dijkstra, mapbox, osrm

## Manifests

- `requirements.txt`

## Python Dependencies

### `requirements.txt`
- `pandas==2.2.3`
- `numpy==1.26.4`
- `xgboost==2.0.3`
- `scikit-learn==1.4.0`
- `scipy==1.11.4`
- `streamlit==1.31.0`
- `streamlit-folium==0.18.0`
- `folium==0.15.1`
- `plotly==5.18.0`
- `requests==2.31.0`
- `networkx`

## README Headings

- `README.md`: # 🚦 Gridlock Oracle
- `README.md`: ## The story behind the model (why this is honest, not hand-wavy)
- `README.md`: ## What it does — three pillars, mapped to the theme
- `README.md`: ## Architecture
- `README.md`: ## Key results (temporal hold-out — honest forecasting setup)
- `README.md`: ## Methodology — the rigor that survives Q&A
- `README.md`: ## Project structure
- `README.md`: ## Setup & run
- `README.md`: # 1) build artifacts (order matters)
- `README.md`: # 2) (optional, recommended for the demo) cache the real Bengaluru road network
- `README.md`: # 3) launch the dashboard (single self-contained process — no API server needed)
- `README.md`: ## Tech stack
- `README.md`: ## Honest limitations

## README Claims and Operational Notes

- `README.md`: Predicts which incoming incidents will require a road closure, forecasts where and when
- `README.md`: events cluster, and generates **capacity-aware** diversion routes that avoid creating a
- `README.md`: > recommend optimal manpower, barricading, and diversion plans."*
- `README.md`: ## The story behind the model (why this is honest, not hand-wavy)
- `README.md`: We started where most teams would: **predict how long an incident takes to clear.** The
- `README.md`: temporal-split model scored **R² ≈ 0**. Rather than ship a model with a suspiciously
- `README.md`: predict* and pivoted on the evidence:
- `README.md`: | Clearance-time regression | R² ≈ 0 (no signal) | ❌ dropped as a prediction; kept as a *descriptive* stat |
- `README.md`: | **Road-closure need (classification)** | **PR-AUC 3.3× baseline** | ✅ **headline model** |
- `README.md`: | **Manpower** | Spatiotemporal hotspot analytics → deployment recommender | ✅ descriptive, on 8,173 events |
- `README.md`: | **Diversion** | **Capacity-aware** routing → routes around congestion, not into it | ✅ differentiator |
- `README.md`: CSV --> PP["preprocess.py<br/>• real clearance target (closed_datetime)<br/>• leakage-free features<br/>• temporal split · self-profiling"]
- `README.md`: PP --> TM["train_model.py<br/><b>Closure-Need Classifier</b><br/>XGBoost · imbalance-aware"]
- `README.md`: PP --> HS["hotspots.py<br/>spatiotemporal density<br/>+ manpower recommender"]
- `README.md`: TM --> ART[("models/<br/>closure_clf.json<br/>location_stats.pkl<br/>hotspot_*.csv<br/>congestion_grid.csv<br/>enriched_dataset.csv")]
- `README.md`: ART --> PRED["predictor.py<br/>closure prob · impact · resources<br/>· pred_contribs explanations"]
- `README.md`: ART --> ROUTE["routing.py<br/>capacity-aware diversion<br/>+ barricade points"]
- `README.md`: CG --> ROUTE
- `README.md`: PRED --> DASH["dashboard.py · Streamlit<br/>Predict · Risk Map · Analytics<br/>· Diversion · Learning Loop"]
- `README.md`: ROUTE --> DASH
- `README.md`: **Hotspots** — 8,173 events; busiest junction and peak hours surfaced for deployment.
- `README.md`: > problem. We deliberately **exclude** closure-derived location features to keep the
- `README.md`: (`closed_datetime − start_datetime`), never a formula we made up and trained a model to copy.
- `README.md`: - **Leakage-free features.** Nothing derived from `end/closed/resolved_datetime` or `status`
- `README.md`: forecasting (a random split would let the model peek ahead).
- `README.md`: - **Self-profiling features.** Columns auto-skip when too sparse (e.g. `reason_breakdown` at 3%).
- `README.md`: - **Capacity-aware routing.** Road cost = `length × (1 + 2.5 × congestion)`; routes ranked by
- `README.md`: │   └── preprocess.py        cleaning, real target, leakage-free features, temporal split
- `README.md`: ├── models/                  generated artifacts (model, stats, lookups, grids)
- `README.md`: ├── train_model.py           trains the closure-need classifier
- `README.md`: ├── predictor.py             single-event inference: prob · impact · resources · explain
- `README.md`: ├── hotspots.py              spatiotemporal density + manpower recommender
- `README.md`: ├── routing.py               capacity-aware diversion routes + barricade points
- `README.md`: ├── routing_page.py          Streamlit component for the Diversion page (in-process, no API)
- `README.md`: ├── dashboard.py             Streamlit app — 5 pages
- `README.md`: ## Setup & run
- `README.md`: python train_model.py --data data/flipkart_gridlock.csv     # closure classifier
- `README.md`: python hotspots.py    --data data/flipkart_gridlock.csv     # deployment hotspots
- `README.md`: # 2) (optional, recommended for the demo) cache the real Bengaluru road network
- `README.md`: # 3) launch the dashboard (single self-contained process — no API server needed)
- `README.md`: streamlit run dashboard.py
- `README.md`: **Dashboard pages**
- `README.md`: 1. **Predict Event** — closure-probability gauge, impact tier, barricade/manpower plan, "why" explanation
- `README.md`: 4. **Diversion & Barricades** — capacity-aware routes + barricade map
- `README.md`: - **Clearance time is not predictable** from this dataset; we present it only as a

## Data Assets

- `data\flipkart_gridlock.csv`
- `models\backtest_report.json`
- `models\backtest_threshold_curve.csv`
- `models\calibration_curve.csv`
- `models\calibration_metrics.json`
- `models\cascade_risk.json`
- `models\cascades.csv`
- `models\closure_clf.json`
- `models\congestion_grid.csv`
- `models\corridor_stats.csv`
- `models\enriched_dataset.csv`
- `models\hotspot_dow.csv`
- `models\hotspot_hourly.csv`
- `models\hotspot_junctions.csv`
- `models\hotspot_zone_hour.csv`
- `models\junction_risk.csv`
- `models\learning_curve.csv`
- `models\metrics.json`
- `models\scale_benchmark.csv`
- `models\survival_curves.csv`
- `models\zone_stats.csv`

## Model and Artifact Assets

- `models\analog_index.pkl`
- `models\backtest_report.json`
- `models\calibration_metrics.json`
- `models\cascade_risk.json`
- `models\cascade_risk.pkl`
- `models\closure_calibrator.pkl`
- `models\closure_clf.json`
- `models\conformal.pkl`
- `models\hawkes_params.pkl`
- `models\location_stats.pkl`
- `models\metrics.json`
- `models\risk_forecast.pkl`
- `models\shap_explainer.pkl`
- `models\survival_params.pkl`
- `models\xgb_clearance_model.pkl`
- `models\xgb_disruption_model.pkl`

## Notebooks

- None detected

## API Endpoints

- `GET /`
- `GET /corridors/list`
- `GET /corridors/load`
- `GET /feedback/stats`
- `GET /junctions/list`
- `GET /junctions/risk`
- `GET /zones/list`
- `POST /feedback`
- `POST /predict`
- `POST /predict/full`
- `POST /routing/full`
- `app.GET /`
- `app.GET /corridors/list`
- `app.GET /corridors/load`
- `app.GET /feedback/stats`
- `app.GET /junctions/list`
- `app.GET /junctions/risk`
- `app.GET /zones/list`
- `app.POST /feedback`
- `app.POST /predict`
- `app.POST /predict/full`
- `app.POST /routing/full`

## Python Source Signals

### `ab_test_embeddings.py`
- Functions: `get_desc`, `embed`, `fit_eval`, `main`
- Imports: `argparse`, `numpy`, `pandas`, `sentence_transformers`, `sklearn`, `torch`, `traceback`, `utils`, `xgboost`

### `ab_test_text.py`
- Functions: `fit_eval`, `main`
- Imports: `argparse`, `numpy`, `pandas`, `sklearn`, `text_features`, `utils`, `xgboost`

### `analogs.py`
- Classes: `AnalogRetriever`
- Functions: `_clean`, `_engineer`, `build_index`, `__init__`, `query`, `resource_plan`
- Imports: `argparse`, `json`, `numpy`, `os`, `pandas`, `pickle`, `sklearn`, `utils`

### `api.py`
- Classes: `EventInput`, `FeedbackInput`, `RoutingInput`
- Functions: `root`, `predict_event`, `junction_risk`, `corridor_load`, `list_junctions`, `list_corridors`, `list_zones`, `submit_feedback`, `feedback_stats`, `routing_full`, `predict_and_route`
- Endpoints: `GET /`, `POST /predict`, `GET /junctions/risk`, `GET /corridors/load`, `GET /junctions/list`, `GET /corridors/list`, `GET /zones/list`, `POST /feedback`, `GET /feedback/stats`, `POST /routing/full`, `POST /predict/full`, `app.GET /`, `app.POST /predict`, `app.GET /junctions/risk`, `app.GET /corridors/load`, `app.GET /junctions/list`, `app.GET /corridors/list`, `app.GET /zones/list`, `app.POST /feedback`, `app.GET /feedback/stats`, `app.POST /routing/full`, `app.POST /predict/full`
- Imports: `fastapi`, `os`, `pandas`, `predictor`, `pydantic`, `routing`, `sys`, `typing`

### `calibrate.py`
- Functions: `reliability`, `main`
- Imports: `argparse`, `json`, `numpy`, `pandas`, `pickle`, `sklearn`, `utils`, `xgboost`

### `cascade.py`
- Functions: `_load_events`, `_cascade_risk`, `detect_cascades`, `build_cascades`, `render_cascade_page`, `col`
- Imports: `argparse`, `numpy`, `os`, `pandas`, `plotly`, `streamlit`

### `check_text_fields.py`
- Functions: `assess`, `main`
- Imports: `argparse`, `pandas`

### `conformal.py`
- Functions: `main`, `classify`
- Imports: `argparse`, `numpy`, `pickle`, `utils`, `xgboost`

### `congestion.py`
- Classes: `CongestionSurface`
- Functions: `build_congestion_grid`, `_haversine_vec`, `load_surface`, `__init__`, `_bin`, `load_at`, `route_load`, `active_load`, `combined_load`
- Imports: `argparse`, `numpy`, `os`, `pandas`

### `dashboard.py`
- Functions: `root_vars`, `inject_css`, `icon`, `card_shell`, `card_header`, `stat_card`, `stat_grid`, `alert`, `risk_meter`, `render_leaderboard`, `style_fig`, `load_replay`, `load_conformal`, `load_survival_curves`, `load_survival_params`, `load_hawkes`, `load_predictor`, `load_enriched`, `load_csv`, `load_hawkes`, `load_cascades`, `load_event_pool`, `load_learning_curve`, `options`, `val`, `artifacts_ready`, `_ece`
- Imports: `cascade`, `conformal`, `datetime`, `hawkes`, `learning_loop`, `live_feed`, `numpy`, `optimizer`, `os`, `pandas`, `pickle`, `plotly`, `predictor`, `routing_page`, `sklearn`, `streamlit`, `time`

### `diagnose.py`
- Functions: `usable`
- Imports: `numpy`, `pandas`, `sys`

### `diagnose2.py`
- Functions: `col`
- Imports: `numpy`, `pandas`, `sys`

### `diagnose3.py`
- Functions: `fit_eval_reg`, `main`, `bucket`
- Imports: `argparse`, `numpy`, `pandas`, `sklearn`, `utils`, `xgboost`

### `evaluate.py`
- Functions: `_confusion`, `main`
- Imports: `analogs`, `argparse`, `json`, `numpy`, `pandas`, `pickle`, `sys`, `utils`, `xgboost`

### `find_high_risk_example.py`
- Functions: `_clean`, `build_event`, `_disp`, `main`
- Imports: `argparse`, `pandas`, `predictor`

### `hawkes.py`
- Classes: `HawkesModel`
- Functions: `_loc_key`, `_load_groups`, `_neg_ll`, `_poisson_ll`, `fit`, `__init__`, `branching_factor`, `half_life_min`, `intensity`, `risk_multiplier`, `decay_curve`, `expected_followons`, `expected_cluster_size`
- Imports: `argparse`, `math`, `numpy`, `pandas`, `pickle`, `scipy`

### `hotspots.py`
- Classes: `HotspotAnalyzer`
- Functions: `_load_all_events`, `build`, `__init__`, `expected_load`, `recommend`
- Imports: `argparse`, `json`, `numpy`, `os`, `pandas`

### `learning_loop.py`
- Functions: `_ece`, `_raw_probs_chrono`, `simulate`, `log_outcome`, `recalibrate_from_feedback`, `feedback_stats`
- Imports: `argparse`, `csv`, `numpy`, `os`, `pandas`, `pickle`, `sklearn`, `utils`, `xgboost`

### `live_feed.py`
- Functions: `source_status`, `real_feed_incidents`, `live_scored`, `prepare_replay`, `active_incidents`, `live_cascade_risk`, `risk_map_figure`
- Imports: `math`, `numpy`, `os`, `pandas`, `plotly`, `requests`

### `mappls.py`
- Classes: `MapplsClient`
- Functions: `_decode_polyline`, `client`, `_selftest`, `__init__`, `is_configured`, `_token`, `route`, `live_congestion_factor`, `geocode`, `base_tile_url`, `traffic_tile_url`
- Imports: `argparse`, `os`, `requests`, `time`

### `optimizer.py`
- Functions: `_attach_needs`, `build_event_pool`, `load_real_day`, `available_days`, `_summarize`, `optimize_deployment`, `_greedy`, `greedy_deployment`, `compare`
- Imports: `analogs`, `argparse`, `numpy`, `pandas`, `scipy`

### `predictor.py`
- Classes: `GridlockPredictor`
- Functions: `__init__`, `predict`, `_calibrate`, `_resources`, `_explain`
- Imports: `analogs`, `json`, `numpy`, `pickle`, `utils`, `xgboost`

### `routing.py`
- Functions: `_congestion_label`, `get_bengaluru_graph`, `nearest_node`, `find_barricade_points`, `_fallback_barricade_points`, `get_diversion_routes`, `_fallback_diversion_routes`, `_rank_capacity_aware`, `_haversine`, `full_routing_analysis`, `_enrich_with_live_traffic`
- Imports: `argparse`, `congestion`, `json`, `mappls`, `networkx`, `numpy`, `os`, `osmnx`, `pandas`

### `routing_page.py`
- Functions: `_base_map`, `render_routing_page`, `_render_map`, `_render_route_cards`, `_render_barricade_table`
- Imports: `folium`, `mappls`, `pandas`, `routing`, `streamlit`, `streamlit_folium`

### `scale_benchmark.py`
- Functions: `bench`, `main`
- Imports: `argparse`, `numpy`, `optimizer`, `pandas`, `time`

### `survival.py`
- Functions: `_load`, `kaplan_meier`, `median_from_km`, `_weibull_nll`, `fit_aft`, `_concordance`, `main`, `col`
- Imports: `argparse`, `math`, `numpy`, `pandas`, `pickle`, `scipy`

### `text_features.py`
- Functions: `add_text_features`, `extract_text_features`
- Imports: `pandas`, `re`

### `train_model.py`
- Functions: `classifier_features`, `operating_points`, `new_impact_score`, `main`
- Imports: `argparse`, `json`, `numpy`, `os`, `pandas`, `pickle`, `sklearn`, `utils`, `xgboost`

### `try_real_event.py`
- Functions: `to_event`, `show`, `main`, `closure_mask`
- Imports: `argparse`, `json`, `pandas`, `predictor`

### `utils\preprocess.py`
- Functions: `_parse_datetimes`, `_compute_target`, `_time_features`, `_encode_priority`, `_static_features`, `fit_location_stats`, `apply_location_stats`, `get_feature_cols`, `load_and_prepare`, `temporal_split`, `build_xy`, `derive_disruption_score`, `impact_tier`, `readiness_tier`, `classifier_feature_cols`, `closure_impact_score`, `featurize_event`, `col`, `agg`, `lookup`
- Imports: `numpy`, `pandas`

## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `mappls_setup.md`
- `README.md`

## Test Files

- `ab_test_embeddings.py`
- `ab_test_text.py`
- `models\backtest_report.json`
- `models\backtest_threshold_curve.csv`

## File Inventory

- `.gitignore` | 1405 bytes | `7286d45bd275`
- `.python-version` | 14 bytes | `fa87461d7b37`
- `.streamlit\config.toml` | 197 bytes | `14adec2c4963`
- `ab_test_embeddings.py` | 5869 bytes | `93f1636e7470`
- `ab_test_text.py` | 3747 bytes | `191f0df06306`
- `analogs.py` | 7739 bytes | `3f50284b769a`
- `api.py` | 4737 bytes | `70322cd1736a`
- `cache\1202155ad824e6629d177c1440b032c1c7ab301c.json` | 45058950 bytes | `2fa5018f85ab`
- `cache\f1e6ea0ba59974034d2f3a60aa923b7efa24c8fe.json` | 128971 bytes | `ab20d3e80fe5`
- `calibrate.py` | 4673 bytes | `a1cbcba3d477`
- `cascade.py` | 8372 bytes | `11f910343afe`
- `check_dataset.py` | 458 bytes | `121f00e70f39`
- `check_text_fields.py` | 1850 bytes | `022c81eb5fbe`
- `conformal.py` | 4383 bytes | `159a9824dee6`
- `congestion.py` | 6012 bytes | `3149247ee54b`
- `dashboard.py` | 58942 bytes | `16d654faf16a`
- `data\flipkart_gridlock.csv` | 4547022 bytes | `11469a7450fd`
- `development_process.txt` | 2441 bytes | `eeeb07f992fa`
- `diagnose.py` | 1714 bytes | `fdb0b6efbcb2`
- `diagnose2.py` | 1235 bytes | `c5eda5370a9a`
- `diagnose3.py` | 4249 bytes | `46f1e56ebb50`
- `evaluate.py` | 8728 bytes | `d5c2c3757560`
- `find_high_risk_example.py` | 3497 bytes | `13555e85b005`
- `hawkes.py` | 8460 bytes | `79d5c75650c3`
- `hotspots.py` | 5047 bytes | `3992dbe1624d`
- `learning_loop.py` | 5660 bytes | `44915879792d`
- `live_feed.py` | 10485 bytes | `9b9b99e03b41`
- `mappls.py` | 8764 bytes | `fc3b75ff9878`
- `mappls_setup.md` | 3992 bytes | `d74bc7e5916c`
- `models\analog_index.pkl` | 728383 bytes | `aab86cbdfff0`
- `models\backtest_report.json` | 981 bytes | `e4d1283a98fc`
- `models\backtest_threshold_curve.csv` | 319 bytes | `ec9f37611ad8`
- `models\calibration_curve.csv` | 548 bytes | `5da0c4763631`
- `models\calibration_metrics.json` | 294 bytes | `b568d5ba2558`
- `models\cascade_risk.json` | 474058 bytes | `8b1f59d35564`
- `models\cascade_risk.pkl` | 21921 bytes | `5b1295647752`
- `models\cascades.csv` | 534108 bytes | `392e0a4fe59e`
- `models\closure_calibrator.pkl` | 559 bytes | `43ff16882a3d`
- `models\closure_clf.json` | 1498421 bytes | `c698c88b8260`
- `models\conformal.pkl` | 121 bytes | `1f4f047587f9`
- `models\congestion_grid.csv` | 36611 bytes | `1e00b53864bc`
- `models\corridor_stats.csv` | 1611 bytes | `7ae2a150a2d7`
- `models\enriched_dataset.csv` | 1890494 bytes | `54124298f1e5`
- `models\hawkes_params.pkl` | 479 bytes | `2db157f5f406`
- `models\hotspot_dow.csv` | 74 bytes | `f13305debfe2`
- `models\hotspot_hourly.csv` | 185 bytes | `7256e6ecdaca`
- `models\hotspot_junctions.csv` | 10567 bytes | `6b9043cf9681`
- `models\hotspot_zone_hour.csv` | 812 bytes | `8ae7dd5bcad7`
- `models\junction_risk.csv` | 15228 bytes | `75d50053225a`
- `models\learning_curve.csv` | 334 bytes | `1de0709d5efb`
- `models\location_stats.pkl` | 17306 bytes | `59c4e8115904`
- `models\metrics.json` | 922 bytes | `e7ff5b83d5b4`
- `models\risk_forecast.pkl` | 513892 bytes | `648865ef27d8`
- `models\scale_benchmark.csv` | 206 bytes | `5ea695ecf816`
- `models\shap_explainer.pkl` | 5220051 bytes | `b593707aa787`
- `models\survival_curves.csv` | 250982 bytes | `77572a42e7cd`
- `models\survival_params.pkl` | 345 bytes | `19b8557126e6`
- `models\xgb_clearance_model.pkl` | 2488825 bytes | `e931bdc25f31`
- `models\xgb_disruption_model.pkl` | 1048231 bytes | `2f19551495db`
- `models\zone_stats.csv` | 781 bytes | `0693f99230cb`
- `optimizer.py` | 8712 bytes | `a646bb416a28`
- `predictor.py` | 7025 bytes | `d0a6c8de7edc`
- `README.md` | 8268 bytes | `dd72b5b5afb1`
- `requirements.txt` | 185 bytes | `eacfcada35ff`
- `routing.py` | 17575 bytes | `79c70a36eebc`
- `routing_page.py` | 9480 bytes | `3c1ee182a096`
- `runtime.txt` | 28 bytes | `166605d5db58`
- `scale_benchmark.py` | 3068 bytes | `6f846b9ec577`
- `survival.py` | 7809 bytes | `f094f369c791`
- `temp\synthetic_gridlock.csv` | 62170 bytes | `e2102c4ee2b8`
- `text_features.py` | 3052 bytes | `f0721a23c0e3`
- `train_model.py` | 7286 bytes | `f0a783f785b7`
- `try_real_event.py` | 2702 bytes | `4d253b3df17e`
- `utils\__init__.py` | 0 bytes | `e3b0c44298fc`
- `utils\preprocess.py` | 19574 bytes | `5ec41348fc2d`
- `verify_pipeline.py` | 5841 bytes | `1f61e6dff0a8`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

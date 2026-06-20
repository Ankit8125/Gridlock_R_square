# gridlock-round2

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock-round2`
- Git remote: `https://github.com/valletivarish/gridlock-round2.git`
- Git branch: `main`
- Git HEAD: `a2f90a28c04b91d4bdd8ebeb91f675bfffedf126`
- Fingerprint: `20661a850103eb622d92fcbb40b690dd4e65ef5b24663a2ae30557c710f06146`
- Files indexed: `42`
- Indexed size: `9569902` bytes

## Stack Signals

- `Notebook`
- `Streamlit`

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, manpower, police, resource
- models: calibration, catboost, classifier, lightgbm, regressor
- routing: a*, google maps

## Manifests

- `requirements.txt`

## Python Dependencies

### `requirements.txt`
- `pandas==3.0.3`
- `numpy==2.4.6`
- `scikit-learn==1.8.0`
- `lightgbm==4.6.0`
- `catboost==1.2.10`
- `matplotlib==3.10.9`
- `streamlit==1.58.0`
- `plotly==6.7.0`
- `joblib==1.5.3`
- `nbformat==5.10.4`

## README Headings

- `README.md`: # Event Intelligence for BTP — Round 2 Prototype
- `README.md`: ## What this is
- `README.md`: ## Folder map
- `README.md`: ## How to run
- `README.md`: ### Prerequisites
- `README.md`: # or reference the venv python directly (see commands below)
- `README.md`: ### 1. Run the notebook (EDA + model training + learning loop)
- `README.md`: # From the project root
- `README.md`: # or
- `README.md`: ### 2. Run the Streamlit dashboard
- `README.md`: ### 3. Use the recommendation engine directly (Python)
- `README.md`: # {
- `README.md`: #   "expected_clearance_min": 295.6,
- `README.md`: #   "road_closure_prob": 0.62,
- `README.md`: #   "severity": "High",
- `README.md`: #   "recommended_officers": 10,
- `README.md`: #   "barricading": True,
- `README.md`: #   "diversion_advice": "Activate diversion via Magadi Road or Chord Road ...",
- `README.md`: #   "nearest_station": "Halasuru Gate",
- `README.md`: #   "rationale": "High-impact event; Mysore Road is a top-10 congestion hotspot ..."
- `README.md`: # }
- `README.md`: ## Honest results summary
- `README.md`: ### Road-closure classifier (CatBoost — primary model)
- `README.md`: ### Duration regressor (CatBoost — primary model)
- `README.md`: ### Learning loop
- `README.md`: ## Robustness notes
- `README.md`: ## Key data facts (all from ASTraM dataset)
- `README.md`: ## Submission compliance

## README Claims and Operational Notes

- `README.md`: A three-pillar system that turns a raw ASTraM event report into an actionable deployment recommendation — within one second of the event being logged.
- `README.md`: | **2. Recommend Resources** | Officer count, barricade flag, diversion route, nearest police station — all explained in plain English |
- `README.md`: | **3. Post-Event Learning Loop** | Monthly retrain on new resolved events; drift monitoring to prevent silent model degradation |
- `README.md`: ├── models/
- `README.md`: │   ├── MODELS.md               # Validation methodology and honest results
- `README.md`: │   ├── clf_encoders.pkl        # OOF target encoders for LGB closure model
- `README.md`: │   ├── dur_encoders.pkl        # OOF target encoders for LGB duration model
- `README.md`: │   └── meta.pkl                # Feature lists, best-model flags, holdout corridors
- `README.md`: ├── data_prep.py                # Data cleaning and feature engineering
- `README.md`: ├── train_models.py             # Model training and validation
- `README.md`: ├── impact_models.py            # Inference wrapper (predict_impact)
- `README.md`: ├── recommend.py                # Recommendation engine (recommend)
- `README.md`: ├── app.py                      # Streamlit dashboard + Event Simulator
- `README.md`: ├── RECOMMEND.md                # Recommendation engine logic + worked examples
- `README.md`: ## How to run
- `README.md`: ### 1. Run the notebook (EDA + model training + learning loop)
- `README.md`: The full analysis lives in the project notebook. Run all cells in order:
- `README.md`: All figures in `round_2/eda/` and model artifacts in `round_2/models/` are produced by the notebook. If artifacts already exist, inference scripts load them directly — no retraining needed.
- `README.md`: To retrain models from scratch:
- `README.md`: /Users/valletivarish/Desktop/flipkart_ml/.venv/bin/python round_2/train_models.py
- `README.md`: To re-run the drift/learning experiment:
- `README.md`: ### 2. Run the Streamlit dashboard
- `README.md`: /Users/valletivarish/Desktop/flipkart_ml/.venv/bin/streamlit run round_2/app.py
- `README.md`: The dashboard opens at `http://localhost:8501` and includes:
- `README.md`: - **Event Simulator** — enter any event (cause, corridor, zone, priority, time) and receive a live recommendation output
- `README.md`: ### 3. Use the recommendation engine directly (Python)
- `README.md`: from round_2.recommend import recommend
- `README.md`: result = recommend(event)
- `README.md`: #   "recommended_officers": 10,
- `README.md`: ### Road-closure classifier (CatBoost — primary model)
- `README.md`: ### Duration regressor (CatBoost — primary model)
- `README.md`: Duration is highly right-skewed (median ~46 min, max ~1,437 min). An MAE of 101 minutes on future data reflects genuine uncertainty in event duration — not model failure. For field communication, EDA-benchmarked cause...
- `README.md`: Retraining monthly consistently helps vs. a frozen static model:
- `README.md`: - **Unseen causes**: unknown cause labels at inference fall back to the global training mean via out-of-fold target encoding. No crash; closure probability still computed from other available features.
- `README.md`: - **Drift**: vehicle-breakdown share shifted from 66% to 49% over 6 months. The monthly retrain cadence is designed to track this drift before it erodes model quality.

## Data Assets

- `data\events.csv`

## Model and Artifact Assets

- `models\cb_closure.pkl`
- `models\cb_duration.pkl`
- `models\clf_encoders.pkl`
- `models\dur_encoders.pkl`
- `models\lgb_closure.pkl`
- `models\lgb_duration.pkl`
- `models\meta.pkl`

## Notebooks

### `event_intelligence.ipynb`
- Cells: `26`
- Imports: `matplotlib`, `pandas`, `round_2`, `sys`
- Keywords: `astram`, `bengaluru`, `calibration`, `catboost`, `classifier`, `closure`, `congestion`, `diversion`, `gridlock`, `lightgbm`, `police`, `regressor`, `resource`, `traffic`
- Headings:
  - # BTP Event Intelligence — Flipkart Gridlock Round 2 (PS2)
  - ## Bengaluru Traffic Police: Proactive Congestion Response
  - ## 1. Data — Load and Clean
  - ## 2. EDA — What the Data Says
  - ### Finding 1 — Vehicle breakdowns dominate (60 %) and cluster on a handful of roads
  - ### Finding 2 — Clearance times vary 7× by cause
  - ### Finding 3 — The busiest hour is 2 AM, not rush hour
  - ### Finding 4 — Event-cause mix is drifting
  - ## 3. Impact Models — Predict at Report Time
  - ### Honest validation summary
  - ## 4. Recommendation Engine — Field-Ready Output
  - ## 5. Post-Event Learning — Monthly Recalibration
  - ### The problem: covariate drift
  - ### Experiment design
  - ### Honest conclusion
  - ## 6. Conclusion — Real-World Impact for BTP
  - ### What this prototype delivers
  - ### Robustness to the real world
  - ### What was not oversold
  - ### Scalability


## API Endpoints

- None detected

## Python Source Signals

### `app.py`
- Functions: `get_data`, `_warm_models`
- Imports: `data_prep`, `datetime`, `impact_models`, `os`, `pandas`, `plotly`, `recommend`, `streamlit`, `sys`

### `build_pptx.py`
- Functions: `add_solid_fill`, `set_text`, `add_title_bar`, `add_accent_line`, `add_slide_bg`, `bullet_box`, `add_image`, `slide_01_title`, `slide_02_problem`, `slide_03_data`, `slide_04_insights`, `slide_05_solution`, `slide_06_models`, `slide_07_recommendation`, `slide_08_learning`, `slide_09_robustness`, `slide_10_impact`, `slide_11_tests`, `slide_12_ask`, `build`
- Imports: `os`, `pptx`

### `data_prep.py`
- Functions: `load_events`, `clean`, `load_clean`
- Imports: `numpy`, `os`, `pandas`

### `eda\eda_insights.py`
- Functions: `savefig`
- Imports: `data_prep`, `matplotlib`, `numpy`, `os`, `pandas`, `sys`

### `impact_models.py`
- Functions: `_load`, `_coerce_row`, `_apply_lgb_encoders`, `predict_impact`
- Imports: `joblib`, `numpy`, `os`, `pandas`

### `learning.py`
- Functions: `get_period_key`, `add_period`, `make_xy`, `fit_catboost`, `evaluate`, `run_experiment`, `plot_results`
- Imports: `catboost`, `matplotlib`, `numpy`, `os`, `pandas`, `round_2`, `sklearn`, `sys`, `warnings`

### `recommend.py`
- Functions: `_haversine_km`, `_nearest_station_by_coords`, `_resolve_station`, `_severity_score`, `_severity_label`, `_officer_count`, `_diversion_advice`, `recommend`
- Imports: `math`, `numpy`, `os`, `pandas`, `round_2`

### `test_suite.py`
- Functions: `check`, `section`, `_check_impact_result`, `_check_rec`
- Imports: `catboost`, `data_prep`, `impact_models`, `logging`, `numpy`, `os`, `pandas`, `recommend`, `sklearn`, `streamlit`, `sys`, `warnings`

### `train_models.py`
- Functions: `fill_cats`, `oof_target_encode`, `encode_split`, `apply_encoders`
- Imports: `catboost`, `data_prep`, `joblib`, `lightgbm`, `numpy`, `os`, `pandas`, `sklearn`, `sys`

## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `DECK.md`
- `eda\INSIGHTS.md`
- `LEARNING.md`
- `models\MODELS.md`
- `PLAN.md`
- `presentation.pptx`
- `PROPOSAL.md`
- `README.md`
- `RECOMMEND.md`
- `SUBMISSION_GUIDE.md`
- `TEST_REPORT.md`

## Test Files

- `TEST_REPORT.md`
- `test_suite.py`

## File Inventory

- `.gitignore` | 61 bytes | `752a39b23fc2`
- `app.py` | 27652 bytes | `0793fb4c6ac5`
- `build_pptx.py` | 37972 bytes | `8921e6a8c1e5`
- `data\events.csv` | 4546990 bytes | `a5adac1326ad`
- `data_prep.py` | 2496 bytes | `52199d74bdae`
- `DECK.md` | 14747 bytes | `afd958adbf2d`
- `eda\eda_insights.py` | 22886 bytes | `a04c8760f68f`
- `eda\fig_01_monthly_trend.png` | 73803 bytes | `5b7cea78ad65`
- `eda\fig_02_hourly_profile.png` | 46205 bytes | `14c308360785`
- `eda\fig_03_dow.png` | 27926 bytes | `b02d237d0b15`
- `eda\fig_04_corridors.png` | 55186 bytes | `8a5c064b24b9`
- `eda\fig_05_resolution_by_cause.png` | 69092 bytes | `0b34b346d552`
- `eda\fig_06_drift.png` | 100920 bytes | `f97a9acb88e7`
- `eda\fig_07_learning.png` | 55934 bytes | `eb748825897b`
- `eda\INSIGHTS.md` | 4419 bytes | `a7315f738357`
- `eda\table_bottleneck_causes.csv` | 318 bytes | `5f9a2827effc`
- `eda\table_learning_results.csv` | 220 bytes | `7df441495144`
- `eda\table_top10_corridors.csv` | 478 bytes | `2a2e60885206`
- `eda\table_top15_junctions.csv` | 650 bytes | `5b2644990a6d`
- `event_intelligence.ipynb` | 36369 bytes | `41fac7971aa9`
- `impact_models.py` | 5566 bytes | `7b465daf0a48`
- `LEARNING.md` | 3669 bytes | `5c7409854995`
- `learning.py` | 7642 bytes | `e213dacd6bf0`
- `models\cb_closure.pkl` | 87696 bytes | `d0e8a9a337ee`
- `models\cb_duration.pkl` | 244137 bytes | `531c3d8ac7a1`
- `models\clf_encoders.pkl` | 12799 bytes | `5e5724dca108`
- `models\dur_encoders.pkl` | 10489 bytes | `273befabf36f`
- `models\lgb_closure.pkl` | 2060548 bytes | `4d0ea1e5d699`
- `models\lgb_duration.pkl` | 1708736 bytes | `f25a29f6e115`
- `models\meta.pkl` | 432 bytes | `786537afbd1d`
- `models\MODELS.md` | 4194 bytes | `db2881520895`
- `PLAN.md` | 5498 bytes | `75cb334340de`
- `presentation.pptx` | 148997 bytes | `e8348fa28135`
- `PROPOSAL.md` | 45869 bytes | `618e5a17ed0f`
- `README.md` | 9232 bytes | `a82b11e2375c`
- `RECOMMEND.md` | 9337 bytes | `aa4c7034bc17`
- `recommend.py` | 17398 bytes | `89ae25977d56`
- `requirements.txt` | 349 bytes | `f09c0785465b`
- `SUBMISSION_GUIDE.md` | 8320 bytes | `8629ba16dfb7`
- `TEST_REPORT.md` | 6099 bytes | `a8d0209fc423`
- `test_suite.py` | 30062 bytes | `1fb4a77a8c11`
- `train_models.py` | 18509 bytes | `047184c770b8`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

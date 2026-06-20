# Gridlock_phase2

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\Gridlock_phase2`
- Git remote: `https://github.com/sanikad20/Gridlock_phase2.git`
- Git branch: `main`
- Git HEAD: `00855212094125edd05f60292ccdf06af05ecd56`
- Fingerprint: `0878038e429ca514da7bb0ba9acdd001f5ba98f397b43097b740ad2c2debc930`
- Files indexed: `19`
- Indexed size: `23501414` bytes

## Stack Signals

- `FastAPI`
- `Node/Express`
- `Streamlit`

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, police, resource
- models: catboost, classifier, kmeans, lightgbm, random forest, randomforest, regressor
- routing: none

## Manifests

- None detected

## README Headings

- `README.md`: # Gridlock — Event-Driven Congestion Forecaster
- `README.md`: ## Architecture
- `README.md`: ## Setup
- `README.md`: ## Severity scale
- `README.md`: ## API endpoints (api.py)
- `README.md`: ## Known gap: Digital Twin sliders
- `README.md`: ## How to check if the model is actually any good
- `README.md`: ## File reference

## README Claims and Operational Notes

- `README.md`: Predicts traffic-event severity (Quick / Moderate / Severe) and expected
- `README.md`: resolution delay from event metadata, recommends officer/barricade
- `README.md`: deployment, and remembers past events + outcomes for retrieval.
- `README.md`: train.py   → trains models, saves artifacts to models/
- `README.md`: api.py     → FastAPI service, loads models/, exposes REST endpoints
- `README.md`: app.py     → Streamlit UI, calls api.py over HTTP
- `README.md`: │  app.py  │ ───► │   api.py    │ ───► │  models/*.pkl │
- `README.md`: │ Streamlit│ HTTP │  FastAPI    │      │  + sqlite db  │
- `README.md`: pip install fastapi uvicorn pandas numpy scikit-learn joblib \
- `README.md`: python train.py                    # writes models/*.pkl + models/*.json
- `README.md`: uvicorn api:app --reload           # starts API on :8000
- `README.md`: streamlit run app.py               # starts UI on :8501
- `README.md`: top of the file — update that path for your environment before running.
- `README.md`: The model predicts one of three classes based on actual incident
- `README.md`: shape; it's been corrected to match `api.py`'s actual `Quick/Moderate/Severe`
- `README.md`: ## API endpoints (api.py)
- `README.md`: | `/predict-event` | POST | Predict severity + delay, no logging |
- `README.md`: | `/predict-ensemble` | POST | Majority vote across LightGBM+CatBoost+RF+Regressor (needs `models/ensemble.pkl`) |
- `README.md`: | `/predict-and-log` | POST | Predict + save event to memory (sqlite) |
- `README.md`: | `/similar-events` | POST | Retrieve past events with same predicted severity + cause |
- `README.md`: | `/health` | GET | Model/feature sanity check |
- `README.md`: prediction call must supply real coordinates or it will 422.
- `README.md`: - `close_main_road` does feed the model (it OR's into
- `README.md`: API and the model was never trained on anything like them — there's no
- `README.md`: matching feature in `train.py`'s `FEATURES` list, so the API has nowhere
- `README.md`: `barricade_count`) to the training CSV/feature engineering in
- `README.md`: `build_feature_row` in `api.py`.
- `README.md`: 2. **Simulate it client-side** — keep the model's prediction as the
- `README.md`: heuristic adjustment in `app.py` (e.g. extra barricades reduce predicted
- `README.md`: simulated adjustment, not a model output, to avoid misleading whoever's
- `README.md`: reading the dashboard.
- `README.md`: ## How to check if the model is actually any good
- `README.md`: Accuracy alone is not enough to trust this model — read `train.py`'s own
- `README.md`: in the final summary — if the full 25-feature model barely beats that,
- `README.md`: the extra features aren't adding much.
- `README.md`: model is just defaulting to `Moderate`.
- `README.md`: 4. **Check feature importance** (printed in STEP 7). If a single
- `README.md`: target-encoded feature (`cause_te`, `cause_hour_te`, etc.) dominates with
- `README.md`: | `train.py` | Loads CSV → engineers 25 features → trains CatBoost/LightGBM/RF + a duration regressor → saves `models/` |
- `README.md`: | `api.py` | Loads `models/` → rebuilds the exact same 25 features at inference time → serves predictions + sqlite-backed memory |
- `README.md`: | `app.py` | Streamlit dashboard: event input form, prediction display, congestion map, similar-event lookup, outcome logging |
- `README.md`: | `models/features.json` | Ordered list of the 25 feature columns — both `train.py` and `api.py` must agree on this order |
- `README.md`: | `models/target_encoding_maps.json` | Leak-free lookup tables for target-encoded features, built during training, reused at inference |
- `README.md`: | `gridlock_memory.db` | sqlite store of logged events + outcomes (created on first run of `api.py`) |

## Data Assets

- `api\models\features.json`
- `api\models\target_encoding_maps.json`
- `data\Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv`

## Model and Artifact Assets

- `api\models\classifier.pkl`
- `api\models\congestion_classifier.pkl`
- `api\models\ensemble.pkl`
- `api\models\features.json`
- `api\models\geo_fill.pkl`
- `api\models\kmeans_geo.pkl`
- `api\models\label_encoders.pkl`
- `api\models\lgbm_congestion.pkl`
- `api\models\regressor.pkl`
- `api\models\target_encoding_maps.json`

## Notebooks

- None detected

## API Endpoints

- `GET /`
- `GET /corridor-risk`
- `GET /health`
- `GET /map-data/{event_id}`
- `GET /resources`
- `GET /zone-health`
- `POST /digital-twin`
- `POST /log-outcome`
- `POST /predict-and-log`
- `POST /predict-ensemble`
- `POST /predict-event`
- `POST /similar-events`
- `app.GET /`
- `app.GET /corridor-risk`
- `app.GET /health`
- `app.GET /map-data/{event_id}`
- `app.GET /resources`
- `app.GET /zone-health`
- `app.POST /digital-twin`
- `app.POST /log-outcome`
- `app.POST /predict-and-log`
- `app.POST /predict-ensemble`
- `app.POST /predict-event`
- `app.POST /similar-events`

## Python Source Signals

### `api\main.py`
- Classes: `EventInput`, `OutcomeInput`, `DigitalTwinInput`
- Functions: `init_db`, `safe_label_encode`, `te_lookup`, `build_feature_row`, `get_explanation`, `apply_digital_twin_adjustment`, `root`, `health`, `predict_event`, `predict_and_log`, `digital_twin`, `predict_ensemble`, `log_outcome`, `similar_events`, `get_resources`, `corridor_risk`, `zone_health`, `map_data`
- Endpoints: `GET /`, `GET /health`, `POST /predict-event`, `POST /predict-and-log`, `POST /digital-twin`, `POST /predict-ensemble`, `POST /log-outcome`, `POST /similar-events`, `GET /resources`, `GET /corridor-risk`, `GET /zone-health`, `GET /map-data/{event_id}`, `app.GET /`, `app.GET /health`, `app.POST /predict-event`, `app.POST /predict-and-log`, `app.POST /digital-twin`, `app.POST /predict-ensemble`, `app.POST /log-outcome`, `app.POST /similar-events`, `app.GET /resources`, `app.GET /corridor-risk`, `app.GET /zone-health`, `app.GET /map-data/{event_id}`
- Imports: `datetime`, `fastapi`, `joblib`, `json`, `numpy`, `os`, `pandas`, `pydantic`, `sqlite3`, `typing`, `uuid`

### `dashboard\app.py`
- Functions: `get_smart_action_plan`, `fetch_corridor_risk`, `fetch_zone_health`
- Imports: `datetime`, `folium`, `requests`, `streamlit`, `streamlit_folium`

### `db\memory.py`
- Functions: `init_db`, `log_event`, `log_outcome`, `event_to_vector`, `get_similar_events`, `seed_demo_events`
- Imports: `json`, `numpy`, `os`, `sklearn`, `sqlite3`

### `notebooks\train.py`
- Functions: `target_encode`, `duration_to_severity`
- Imports: `catboost`, `joblib`, `json`, `lightgbm`, `numpy`, `os`, `pandas`, `sklearn`, `warnings`

## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `README.md`

## Test Files

- None detected

## File Inventory

- `api\gridlock_memory.db` | 32768 bytes | `07d98da023fa`
- `api\main.py` | 26580 bytes | `b846125dfd2d`
- `api\models\classifier.pkl` | 318777 bytes | `f56778caa073`
- `api\models\congestion_classifier.pkl` | 6729921 bytes | `02ef1ac8f669`
- `api\models\ensemble.pkl` | 10454280 bytes | `d30dca8b3efb`
- `api\models\features.json` | 368 bytes | `29d3ae2f21d0`
- `api\models\geo_fill.pkl` | 159 bytes | `2d08d9bd6391`
- `api\models\kmeans_geo.pkl` | 13883 bytes | `7ad1944ee82a`
- `api\models\label_encoders.pkl` | 10540 bytes | `37e2840e523c`
- `api\models\lgbm_congestion.pkl` | 1117708 bytes | `93b8f9bbf38e`
- `api\models\regressor.pkl` | 141181 bytes | `71262a7ef566`
- `api\models\target_encoding_maps.json` | 31187 bytes | `474c441259e2`
- `api\seed.py` | 3174 bytes | `fa33a5f02c17`
- `dashboard\app.py` | 20112 bytes | `3931459ec90c`
- `data\Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv` | 4547022 bytes | `11469a7450fd`
- `db\gridlock.db` | 16384 bytes | `b2f59b21f006`
- `db\memory.py` | 7967 bytes | `c416a1b6effc`
- `notebooks\train.py` | 22875 bytes | `d719f0f31b13`
- `README.md` | 6528 bytes | `d86ce22fd918`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

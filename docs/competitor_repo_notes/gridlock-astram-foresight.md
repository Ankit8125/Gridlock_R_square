# gridlock-astram-foresight

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock-astram-foresight`
- Git remote: `https://github.com/jainsarthak0205/gridlock-astram-foresight.git`
- Git branch: `main`
- Git HEAD: `209c2686223a5a72ab589dcd40f395a521940971`
- Fingerprint: `e4d811fe4f49662be995012908e2da616d9f10f255116d64d3aabe7b838e1d40`
- Files indexed: `29`
- Indexed size: `7245947` bytes

## Stack Signals

- `Streamlit`

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, manpower, police, resource
- models: classifier, lightgbm, regressor
- routing: none

## Manifests

- `pyproject.toml`
- `requirements.txt`

## Python Dependencies

### `requirements.txt`
- `pandas==3.0.3`
- `numpy==2.4.6`
- `scikit-learn==1.9.0`
- `lightgbm==4.6.0`
- `pyarrow==24.0.0`
- `joblib==1.5.3`
- `scipy==1.17.1`
- `streamlit==1.58.0`
- `pydeck==0.9.2`

## README Headings

- `README.md`: # 🚦 ASTraM Foresight
- `README.md`: ## The problem
- `README.md`: ## What it does
- `README.md`: ## The models — stated honestly
- `README.md`: ## How it works (architecture)
- `README.md`: ## Project structure
- `README.md`: ## Run it locally
- `README.md`: # (1) place the provided dataset at data/raw/astram_events.csv, then build everything:
- `README.md`: # (2) run the tests and launch the app
- `README.md`: ## Tech stack
- `README.md`: ## Deployment
- `README.md`: ## Data & privacy

## README Claims and Operational Notes

- `README.md`: **A predictive intelligence layer for event-driven traffic congestion in Bengaluru.**
- `README.md`: The Bengaluru Traffic Police already run **ASTraM** (Actionable Intelligence for Sustainable Traffic Management) to log these events. But today:
- `README.md`: - Resource deployment is **experience-driven**, not data-driven.
- `README.md`: **ASTraM Foresight** is the missing predictive layer: the moment an event is reported, it forecasts the traffic impact and turns it into an actionable response recommendation — and it surfaces the historical patterns ...
- `README.md`: | **🔮 Live Impact Predictor** | Enter a reported event → **road-closure probability**, priority, an expected clearance time from history, and a recommended response (officers / barricades / diversion). |
- `README.md`: | **📊 Overview** | KPIs and an honest model scorecard. |
- `README.md`: ## The models — stated honestly
- `README.md`: A core design principle: **predict what is genuinely predictable, and surface reliable history for what isn't.** Every component below was validated on a chronological (time-based) train/test split, using only informa...
- `README.md`: | **Road-closure predictor** | LightGBM (binary) | **ROC-AUC 0.81**, PR-AUC 0.36 (vs 0.12 base rate), recall 0.55 | ✅ Real, useful signal |
- `README.md`: | **Congestion severity** | Keyword lexicon (multilingual) | Surfaces congestion cues in ~23% of events that are absent from structured fields | ➕ Additive, transparent (not a trained model) |
- `README.md`: | **Clearance time** | — | Not predictable from report-time data (regression and 3-band classifier both fail to beat the baseline) | ❌ Replaced with honest historical medians |
- `README.md`: | **Priority (High/Low)** | — | 99.8% determined by "is the event on a named corridor" | 🚩 A deterministic rule, not a model |
- `README.md`: This transparency is deliberate: the manpower/barricading recommendation is presented as **tunable policy logic** on top of the validated model outputs, never as a black box.
- `README.md`: OFFLINE (run once, locally)                     ONLINE (Streamlit Cloud)
- `README.md`: git-ignored)    train_impact.py ─► road-closure model  ─────────┤    predictions live
- `README.md`: train_nlp.py    ─► NLP model + severity ────────┘    (reads only the small
- `README.md`: The raw dataset is **never read at runtime**. Training happens offline; only small precomputed parquet files (a few MB) and the trained model files are committed. This keeps the deployed app fast and well within free-...
- `README.md`: models/            trained model files (committed)
- `README.md`: tests/smoke_test.py  runs every page through Streamlit's AppTest
- `README.md`: reports/           model metrics & data summary (JSON)
- `README.md`: ## Run it locally
- `README.md`: uv run python src/preprocess.py      # raw events -> clean parquet + aggregates   (seconds)
- `README.md`: uv run python src/train_impact.py    # road-closure model + diagnostics           (seconds)
- `README.md`: uv run python src/train_nlp.py       # NLP cause classifier + severity signal      (seconds)
- `README.md`: # (2) run the tests and launch the app
- `README.md`: uv run python tests/smoke_test.py    # verify all pages render
- `README.md`: uv run streamlit run app/app.py      # open the demo at http://localhost:8501
- `README.md`: - **scikit-learn** + **LightGBM** for the models
- `README.md`: - **Streamlit** + **pydeck** for the app and maps (Carto basemap — no API key required)
- `README.md`: ## Deployment
- `README.md`: Hosted free on **Streamlit Community Cloud**, deployed directly from this GitHub repo (`main` branch, `app/app.py`). Every push auto-redeploys. The app reads only the committed parquet/model artifacts, so it boots in ...

## Data Assets

- `data\processed\breakdown_by_corridor.parquet`
- `data\processed\breakdown_hotspots.parquet`
- `data\processed\clearance_median_by_cause.parquet`
- `data\processed\clearance_median_by_cause_corridor.parquet`
- `data\processed\corridor_risk.parquet`
- `data\processed\events_clean.parquet`
- `data\processed\text_signals.parquet`
- `data\processed\venue_recurrence.parquet`

## Model and Artifact Assets

- `models\model_clearance_band.joblib`
- `models\model_closure.joblib`
- `models\model_nlp_cause.joblib`

## Notebooks

- None detected

## API Endpoints

- None detected

## Python Source Signals

### `app\app.py`
- Functions: `load_data`, `load_models`, `load_reports`, `options`, `clearance_estimate`, `risk_band`, `scatter`, `legend`, `page_overview`, `page_predictor`, `page_text`, `page_maps`, `page_corridor`, `page_triage`, `opts`
- Imports: `inference`, `json`, `nlp_severity`, `numpy`, `pandas`, `pathlib`, `pydeck`, `streamlit`, `sys`

### `src\inference.py`
- Functions: `load_bundle`, `load_nlp`, `build_X`, `predict_closure`, `closure_from_inputs`, `predict_cause`
- Imports: `config`, `joblib`, `nlp_severity`, `numpy`, `pandas`

### `src\nlp_severity.py`
- Functions: `_norm`, `severity_score`, `severity_label`
- Imports: `re`

### `src\preprocess.py`
- Functions: `load_raw`, `_to_bool`, `build_features`, `make_aggregates`, `breakdown_hotspots`, `clearance_medians`, `main`
- Imports: `config`, `json`, `numpy`, `pandas`

### `src\train_impact.py`
- Functions: `load`, `time_split`, `prep_X`, `train_closure`, `to_band`, `train_clearance_band`, `clearance_regression_check`, `priority_rule_diagnostic`, `main`
- Imports: `config`, `joblib`, `json`, `lightgbm`, `numpy`, `pandas`, `sklearn`

### `src\train_nlp.py`
- Functions: `is_meaningful`, `load`, `collapse_rare`, `build_pipeline`, `main`
- Imports: `config`, `joblib`, `json`, `nlp_severity`, `pandas`, `re`, `sklearn`

### `tests\smoke_test.py`
- Functions: `main`
- Imports: `pathlib`, `streamlit`, `sys`

## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `README.md`

## Test Files

- `tests\smoke_test.py`

## File Inventory

- `.gitignore` | 319 bytes | `976652eb5c82`
- `.python-version` | 6 bytes | `a7b9da5e355c`
- `.streamlit\config.toml` | 162 bytes | `4379e7fd33b9`
- `app\app.py` | 17730 bytes | `c31bb18201e5`
- `data\processed\breakdown_by_corridor.parquet` | 2393 bytes | `33632a9481d6`
- `data\processed\breakdown_hotspots.parquet` | 10911 bytes | `2f80b4bb4dac`
- `data\processed\clearance_median_by_cause.parquet` | 2835 bytes | `c36acf1001da`
- `data\processed\clearance_median_by_cause_corridor.parquet` | 4268 bytes | `9ce4420facb9`
- `data\processed\corridor_risk.parquet` | 4331 bytes | `bc57fb098ff2`
- `data\processed\events_clean.parquet` | 575387 bytes | `9ebd974bc1c4`
- `data\processed\text_signals.parquet` | 61484 bytes | `399e7295849f`
- `data\processed\venue_recurrence.parquet` | 15972 bytes | `0f06f91524d1`
- `models\model_clearance_band.joblib` | 3082048 bytes | `ef4969ca2330`
- `models\model_closure.joblib` | 1024685 bytes | `a4dc66ba0fc0`
- `models\model_nlp_cause.joblib` | 2144148 bytes | `0841bf53596b`
- `pyproject.toml` | 489 bytes | `9ca429d4e5ae`
- `README.md` | 7874 bytes | `0de26e7df184`
- `reports\impact_metrics.json` | 956 bytes | `81a38ec6da2b`
- `reports\nlp_metrics.json` | 516 bytes | `41d6deac96a7`
- `reports\preprocess_summary.json` | 297 bytes | `8699b9ff7941`
- `requirements.txt` | 454 bytes | `2ff71c256388`
- `src\config.py` | 495 bytes | `43dc23dc3b7a`
- `src\inference.py` | 2869 bytes | `9cd5da168a08`
- `src\nlp_severity.py` | 1346 bytes | `afd14c7fe673`
- `src\preprocess.py` | 7031 bytes | `9a2e92e47c1d`
- `src\train_impact.py` | 7102 bytes | `b4eca4ca70eb`
- `src\train_nlp.py` | 3804 bytes | `38bccb0ac1ab`
- `tests\smoke_test.py` | 1096 bytes | `7c3aa6bbdb38`
- `uv.lock` | 264939 bytes | `935338fde544`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

# Current Project Understanding

## Snapshot

- Workspace: `D:\Coding\gridlock\Round 2`
- Problem: Event-driven congestion forecasting and resource planning for Bengaluru Traffic Police.
- Dataset: `dataset/Astram event data_anonymized.csv`
- Rows in source dataset: `8173`
- Main app shape: FastAPI backend plus Vite/React frontend.
- Verification status:
  - Backend API tests: `11 passed` (100% success rate)
  - Frontend production build: passes cleanly

---

## Backend Infrastructure (`backend/`)

### 1. Preprocessing Pipeline (`backend/data_pipeline.py`)
- Normalizes `event_cause` casing and whitespace.
- Computes `duration` from preferred `resolved_datetime` or fallback `closed_datetime`.
- Filters out active or negative duration anomalies, and applies a `p90` duration cap.
- Extracts spatial grid cells (~110m cells) from coordinate mappings.
- Cleans administrative labels: `police_station`, `corridor`, `junction`, and `zone`.
- Converts start times from UTC to `Asia/Kolkata` (IST) to extract local hour, day of week, month, and peak traffic hours.
- **Priority Labeling Fix**: Re-labels `priority_clean` using an operational logic combining peak hours, severe causes, and road closures. This resolved the data leakage where priority was perfectly correlated with the corridor column.

### 2. Text Enrichment (`backend/text_enrichment.py`)
- Detects description languages (Kannada, English, Mixed) and uses a static Kannada translation map.
- Extracts sub-causes, urgency indicators, and landmarks.
- Saves `backend/artifacts/text_enrichment.json` mapping.

### 3. Model Training (`backend/train_models.py`)
- Trains and evaluates models on high-volume causes (causes with >= 100 entries).
- **Duration Model (Regression)**: Trains RandomForest, GradientBoosting, and HistGradientBoosting regressors. The champion is Random Forest Regressor (MedAE: ~55.6 mins, MAE: ~2304 mins due to long-tail administrative ticket delays).
- **Priority Classifier (Classification)**: Trains classifier models strictly **excluding** the `corridor_clean` column to prevent leakage. The champion is Hist Gradient Boosting Classifier (F1-score: **~92.46%**).
- **Road Closure Classifier (Classification)**: Trains a classifier (`closure_model.joblib`) to predict the probability that an incident requires road closures.
- Saves model joblib binaries to `backend/models/`.

### 4. Event Predictor (`backend/predictor.py`)
- Loads trained models and handles inference routing:
  - High-volume causes use machine learning models.
  - Low-volume causes use spatial and cause-based similarity retrieval (k=5).
  - Completely unknown causes fall back to static policy rules.
- Computes calibrated probabilities, resource recommendations, checkpoint spillover risks, and adjacent station allocations.
- **Policy Tuning Loop**: Dynamically adjusts manpower, barricade, and duration multipliers based on logged user feedback (with duplicate event IDs filtered to prevent skewing).

### 5. API Server (`backend/server.py`)
- FastAPI application exposing the following endpoints:
  - `GET /api/health`
  - `GET /api/analytics`
  - `GET /api/correlation`
  - `GET /api/junctions`
  - `GET /api/hotspots` (first-class hotspots risk endpoint)
  - `GET /api/corridor-risk` (corridor risk index)
  - `POST /api/predict` (predicts duration, priority, closure, and recommended resources)
  - `POST /api/feedback` (captures post-event actuals and triggers policy adjustment)
  - `GET /api/feedback/summary` (provides comparison logs)
  - `POST /api/agent/command` (natural language command interface using Gemini)

---

## Frontend Architecture (`client/`)

The client is split into clean, modular, and responsive components:
1. `AnalyticsDashboard.jsx`: Displays core traffic KPIs, monthly seasonal trends, hourly distributions, and vehicle breakdown statistics.
2. `CorrelationGrid.jsx`: Visualizes Pearson correlation metrics across incident features.
3. `ForecastPlanner.jsx`: Features coordinate selectors, draggable Leaflet markers, conformal prediction intervals, spillover risk circles, and OSRM offline straight-line routing fallback.
4. `LiveMap.jsx`: Plots junction markers color-coded by vulnerability index and overlays congestion heatmap zones on a clean **light mode/positron** tile layer. Includes sidebar for surge alerts and risk rankings.
5. `FeedbackLog.jsx`: Collects post-event logs and maps predicted vs actual resources.
6. `AICommandAgent.jsx`: Natural language command terminal with real-time feedback simulator.

---

## Verification & Strengths

### Strengths & Competitive Advantage:
* **No Data Leakage**: The priority model generalizes cleanly using operational features without memorizing corridor names.
* **Calibrated Output Ranges**: Conformal prediction intervals surface expected variance to operators (e.g. min/max ticket clearance bounds).
* **Bilingual Translation & NLP**: Clean offline Kannada translation mappings and LLM-assisted command extraction.
* **Robust Feedback Loop**: Real-time policy adjustments ensure the platform learns and calibrates recommendations to match local traffic dispatch capabilities.
* **Offline Resiliency**: Client falls back to straight-line pathing if OSRM is unreachable, and has a dedicated Offline Demo Mode to bypass Gemini API limits.

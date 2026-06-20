# Current Project Understanding

## Snapshot

- Workspace: `D:\Coding\gridlock\Round 2`
- Problem: Event-driven congestion forecasting and resource planning for Bengaluru Traffic Police.
- Dataset: `dataset/Astram event data_anonymized.csv`
- Rows in source dataset: `8173`
- Main app shape: FastAPI backend plus Vite/React frontend.
- Verification status on 2026-06-20:
  - Backend API tests: `8 passed`
  - Frontend production build: passed after rerunning outside the sandbox because Vite hit a Windows `spawn EPERM` inside sandbox.

## Existing Backend

The backend is already implemented under `backend/`.

### `backend/data_pipeline.py`

Purpose:

- Loads the ASTRAM CSV.
- Normalizes `event_cause`.
- Parses `start_datetime`, `closed_datetime`, and `resolved_datetime`.
- Creates `duration` from preferred `resolved` timestamp, falling back to `closed`.
- Excludes active/invalid rows from duration training.
- Caps duration at p90 for modeling.
- Creates a roughly 110 m spatial grid from rounded lat/lon.
- Cleans `police_station`, `corridor`, `junction`, and `zone`.
- Converts start time from UTC to `Asia/Kolkata`.
- Builds local hour, day of week, month, and peak-hour features.
- Saves:
  - `backend/artifacts/cleaned_events.csv`
  - `backend/artifacts/dataset_profile.json`

Important current profile values:

- Total rows: `8173`
- Trainable duration rows: `3192`
- Planned events: `467`
- Unplanned events: `7706`
- p90 duration cap: `16708.07` minutes
- Median duration: `64.40` minutes
- Mean duration before cap/noise handling: `6229.38` minutes

### `backend/text_enrichment.py`

Purpose:

- Adds offline language and description enrichment.
- Detects Kannada, English, mixed, and other descriptions.
- Uses a static Kannada phrase map.
- Extracts refined sub-cause and urgency from text.
- Extracts likely landmarks from address text.
- Saves `backend/artifacts/text_enrichment.json`.

Concern:

- Several Kannada strings in the file appear mojibaked in the source. If those are already corrupted in the dataset, document that clearly. If not, replace with real Unicode Kannada terms.

### `backend/train_models.py`

Purpose:

- Loads `cleaned_events.csv`.
- Routes high-volume causes to supervised model training.
- Trains and compares:
  - Random Forest Regressor
  - Gradient Boosting Regressor
  - Hist Gradient Boosting Regressor
  - Random Forest Classifier
  - Gradient Boosting Classifier
  - Hist Gradient Boosting Classifier
- Saves:
  - `backend/models/duration_model.joblib`
  - `backend/models/priority_model.joblib`
  - `backend/artifacts/model_comparison_results.json`

Current model results:

- Duration winner: Random Forest Regressor
- Duration MAE: about `2304` minutes
- Duration median error: about `55.6` minutes
- Priority classifier reports `100%` accuracy and `1.0` F1

Concern:

- The perfect priority score is suspicious and needs leakage checks. Priority may be nearly encoded by corridor or other operational fields. A judge may question this.
- The duration MAE is very high because administrative closure delays dominate the target.
- There is no separate road-closure model yet, even though road closure is one of the strongest operational outputs.
- Training uses random split, not a time-based split. Some competitors explicitly use temporal validation and call it out as a trust advantage.

### `backend/predictor.py`

Purpose:

- Loads the trained duration and priority models.
- Finds nearest historical junctions.
- Uses similarity retrieval for low-volume causes.
- Applies a rule-based policy for manpower and barricades.

Current prediction route:

- High-volume causes use trained models.
- Low-volume causes use nearest historical cases by cause and coordinate.
- Unknown causes use static fallback durations and rules.

Strength:

- The high-volume vs low-volume routing is a good practical choice. It avoids pretending that rare public-event or VIP categories have enough data for a robust model.

Gaps:

- Prediction output does not include calibrated probabilities, confidence level, impact score, or explanation list.
- The resource policy is embedded directly inside `predictor.py`; it should be moved to a separate policy/config module.
- Road closure is only an input flag, not a predicted probability.

### `backend/server.py`

Purpose:

- FastAPI app with CORS enabled.
- Exposes:
  - `GET /api/health`
  - `GET /api/analytics`
  - `GET /api/correlation`
  - `GET /api/junctions`
  - `POST /api/predict`
  - `POST /api/feedback`
  - `GET /api/feedback/summary`

Strength:

- The backend is testable and already has an API test suite.

Gaps:

- `allow_origins=["*"]` is acceptable for demo but should be called out as dev-only.
- Feedback captures actuals but does not yet adjust model/policy behavior.
- No endpoint for hotspots/corridor risk as a first-class resource.
- No endpoint for impact score, road closure probability, or public advisory generation.

### `backend/test_suite.py`

Purpose:

- Tests health, analytics, junctions, high-volume prediction, low-volume prediction, feedback, feedback summary, and correlation.

Verification:

- The suite passed locally after starting the FastAPI server.

## Existing Frontend

The React app is implemented mainly in one large file:

- `client/src/App.jsx`: about 1200 lines
- `client/src/App.css`: dashboard styling
- `client/src/index.css`: global styling

Current features:

- Analytics tab with KPI cards and Chart.js charts.
- Correlation grid.
- Leaflet live map.
- Historical junction/heatmap overlay.
- Forecasting/planner tab with draggable marker.
- Calls `/api/predict`.
- Draws nearest checkpoint markers.
- Calls public OSRM for a detour route.
- Resource plan panel.
- Similar historical events panel.
- Post-event learning tab.
- Feedback form and feedback comparison chart.

Strengths:

- The app is visual and demo-friendly.
- It already links prediction to resource planning and feedback.
- It has maps, charts, correlation, and model-backed/similarity badges.

Gaps:

- Single-file React structure is hard to maintain.
- OSRM is a public online dependency and should have a visible fallback state.
- The live heatmap uses synthetic/seamark tile behavior rather than actual traffic speed data.
- The UI should expose confidence, model limitations, and why a recommendation was made.
- The frontend should not overclaim "learning" unless feedback actually changes future recommendations.

## Existing Documentation

### `README.md`

The README is detailed and persuasive, but it has encoding damage in the architecture diagram and some claims that should be tightened.

Claims to verify or revise:

- "FastAPI backend" is true.
- "OSRM detours" is true as an optional client-side public request.
- "Post-event learning loop" is partially true. Feedback is logged and compared, but not yet used to adapt recommendations.
- "Built-in pre-trained champion models" is true because model files exist.
- The perfect priority classification result should be framed carefully.

### `implementation_plan.md`

The Antigravity plan correctly emphasizes:

- Honest separation between learned predictions and policy recommendations.
- Missing manpower/barricade labels.
- Impact score.
- Road-closure model.
- Diversion fallback.
- Post-event learning.
- Temporal validation.

The implementation has covered some of the plan but not all of it.

## Current Competitive Position

Strong already:

- Full-stack app exists.
- Trained models exist.
- Backend tests pass.
- Frontend builds.
- Similarity retrieval for rare events is a good differentiator.
- Text enrichment is a useful domain-specific feature.
- Feedback logging exists.

Needs improvement before judging:

- Add honest model card and leakage check.
- Add road-closure probability model.
- Add impact score with explanation list.
- Add hotspot/corridor risk endpoint.
- Convert feedback from passive log to policy adjustment.
- Split giant React file into components.
- Fix README encoding and overclaiming.
- Add a no-internet fallback for routing.

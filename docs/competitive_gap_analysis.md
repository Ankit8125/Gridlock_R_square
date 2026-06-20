# Competitive Gap Analysis and Improvement Queue

## Source of Evidence

This analysis is based on:

- Our current workspace under `D:\Coding\gridlock\Round 2`
- The Antigravity implementation plan at `D:\Coding\gridlock\implementation_plan.md`
- The extracted public repositories under `D:\Coding\gridlock\Extracted Repos`
- Generated per-repo notes in `docs/competitor_repo_notes/`
- Generated machine-readable inventory in `docs/competitor_repo_notes/_repo_inventory.json`
- Local verification:
  - `python backend/test_suite.py`: passed 8 tests after starting the API server
  - `npm run build`: passed outside the sandbox; Vite hit sandbox `spawn EPERM` inside restricted execution

## What Competitors Are Doing

Across 27 indexed public repos, the recurring patterns are:

- FastAPI backends are common.
- Streamlit demos are common.
- Many teams use LightGBM, CatBoost, XGBoost, Random Forest, or model ensembles.
- Several teams explicitly predict road closure, not just priority.
- Better repos emphasize honest validation, leakage checks, temporal splits, and calibrated probabilities.
- Some repos use survival/cascade framing instead of pretending exact duration is highly predictable.
- Several repos include dashboards with maps, resource recommendations, and feedback logs.
- A few repos add routing or diversion planning through OSRM, Mapbox, Google Maps, Dijkstra/A*, or road-network cost models.
- Stronger repos include model cards, reports, decks, or architecture docs that prepare for judge Q&A.

## Highest-Signal Competitor Repos

These repos should be manually rechecked if they update:

| Repo | Why it matters |
| --- | --- |
| `gridlock-oracle` | Honest pivot away from unreliable clearance-time regression, closure classifier, conformal/calibration artifacts, capacity-aware routing, hotspot deployment framing. |
| `Gridlock-Flipkart-v1` | Survival/cascade-risk framing, calibrated probabilities, model card language, vulnerability dashboard, explicit autopsy/report endpoints. |
| `Flipkart_Gridlock` | Full FastAPI + React app, many analytics endpoints, closure/congestion/duration models, auth claims, feedback and recommendation artifacts. |
| `Gridlock_phase2` | Digital twin endpoint, outcome logging, zone health, resource endpoint, ensemble artifacts, memory database. |
| `gridlock-v3` | CatBoost + RL/PPO resource allocation framing, simulation endpoint, Dockerized Next/FastAPI stack. |
| `gridlock-prototype` | Broad modular backend, AI copilot routes, simulation feed, many API endpoints. |
| `gridlock-v2` | Scenario simulator, deterministic impact engine, AI explanation service, post-event report endpoints. |
| `gridlock-round2` | Clear proposal/deck/model docs, learning and recommendation docs, LightGBM/CatBoost closure and duration artifacts. |
| `NammaTraffic` | Pitch deck, severity/closure/resolution models, copilot context, corridor risk and hotspot cluster artifacts. |

The detailed repository-wise notes are already generated under `docs/competitor_repo_notes/`.

## Our Current Advantages

Our project already has real substance:

- Working backend and frontend.
- Preprocessed ASTRAM dataset.
- Trained duration and priority models.
- High-volume vs rare-cause prediction routing.
- k-nearest similar-event retrieval for rare cases.
- Offline text enrichment.
- Leaflet map, OSRM detour, Chart.js analytics, correlation grid.
- Feedback form and feedback summary.
- API tests that pass.
- Production frontend build that passes.

The project is not empty polish. It is runnable and demoable.

## Our Biggest Competitive Gaps

### 1. Road-Closure Prediction Is Missing

Many strong competitors predict closure probability directly. Our current `/api/predict` accepts `requires_road_closure` as an input and uses it for resources, but it does not forecast closure need.

Why judges care:

- Closure need is operationally actionable.
- It is more trustworthy than exact duration prediction.
- It drives barricading and diversion decisions.

Recommended fix:

- Add `closure_model.joblib`.
- Train `requires_road_closure` classifier.
- Return `closure_probability`.
- Let user provide `closure_hint`, but do not require them to know the answer.

Priority: **P0**

### 2. Priority Classifier Looks Too Perfect

Our model comparison reports 100% accuracy and F1 for priority. This may be real if `priority` is almost deterministic from corridor, but judges may see it as leakage.

Recommended fix:

- Add an honest model card.
- Use time-based validation.
- Run ablation:
  - with corridor
  - without corridor
  - without police station
  - location-only
  - cause/time-only
- Explain if priority is an operational label strongly encoded by corridor.

Priority: **P0**

### 3. Duration Regression Is Weak and Needs Honest Framing

Duration MAE is about 2304 minutes, while median error is about 55 minutes. That means many stale administrative closures distort the target.

Recommended fix:

- Return duration as bands instead of only a precise number:
  - `Quick`: under 60 minutes
  - `Moderate`: 60-180 minutes
  - `Extended`: 180-720 minutes
  - `Administrative/Stale`: over 720 minutes
- Continue showing p50/p90 historical estimates.
- Add warning when confidence is low.
- Consider dropping exact duration as the headline metric, following the strongest competitor pattern.

Priority: **P0**

### 4. No Unified Impact Score Yet

The Antigravity plan recommends an impact score, and competitors use severity/cascade/risk scores. Our output currently gives duration, priority, resource counts, and nearest junctions, but no single explainable score.

Recommended fix:

- Create `backend/impact_scoring.py`.
- Compute 0-100 impact score from:
  - priority probability or predicted priority
  - closure probability
  - duration band
  - peak hour
  - corridor risk
  - cause risk
  - nearby hotspot density
- Return `impact_score`, `impact_class`, and `explanations`.

Priority: **P0**

### 5. Feedback Is Logged, Not Learned

The UI says learning loop, and the backend stores feedback. But feedback does not adjust recommendations yet.

Recommended fix:

- Add `backend/artifacts/policy_adjustments.json`.
- Compute multipliers by event cause, corridor, and impact class:
  - manpower multiplier
  - barricade multiplier
  - duration adjustment
- Apply multipliers in `predictor.py`.
- Expose `/api/feedback/learning`.
- UI should show "policy adjusted by feedback" only after enough logs exist.

Priority: **P1**

### 6. Routing Depends On Public OSRM

OSRM is good for demo, but public routing can fail or be unavailable. The Antigravity plan explicitly recommends a dataset-only fallback.

Recommended fix:

- Backend should generate fallback control points from nearest junctions.
- Frontend should display fallback route/advisory if OSRM fails.
- Add clear "routing source: OSRM" vs "routing source: fallback" label.

Priority: **P1**

### 7. Hotspot/Corridor Risk Is Not First-Class

Competitors expose hotspot, corridor, zone, and station risk. Our analytics include distributions and junctions but no dedicated hotspot API.

Recommended fix:

- Add `/api/hotspots`.
- Add `/api/corridor-risk`.
- Generate:
  - top junction risk
  - corridor closure rate
  - corridor high-priority rate
  - median duration by corridor
  - event density by grid cell

Priority: **P1**

### 8. Single-File Frontend Is Hard To Improve

`client/src/App.jsx` is about 1200 lines. It works, but editor iteration will become risky.

Recommended fix:

- Split into components:
  - `AnalyticsDashboard`
  - `CorrelationGrid`
  - `LiveMap`
  - `ForecastPlanner`
  - `ResourcePlan`
  - `SimilarEvents`
  - `FeedbackLog`
  - `ScenarioSimulator`
- Move API calls to `client/src/lib/api.js`.

Priority: **P2**

### 9. README Has Encoding Damage and Some Overclaiming

The README includes mojibake in the architecture diagram and says "learning loop" more strongly than the code currently supports.

Recommended fix:

- Replace broken diagram with ASCII or Mermaid.
- Add a "What is currently implemented" section.
- Add a "Known limitations, handled honestly" section.
- Update setup instructions with tested commands.

Priority: **P1**

## Recommended P0 Editor Task List

Give the editor these first. They are the most likely to improve judging outcome quickly.

1. Add road-closure model.
   - Train `requires_road_closure`.
   - Save `backend/models/closure_model.joblib`.
   - Add closure metrics to `model_comparison_results.json`.
   - Add `closure_probability` to `/api/predict`.

2. Add impact scoring and explanations.
   - New `backend/impact_scoring.py`.
   - Return `impact_score`, `impact_class`, `confidence`, and `explanations`.
   - Show these in the planner UI.

3. Add honest validation/model card.
   - New `backend/artifacts/model_card.json`.
   - New `docs/model_card.md`.
   - Include temporal split, random split caveat, duration noise, leakage checks, and baseline comparison.

4. Reframe duration.
   - Add duration band output.
   - Use exact duration as p50 estimate, not as the only headline.
   - Add p90/historical uncertainty.

5. Fix README.
   - Remove mojibake.
   - Align claims to actual behavior.
   - Add verified build/test status.

## Recommended P1 Editor Task List

1. Add feedback-driven policy multipliers.
2. Add `/api/hotspots` and `/api/corridor-risk`.
3. Add OSRM fallback display.
4. Add scenario presets:
   - public event at evening peak
   - vehicle breakdown on ORR
   - construction with road closure
   - waterlogging near underpass
   - VIP movement
5. Add exportable incident plan JSON or printable operations brief.

## Recommended P2 Editor Task List

1. Split `App.jsx` into components.
2. Add Playwright smoke test for the planner flow.
3. Add UI model disclaimers and confidence tooltips.
4. Add chunk/code splitting if build size matters.
5. Add deployment notes.

## Positioning For Judges

The strongest narrative is:

> We do not pretend the dataset can solve everything. We learn what is measurable, recommend operations through transparent policy, and close the loop with post-event feedback so the system becomes more local and more accurate over time.

Use this framing:

- Forecast: closure probability, priority, duration band, and impact score.
- Recommend: manpower, barricades, control points, and diversions.
- Explain: similar historical events and why the recommendation was made.
- Learn: actual outcomes update policy multipliers and future retraining.

This is more credible than claiming exact traffic delay prediction without live speed data.

## How To Refresh Competitor Notes

When the scraped repositories are updated:

```powershell
python tools/update_competitor_notes.py
```

Then inspect:

- `docs/competitor_repo_notes/README.md`
- `docs/competitor_repo_notes/_repo_inventory.json`
- Any repo note whose fingerprint changed

The fingerprint lets us detect repo updates even if the public README did not change.

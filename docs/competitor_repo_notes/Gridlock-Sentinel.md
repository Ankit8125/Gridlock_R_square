# Gridlock-Sentinel

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\Gridlock-Sentinel`
- Git remote: `https://github.com/sanjanagangishetty21/Gridlock-Sentinel.git`
- Git branch: `main`
- Git HEAD: `13a2c825f81984616b18df18ea3e3b44798bdc9b`
- Fingerprint: `45bbfa403bcd7b10260126c6dfb929bd3065762958de0ab86040144355b1361d`
- Files indexed: `8`
- Indexed size: `5221161` bytes

## Stack Signals

- None detected

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, manpower, police, resource
- models: calibration
- routing: google maps

## Manifests

- None detected

## README Headings

- `README.md`: # Gridlock Sentinel: Event-Driven Congestion Forecasting & Response Optimizer
- `README.md`: ## 🌟 Key Features
- `README.md`: ### 1. Interactive Analytics Dashboard & Map
- `README.md`: ### 2. Quantified Congestion Impact Forecast Simulator
- `README.md`: ### 3. Post-Event Feedback Learning System
- `README.md`: ### 4. Historical Data Explorer
- `README.md`: ## 🛠️ Project Architecture
- `README.md`: ## 🚀 How to Run Locally
- `README.md`: ### 1. Generate the Clean JSON Data (Optional)
- `README.md`: ### 2. Start the Local Web Server

## README Claims and Operational Notes

- `README.md`: It enables traffic operators to quantify the impact of localized traffic disruptions (rallies, festivals, construction, accidents, breakdowns, water logging) in advance, optimize resource deployment (manpower, barrica...
- `README.md`: ## 🌟 Key Features
- `README.md`: ### 1. Interactive Analytics Dashboard & Map
- `README.md`: * **Response Deployment Plan**: Automatically recommends required **Manpower** (traffic police officers, marshals), **Barricades & Cones**, and upstream **Diversion Signboards**.
- `README.md`: ### 3. Post-Event Feedback Learning System
- `README.md`: * **Continuous Calibration**: Operators log actual post-event resolution metrics (duration, radius, deployed resources) and evaluate manpower adequacy ("Under-deployed", "Optimal", "Over-deployed").
- `README.md`: * **Auto-Tuning Multipliers**: Feedback adjusts local calibration multipliers in the browser's `localStorage`. Rating an event as "Under-deployed" automatically scales up future recommended manpower for that event cause.
- `README.md`: * **Model Accuracy Tracking**: Tracks and visualizes the running **Mean Absolute Error (MAE)** of duration forecasts as more feedback is logged.
- `README.md`: ## 🚀 How to Run Locally
- `README.md`: If you need to regenerate the processed database from the raw CSV, ensure you have Python and `pandas` installed, then run:
- `README.md`: Since the front-end uses fetch requests to load the JSON data, browsers block direct loading on `file://` URIs due to CORS security policies. Start a simple web server by running:
- `README.md`: 👉 **Live Dashboard:** [https://gridlock-sentinel.vercel.app/](https://gridlock-sentinel.vercel.app/)

## Data Assets

- `Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv`
- `data_summary.json`

## Model and Artifact Assets

- None detected

## Notebooks

- None detected

## API Endpoints

- None detected

## Python Source Signals

### `process_data.py`
- Functions: `main`
- Imports: `json`, `numpy`, `os`, `pandas`

## JavaScript/TypeScript Source Signals

### `app.js`
- Symbols: `appData`, `leafletMap`, `mapMarkersGroup`, `charts`, `activeIncidents`, `feedbackLog`, `resourceMultipliers`, `currentSimulationResult`, `explorerCurrentPage`, `explorerPageSize`, `explorerFilteredData`, `setupTabs`, `navItems`, `tabContents`, `pageTitle`, `tabId`, `targetTab`, `loadLocalStorageState`, `savedIncidents`, `savedMultipliers`, `savedFeedback`, `loadData`, `response`, `updateDashboardKPIs`, `medianMins`, `durationText`, `planned`, `unplanned`, `initMap`, `centerLat`, `centerLng`, `lat`, `lng`, `renderMapPoints`, `color`

## Documentation and Presentation Files

- `README.md`

## Test Files

- None detected

## File Inventory

- `.gitignore` | 173 bytes | `4e2f5726c2af`
- `app.js` | 36647 bytes | `d3b0d8f3c2b1`
- `Astram event data_anonymized - Astram event data_anonymizedb40ac87.csv` | 4547022 bytes | `11469a7450fd`
- `data_summary.json` | 573415 bytes | `a93ba0bb7932`
- `index.html` | 28830 bytes | `5feed3566cf9`
- `process_data.py` | 6562 bytes | `20577a0e9cfa`
- `README.md` | 4491 bytes | `0494d692c036`
- `styles.css` | 24021 bytes | `779baa107fa6`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

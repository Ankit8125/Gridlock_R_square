# FlowCast

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\FlowCast`
- Git remote: `https://github.com/Jiya10011/FlowCast.git`
- Git branch: `main`
- Git HEAD: `c4b8a7ce0dc81ffa17f19ccd001eca89cc424618`
- Fingerprint: `db08a1bee57da88b7571a9410819a97a0fa5e1b2d01e6863d7b205a5bc8a52d5`
- Files indexed: `6`
- Indexed size: `108003` bytes

## Stack Signals

- None detected

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, gridlock, traffic
- operations: barricade, closure, diversion, manpower
- models: lightgbm
- routing: none

## Manifests

- `package.json`
- `vercel.json`

## Package Files

### `package.json`
- Name: `flowcast-gridlock`
- Scripts:
  - `dev`: `npx serve . -p 3000`
  - `build`: `echo 'Static site, no build needed'`
  - `deploy`: `vercel --prod`
- Dependencies: `vercel`

## README Headings

- `README(2).md`: # 🌊 FlowCast — Bengaluru Event Traffic Intelligence
- `README(2).md`: ## 📌 Problem Statement
- `README(2).md`: ## 💡 Solution — FlowCast
- `README(2).md`: ## 🗂 Project Structure
- `README(2).md`: ## 🖥️ Dashboard Views
- `README(2).md`: ## 📊 Dataset
- `README(2).md`: ## 🧠 Scoring Engine
- `README(2).md`: ## 🚀 Tech Stack
- `README(2).md`: ## 🏃 Run Locally
- `README(2).md`: # Option 1 — just open in browser
- `README(2).md`: # Double-click index.html
- `README(2).md`: # Option 2 — local server
- `README(2).md`: # Open http://localhost:3000
- `README(2).md`: ## 🌐 Deploy to Vercel
- `README(2).md`: # Option A — Drag & drop folder at vercel.com (easiest)
- `README(2).md`: # Option B — CLI
- `README(2).md`: ## 🎯 Key Features for Judges
- `README(2).md`: ## 📋 Hackathon Submission Checklist
- `README(2).md`: ## 👩‍💻 Team
- `README.md`: # 🌊 FlowCast — Bengaluru Event Traffic Intelligence
- `README.md`: ## 📌 Problem Statement
- `README.md`: ## 💡 Solution — FlowCast
- `README.md`: ## 🗂 Project Structure
- `README.md`: ## 🖥️ Dashboard Views
- `README.md`: ## 📊 Dataset
- `README.md`: ## 🧠 Scoring Engine
- `README.md`: ## 🚀 Tech Stack
- `README.md`: ## 🏃 Run Locally
- `README.md`: # Option 1 — just open in browser
- `README.md`: # Double-click index.html
- `README.md`: # Option 2 — local server
- `README.md`: # Open http://localhost:3000
- `README.md`: ## 🌐 Deploy to Vercel
- `README.md`: # Option A — Drag & drop folder at vercel.com (easiest)
- `README.md`: # Option B — CLI
- `README.md`: ## 🎯 Key Features for Judges
- `README.md`: ## 📋 Hackathon Submission Checklist
- `README.md`: ## 👩‍💻 Team

## README Claims and Operational Notes

- `README(2).md`: Events like political rallies, concerts, VIP movements, and religious processions cause sudden, unplanned traffic breakdowns on Bengaluru corridors. There is no proactive system to forecast congestion impact before th...
- `README(2).md`: - Predicts **zone-level congestion impact** using a LightGBM scoring engine calibrated on **8,173 real Astram Bengaluru events**
- `README(2).md`: - Outputs a complete **action plan** — officer count, barricade points, diversion routes
- `README(2).md`: ├── index.html       ← Landing page (hero, features, how it works)
- `README(2).md`: ├── dashboard.html   ← Main prediction dashboard (3 views)
- `README(2).md`: ├── vercel.json      ← Vercel deployment config
- `README(2).md`: ## 🖥️ Dashboard Views
- `README(2).md`: | **Predict Impact** | Enter event parameters → get impact score, zone analysis, action plan, forecast chart |
- `README(2).md`: - **Key features used:** event_cause, corridor, zone, hour, priority, vehicle_type, requires_road_closure
- `README(2).md`: **Round 1 Model Score: 90.97 R²** (LightGBM, v14 with geo_mean_d49 feature)
- `README(2).md`: | ML Model | LightGBM (scoring engine calibrated from Astram dataset) |
- `README(2).md`: | Deployment | Vercel (static hosting) |
- `README(2).md`: ## 🏃 Run Locally
- `README(2).md`: No installation, no API keys, no backend needed. Pure static site.
- `README(2).md`: ## 🌐 Deploy to Vercel
- `README(2).md`: ## 🎯 Key Features for Judges
- `README(2).md`: 1. **Load "VIP Movement" preset** → Run Prediction → shows 80% closure risk (real data)
- `README(2).md`: 5. **Animated score ring** on every prediction result
- `README(2).md`: - [x] Prediction engine calibrated from real data
- `README(2).md`: - [x] Deployed on Vercel
- `README.md`: Events like political rallies, concerts, VIP movements, and religious processions cause sudden, unplanned traffic breakdowns on Bengaluru corridors. There is no proactive system to forecast congestion impact before th...
- `README.md`: - Predicts **zone-level congestion impact** using a LightGBM scoring engine calibrated on **8,173 real Astram Bengaluru events**
- `README.md`: - Outputs a complete **action plan** — officer count, barricade points, diversion routes
- `README.md`: ├── index.html       ← Landing page (hero, features, how it works)
- `README.md`: ├── dashboard.html   ← Main prediction dashboard (3 views)
- `README.md`: ├── vercel.json      ← Vercel deployment config
- `README.md`: ## 🖥️ Dashboard Views
- `README.md`: | **Predict Impact** | Enter event parameters → get impact score, zone analysis, action plan, forecast chart |
- `README.md`: - **Key features used:** event_cause, corridor, zone, hour, priority, vehicle_type, requires_road_closure
- `README.md`: **Round 1 Model Score: 90.97 R²** (LightGBM, v14 with geo_mean_d49 feature)
- `README.md`: | ML Model | LightGBM (scoring engine calibrated from Astram dataset) |
- `README.md`: | Deployment | Vercel (static hosting) |
- `README.md`: ## 🏃 Run Locally
- `README.md`: No installation, no API keys, no backend needed. Pure static site.
- `README.md`: ## 🌐 Deploy to Vercel
- `README.md`: ## 🎯 Key Features for Judges
- `README.md`: 1. **Load "VIP Movement" preset** → Run Prediction → shows 80% closure risk (real data)
- `README.md`: 5. **Animated score ring** on every prediction result
- `README.md`: - [x] Prediction engine calibrated from real data
- `README.md`: - [x] Deployed on Vercel

## Data Assets

- None detected

## Model and Artifact Assets

- None detected

## Notebooks

- None detected

## API Endpoints

- None detected

## Python Source Signals

- None detected
## JavaScript/TypeScript Source Signals

- None detected
## Documentation and Presentation Files

- `README(2).md`
- `README.md`

## Test Files

- None detected

## File Inventory

- `dashboard.html` | 77449 bytes | `6ee3b68918c2`
- `index.html` | 20039 bytes | `6a6bd921b3c7`
- `package.json` | 464 bytes | `7dcd4e8a6d6f`
- `README(2).md` | 4784 bytes | `feb98c86af3f`
- `README.md` | 4784 bytes | `feb98c86af3f`
- `vercel.json` | 483 bytes | `881880f576ff`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

# gridlock-ai

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock-ai`
- Git remote: `https://github.com/Princeag1310/gridlock-ai.git`
- Git branch: `main`
- Git HEAD: `94d67e8ecfe9bd64d33bad674ac4edc0d55f50a4`
- Fingerprint: `ad0314b91e3864fef8a1cffe44d440fabde37556010f38665f09b3f7e204088d`
- Files indexed: `23`
- Indexed size: `351339` bytes

## Stack Signals

- `Next.js`
- `React`
- `Tailwind CSS`

## Traffic Problem Signals

- traffic: bengaluru, congestion, gridlock, traffic
- operations: police, resource
- models: gru
- routing: none

## Manifests

- `dashboard\package.json`

## Package Files

### `dashboard\package.json`
- Name: `dashboard`
- Scripts:
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `eslint`
- Dependencies: `@tailwindcss/postcss`, `@types/leaflet`, `@types/node`, `@types/react`, `@types/react-dom`, `clsx`, `eslint`, `eslint-config-next`, `leaflet`, `lucide-react`, `mappls-web-maps`, `next`, `react`, `react-dom`, `react-leaflet`, `tailwind-merge`, `tailwindcss`, `typescript`

## README Headings

- `README.md`: # 🚦 Gridlock AI
- `README.md`: ## 📖 Overview
- `README.md`: ## ✨ Key Features
- `README.md`: ## 🛠️ Technology Stack
- `README.md`: ## 🚀 How to Run Locally
- `README.md`: ### 1. Run the AI Processing Engine
- `README.md`: # Ensure the 100MB+ dataset CSV is in the root directory
- `README.md`: ### 2. Start the Dashboard Server
- `README.md`: ### 3. View the Application
- `dashboard\README.md`: ## Getting Started
- `dashboard\README.md`: # or
- `dashboard\README.md`: # or
- `dashboard\README.md`: # or
- `dashboard\README.md`: ## Learn More
- `dashboard\README.md`: ## Deploy on Vercel

## README Claims and Operational Notes

- `README.md`: **An AI-Driven Parking Intelligence Dashboard for the Bengaluru Traffic Police (BTP)**
- `README.md`: **Gridlock AI** solves this by transitioning the department to **proactive, targeted enforcement**. We used unsupervised machine learning (DBSCAN) on massive volumes of real-world traffic violation data to automatical...
- `README.md`: ## ✨ Key Features
- `README.md`: * **🚚 Auto-Dispatcher Engine:** A proprietary algorithm that takes the BTP's available tow-truck count and instantly routes them to the highest-priority enforcement zones.
- `README.md`: ## 🚀 How to Run Locally
- `README.md`: ### 1. Run the AI Processing Engine
- `README.md`: *(Note: The output is automatically saved to `dashboard/public/hotspots.json` so the frontend can access it).*
- `README.md`: ### 2. Start the Dashboard Server
- `README.md`: cd dashboard
- `README.md`: npm run dev
- `dashboard\README.md`: This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
- `dashboard\README.md`: First, run the development server:
- `dashboard\README.md`: npm run dev
- `dashboard\README.md`: - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- `dashboard\README.md`: You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
- `dashboard\README.md`: ## Deploy on Vercel
- `dashboard\README.md`: The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the cre...
- `dashboard\README.md`: Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Data Assets

- `dashboard\public\hotspots.json`

## Model and Artifact Assets

- None detected

## Notebooks

- None detected

## API Endpoints

- None detected

## Python Source Signals

### `process_real_data.py`
- Functions: `get_time_block`, `time_profile`
- Imports: `json`, `numpy`, `os`, `pandas`, `sklearn`

## JavaScript/TypeScript Source Signals

### `dashboard\src\app\layout.tsx`
- Symbols: `geistSans`, `geistMono`, `RootLayout`
- Imports: `next`, `next/font/google`

### `dashboard\src\app\page.tsx`
- Symbols: `DynamicMap`, `Dashboard`, `hotspots`, `count`, `impact`, `handleDispatch`, `sorted`, `topClusters`, `totalRevenue`
- Imports: `lucide-react`, `next/dynamic`, `react`

### `dashboard\src\components\MapplsMap.tsx`
- Symbols: `mapplsClassObject`, `MapplsMap`, `mapRef`, `markersRef`, `initRef`, `loadObject`, `newMap`, `currentMap`, `m`, `MarkerClass`, `baseColor`, `size`, `htmlContent`, `popupHtml`, `marker`, `wrapperEl`, `el`, `isDispatched`, `isActive`, `baseColor`, `currentMap`
- Imports: `mappls-web-maps`, `react`

## Documentation and Presentation Files

- `dashboard\AGENTS.md`
- `dashboard\CLAUDE.md`
- `dashboard\README.md`
- `README.md`

## Test Files

- None detected

## File Inventory

- `dashboard\.gitignore` | 521 bytes | `cfdbd5a321f3`
- `dashboard\AGENTS.md` | 332 bytes | `ceaa13d29db2`
- `dashboard\CLAUDE.md` | 12 bytes | `d631d88045f7`
- `dashboard\eslint.config.mjs` | 483 bytes | `275a07c13fc7`
- `dashboard\next.config.ts` | 140 bytes | `a972c4f0ffa6`
- `dashboard\package-lock.json` | 244643 bytes | `a87859beb209`
- `dashboard\package.json` | 771 bytes | `5352e8b707b8`
- `dashboard\postcss.config.mjs` | 101 bytes | `7b299d3d3b16`
- `dashboard\public\file.svg` | 391 bytes | `2b67812c325c`
- `dashboard\public\globe.svg` | 1035 bytes | `b614b9bf1839`
- `dashboard\public\hotspots.json` | 46343 bytes | `3d73702bbd80`
- `dashboard\public\next.svg` | 1375 bytes | `55995dfad6ec`
- `dashboard\public\vercel.svg` | 128 bytes | `f081337b2fee`
- `dashboard\public\window.svg` | 385 bytes | `644768c4aaeb`
- `dashboard\README.md` | 1486 bytes | `3b3ed71ebf50`
- `dashboard\src\app\favicon.ico` | 25931 bytes | `2b8ad2d33455`
- `dashboard\src\app\globals.css` | 1373 bytes | `a760dd4794f3`
- `dashboard\src\app\layout.tsx` | 752 bytes | `e3010b15d27d`
- `dashboard\src\app\page.tsx` | 10777 bytes | `a3bf8e0fde20`
- `dashboard\src\components\MapplsMap.tsx` | 7198 bytes | `2fef2b93b7b7`
- `dashboard\tsconfig.json` | 704 bytes | `dbacf04aa5f3`
- `process_real_data.py` | 3428 bytes | `6ccfc18f924d`
- `README.md` | 3030 bytes | `f880c0a97b95`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

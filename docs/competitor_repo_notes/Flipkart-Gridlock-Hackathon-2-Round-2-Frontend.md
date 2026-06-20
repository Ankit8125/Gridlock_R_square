# Flipkart-Gridlock-Hackathon-2-Round-2-Frontend

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\Flipkart-Gridlock-Hackathon-2-Round-2-Frontend`
- Git remote: `https://github.com/Amogh-Gurudatta/Flipkart-Gridlock-Hackathon-2-Round-2-Frontend.git`
- Git branch: `main`
- Git HEAD: `813bdc7948145ab3182642349e1afdc32aca13da`
- Fingerprint: `5cc10a5c9f33f5545e02ec8a57e494dafaa822291ef6d7fd4a7237c7f98c858f`
- Files indexed: `34`
- Indexed size: `2879649` bytes

## Stack Signals

- `Next.js`
- `React`
- `Tailwind CSS`

## Traffic Problem Signals

- traffic: bengaluru, congestion, traffic
- operations: barricade, closure, diversion, police
- models: gru
- routing: none

## Manifests

- `package.json`

## Package Files

### `package.json`
- Name: `btp-command-center`
- Scripts:
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `eslint`
- Dependencies: `@tailwindcss/postcss`, `@types/leaflet`, `@types/node`, `@types/react`, `@types/react-dom`, `@vercel/speed-insights`, `clsx`, `eslint`, `eslint-config-next`, `framer-motion`, `html2canvas`, `jspdf`, `leaflet`, `lucide-react`, `next`, `react`, `react-dom`, `react-leaflet`, `recharts`, `sonner`, `tailwind-merge`, `tailwindcss`, `typescript`

## README Headings

- `README.md`: # Bengaluru Traffic Police — Predictive Command Center
- `README.md`: ## Features
- `README.md`: ## Setup Instructions
- `README.md`: ### Local Development
- `README.md`: ### Environment Variables

## README Claims and Operational Notes

- `README.md`: # Bengaluru Traffic Police — Predictive Command Center
- `README.md`: > *A high-performance predictive traffic management dashboard. The BTP's tactical terminal for managing traffic anomalies.*
- `README.md`: The BTP Command Center provides a clinical blue tactical terminal to manage active traffic events, forecast congestion life-cycles, and issue dispatch recommendations for traffic police deployment.
- `README.md`: ## Features
- `README.md`: - Auto-generated Gaussian bell-curve charting to visualize the "Predicted Congestion Life-Cycle" of any selected event.
- `README.md`: 3. **Official BTP Deployment Order Generator**
- `README.md`: - Real-time deployment calculation based on traffic event severity.
- `README.md`: - Comprehensive table tracking all active and forecasted anomalies, including recommended officer and barricade deployments.
- `README.md`: - A running backend providing the traffic event stream.
- `README.md`: npm run dev
- `README.md`: NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

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

### `src\app\(auth)\page.tsx`
- Symbols: `GatewayPage`, `router`, `handleSubmit`, `apiUrl`, `response`, `data`
- Imports: `lucide-react`, `next/navigation`, `react`

### `src\app\(dashboard)\database\page.tsx`
- Symbols: `DatabasePage`, `filtered`, `q`, `matchesQuery`, `matchesStatus`, `matchesFrequency`, `handleAdd`, `handleDelete`
- Imports: `@/components/database/AddRecordModal`, `@/components/database/FilterBar`, `@/components/database/ProfileCard`, `@/lib/profileData`, `framer-motion`, `react`

### `src\app\(dashboard)\generator\page.tsx`
- Symbols: `GeneratorPage`, `handleSubmit`, `AudioCtx`, `audioCtx`, `osc`, `docElement`, `canvas`, `imgData`, `pdf`, `pageWidth`, `pageHeight`, `margin`, `maxWidth`, `maxHeight`, `finalWidth`, `finalHeight`, `xOffset`, `yOffset`
- Imports: `@/components/generator/DocumentForm`, `@/components/generator/LivePreview`, `html2canvas`, `jspdf`, `react`, `sonner`

### `src\app\(dashboard)\layout.tsx`
- Symbols: `DashboardLayout`
- Imports: `@/components/auth/AuthGuard`, `@/components/layout/Navigation`

### `src\app\(dashboard)\map\page.tsx`
- Symbols: `MapWidget`, `MapPage`, `accentColor`, `handleSelectNode`
- Imports: `@/components/map/IncidentFeed`, `@/context/DataContext`, `next/dynamic`, `react`

### `src\app\(dashboard)\warrants\page.tsx`
- Symbols: `SEVERITY_LEVELS`, `SeverityBadge`, `s`, `StatCard`, `DispatchLogsPage`, `filtered`, `q`, `result`, `matchesQuery`, `matchesSeverity`, `diff`, `totalCops`, `totalBarricades`, `criticalCount`, `isActive`, `s`
- Imports: `@/lib/mockBTPData`, `framer-motion`, `lucide-react`, `react`

### `src\app\layout.tsx`
- Symbols: `inter`, `RootLayout`
- Imports: `@/context/DataContext`, `@vercel/speed-insights/next`, `next`, `next/font/google`, `sonner`

### `src\components\auth\AuthGuard.tsx`
- Symbols: `AuthGuard`, `router`, `checkAuth`, `token`
- Imports: `next/navigation`, `react`

### `src\components\database\AddRecordModal.tsx`
- Symbols: `DEFAULT_FORM`, `inputCls`, `selectCls`, `AddRecordModal`, `set`, `handleSubmit`
- Imports: `@/lib/profileData`, `framer-motion`, `lucide-react`, `react`, `sonner`

### `src\components\database\FilterBar.tsx`
- Symbols: `STATUS_OPTIONS`, `FREQUENCY_OPTIONS`, `selectStyle`, `FilterBar`
- Imports: `lucide-react`

### `src\components\database\ProfileCard.tsx`
- Symbols: `ProfileCard`, `freqStyle`, `statusStyle`, `handleIssueChallan`, `handleImpound`, `handleDelete`
- Imports: `@/lib/profileData`, `framer-motion`, `lucide-react`, `react`, `sonner`

### `src\components\generator\DocumentForm.tsx`
- Symbols: `DocumentForm`, `inputStyle`, `focusHandlers`, `blurHandlers`, `isReady`

### `src\components\generator\LivePreview.tsx`
- Symbols: `LivePreview`, `currentDate`, `currentTime`, `copsRequired`, `barricades`, `diversionStatus`, `severityColor`, `isCriticalOrHigh`
- Imports: `framer-motion`, `react`

### `src\components\layout\CustomCursor.tsx`
- Symbols: `CustomCursor`, `mouseX`, `mouseY`, `springConfig`, `cursorX`, `cursorY`, `moveMouse`, `target`
- Imports: `framer-motion`, `lucide-react`, `react`

### `src\components\layout\Navigation.tsx`
- Symbols: `Navigation`, `pathname`, `router`, `isActive`, `Icon`, `label`
- Imports: `lucide-react`, `next/link`, `next/navigation`, `react`

### `src\components\map\ForecastChart.tsx`
- Symbols: `generateBellCurve`, `steps`, `peakStep`, `sigma`, `raw`, `congestion`, `hours`, `label`, `CustomTooltip`, `ForecastChart`, `durationMins`, `severity`, `accentColor`, `data`
- Imports: `@/context/DataContext`, `recharts`

### `src\components\map\IncidentFeed.tsx`
- Symbols: `ForecastChart`, `fireAlertToast`, `isCritical`, `duration`, `msg`, `IncidentFeed`, `alertedIds`, `delay`, `activeNode`, `handleSelect`, `isActive`, `sev`, `badge`
- Imports: `@/context/DataContext`, `lucide-react`, `next/dynamic`, `react`, `sonner`

### `src\components\map\MapWidget.tsx`
- Symbols: `MapController`, `map`, `MapWidget`, `isActive`
- Imports: `@/context/DataContext`, `react`, `react-leaflet`

### `src\context\DataContext.tsx`
- Symbols: `DataContext`, `mapBTPEventToIncident`, `DataProvider`, `pathname`, `refreshData`, `incidentsRes`, `data`, `tick`, `hasToken`, `initialToken`, `useData`, `context`
- Imports: `@/lib/mockBTPData`, `next/navigation`, `react`

## Documentation and Presentation Files

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`

## Test Files

- None detected

## File Inventory

- `.gitignore` | 617 bytes | `0591996121ff`
- `AGENTS.md` | 332 bytes | `ceaa13d29db2`
- `CLAUDE.md` | 12 bytes | `d631d88045f7`
- `eslint.config.mjs` | 483 bytes | `275a07c13fc7`
- `LICENSE` | 1093 bytes | `4a8313f06c00`
- `next.config.ts` | 140 bytes | `a972c4f0ffa6`
- `package-lock.json` | 274163 bytes | `b5ecd1f0d64e`
- `package.json` | 959 bytes | `76c4b870c3fa`
- `postcss.config.mjs` | 101 bytes | `7b299d3d3b16`
- `README.md` | 1816 bytes | `3fec14447d12`
- `src\app\(auth)\page.tsx` | 6930 bytes | `6e38b74cec65`
- `src\app\(dashboard)\database\page.tsx` | 4523 bytes | `1c645359b5e3`
- `src\app\(dashboard)\generator\page.tsx` | 5512 bytes | `023817bccc57`
- `src\app\(dashboard)\layout.tsx` | 536 bytes | `79bbbd931909`
- `src\app\(dashboard)\map\page.tsx` | 1890 bytes | `286e0c811a33`
- `src\app\(dashboard)\warrants\page.tsx` | 15358 bytes | `467fbe2cff20`
- `src\app\globals.css` | 783 bytes | `34c8c4991553`
- `src\app\icon.png` | 2483002 bytes | `792ad79e68a2`
- `src\app\layout.tsx` | 923 bytes | `a5740e8288cc`
- `src\components\auth\AuthGuard.tsx` | 2005 bytes | `d80053ac7778`
- `src\components\database\AddRecordModal.tsx` | 10971 bytes | `53ef096bde49`
- `src\components\database\FilterBar.tsx` | 5273 bytes | `9d69aad9da35`
- `src\components\database\ProfileCard.tsx` | 9231 bytes | `f5df490c45fc`
- `src\components\generator\DocumentForm.tsx` | 8608 bytes | `bea8071580d9`
- `src\components\generator\LivePreview.tsx` | 11711 bytes | `832aecb50e09`
- `src\components\layout\CustomCursor.tsx` | 2033 bytes | `4ef8add95a22`
- `src\components\layout\Navigation.tsx` | 6282 bytes | `367d7f552121`
- `src\components\map\ForecastChart.tsx` | 4883 bytes | `28f74b76712f`
- `src\components\map\IncidentFeed.tsx` | 8318 bytes | `06a2a1d99da4`
- `src\components\map\MapWidget.tsx` | 2667 bytes | `33512cdfe117`
- `src\context\DataContext.tsx` | 3705 bytes | `9a2cd4e2b412`
- `src\lib\mockBTPData.ts` | 2498 bytes | `8047c5aa40b5`
- `src\lib\profileData.ts` | 1587 bytes | `e3b812811052`
- `tsconfig.json` | 704 bytes | `dbacf04aa5f3`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

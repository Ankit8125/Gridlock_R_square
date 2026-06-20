# gridlock-flipkart

## Snapshot

- Path: `D:\Coding\gridlock\Extracted Repos\gridlock-flipkart`
- Git remote: `https://github.com/sahilforkshere/gridlock-flipkart.git`
- Git branch: `master`
- Git HEAD: `2b5b9d3557a62d9c2f26d230bdc0a26009a0a45f`
- Fingerprint: `4f29fc1265e4ffc04b3de1221900e132793967484bb343efa48b72ef008129f4`
- Files indexed: `119`
- Indexed size: `34232577` bytes

## Stack Signals

- `Docker`
- `Docker Compose`
- `FastAPI`
- `Next.js`
- `Node/Express`
- `Notebook`
- `React`
- `Tailwind CSS`

## Traffic Problem Signals

- traffic: astram, bengaluru, congestion, gridlock, traffic
- operations: barricade, diversion, manpower, police, resource
- models: classifier, gru, kmeans, lightgbm, xgboost
- routing: none

## Manifests

- `backend\Dockerfile`
- `docker-compose.yml`
- `frontend\package.json`
- `ml_sidecar\Dockerfile`
- `ml_sidecar\requirements.txt`

## Package Files

### `frontend\package.json`
- Name: `frontend`
- Scripts:
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `eslint`
- Dependencies: `@base-ui/react`, `@tabler/icons-react`, `@tailwindcss/postcss`, `@types/leaflet`, `@types/node`, `@types/react`, `@types/react-dom`, `axios`, `babel-plugin-react-compiler`, `class-variance-authority`, `clsx`, `eslint`, `eslint-config-next`, `framer-motion`, `leaflet`, `lenis`, `lucide-react`, `motion`, `next`, `ogl`, `react`, `react-dom`, `react-leaflet`, `recharts`, `shadcn`, `tailwind-merge`, `tailwindcss`, `tw-animate-css`, `typescript`

## Python Dependencies

### `ml_sidecar\requirements.txt`
- `fastapi==0.115.6`
- `uvicorn[standard]==0.32.1`
- `lightgbm==4.6.0`
- `xgboost==3.2.0`
- `scikit-learn==1.6.1`
- `numpy==2.2.3`
- `pandas==2.2.3`
- `joblib==1.4.2`
- `pytorch-tabnet==4.1.0`
- `torch>=2.9.0`

## README Headings

- `README.md`: # ASTRAM Gridlock — Bengaluru Traffic Congestion Prediction
- `README.md`: ## Architecture
- `README.md`: ## Prerequisites
- `README.md`: ## Quick Start (3 terminals)
- `README.md`: ### Terminal 1 — Python ML Sidecar
- `README.md`: ### Terminal 2 — Go Backend
- `README.md`: ### Terminal 3 — Next.js Frontend
- `README.md`: ## Environment Variables
- `README.md`: ### Go Backend (`backend/`)
- `README.md`: ### Next.js Frontend (`frontend/`)
- `README.md`: ## Required Model Files
- `README.md`: ## API Endpoints
- `README.md`: ### Go Backend (public)
- `README.md`: ### POST /api/predict — Request Body
- `README.md`: ### POST /api/predict — Response
- `README.md`: ## Project Structure
- `README.md`: ## Deployment
- `README.md`: ### Railway (Go + Python)
- `README.md`: ### Vercel (Next.js)
- `README.md`: ## ML Models
- `frontend\README.md`: ## Getting Started
- `frontend\README.md`: # or
- `frontend\README.md`: # or
- `frontend\README.md`: # or
- `frontend\README.md`: ## Learn More
- `frontend\README.md`: ## Deploy on Vercel

## README Claims and Operational Notes

- `README.md`: # ASTRAM Gridlock — Bengaluru Traffic Congestion Prediction
- `README.md`: ↓  POST /api/predict
- `README.md`: Python FastAPI ML Sidecar (:8001)
- `README.md`: ↑  severity, confidence, probabilities, resource recommendations
- `README.md`: - ML model files (`.pkl`) in `ml_sidecar/astram_models_bundle/`
- `README.md`: Runs on http://localhost:8001
- `README.md`: go run main.go
- `README.md`: Runs on http://localhost:8080
- `README.md`: npm run dev
- `README.md`: Runs on http://localhost:3000
- `README.md`: NEXT_PUBLIC_API_URL=http://localhost:8080
- `README.md`: ## Required Model Files
- `README.md`: Place these in `ml_sidecar/astram_models_bundle/`:
- `README.md`: lgbm_model.pkl
- `README.md`: xgb_model.pkl
- `README.md`: mlp_model.pkl
- `README.md`: kmeans_model.pkl
- `README.md`: feature_names.pkl
- `README.md`: tabnet_model.zip
- `README.md`: ## API Endpoints
- `README.md`: | GET | `/api/health` | Health check |
- `README.md`: | POST | `/api/predict` | Predict congestion severity |
- `README.md`: | GET | `/api/meta` | Get corridors, zones, police stations |
- `README.md`: ### POST /api/predict — Request Body
- `README.md`: ### POST /api/predict — Response
- `README.md`: "recommendations": {
- `README.md`: "pre_deploy": "Deploy 2 hours before event start"
- `README.md`: ├── backend/                  # Go + Gin API server
- `README.md`: │   │   ├── predict.go
- `README.md`: │   └── models/
- `README.md`: ├── ml_sidecar/               # Python FastAPI ML inference
- `README.md`: │   ├── predictor.py
- `README.md`: │   └── astram_models_bundle/ # .pkl files (not in git)
- `README.md`: ├── frontend/                 # Next.js 15 App Router
- `README.md`: │   │   ├── page.tsx          # Dashboard
- `README.md`: │   │   ├── predict/page.tsx  # Prediction form
- `README.md`: │   │   ├── prediction/
- `README.md`: │       ├── api.ts
- `README.md`: ## Deployment
- `README.md`: See **[DEPLOY.md](./DEPLOY.md)** for full Railway + Vercel step-by-step instructions.
- `README.md`: 2. Set env var: `NEXT_PUBLIC_API_URL=https://<your-railway-go-url>`
- `README.md`: ## ML Models
- `README.md`: | Model | Role |
- `README.md`: | LightGBM | Base learner (best single model) |
- `README.md`: | Meta-learner | Stacks base model probabilities → final prediction |
- `frontend\README.md`: This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
- `frontend\README.md`: First, run the development server:
- `frontend\README.md`: npm run dev
- `frontend\README.md`: - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- `frontend\README.md`: You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
- `frontend\README.md`: ## Deploy on Vercel
- `frontend\README.md`: The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the cre...
- `frontend\README.md`: Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Data Assets

- `astram_models_bundle\xgb_model.json`
- `ml_sidecar\astram_models_bundle\xgb_model.json`

## Model and Artifact Assets

- `astram_models_bundle\lgbm_model.txt`
- `astram_models_bundle\xgb_model.json`
- `ml_sidecar\astram_models_bundle\lgbm_model.txt`
- `ml_sidecar\astram_models_bundle\xgb_model.json`

## Notebooks

### `Flipkart_gridlock.ipynb`
- Cells: `29`
- Imports: `google`, `joblib`, `lightgbm`, `matplotlib`, `numpy`, `os`, `pandas`, `pytorch_tabnet`, `re`, `seaborn`, `sklearn`, `torch`, `warnings`, `xgboost`, `zipfile`
- Keywords: `astram`, `barricade`, `bengaluru`, `classifier`, `closure`, `congestion`, `diversion`, `kmeans`, `lightgbm`, `manpower`, `police`, `resource`, `traffic`, `xgboost`


## API Endpoints

- `GET /health`
- `GET /meta`
- `POST /infer`
- `app.GET /health`
- `app.GET /meta`
- `app.POST /infer`

## Python Source Signals

### `ml_sidecar\loader.py`
- Functions: `load_all`, `get`, `get_corridor_classes`, `get_police_station_classes`, `get_zone_classes`
- Imports: `config`, `joblib`, `pytorch_tabnet`, `torch`, `warnings`

### `ml_sidecar\main.py`
- Classes: `InferRequest`
- Functions: `lifespan`, `infer`, `meta`, `health`
- Endpoints: `POST /infer`, `GET /meta`, `GET /health`, `app.POST /infer`, `app.GET /meta`, `app.GET /health`
- Imports: `contextlib`, `fastapi`, `loader`, `os`, `predictor`, `pydantic`, `sys`, `typing`

### `ml_sidecar\predictor.py`
- Functions: `_time_bucket`, `_simplify_veh`, `recommend_resources`, `predict`
- Imports: `config`, `loader`, `numpy`, `pandas`

## JavaScript/TypeScript Source Signals

### `frontend\app\(app)\dashboard\page.tsx`
- Symbols: `BengaluruMap`, `getEventIcon`, `size`, `useCountUp`, `raf`, `start`, `tick`, `p`, `StatCard`, `reduced`, `count`, `Dashboard`, `reduced`, `recent`, `sevCounts`, `avgConf`, `criticalCount`, `highCount`, `stats`, `cumulativeFraction`, `C`, `fraction`, `offset`, `cumulativeFraction`, `C`, `fraction`, `offset`, `currentAngle`, `fraction`, `sliceAngle`, `midAngle`, `startR`, `x1`, `y1`, `midR`
- Imports: `@/components/shared/GlowBorder`, `@/components/shared/SeverityBadge`, `@/lib/history`, `@/lib/motion`, `@/lib/severity`, `@/types`, `@tabler/icons-react`, `framer-motion`, `next/dynamic`, `next/link`, `react`

### `frontend\app\(app)\history\page.tsx`
- Symbols: `HistoryPage`, `reduced`, `handleClear`
- Imports: `@/components/shared/SeverityBadge`, `@/lib/history`, `@/lib/motion`, `@/types`, `@tabler/icons-react`, `framer-motion`, `next/link`, `react`

### `frontend\app\(app)\layout.tsx`
- Symbols: `AppLayout`
- Imports: `@/components/shared/Navbar`

### `frontend\app\(app)\model\page.tsx`
- Symbols: `CHARTS`, `SECTIONS`, `SUMMARY`, `ModelPage`, `reduced`, `visible`
- Imports: `@/lib/motion`, `@tabler/icons-react`, `framer-motion`, `next/image`, `react`

### `frontend\app\(app)\predict\[id]\page.tsx`
- Symbols: `DAYS`, `MONTHS`, `PredictDetailPage`, `router`, `reduced`, `history`, `found`, `inp`, `inputRows`
- Imports: `@/components/prediction/ProbabilityChart`, `@/components/prediction/ResourcePanel`, `@/components/prediction/SeverityCard`, `@/components/shared/SeverityBadge`, `@/lib/history`, `@/lib/motion`, `@/types`, `@tabler/icons-react`, `framer-motion`, `next/navigation`, `react`

### `frontend\app\(app)\predict\page.tsx`
- Symbols: `BengaluruMap`, `PredictPage`, `reduced`, `router`, `handleSubmit`, `res`, `entry`, `handleDemoLoad`, `handleViewFull`, `handleClose`
- Imports: `@/components/prediction/AnalysisPopup`, `@/components/prediction/DemoScenarios`, `@/components/prediction/EventForm`, `@/lib/api`, `@/lib/history`, `@/lib/motion`, `@/types`, `@tabler/icons-react`, `framer-motion`, `next/dynamic`, `next/navigation`, `react`

### `frontend\app\layout.tsx`
- Symbols: `spaceGrotesk`, `ibmPlexSans`, `ibmPlexMono`, `RootLayout`
- Imports: `next`, `next/font/google`

### `frontend\app\page.tsx`
- Symbols: `fadeUp`, `FEATURES`, `LandingPage`, `heroRef`, `progressScale`
- Imports: `@/components/providers/SmoothScroll`, `@/components/ui/Aurora`, `@/components/ui/RoadGrid`, `@/components/ui/typewriter-effect`, `framer-motion`, `lucide-react`, `next/link`, `react`

### `frontend\components\map\BengaluruMap.tsx`
- Symbols: `severityIcon`, `color`, `ClickHandler`, `MapResizer`, `map`, `timer`, `onResize`, `BengaluruMap`
- Imports: `@/lib/severity`, `@/types`, `leaflet`, `react`, `react-leaflet`

### `frontend\components\map\DynamicMap.tsx`
- Symbols: `BengaluruMap`
- Imports: `next/dynamic`

### `frontend\components\prediction\AnalysisPopup.tsx`
- Symbols: `MODELS`, `TICK_INTERVAL`, `RESULT_DELAY`, `useTypewriter`, `i`, `cancelled`, `tick`, `delay`, `t`, `ResultGlow`, `ref`, `AnalysisPopup`, `reduced`, `loadingStartedRef`, `apiResultRef`, `apiDoneRef`, `checklistDoneRef`, `summaryText`, `t`, `tryRevealResult`, `loadingRef`, `errorRef`, `startTimer`, `i`, `next`, `displayResult`, `color`, `checked`, `active`
- Imports: `@/lib/severity`, `@/types`, `@tabler/icons-react`, `framer-motion`, `react`

### `frontend\components\prediction\DemoScenarios.tsx`
- Symbols: `getEventIcon`, `DemoScenarios`, `color`
- Imports: `@/components/shared/SeverityBadge`, `@/lib/severity`, `@/types`, `lucide-react`

### `frontend\components\prediction\EventForm.tsx`
- Symbols: `now`, `Field`, `inputCls`, `selectCls`, `EventForm`, `set`, `handleSubmit`, `err`, `d`
- Imports: `@/components/ui/input`, `@/lib/api`, `@/lib/severity`, `@/lib/validate`, `@/types`, `lucide-react`, `react`

### `frontend\components\prediction\PredictionSkeleton.tsx`
- Symbols: `PredictionSkeleton`

### `frontend\components\prediction\ProbabilityChart.tsx`
- Symbols: `ProbabilityChart`, `data`
- Imports: `@/lib/severity`, `recharts`

### `frontend\components\prediction\ResourcePanel.tsx`
- Symbols: `Row`, `ResourcePanel`
- Imports: `@/types`, `lucide-react`

### `frontend\components\prediction\SeverityCard.tsx`
- Symbols: `SeverityCard`, `t`, `color`
- Imports: `@/lib/severity`, `@/types`, `react`

### `frontend\components\providers\SmoothScroll.tsx`
- Symbols: `SmoothScroll`, `lenis`, `loop`
- Imports: `lenis`, `react`

### `frontend\components\shared\GlowBorder.tsx`
- Symbols: `GlowBorder`, `ref`, `onMove`, `r`, `onLeave`
- Imports: `react`

### `frontend\components\shared\Navbar.tsx`
- Symbols: `links`, `Navbar`, `path`, `onScroll`, `isActive`, `active`, `active`
- Imports: `@tabler/icons-react`, `next/link`, `next/navigation`, `react`

### `frontend\components\shared\SeverityBadge.tsx`
- Symbols: `SeverityBadge`, `color`, `dotSize`, `textSize`, `padding`
- Imports: `@/lib/severity`

### `frontend\components\typewriter-effect-demo-1.tsx`
- Symbols: `TypewriterEffectSmoothDemo`, `words`
- Imports: `@/components/ui/typewriter-effect`

### `frontend\components\ui\Aurora.tsx`
- Symbols: `VERT`, `FRAG`, `Aurora`, `propsRef`, `ctnDom`, `ctn`, `renderer`, `gl`, `resize`, `width`, `height`, `geometry`, `colorStopsArray`, `c`, `mesh`, `animateId`, `update`, `stops`, `c`
- Imports: `ogl`, `react`

### `frontend\components\ui\badge.tsx`
- Symbols: `badgeVariants`, `Badge`
- Imports: `@/lib/utils`, `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`

### `frontend\components\ui\button.tsx`
- Symbols: `buttonVariants`, `Button`
- Imports: `@/lib/utils`, `@base-ui/react/button`, `class-variance-authority`

### `frontend\components\ui\card.tsx`
- Symbols: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`
- Imports: `@/lib/utils`, `react`

### `frontend\components\ui\input.tsx`
- Symbols: `Input`
- Imports: `@/lib/utils`, `@base-ui/react/input`, `react`

### `frontend\components\ui\label.tsx`
- Symbols: `Label`
- Imports: `@/lib/utils`, `react`

### `frontend\components\ui\RoadGrid.tsx`
- Symbols: `RoadGrid`, `canvasRef`, `canvas`, `ctx`, `w`, `h`, `maxDimension`, `gridSize`, `x`, `y`, `render`, `handleResize`
- Imports: `react`

### `frontend\components\ui\select.tsx`
- Symbols: `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`
- Imports: `@/lib/utils`, `@base-ui/react/select`, `lucide-react`, `react`

### `frontend\components\ui\tabs.tsx`
- Symbols: `Tabs`, `tabsListVariants`, `TabsList`, `TabsTrigger`, `TabsContent`
- Imports: `@/lib/utils`, `@base-ui/react/tabs`, `class-variance-authority`

### `frontend\components\ui\typewriter-effect.tsx`
- Symbols: `TypewriterEffect`, `wordsArray`, `isInView`, `renderWords`, `TypewriterEffectSmooth`, `wordsArray`, `renderWords`
- Imports: `@/lib/utils`, `motion/react`, `react`

### `frontend\lib\api.ts`
- Symbols: `BASE`, `predictEvent`, `res`, `err`, `getMeta`, `res`
- Imports: `@/types`

### `frontend\lib\history.ts`
- Symbols: `KEY`, `saveEntry`, `existing`, `updated`, `getHistory`, `clearHistory`
- Imports: `@/types`

### `frontend\lib\motion.ts`
- Symbols: `expo`
- Imports: `framer-motion`

## Documentation and Presentation Files

- `DEPLOY.md`
- `frontend\AGENTS.md`
- `frontend\CLAUDE.md`
- `frontend\README.md`
- `README.md`
- `ROADMAP.md`

## Test Files

- None detected

## File Inventory

- `.gitignore` | 373 bytes | `cba6f41678ab`
- `astram_models_bundle\confusion_matrices.png` | 67247 bytes | `bdd5f2479ba6`
- `astram_models_bundle\distributions.png` | 241625 bytes | `a00f21206989`
- `astram_models_bundle\feature_target_correlation.png` | 86299 bytes | `a0d9121535e4`
- `astram_models_bundle\geo_clusters.png` | 204676 bytes | `2a80dac8cd46`
- `astram_models_bundle\lgbm_feature_importance.png` | 87577 bytes | `b6ac0b8d0b2f`
- `astram_models_bundle\lgbm_model.txt` | 4143053 bytes | `0c4aa3c495d0`
- `astram_models_bundle\missing_values.png` | 144526 bytes | `a71f4e177735`
- `astram_models_bundle\mlp_learning_curve.png` | 60702 bytes | `63283bb9a8a4`
- `astram_models_bundle\model_comparison.png` | 59047 bytes | `a4f962c64849`
- `astram_models_bundle\tabnet_model.zip` | 496062 bytes | `ccf03d7c6c67`
- `astram_models_bundle\target_distribution.png` | 104587 bytes | `64e47ae49af1`
- `astram_models_bundle\temporal_overview.png` | 44517 bytes | `3c9f0474a51a`
- `astram_models_bundle\xgb_model.json` | 9652692 bytes | `62d4b23e77d1`
- `backend\.dockerignore` | 25 bytes | `537187949f2a`
- `backend\Dockerfile` | 300 bytes | `043ead1bdc72`
- `backend\go.mod` | 1582 bytes | `988cd3db7fd4`
- `backend\go.sum` | 7949 bytes | `145194d1fef9`
- `backend\handlers\health.go` | 761 bytes | `0fd6ac461e1f`
- `backend\handlers\predict.go` | 932 bytes | `167b76a60f0a`
- `backend\main.go` | 909 bytes | `3f433e43a6fd`
- `backend\models\types.go` | 2198 bytes | `b38858d36a73`
- `backend\services\inference.go` | 1773 bytes | `d1a3e8b3f7dc`
- `DEPLOY.md` | 4737 bytes | `b65ce960e21e`
- `docker-compose.yml` | 518 bytes | `e2f90701bbcc`
- `Flipkart_gridlock.ipynb` | 1689726 bytes | `c81189e894d8`
- `frontend\.gitignore` | 521 bytes | `cfdbd5a321f3`
- `frontend\AGENTS.md` | 332 bytes | `ceaa13d29db2`
- `frontend\app\(app)\dashboard\page.tsx` | 18673 bytes | `333bb32d355e`
- `frontend\app\(app)\history\page.tsx` | 5722 bytes | `4b42845c6c4b`
- `frontend\app\(app)\layout.tsx` | 306 bytes | `efd322b8a2a3`
- `frontend\app\(app)\model\page.tsx` | 9604 bytes | `b6184deeb823`
- `frontend\app\(app)\predict\[id]\page.tsx` | 7996 bytes | `7c4f0751507f`
- `frontend\app\(app)\predict\page.tsx` | 5908 bytes | `ea916e0e68fb`
- `frontend\app\favicon.ico` | 25931 bytes | `2b8ad2d33455`
- `frontend\app\globals.css` | 5976 bytes | `efbfcd570ddc`
- `frontend\app\layout.tsx` | 1095 bytes | `221d1e6b567e`
- `frontend\app\page.tsx` | 24301 bytes | `bb55b03249df`
- `frontend\CLAUDE.md` | 12 bytes | `d631d88045f7`
- `frontend\components.json` | 614 bytes | `535e03f497b6`
- `frontend\components\map\BengaluruMap.tsx` | 3784 bytes | `764b20d9c7a6`
- `frontend\components\map\DynamicMap.tsx` | 178 bytes | `d0f4ba6dab34`
- `frontend\components\prediction\AnalysisPopup.tsx` | 15987 bytes | `dbad55583f68`
- `frontend\components\prediction\DemoScenarios.tsx` | 4782 bytes | `aa20fc57e429`
- `frontend\components\prediction\EventForm.tsx` | 9113 bytes | `951d57193d79`
- `frontend\components\prediction\PredictionSkeleton.tsx` | 785 bytes | `67bcd4925092`
- `frontend\components\prediction\ProbabilityChart.tsx` | 2153 bytes | `5d853311685b`
- `frontend\components\prediction\ResourcePanel.tsx` | 2821 bytes | `d6333a1c321d`
- `frontend\components\prediction\SeverityCard.tsx` | 3240 bytes | `1d5e98609222`
- `frontend\components\providers\SmoothScroll.tsx` | 496 bytes | `536bab675f88`
- `frontend\components\shared\GlowBorder.tsx` | 1490 bytes | `0ba912898061`
- `frontend\components\shared\Navbar.tsx` | 4075 bytes | `78bdb4c53e51`
- `frontend\components\shared\SeverityBadge.tsx` | 956 bytes | `bc414e02ed29`
- `frontend\components\typewriter-effect-demo-1.tsx` | 1129 bytes | `309c9251fb99`
- `frontend\components\ui\Aurora.css` | 57 bytes | `69d61bc21003`
- `frontend\components\ui\Aurora.tsx` | 5900 bytes | `bbe4d19ed7eb`
- `frontend\components\ui\badge.tsx` | 1977 bytes | `d28c229c3f41`
- `frontend\components\ui\button.tsx` | 3298 bytes | `77229b46b444`
- `frontend\components\ui\card.tsx` | 2733 bytes | `4bf8c82ad7de`
- `frontend\components\ui\input.tsx` | 1060 bytes | `aa7d45bfb5cf`
- `frontend\components\ui\label.tsx` | 538 bytes | `9662973c34f2`
- `frontend\components\ui\RoadGrid.tsx` | 1811 bytes | `0f44c1409d21`
- `frontend\components\ui\select.tsx` | 6856 bytes | `63be1491cc58`
- `frontend\components\ui\tabs.tsx` | 3579 bytes | `01e03ff649de`
- `frontend\components\ui\typewriter-effect.tsx` | 4064 bytes | `1535692939aa`
- `frontend\eslint.config.mjs` | 483 bytes | `275a07c13fc7`
- `frontend\lib\api.ts` | 765 bytes | `c481ad17e2cc`
- `frontend\lib\history.ts` | 771 bytes | `1927c87c9f5f`
- `frontend\lib\motion.ts` | 953 bytes | `357e10b53932`
- `frontend\lib\severity.ts` | 1943 bytes | `8387adc33424`
- `frontend\lib\utils.ts` | 172 bytes | `74a147991a11`
- `frontend\lib\validate.ts` | 976 bytes | `1ab8a8951751`
- `frontend\next.config.ts` | 109 bytes | `82ab7f8296fb`
- `frontend\package-lock.json` | 384116 bytes | `6370b3319cd3`
- `frontend\package.json` | 1116 bytes | `93d40348e83c`
- `frontend\postcss.config.mjs` | 101 bytes | `7b299d3d3b16`
- `frontend\public\favicon.svg` | 293 bytes | `c3fa0aca253a`
- `frontend\public\file.svg` | 391 bytes | `2b67812c325c`
- `frontend\public\globe.svg` | 1035 bytes | `b614b9bf1839`
- `frontend\public\model-charts\confusion_matrices.png` | 67247 bytes | `bdd5f2479ba6`
- `frontend\public\model-charts\distributions.png` | 241625 bytes | `a00f21206989`
- `frontend\public\model-charts\feature_target_correlation.png` | 86299 bytes | `a0d9121535e4`
- `frontend\public\model-charts\geo_clusters.png` | 204676 bytes | `2a80dac8cd46`
- `frontend\public\model-charts\lgbm_feature_importance.png` | 87577 bytes | `b6ac0b8d0b2f`
- `frontend\public\model-charts\missing_values.png` | 144526 bytes | `a71f4e177735`
- `frontend\public\model-charts\mlp_learning_curve.png` | 60702 bytes | `63283bb9a8a4`
- `frontend\public\model-charts\model_comparison.png` | 59047 bytes | `a4f962c64849`
- `frontend\public\model-charts\target_distribution.png` | 104587 bytes | `64e47ae49af1`
- `frontend\public\model-charts\temporal_overview.png` | 44517 bytes | `3c9f0474a51a`
- `frontend\public\next.svg` | 1375 bytes | `55995dfad6ec`
- `frontend\public\vercel.svg` | 128 bytes | `f081337b2fee`
- `frontend\public\window.svg` | 385 bytes | `644768c4aaeb`
- `frontend\README.md` | 1486 bytes | `3b3ed71ebf50`
- `frontend\tsconfig.json` | 700 bytes | `fbff01604d6c`
- `frontend\types\index.ts` | 1047 bytes | `a002e78180f4`
- `ml_sidecar\.dockerignore` | 68 bytes | `3a556046c4c8`
- `ml_sidecar\astram_models_bundle\confusion_matrices.png` | 67247 bytes | `bdd5f2479ba6`
- `ml_sidecar\astram_models_bundle\distributions.png` | 241625 bytes | `a00f21206989`
- `ml_sidecar\astram_models_bundle\feature_target_correlation.png` | 86299 bytes | `a0d9121535e4`
- `ml_sidecar\astram_models_bundle\geo_clusters.png` | 204676 bytes | `2a80dac8cd46`
- `ml_sidecar\astram_models_bundle\lgbm_feature_importance.png` | 87577 bytes | `b6ac0b8d0b2f`
- `ml_sidecar\astram_models_bundle\lgbm_model.txt` | 4143053 bytes | `0c4aa3c495d0`
- `ml_sidecar\astram_models_bundle\missing_values.png` | 144526 bytes | `a71f4e177735`
- `ml_sidecar\astram_models_bundle\mlp_learning_curve.png` | 60702 bytes | `63283bb9a8a4`
- `ml_sidecar\astram_models_bundle\model_comparison.png` | 59047 bytes | `a4f962c64849`
- `ml_sidecar\astram_models_bundle\tabnet_model.zip` | 496062 bytes | `ccf03d7c6c67`
- `ml_sidecar\astram_models_bundle\target_distribution.png` | 104587 bytes | `64e47ae49af1`
- `ml_sidecar\astram_models_bundle\temporal_overview.png` | 44517 bytes | `3c9f0474a51a`
- `ml_sidecar\astram_models_bundle\xgb_model.json` | 9652692 bytes | `62d4b23e77d1`
- `ml_sidecar\config.py` | 1203 bytes | `9b90ca7f03dc`
- `ml_sidecar\Dockerfile` | 440 bytes | `21f9c70b5949`
- `ml_sidecar\generate_pkl_models.py` | 14565 bytes | `e4cababe2e50`
- `ml_sidecar\loader.py` | 1742 bytes | `9615c6cddbf6`
- `ml_sidecar\main.py` | 1665 bytes | `6e3cd139bba7`
- `ml_sidecar\predictor.py` | 6657 bytes | `2479defdec0e`
- `ml_sidecar\requirements.txt` | 180 bytes | `7b097e84b7ba`
- `project_theme.txt` | 0 bytes | `e3b0c44298fc`
- `README.md` | 5003 bytes | `459ce366f27d`
- `ROADMAP.md` | 15050 bytes | `9c26b6bba30d`

## Refresh Notes

- Rerun `python tools/update_competitor_notes.py` after pulling/scraping updates.
- Compare this repo fingerprint and file hashes against `_repo_inventory.json` to detect changes.
- Treat README claims as unverified until the relevant code path or runtime behavior is checked.

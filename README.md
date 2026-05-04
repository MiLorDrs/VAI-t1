# VAI-t1 — Leaderboard

Static SPA replicating a "Leaderboard" UI: filter bar (year / quarter / category / search), top‑3 podium and a list of 100 employees with activity icons and an expandable "Recent Activity" panel.

## Stack

- Vite + React 19 + TypeScript (strict)
- Material UI v6 (+ MUI Icons)
- Sass (CSS Modules)
- Static mock data (no backend)

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build
npm run preview   # preview built app
npm run typecheck # tsc only
```

## Deploy (GitHub Pages)

Configured via `.github/workflows/deploy.yml`. Every push to `main` builds and deploys the `dist/` folder to GitHub Pages. The Vite `base` is `/VAI-t1/` — change it in `vite.config.ts` if you rename the repository.

Live URL after first successful deploy: `https://<owner>.github.io/VAI-t1/`

## Project structure

```
src/
  app/           # App, theme, layout
  components/    # reusable UI primitives
  features/
    filters/     # FilterBar + FiltersContext
    podium/      # Top‑3 podium
    leaderboard/ # List + Row + ExpandedActivities
  data/          # mock data generator + types + selectors
  hooks/         # shared hooks (useFilteredEmployees)
  styles/        # global styles + sass tokens
  main.tsx
```


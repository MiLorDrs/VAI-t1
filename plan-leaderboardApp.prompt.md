# Plan: Leaderboard SPA (Vite + React + MUI)

We will implement a static “Leaderboard” SPA based on the mockups: a filter bar (Year / Quarter / Category / Search), a top-3 podium, a list of 100 generated employees with activity icons, and one expandable card at a time with a Recent Activity table. Stack: Vite (latest) + React 19 + TS + MUI v6 + Sass + CSS Modules. Deployment to GitHub Pages via GitHub Actions. No linters/tests. Along the way, communication notes will be summarized in `report.md`.

---

## Stage 1. Project setup (setup)

1. **Init Vite + React-TS** in the repository root (`npm create vite@latest . -- --template react-ts`), clean up the default template.
2. **Install dependencies:** `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `sass-embedded`, `@fontsource/inter` (or Roboto). No lint/test packages.
3. **Configure `vite.config.ts`:** `base: '/VAI-t1/'` for GitHub Pages, alias `@/* → src/*`, `@vitejs/plugin-react` plugin.
4. **`tsconfig.json`:** strict, `noUncheckedIndexedAccess`, path aliases, target ES2022, jsx `react-jsx`.
5. **Directory structure** (without overengineering, without Redux):
    ```
    src/
      app/            // App.tsx, ThemeProvider, layout
      components/     // reusable UI (Avatar, IconWithCount, CategoryChip, RankBadge…)
      features/
        filters/      // FilterBar + FiltersContext
        podium/       // Podium + PodiumCard
        leaderboard/  // LeaderboardList + LeaderboardRow + ExpandedActivities
      data/           // mock generator + types (Employee, Activity, Category, …)
      hooks/          // useFilteredEmployees, etc.
      styles/         // _tokens.scss, _mixins.scss, global.scss
      assets/         // (if needed)
      main.tsx
    ```
6. **MUI theme** (`app/theme.ts`): palette (primary blue ≈ `#3B82F6`, gold `#F5C542`, silver `#C8CED6`, bronze `#A86B3D`, neutral text `#0F172A`, background `#F4F6F8`, surface white, light-blue divider), shape, Inter/Roboto typography.
7. **Global styles** `styles/global.scss` (reset, body bg, font smoothing) + sass color token variables (mirroring the theme for use in CSS Modules).
8. **README.md:** short description, scripts (`dev`, `build`, `preview`), GitHub Pages link, structure.
9. **GitHub Actions** `.github/workflows/deploy.yml`:
    - trigger: push to `main` + workflow_dispatch
    - jobs: setup-node 20 → `npm ci` → `npm run build` → upload artifact `dist` → `actions/deploy-pages@v4`
    - permissions: `pages: write`, `id-token: write`; environment `github-pages`.
10. **`.nojekyll`** in `public/` so Pages does not ignore `_assets`. Update `.gitignore` (add `dist`, `node_modules`).
11. **`report.md`:** create it with a short description of the document goal + the first bullet-point notes (task definition, clarifications, stack choices, phase agreements). Agreement: append to it after each new user message.

## Stage 2. Models and mock data

1. **Types** in `data/types.ts`: `Category = 'Education' | 'UniversityPartnership' | 'PublicSpeaking'`, `Activity { id, name, category, date: string, points }`, `Employee { id, name, role: 'Senior Software Engineer', departmentCode, avatarUrl, activities: Activity[] }`. (roles vary)
2. **Constants** in `data/constants.ts`: list of names (~40 first + 40 last for random combinations), pool of activity names by category, points pool (`[16, 32, 64, 128]`), departmentCode mask (`AB.C1.D2.E3` — generator from 2 uppercase letters + dot + letter+digit ×3).
3. **Generator** `data/generateEmployees.ts`:
    - 100 employees, seeded random (deterministic so the order does not change between renders; simple mulberry32).
    - For each: 1–25 activities in 2025 (Jan–Dec), random category out of 3, random date in 2025. That means there are no employees without activities.
    - Avatars: `https://i.pravatar.cc/150?img=<n>` or DiceBear (deterministic by id).
4. **Selectors/utils** `data/selectors.ts`:
    - `getTotalPoints(emp)` — sum of points
    - `getCategoryCount(emp, cat)` — number of activities
    - `getQuarter(date)` → 1..4
    - sort activities by date desc.

## Stage 3. Filter context

1. `features/filters/FiltersContext.tsx`: state `{ year: 'all'|'2025', quarter: 'all'|1|2|3|4, category: 'all'|Category, search: string }` + setters. `useFilters()` hook.
2. `hooks/useFilteredEmployees.ts` hook: applies filters to activities (year/quarter/category) → recalculates total → drops employees with total = 0 → filters by search (by name) → sorts by total desc → returns an array with recalculated `filteredActivities` and `filteredTotal`. Used by both the Podium and the list.

## Stage 4. UI — overall shell

1. **`App.tsx`**: ThemeProvider + CssBaseline + FiltersProvider + `<Layout>` (container max-width ~1200, responsive padding).
2. **Header** `features/header/Header.tsx`: H1 “Leaderboard” + subtitle “Top performers based on contributions and activity”.
3. **FilterBar** `features/filters/FilterBar.tsx`:
    - white card with shadow and border radius; flex-row on desktop, flex-column on mobile.
    - 3 `<Select>` (All Years, All Quarters, All Categories) + `<TextField>` Search with `<SearchIcon>` adornment.
    - Options from constants. Controlled by `useFilters`.

## Stage 5. UI — Podium

1. **`Podium.tsx`**: takes the top 3 from `useFilteredEmployees`, lays them out in the order [#2, #1, #3].
2. **`PodiumCard.tsx`** props: `employee`, `rank`, `size` (1 is larger).
    - Round avatar with border (gold/silver/bronze depending on rank), rank badge on the bottom-right.
    - Name (bold), Role (muted) under the avatar.
    - Star + total pill (star/text color: gold for #1, blue for #2/#3).
3. **`PodiumPedestal.tsx`**: colored “step” block with a large semi-transparent rank number (gold for 1, light-gray for 2/3), different heights.
4. **Responsive behavior:** on mobile — vertical stack (1, 2, 3), pedestal stretches like in the mock.
5. Edge case: if after filtering there are <3 employees — render only the available slots (gracefully).

## Stage 6. UI — Leaderboard list

1. **`LeaderboardList.tsx`**: renders a list (without virtualization — 100 rows is OK) of cards based on `useFilteredEmployees`. Stores local state `expandedId: string | null`. Passes `isExpanded` and `onToggle` into each row.
2. **`LeaderboardRow.tsx`**:
    - flex-row: [rank N] [avatar] [Name / Role] · spacer · [activity icons + counts] · [divider] · [⭐ TOTAL] · [chevron button].
    - White card, rounded corners, light shadow. When `isExpanded`: 1px blue border, chevron up.
    - **`ActivityIconGroup`** component: shows icon + count only for categories where count>0. Tooltip on the icon with the category name. Icons:
        - Education → `SchoolIcon`
        - University Partnership → `SentimentSatisfiedAltIcon` (smiley)
        - Public Speaking → `CoPresentIcon` (or `EventNoteIcon` — choose the closest icon to the mock “podium”)
    - **`TotalScore`**: ⭐ + number (blue, large).
3. **`ExpandedActivities.tsx`** (rendered under the row when expanded):
    - heading “RECENT ACTIVITY” (caps, muted).
    - 4-column table: Activity / Category / Date / Points. Category column — `<CategoryChip>` (pill, neutral background). Date format `DD-MMM-YYYY`. Points — `+N` in blue, right-aligned.
    - sort by date desc. Uses `filteredActivities`.
    - On mobile: horizontal table scroll (overflow-x:auto), like in the mock.

## Stage 7. Interaction logic

1. Podium and list react to filter changes instantly (shared hook).
2. Only one expanded item: change `expandedId` on chevron click; repeated click closes it.
3. On filter change — reset `expandedId` if that employee is no longer in the result set.
4. Tooltip on activity icons: “Education: 7”, “Public Speaking: 1”, etc.

## Stage 8. Responsive behavior and styles

1. Breakpoint ≈768. Below it — mobile layout: filter bar in a column, podium vertical, activity icons in the list card move under the name.
2. All component styles — CSS Modules (`*.module.scss`), shared tokens through sass `@use '@/styles/_tokens.scss' as t;`.
3. MUI `sx` — only for one-off adjustments (for example, a specific icon color).

## Stage 9. Verification and build

1. `npx tsc --noEmit` — fix all type errors.
2. `npm run build` locally — make sure the build passes, bundle size is reasonable, and `base` is correct.
3. [by user] `npm run preview` — visually compare against the mock: header, filters, podium, expand, mobile (via DevTools).
4. [by user] Push to `main` → verify the workflow passed and Pages deployment succeeded at `https://<user>.github.io/VAI-t1/`.
5. Update `report.md` (final note about successful deployment).

---

## Further Considerations

1. **Avatars:** use `https://i.pravatar.cc/150?img=N` 
2. **Public Speaking icon:** CoPresentIcon
3. **Repository name for `base`:** `VAI-t1` 

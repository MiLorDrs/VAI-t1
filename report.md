# Report: How this Leaderboard project was built with an AI agent

## Precondition

Before building the app itself, the user needed a way to prepare mock screenshots without exposing real data. For that reason, the user asked the AI assistant to prepare a browser DevTools helper function that accepts a list of class names (or class-name prefixes) and replaces the visible content with mock placeholders — both for text nodes and for images.

Example usage:

```js
replaceContent(["podiumAvatar", "podiumName", "podiumRole", ...]);
```
Code intentionally omitted.

## 0. Goal

Replicate a Leaderboard application from PNG mockups using Vite + React 19 + TypeScript + MUI + Sass + CSS Modules, deployed to GitHub Pages. No backend, no linters, no tests.

This file captures the **process** of collaborating with an AI coding agent to build the Leaderboard SPA. It does **not** contain the plan or the source code itself — only the meta-flow: which prompts were sent, which decisions were made, and in what order. Use it as a recipe: send the same kinds of messages in the same order to reproduce the result.

---

## 1. Initial brief sent to the agent

The first user message defined the task. Key elements that should be included in your own opening prompt:

- **Goal**: full functional copy of a Leaderboard app, visually matching the mocks (not pixel-perfect).
- **Source of truth**: PNG mockups attached / placed in `mock design/`.
- **Stack**: Vite (latest) + React + MUI + TypeScript + Sass + CSS Modules; latest browsers; no tests, no linters.
- **Deploy target**: GitHub Pages — request that GitHub Actions and the `base` path be configured up front.
- **Workflow request**: ask for the work to be split into 3 phases:
    1. Scaffolding (build setup, GitHub Actions, README).
    2. UI + functionality, broken into small tasks.
    3. Verification (typecheck, build) and fixes.
- **Domain rules** to spell out explicitly:
    1. Mock data only — generate ~100 records (no hardcoded JSX).
    2. Roles like *Senior Software Engineer* with department codes (`AB.C1.D2.E3`).
    3. `TOTAL = Σ points per activity`.
    4. Three activity categories with distinct icons + tooltips: Education, University Partnership, Public Speaking.
    5. Filtering on the client (affects podium and list both).
    6. Only one expanded row at a time.
- **Process artefact**: ask the agent to also maintain a `report.md` summarising the communication concisely (this file).
- **Escape hatch**: tell the agent to ask questions instead of guessing.

## 2. Clarification round before planning

The agent first asked targeted clarifying questions. Recommended areas to confirm before any code is written:

- Whether the agent can read the image mocks; if not, attach them to the chat or describe them in text.
- Date range and filter presets (here: only 2025; presets `all` / `2025`, `All Quarters` / `Q1`-`Q4`, plus the three categories).
- How department codes are generated (random per spec).
- Sort rules (employees by total desc, their own activities by date desc; static data).
- GitHub Pages base path / repo name.
- Stack version pins (everything latest).
- Whether to enforce a project-wide style guide (skipped here — clean defaults).
- Whether Redux is needed (no — props + a small context were enough).
- Confirm that `report.md` is **bullet-style notes**, not a verbatim transcript.

## 3. Plan request and saving the plan

After clarifications, the agent produced a step-by-step plan covering:

1. Project setup + GitHub Actions + README.
2. UI implementation in small subtasks (data layer → context → filter bar → podium → list/row → expanded panel → responsive styling).
3. Verification (typecheck, build) and fixups.

Tip: ask the agent to **save the plan as a separate `plan-*.prompt.md` file** so it can be refined and reused as a working document.

## 4. Implementation phase

Single user instruction: *"implement the plan; ask if questions arise"*. The agent then proceeded autonomously through all stages of the plan, creating files in this order:

1. Build config: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `vite-env.d.ts`, `.gitignore`, `public/.nojekyll`.
2. CI/CD: `.github/workflows/deploy.yml` (Pages via `actions/deploy-pages`).
3. README.
4. Styles foundation: `styles/_tokens.scss`, `styles/global.scss`, MUI theme.
5. Data layer: `data/types.ts`, `data/constants.ts`, deterministic `generateEmployees.ts`, `selectors.ts`.
6. Filters: `FiltersContext.tsx`, `FilterBar.tsx` + module SCSS.
7. Hook `useFilteredEmployees.ts` powering both the podium and the list.
8. Reusable UI: `ScorePill`, `CategoryChip`, `ActivityIconGroup`, tiny `clsx` helper.
9. Podium: `PodiumCard`, `Podium` + module SCSS.
10. List: `LeaderboardRow`, `ExpandedActivities`, `LeaderboardList` + module SCSS.
11. App shell: `App.tsx`, `App.module.scss`, `main.tsx`.

## 5. Verification phase

After implementation, the agent ran:

- `npm install` (added `@types/node` afterwards because `vite.config.ts` uses `node:path`/`node:url`).
- `npm run typecheck` — clean.
- `npm run build` — clean (≈ 438 KB JS / 18 KB CSS, gzip ≈ 140 KB / 3 KB).

## 6. Hand-off to the user

The user is responsible for:

- Locally running `npm run dev` / `npm run preview` for visual review against the mocks.
- Pushing to `main` so the GitHub Actions workflow deploys to Pages.

## 7. Plan re-check

User asked the agent to *"step through the plan again and verify every instruction is implemented"*. The agent produced a per-stage checklist mapping each plan bullet to its file. Three minor deviations were flagged (Header, Pedestal, TotalScore inlined instead of split into separate files); user accepted them.

## 8. Visual review round 1 (8 fixes)

After running the app locally the user listed 8 visual tweaks:

1. Podium pedestals → gradient + inset shadow, darker silver.
2. Empty filter result → info icon + text *"No activities found matching the current filters."*
3. Search input → clear (`×`) icon inside.
4. Podium card → append department code in parentheses after the role.
5. Activity icon counters in the list row → blue.
6. Hover state on rows inside the RECENT ACTIVITY table.
7. Mobile: remove the large gap under the filters; podium order `1‑2‑3` instead of `2‑1‑3`.
8. Mobile rows: replace the TOTAL block with just the toggle, no divider, items pushed to the edges.

Agent applied all eight; build clean.

## 9. Visual review round 2 (regressions)

User flagged that some round-1 items did not land:

- POINTS column inside the expanded table was still grey — fixed by raising selector specificity (`.table .pointsCell`).
- Mobile filter bar: the search field was stretching vertically because `flex: 1 1 280px` grows in a column container — reset to `flex: 0 0 auto`.
- Mobile row layout did not match the mock — reworked into a two-row CSS Grid (top: rank + avatar + name/role; bottom: icons left, chevron right).

## 10. Visual review round 3

- Restored a horizontal divider between the two mobile rows (1px grid track + `::before`).
- Removed `min-width: 520px` from the activity table; added `min-width: 320px` on `html/body/#root`.
- Added the department code (unit) to the mobile card and allowed name/role to wrap by words.

## 11. Performance pass — React Compiler

User asked to try the React 19 compiler. Agent installed `babel-plugin-react-compiler` as a dev dependency and wired it into `@vitejs/plugin-react` (`babel.plugins`, `target: '19'`). Build still clean; bundle grew ~6 KB (gz +2 KB) in exchange for automatic memoisation across the tree.

---

## How to reproduce the same result

In short, send the agent these messages in this order:

1. **Brief** (stack, scope, domain rules, mocks, deploy target, three-phase workflow, ask for `report.md`).
2. **Answer the agent's clarifying questions** explicitly.
3. **Ask the agent to save the plan** as a standalone `plan-*.prompt.md`.
4. **Tell the agent to implement the plan** and to ask questions when in doubt.
5. **Ask the agent to re-check the plan** once implementation is done.
6. **Iterate on visual tweaks** in small batches against the mocks (expect 2-3 review rounds — selector specificity, flex-in-column pitfalls, and mobile layout details usually need a second pass).
7. **Push to `main`** so GitHub Actions deploys to Pages.

This file will be updated whenever new instructions or decisions are added to the project.



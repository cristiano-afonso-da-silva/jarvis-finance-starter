# Lesson 3 — JARVIS Allowance Controller

All prompts and student instructions are in this one file. Open `PROMPTS.md` after cloning the repository.

## How to follow along

1. Open the cloned folder in VS Code. Use the existing `npm install` / `npm run dev` workflow.
2. Copy the WHOLE fenced prompt for the stage your teacher names. Replace square-bracket placeholders with your choices.
3. Paste it into Copilot Chat with the repository available as context. Review the proposed files before accepting edits.
4. Test the checkpoint in the browser. Move on only after the current stage works.
5. Use Prompt 07 when stuck and Prompt 08 to review/save each checkpoint.

Prompt 00 builds the starter AND its colour controls together. Prompt 02 customises them; it is not where colour switching first appears. A runnable first-stage version is included as a fallback. If it already exists, Prompt 00 adapts it to your settings instead of deleting data or rebuilding the framework. Do not paste all stages at once. The initial page should have a HUD, colour controls and ledger; charts, targets and the advisor are later additions.

Use fictional transactions. Never paste an API key into a prompt. The teacher configures live AI; default mock mode is a fixed example, not a real model analysis.

## Prompt 00 — Generate the starter, including colour controls

When: 8–18 minutes.

```text
You are my coding tutor. Help me build the first stage of a secondary-school project called "JARVIS Allowance Controller". Implement the files in this repository, rather than only describing what I could build.

MY SETTINGS
- App name: [MY APP NAME, or use JARVIS Allowance Controller]
- Default accent: [MY HEX COLOUR, or use #56dcff]
- All website text, sample data, labels, validation errors, accessibility labels and AI responses must be English. Use a mature tone.

FIRST INSPECT THE REPOSITORY
Read package.json, src/App.tsx, src/money.ts, src/types.ts, the components and server.mjs. Keep React, TypeScript and the existing development server. Keep the npm install / npm run dev workflow. Do not overwrite the previous timetable project, replace the framework, remove PROMPTS.md, or expose secrets. If the first-stage UI already exists, refine it using my settings and check it against the requirements below. Preserve saved transactions and existing working logic.

BUILD ONLY THIS FIRST STAGE
1. Create an original futuristic HUD using CSS and SVG: dark background, glowing concentric rings, fine circuit lines and a restrained rotating core. Display the actual available balance and transaction count. Do not use cartoon characters, coins, rockets, external images, sound or voice features. Decorative motion must never imply a live AI connection.
2. Include working colour controls NOW, as part of this starter: Cyan #56dcff, Violet #b896ff, Amber #ffbd66 and Emerald #7ce8b0, plus a native custom colour picker. Store a validated hex colour in localStorage, restore it after reload and apply it through one CSS variable, --accent. ThemeControls.tsx owns the colour state. Keep body text and warnings readable even with a dark custom accent; retain words and signs for income/expense, not colour alone.
3. Provide an income/expense form and a transaction table with date, item, category, type, amount and Edit/Delete controls. Categories are Food, Transport, Learning, Entertainment and Other. Use Transaction {id, date, item, kind, cents, category}; kind is income or expense, and cents is an integer.
4. On the first visit only, seed one income named Allowance for $100, dated today. Do not add another $100 on every reload. Use localStorage for the ledger. Include create, read, update and delete. Reject blank items, invalid dates, zero/negative/non-numeric amounts, more than two decimal places and changes that make the total balance negative. Reuse parseCents and balance instead of duplicating calculations. Do not silently translate or delete the student's existing transaction text.
5. After successfully adding a $50 expense, show EXPENSE LOGGED, -$50.00 and $100.00 → $50.00 in a short confirmation scan. Income uses INCOME LOGGED and a plus sign. Failed submissions must not look successful. Edits, deletions and reloads must not replay a new-payment confirmation. Respect prefers-reduced-motion and support a 390px-wide screen.
6. Leave Charts.tsx, Goal.tsx and Advisor.tsx as compiling return-null placeholders with TODO(STUDENT-CHART), TODO(STUDENT-GOAL) and TODO(STUDENT-AI). App may pass rows to them, but do not implement or display charts, targets or the advisor yet.
7. Preserve the teacher-provided /api/classify endpoint, mock/live separation, .env.example and .gitignore. No login, bank connection, database or real payments. Do not access .env contents or place keys in browser code or VITE_ variables.

FINISH
Explain Input → Process → Output for one logged transaction. List changed files and any unmet requirement. Run npm run build and npm test, fix relevant failures, then give manual checks: first balance $100; expense $50 gives $50; reload preserves the ledger and chosen colour; editing does not double-charge; an invalid expense does not change the balance. Stop after this stage.
```

## Prompt 01 — Understand the transaction flow

When: 18–30 minutes.

```text
Act as a coding tutor. Explain the current implementation without changing any files.
Read src/App.tsx, src/money.ts, HudCore.tsx and ThemeControls.tsx. Trace one $30 expense using Input → Process → Output: form fields, parseCents, validation, rows, balance, localStorage and HUD confirmation. Explain why $30 is stored as 3000 cents and why changing a displayed number is different from saving a transaction. Identify the three placeholder components for later stages. Use clear English for a secondary-school student; refer to actual functions in this repository. Do not read or reveal .env values.
```

## Prompt 02 — Personalise the existing colour system

When: 30–40 minutes.

```text
Customise only the first-stage interface. My app name is [NAME] and I want to replace the [PRESET NAME] preset with [NEW NAME] / [#HEX].
Inspect App.tsx, ThemeControls.tsx and style.css. Keep the custom colour picker, four presets, localStorage persistence and shared --accent variable. Update the name and selected preset, including its accessible label. Explain colour state → --accent → HUD/buttons. Keep body text and warnings readable; do not change transactions, amounts, categories, parsing or storage keys. All website text must remain English.
Make the smallest relevant patch, list changed files, run npm run build, and give three checks: selected colour persists after reload; the 390px layout stays within the viewport; logging/editing an expense still calculates the same balance. Do not add charts, goals or AI yet.
```

## Prompt 03 — Add the spending bar chart

When: 40–56 minutes.

```text
Implement only TODO(STUDENT-CHART) in src/components/Charts.tsx. Preserve the HUD, theme controls and transaction logic. Use the installed Recharts package; do not replace the framework.
Accept rows: Transaction[] as the source of truth. Add a Week/Month selector and reference-date input, defaulting to today and Week. Use periodRows(rows, referenceDate, mode): a week is Monday–Sunday; a month is the selected calendar month. Use categoryTotals to aggregate EXPENSES ONLY. Chart amounts are dollars, converted from integer cents. Never include income or hard-code chart totals; derive data from props so create/edit/delete updates it.
Start with a responsive bar chart: category axis, dollar axis, tooltip and a readable text summary. Use an outer container with height:300px and ResponsiveContainer. Use var(--accent) for the bars, readable axis/tooltip colours and a clear English empty state when the period has no expenses. Disable chart entrance animation or ensure final bars appear reliably. Handle an empty reference date without crashing. Do not implement the goal or advisor.
Explain Input → Process → Output, make the patch, and run npm run build. Verify: one Allowance income $100, Lunch expense $30 in Food and Game subscription expense $20 in Entertainment produce TWO bars, $30 and $20, and total expenses $50. Income is excluded. Editing $20 to $25 updates the chart; selecting a period with no expenses shows the empty state. Keep every UI string in English.
```

## Prompt 03B — Optional pie chart

When: Only if your teacher says there is time.

```text
Extend only the working Charts.tsx with a Bar/Pie selector. Reuse exactly the same filtered category-expense data for both views. Use PieChart, Pie, Cell, Tooltip and Legend, with readable category/amount labels and distinct segment colours. Keep the bar view as the default. When total expenses are zero, show the empty state instead of drawing a zero-value pie. Do not change ledger, targets or AI.
Verify Food $30 and Entertainment $20 correspond to 60% and 40% of EXPENSES $50, not percentages of income $100. Check the chart after edit/delete and at 390px width. Keep all labels English and run npm run build.
```

## Prompt 04 — Add the savings target

When: 56–69 minutes.

```text
Implement only TODO(STUDENT-GOAL) in src/components/Goal.tsx. Preserve all existing modules and ledger calculations.
Add a target name, positive target amount, Week/Month selector and reference date. Default the target to Weekly savings / $30. Store and restore the target name and integer cents in localStorage with validation. Use periodRows and balance to compute net savings = income minus expenses IN THE SELECTED PERIOD. Do not use the all-time wallet balance as period savings. Setting a target must not create a transaction or deduct money.
Display the true net amount, target, remaining amount and progress bar. Clamp only the bar percentage to 0–100%; keep negative net amounts visible. Show TARGET IN PROGRESS or TARGET ACHIEVED as text, not colour alone. Use a brief HUD confirmation on a transition from not met to met; do not replay it just because the page reloads. Respect reduced-motion preferences. Use --accent; no cartoon rewards or spending incentives. All labels/errors must be English.
Explain the difference between available balance, period net savings and progress, implement the smallest patch, and run npm run build. Check: this week's income $100 and expenses $50 give net savings $50; a target $80 gives 62.5% and remaining $30; target $30 gives a capped 100% but still displays net $50. Move the income to the previous week: total wallet stays $50, current-week net becomes -$50. Restore today's date after testing. Reject a zero/negative target, persist it after reload, and keep transactions unchanged.
```

## Prompt 05 — Add the decision advisor

When: 69–84 minutes.

```text
Implement only TODO(STUDENT-AI) in src/components/Advisor.tsx. Use the existing teacher-provided POST /api/classify endpoint; do not add another provider or replace server.mjs. Keep the website and all generated advice in English.
Let the student select one EXPENSE from rows, enter up to 500 characters of purpose/existing alternatives, and choose an initial Need/Want/Unsure judgment before clicking Analyse spending. Send only {item, cents, context}; never send the whole ledger, identity, bank details or an API key. The server owns the key in .env, never browser code or VITE_ variables. Preserve the server's English-only system instruction and response schema.
Show loading, disable duplicate submissions, use a 20-second client timeout and show a clear English error with retry. Validate mode is mock/live, label is need/want/unsure and reason/question/alternative are strings. Lock the selected transaction and context while a request is pending, or reject stale results. Clear the previous analysis when the selection/context changes. Handle no expenses and a removed transaction without crashing.
For mode:mock, visibly show "MOCK MODE — fixed example, not connected to AI". For mode:live, show "LIVE AI RESPONSE". Never silently turn a failed live request into a mock success. Mock checks the interface, not the model's judgment.
Display the label, reason, follow-up question and alternative. Needs support health, safety, basic living or necessary learning; wants are extras/upgrades/postponable choices. Context matters; insufficient information should produce Unsure and a question. AI advice must not claim certainty, invent facts or force a purchase decision.
Let the student keep/change their own final judgment and save "I agree/disagree because..." separately from AI advice, keyed by transaction id in localStorage. Restore the reflection when returning to that transaction. Do not change amounts, categories, chart data or targets.
List changed files and run npm run build. Verify mock is labelled honestly; selecting another expense clears old advice; failures leave the ledger unchanged; the student's reflection survives reload. Only the teacher enables live mode after configuring and testing a valid key/model. Do not read or print secrets.
```

## Prompt 06 — Verify the finished project

When: 84–90 minutes.

```text
Review the completed project against the following acceptance checks. Do not add new features or rewrite working modules.
- All website labels, validation errors, accessibility text, sample transactions and AI replies are English.
- Today: one Allowance income $100; Lunch expense $30 in Food; Game subscription expense $20 in Entertainment. Wallet = $50. Chart = Food $30 / Entertainment $20; income excluded.
- This week's target $80: net savings $50, progress 62.5%, remaining $30. Setting a target does not deduct money.
- Create/edit/delete update every relevant display. Empty/zero/negative/overprecision/insufficient-balance inputs are rejected without changing the ledger.
- Reload preserves transactions, accent, target and reflection. The starter colour controls remain usable on a 390px viewport.
- Mock and live are distinguished. No secret enters browser code or Git. AI errors do not change transactions. A student may disagree and keep a separate reason.
Run npm run build and npm test. Report passed checks, failures and anything not actually verified. Propose only minimal fixes for failures. Never claim a real AI call succeeded unless it was actually tested; never read or print .env values.
```

## Prompt 07 — Debug one issue

When: Whenever needed.

```text
Help me debug ONE issue in this repository.
Expected: [WHAT SHOULD HAPPEN]
Actual: [WHAT HAPPENS]
Error: [EXACT ERROR TEXT, WITH SECRETS REMOVED]
Relevant file/function: [PATH / FUNCTION]
Reproduction: [STEPS]
Inspect only the relevant code first. Explain the most likely cause, suggest one quick way to verify it, then make the smallest fix. Preserve the HUD, colour controls, ledger and completed modules. Do not replace the framework, remove PROMPTS.md or reveal secrets. Run the relevant check and provide three manual test steps. Keep all website text English.
```

## Prompt 08 — Review and save a checkpoint

When: After each successful stage.

```text
Help me review and save this lesson checkpoint without changing functionality.
Inspect the current diff and git status. Summarise relevant changed files. Confirm .env and node_modules are ignored; do not read any secret values. Run npm run build and npm test and report their real outcomes. Suggest a concise commit message for this stage and show the exact normal Git commands needed to stage only intended files and commit. Do not force-push, reset history or publish anything. Explain that Git saves source code, while browser localStorage is a separate store. Keep PROMPTS.md in the repository.
```

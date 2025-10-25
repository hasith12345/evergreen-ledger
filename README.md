# EvergreenLedger

EvergreenLedger is a Next.js (App Router) demo application for managing tea-leaf supplier intake, payroll, procurement, and suppliers. It uses React client components, Tailwind CSS utilities, and a small set of UI primitives.

This README is written for both local developers and remote viewers (for example, when browsing the repository on GitHub or visiting the live site on Vercel).

Live demo: https://evergreen-ledger.vercel.app/

---

## Quick start (local development)

Clone the repository and open the project folder that contains `package.json` (the app root). Use the commands below from a terminal of your choice.

```bash
git clone <your-repo-url>
cd evergreen-ledger
cd evergreen-ledger   # if your repo has a nested folder; otherwise stay in the folder with package.json
npm install
npm run dev
```

Open http://localhost:3000 in your browser. The app uses the Next.js dev server and will hot-reload on changes.

For a production-style local run:

```bash
npm run build
npm start
```

Notes for Vercel viewers
- The repository is deployed to Vercel at: https://evergreen-ledger.vercel.app/
- Vercel automatically deploys on pushes to the configured branch (usually `main` or the branch you connected). To re-deploy, push commits or trigger a redeploy through the Vercel dashboard.

---

## Project layout (short)

- `app/` — Next.js App Router pages and route handlers
- `components/` — shared components (Card, Button, Dialog, Sidebar, Weather, etc.)
- `styles/` — Tailwind and global styles
- `public/` — static assets (logo.png, background.jpg)

Important files to edit:
- `app/page.tsx` — Login screen UI/UX
- `app/procurement/page.tsx` — Procurement form
- `app/suppliers/page.tsx` — Suppliers list and local persistence
- `components/sidebar.tsx` — Sidebar (weather widget placement)
- `components/weather.tsx` — Weather fetching (Open‑Meteo)
- `styles/globals.css` — Global styles and custom keyframes

---

## Features (implemented)

- Login screen: enhanced UI (show/hide password, demo credentials, password strength)
- Forgot Password dialog (client-side simulation)
- Suppliers CRUD in the UI with localStorage persistence
- Bank dropdown (Select) and delete confirmation Dialog
- Toaster notifications mounted in `app/layout.tsx`
- Payroll: centered success modal with animated checkmark
- Procurement: gross/net weight calculation using moisture
- Sidebar: theme, logout CTA, and weather widget; weather saves hourly humidity to localStorage

---

## Vercel-specific notes (important for viewers)

- Deployment: Vercel automatically builds and deploys the Next.js app. Environment variables (if any) should be set in the Vercel dashboard. This demo currently uses no secret API keys for the weather service (Open‑Meteo).
- Logs: Use the Vercel dashboard to inspect build and runtime logs for failed deployments.
- Revert / rollback: Vercel provides the ability to rollback to a previous deployment from the dashboard.

---

## Troubleshooting

- Hydration mismatch warnings: These happen when server-side rendered HTML differs from the client render. Common causes in this project are direct calls to `localStorage` or date/time/random values during render. Fix by moving client-only code into `useEffect` or render it after mount.
- Missing `dev` script or wrong folder: Ensure you run `npm run dev` in the folder that contains `package.json` (the app root). If you cloned a repository with a nested folder, navigate into the inner `evergreen-ledger` folder first.
- Tailwind build issues: If you change `globals.css` or tailwind config, restart the dev server.

---

## Contributing & next steps

- Add a backend: create `app/api` routes or a separate server for persistent storage.
- Replace demo social login buttons with OAuth providers (NextAuth.js or custom flows).
- Improve accessibility: keyboard flows for dialogs and focus management.

If you want, I can add a `CONTRIBUTING.md`, a short PowerShell/bootstrap script, or a `LICENSE` file. I can also add deployment notes specific to your Vercel project (e.g., recommended environment variables or redirects).

---

Thanks for working on EvergreenLedger — the app is already live on Vercel at https://evergreen-ledger.vercel.app/. If you want me to add a Vercel badge, CI steps, or a CONTRIBUTING guide, tell me which and I'll add it.
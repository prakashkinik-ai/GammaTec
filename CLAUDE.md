# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Gamma Technical College** — a full-stack demo app for a Webex Contact Center AI Agent (ARIA) demo. Two services in a Railway monorepo:

- **Frontend** (`frontend/`): React + Vite + Tailwind CSS public college website + `/admin` CRM dashboard
- **Backend** (`backend/`): Node.js + Express REST API backed by SQLite (`better-sqlite3`)

The backend is designed to be called by a Webex CC AI Agent (ARIA) via HTTP Action nodes to look up synthetic student records and update phone numbers during live demos.

## Commands

### Backend
```bash
cd backend && npm install
cd backend && node server.js          # Start API on port 3000
```

### Frontend
```bash
cd frontend && npm install
cd frontend && npm run dev             # Dev server (requires VITE_API_URL env var)
cd frontend && npm run build           # Production build → dist/
```

### Deployment
```bash
# Set RAILWAY_TOKEN before deploying
railway up                             # Deploy both services from project root
```

## Architecture

### Backend (`backend/`)

- `server.js` — Express entry point; mounts routes, enables CORS for all origins
- `db/init.js` — SQLite schema creation + seed (checks for empty table before seeding 20 students + 13 tickets)
- `db/gammatc.sqlite` — auto-created on first run; gitignored
- `routes/customers.js` — student lookup by name/phone/program/status/ID, phone PATCH
- `routes/tickets.js` — ticket lookup/filter by status/type/priority, status PATCH
- `routes/stats.js` — summary counts endpoint

Phone updates write to both `students` and `phone_history` tables. The `phone_history` table enables the phone-update demo scenario for ARIA.

**Key API endpoints:**
- `GET /customers?name=Marcus` — case-insensitive partial match
- `GET /customers?phone=5083347812` — strips non-digits before matching
- `GET /customers/:id` — returns student + joined ticket (if any)
- `PATCH /customers/:id/phone` — body `{ "phone": "(508) 111-2222" }`
- `GET /tickets/status/Open` — filter by Open | In+Progress | Resolved
- `GET /stats` — aggregate counts for the admin dashboard
- `GET /health` — uptime + record counts

### Frontend (`frontend/src/`)

- `App.jsx` — React Router v6 routes for all pages
- `components/AriaWidget.jsx` — floating chat bubble (bottom-right), keyword-matched canned responses only (not AI-powered)
- `pages/` — 7 public pages (Home, Programs, Admissions, FinancialAid, CampusServices, About, Contact) + Admin
- `pages/Admin` (or similar) — `/admin` route with student table, inline phone edit, Kanban ticket board, stats bar, API log panel

The `/admin` route is not linked from the public nav. It is the primary demo surface for the Webex CC integration.

### Environment Variables

Backend:
```
PORT=3000
NODE_ENV=production
DB_PATH=./db/gammatc.sqlite
```

Frontend:
```
VITE_API_URL=https://<backend-railway-url>
```

### Railway Deployment

Two `railway.toml` files — one in `backend/` (start: `node server.js`) and one in `frontend/` (build: `npm run build`, start: `npx serve dist -p $PORT`). Root `railway.toml` sets builder to nixpacks.

After deploying, set `VITE_API_URL` in the Railway dashboard for the frontend service and redeploy frontend.

## Key Demo Data

All 20 student IDs follow the pattern `GTC1XXXXX`. Tickets follow `TKT-XXXX`. Student emails follow `firstname+randomdigits@students.gammatc.edu`. All data is synthetic — for demo only.

Notable records for demo scenarios:
- **GTC100023 Marcus Rivera** — Open/High IT ticket (Canvas login loop)
- **GTC100047 Priya Nair** — In Progress/Medium Financial Aid ticket (MassGrant Plus not disbursed)
- **GTC100167 Carlos Gutierrez** — Open/High ticket (tuition hold blocking registration)
- **GTC100309 Jordan Williams** — Open/High IT ticket (Navigate portal Account Inactive)

FAFSA school code: **009743**. MA transfer program: MassTransfer. Accreditation: NECHE.

# CLAUDE.md — Gamma Technical College
## Full-Stack Website + ARIA Customer API
### Built for: Webex CC AI Agent Demo · Worcester, MA

---

## 🎯 Project Overview

Build a production-ready full-stack application for **Gamma Technical College** that serves two purposes:

1. **Public-facing college website** — modeled after Gwinnett Technical College (gwinnetttech.edu), localized to Worcester, MA. Showcases programs, admissions, financial aid, campus services, and ARIA the AI assistant.
2. **ARIA Customer API** — a REST API backend containing a synthetic student/patron database with service tickets, used as a live data source for the **Webex Contact Center AI Agent (ARIA)** during demos.

The entire app deploys to **Railway** as a single monorepo with two services: `frontend` (React/Vite) and `backend` (Express API).

---

## 🏗️ Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend | React + Vite + Tailwind CSS | Fast, Railway-ready, familiar pattern |
| Backend | Node.js + Express | Lightweight REST API |
| Database | SQLite via `better-sqlite3` | Persistent phone edits survive restarts |
| Routing | React Router v6 | Multi-page site navigation |
| Styling | Tailwind CSS + custom CSS vars | Consistent design system |
| Deployment | Railway (monorepo) | Single `railway up` from project root |
| API Format | REST + JSON | Compatible with Webex CC HTTP Action nodes |

---

## 📁 Directory Structure

```
gammatc/
├── CLAUDE.md                        ← This file
├── railway.toml                     ← Railway monorepo config
├── package.json                     ← Root scripts only
│
├── frontend/                        ← React/Vite college website
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── HeroSection.jsx
│       │   ├── ProgramCard.jsx
│       │   ├── AriaWidget.jsx       ← Floating ARIA chat bubble
│       │   └── AnnouncementBanner.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Programs.jsx
│           ├── Admissions.jsx
│           ├── FinancialAid.jsx
│           ├── CampusServices.jsx
│           ├── About.jsx
│           └── Contact.jsx
│
└── backend/                         ← Express REST API
    ├── package.json
    ├── railway.toml
    ├── server.js                    ← Entry point
    ├── db/
    │   ├── init.js                  ← SQLite schema + seed
    │   └── gammatc.sqlite           ← Auto-created on first run
    ├── routes/
    │   ├── customers.js
    │   ├── tickets.js
    │   └── stats.js
    └── data/
        └── seed.js                  ← 20 synthetic student records
```

---

## 🖥️ Frontend — College Website

### Design Direction
- **Color palette:** Deep navy `#1B3A6B` + teal `#0E7490` + white, with amber `#F59E0B` accents
- **Typography:** `Fraunces` (display headings) + `DM Sans` (body) — load from Google Fonts
- **Style:** Clean, institutional, accessible — inspired by gwinnetttech.edu but distinctly Gamma TC
- **Responsive:** Mobile-first. All pages work at 375px and 1440px widths
- **Tone:** "Career-focused education for real-world jobs" — warm, direct, achievement-oriented

### Pages

#### `/` — Home
- Hero section: large headline "Career-Focused Education for Real-World Jobs" with CTA buttons (Apply Now, Explore Programs, Schedule a Tour)
- Stats bar: 70+ Programs · 10,000+ Graduates · Worcester & Shrewsbury Campuses · 96% Job Placement
- Featured programs grid (6 cards): Nursing, Cybersecurity, Business Administration, Welding Technology, Early Childhood Education, HVAC/R
- "Why Gamma TC" section: 4 value props (Affordable, Flexible, Career-Ready, Supported)
- News/spotlight cards (3): pulled from static data
- ARIA floating chat widget (bottom right corner — see AriaWidget spec below)

#### `/programs` — Programs of Study
- Filter bar: All · Health Sciences · IT · Business · Trades · Criminal Justice · Early Childhood
- Program cards grid showing: name, credential type (AAS/Diploma/Certificate), duration, career outcomes
- Each card links to a detail modal with: description, requirements, tuition estimate, advisor contact

**Programs to include:**
| Program | Type | Division |
|---|---|---|
| Nursing — ADN | AAS | Health Sciences |
| Medical Assisting | Certificate | Health Sciences |
| Dental Hygiene | AAS | Health Sciences |
| Surgical Technology | AAS | Health Sciences |
| Health Information Technology | AAS | Health Sciences |
| Cybersecurity | AAS | Information Technology |
| Network Administration | AAS | Information Technology |
| Computer Information Systems | AAS | Information Technology |
| Web Development | Certificate | Information Technology |
| Data Analytics | Certificate | Information Technology |
| Business Administration | AAS | Business |
| Accounting Technology | AAS | Business |
| Welding Technology | Diploma | Trades |
| Electrical Technology | AAS | Trades |
| HVAC/R Technology | Diploma | Trades |
| Automotive Service Technology | Diploma | Trades |
| Early Childhood Education | AAS | Early Childhood |
| Criminal Justice Technology | AAS | Criminal Justice |
| Emergency Medical Services | Certificate | Public Safety |

#### `/admissions` — Admissions & Enrollment
Accordion-style FAQ layout. Sections:
- How to Apply (steps 1–6 with CTA)
- Admission Requirements (standard + program-specific table)
- Placement Testing (Accuplacer — who needs it, exemptions, schedule link)
- New Student Orientation (formats: in-person + GammaStart online)
- Dual Enrollment (eligibility, cost, process)
- Transfer Credit Policy (MassTransfer block callout)
- Application Deadlines table (Fall/Spring/Summer)
- CTA: Apply button → `https://gammatc.edu/apply` (placeholder)

#### `/financial-aid` — Financial Aid & Tuition
- Aid types table (Pell, MassGrant, MassGrant Plus, Loans, Work-Study, Foundation Scholarships, Military TA)
- Tuition rate table (MA Resident · NEBHE · Out-of-State · Dual Enrollment)
- FAFSA step-by-step walkthrough with school code callout: **009743**
- MassGrant Plus qualifying programs list
- Payment plan explainer ($35 fee, 3 installments, no interest)
- Scholarship section with types and award ranges
- Military benefits section (GI Bill, Yellow Ribbon, MyCAA)

#### `/campus-services` — Campus Services
Card grid layout:
- 📚 Library (Merriweather Library — hours, databases, study rooms)
- 🎓 Tutoring (Learning Success Center, Science Center, IT Lab)
- 💬 Counseling (Student Wellness Center — free, confidential, 8 sessions/year)
- ♿ Disability Services (accommodations, how to register)
- 💼 Career Services (GammaCareer job board, resume help, career fairs)
- 🥫 Griffin's Pantry (food assistance — no paperwork, walk-in)
- 🎗️ Student Life (clubs, PTK, Student Government, events)
- 🪖 Military & Veterans (GI Bill, Yellow Ribbon, dedicated office)

#### `/about` — About Gamma TC
- Mission and vision statement
- At a glance stats
- Campus locations with embedded map placeholder (Google Maps embed for 125 Gamma Drive, Worcester, MA 01605)
- Leadership team (fabricated titles: President, VP Academic Affairs, VP Student Services, VP Finance)
- Accreditation: NECHE (New England Commission of Higher Education)
- History timeline (founded 1972, grown to 2 campuses, 10,000+ students)

#### `/contact` — Contact
- Two campus cards (Worcester main + Shrewsbury) with address, phone, hours
- Department directory table (Admissions, Financial Aid, Registrar, Bursar, IT Help Desk, Library, Counseling, Career Services, Disability Services)
- Simple contact form (name, email, subject dropdown, message) — form submits to `/api/contact` which returns `{ success: true }` (no actual email)

### AriaWidget Component
Floating chat bubble in the bottom-right corner of every page.

```
[?] ARIA button → expands to chat panel
```

**Bubble state (collapsed):**
- Circular button, teal background, white "ARIA" text + chat icon
- Pulsing animation to draw attention
- Tooltip on hover: "Chat with ARIA — your Gamma TC assistant"

**Panel state (expanded, 360x480px):**
- Header: "ARIA" + "Gamma Technical College Assistant" + close button
- Welcome message: "Hi! I'm ARIA 👋 Ask me about admissions, programs, financial aid, campus services, or IT support."
- Chat input at bottom
- The widget does NOT need to be AI-powered — it displays canned responses based on keyword matching for demo purposes:

```javascript
const CANNED_RESPONSES = {
  keywords: {
    "apply|application|apply now": "To apply to Gamma TC, visit gammatc.edu/apply. The application fee is $20 and deadlines are: Fall — Aug 1, Spring — Dec 1, Summer — Apr 28. Need help? Call (508) 754-3400.",
    "tuition|cost|how much|price": "Massachusetts residents pay $189/credit hour. Full-time annual cost is approximately $6,760–$7,160 including fees and books. Financial aid is available — file your FAFSA at studentaid.gov using school code 009743.",
    "fafsa|financial aid|grant|scholarship": "We offer Pell Grants, MassGrant, MassGrant Plus, Federal Loans, Work-Study, and Foundation Scholarships. File your FAFSA by March 1 for priority consideration. School code: 009743.",
    "nursing|medical|health|dental|surgical": "Our Health Sciences programs include Nursing (ADN), Medical Assisting, Dental Hygiene, Surgical Technology, and more. Many qualify for MassGrant Plus funding. Visit our Programs page to learn more.",
    "cybersecurity|IT|network|computer|web|data": "Our IT programs include Cybersecurity (AAS), Network Administration, CIS, Web Development, and Data Analytics — all qualifying for MassGrant Plus. Classes available online and in-person.",
    "location|address|campus|where|directions|parking": "Main Campus: 125 Gamma Drive, Worcester, MA 01605 — (508) 754-3400. Shrewsbury Campus: 47 Harrington Way, Shrewsbury, MA 01545 — (508) 754-3500. Free parking available. WRTA routes 20 & 26 serve the main campus.",
    "hours|open|close|office hours": "Both campuses are open Mon–Thu 7:30 AM–8 PM, Fri 7:30 AM–5 PM. Main Campus is also open Sat 8 AM–1 PM.",
    "transfer|university|umass|worcester state|masstransfer": "Gamma TC participates in MassTransfer — complete an AS degree and transfer to any MA state university with full credit recognition. We have agreements with UMass Lowell, Worcester State, Assumption University, and more.",
    "counseling|mental health|stress|wellness": "Free, confidential counseling is available at our Student Wellness Center (up to 8 sessions/year). Same-day crisis appointments available. Call (508) 754-3470 or visit SS-102.",
    "food|hungry|pantry|griffin": "Griffin's Pantry provides free food assistance to all enrolled students — no appointment or paperwork needed. Just bring your student ID. Located at Student Services Building, Room SS-115, Mon–Thu 9 AM–6 PM.",
    "password|portal|canvas|login|email|wifi": "For IT help: ithelpdesk@gammatc.edu or (508) 754-3490. Portal: portal.gammatc.edu. Canvas: canvas.gammatc.edu. Student email uses Microsoft Outlook 365.",
    "military|veteran|gi bill|va|tuition assistance": "We accept GI Bill (Ch. 33 & 30), Federal Tuition Assistance, MyCAA, and participate in the Yellow Ribbon Program. Contact veterans@gammatc.edu or (508) 754-3445.",
  },
  default: "Great question! I want to make sure you get accurate information. For the most detailed help, call us at (508) 754-3400 or email admissions@gammatc.edu. You can also visit our offices at 125 Gamma Drive, Worcester, MA — Mon–Fri 8 AM–5 PM."
};
```

---

## 🔌 Backend — ARIA REST API

### Database Schema (SQLite)

```sql
CREATE TABLE students (
  id TEXT PRIMARY KEY,           -- GTC100023
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  program TEXT,
  enrollment_status TEXT,        -- Full-Time | Part-Time
  semester TEXT,
  advisor TEXT,
  gpa TEXT,
  financial_aid TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tickets (
  id TEXT PRIMARY KEY,           -- TKT-8821
  student_id TEXT NOT NULL,
  type TEXT,                     -- IT Support | Financial Aid | Admissions | Advising | General Inquiry
  status TEXT DEFAULT 'Open',    -- Open | In Progress | Resolved
  priority TEXT,                 -- High | Medium | Low
  subject TEXT,
  notes TEXT,
  created_date TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE phone_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT,
  old_phone TEXT,
  new_phone TEXT,
  changed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Seed Data — 20 Synthetic Students

Seed these exact records on `db/init.js` first run (check if table is empty before seeding):

| ID | Name | Phone | Program | Status | Ticket |
|---|---|---|---|---|---|
| GTC100023 | Marcus Rivera | (508) 334-7812 | Cybersecurity (AAS) | Full-Time | TKT-8821 Open/High — Canvas login loop |
| GTC100047 | Priya Nair | (774) 209-5543 | Nursing — ADN | Full-Time | TKT-8834 In Progress/Medium — MassGrant Plus not disbursed |
| GTC100062 | Darnell Washington | (508) 771-3394 | Business Administration (AAS) | Part-Time | None |
| GTC100089 | Sofia Mendes | (774) 882-6610 | Early Childhood Education (Diploma) | Full-Time | TKT-8799 Resolved/Low — CORI delay resolved |
| GTC100104 | James O'Brien | (508) 446-0023 | Welding Technology (Diploma) | Full-Time | None |
| GTC100118 | Amara Diallo | (774) 553-8871 | Medical Assisting (Certificate) | Full-Time | TKT-8847 Open/Medium — Certificate to AAS pathway review |
| GTC100135 | Ethan Pham | (508) 992-1147 | Network Administration (AAS) | Full-Time | TKT-8803 Resolved/Low — Wi-Fi credential issue |
| GTC100149 | Fatima Hassan | (774) 338-4490 | Criminal Justice Technology (AAS) | Part-Time | None |
| GTC100167 | Carlos Gutierrez | (508) 227-9934 | HVAC/R Technology (Diploma) | Full-Time | TKT-8858 Open/High — Tuition hold blocking Summer registration |
| GTC100182 | Leah Kowalski | (774) 661-2283 | Accounting Technology (AAS) | Full-Time | None |
| GTC100196 | Kwame Asante | (508) 114-6677 | Data Analytics (Certificate) | Part-Time | TKT-8812 In Progress/Low — Transfer credit evaluation to UMass Lowell |
| GTC100210 | Destiny Okafor | (774) 445-9901 | Surgical Technology (AAS) | Full-Time | TKT-8864 Open/Low — Griffin's Pantry inquiry |
| GTC100224 | Tyler Marsh | (508) 880-3312 | Automotive Service Technology (Diploma) | Full-Time | None |
| GTC100238 | Mei-Ling Chen | (774) 774-5566 | Health Information Technology (AAS) | Full-Time | TKT-8840 In Progress/Medium — M365 license not activating |
| GTC100253 | Andre Johnson | (508) 553-8840 | Emergency Medical Services (Certificate) | Part-Time | None |
| GTC100267 | Isabella Torres | (774) 992-1103 | Web Development (Certificate) | Full-Time | TKT-8852 In Progress/Medium — Dual enrollment transcript hold |
| GTC100281 | Samuel Osei | (508) 334-1199 | Electrical Technology (AAS) | Full-Time | None |
| GTC100295 | Nadia Volkov | (774) 228-6654 | Business Administration (AAS) | Part-Time | TKT-8829 Resolved/Low — PTK eligibility question |
| GTC100309 | Jordan Williams | (508) 660-4422 | Computer Information Systems (AAS) | Full-Time | TKT-8870 Open/High — Navigate portal Account Inactive |
| GTC100323 | Aisha Bamba | (774) 117-3380 | Dental Hygiene (AAS) | Full-Time | None |

### API Endpoints

All endpoints return JSON. CORS enabled for all origins (demo use).

#### Health & Root
```
GET  /health           → { status, uptime, timestamp, records, tickets }
GET  /                 → API documentation + endpoint list
```

#### Customers
```
GET  /customers                          → All students (with pagination: ?page=1&limit=20)
GET  /customers?name=Marcus              → Search by name (case-insensitive, partial match)
GET  /customers?phone=508                → Search by phone digits (strips non-digits)
GET  /customers?program=Nursing          → Search by program (partial match)
GET  /customers?status=Full-Time         → Filter by enrollment status
GET  /customers/:id                      → Single student by GTC ID
PATCH /customers/:id/phone              → Update phone: body { "phone": "(508) 111-2222" }
                                           Also writes to phone_history table
```

**Response shape for GET /customers/:id:**
```json
{
  "id": "GTC100023",
  "name": "Marcus Rivera",
  "phone": "(508) 334-7812",
  "email": "mrivera2847@students.gammatc.edu",
  "program": "Cybersecurity (AAS)",
  "enrollmentStatus": "Full-Time",
  "semester": "Spring 2026",
  "advisor": "Dr. Angela Chu",
  "gpa": "3.4",
  "financialAid": "Pell Grant + MassGrant Plus",
  "ticket": {
    "id": "TKT-8821",
    "type": "IT Support",
    "status": "Open",
    "priority": "High",
    "created": "2026-04-10",
    "subject": "Cannot access Canvas — login loop after password reset",
    "notes": "Student reports being redirected back to login..."
  }
}
```

#### Tickets
```
GET  /tickets                            → All tickets (with student info joined)
GET  /tickets/:ticketId                  → Single ticket by TKT-XXXX ID
GET  /tickets/status/:status             → Filter: Open | In+Progress | Resolved
GET  /tickets/type/:type                 → Filter: IT+Support | Financial+Aid | Admissions | Advising | General+Inquiry
GET  /tickets/priority/:priority         → Filter: High | Medium | Low
PATCH /tickets/:ticketId/status          → Update status: body { "status": "Resolved" }
```

#### Stats
```
GET  /stats                              → Summary counts for dashboard
```

**Response shape for GET /stats:**
```json
{
  "totalStudents": 20,
  "fullTime": 14,
  "partTime": 6,
  "withTickets": 13,
  "withoutTickets": 7,
  "tickets": {
    "total": 13,
    "open": 5,
    "inProgress": 4,
    "resolved": 4
  },
  "priority": { "high": 3, "medium": 4, "low": 6 },
  "types": {
    "IT Support": 4,
    "Financial Aid": 2,
    "Admissions": 2,
    "Advising": 2,
    "General Inquiry": 3
  }
}
```

#### Phone History (bonus)
```
GET  /customers/:id/phone-history        → All phone changes for a student
```

---

## 🚀 Railway Deployment

### Monorepo Structure

Root `railway.toml`:
```toml
[build]
builder = "nixpacks"
```

Backend `railway.toml` (in `/backend`):
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "node server.js"
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 3
```

Frontend `railway.toml` (in `/frontend`):
```toml
[build]
builder = "nixpacks"
buildCommand = "npm run build"

[deploy]
startCommand = "npx serve dist -p $PORT"
```

### Environment Variables

Backend needs:
```env
PORT=3000
NODE_ENV=production
DB_PATH=./db/gammatc.sqlite
```

Frontend needs:
```env
VITE_API_URL=https://<backend-railway-url>
```

### Deploy Steps for Claude Code

1. Initialize git repo in project root: `git init`
2. `cd backend && npm install`
3. `cd ../frontend && npm install`
4. Test backend locally: `cd backend && node server.js` — verify 20 records load
5. Test frontend locally: `cd frontend && npm run dev`
6. Set `RAILWAY_TOKEN=2c88c95d-9e95-4e0d-8c5a-04c65008f5da`
7. `railway up` from root — Railway will detect monorepo and deploy both services
8. Set `VITE_API_URL` env var in Railway dashboard to the backend service URL
9. Redeploy frontend to pick up the env var
10. Test: `curl https://<backend-url>/health`

---

## 📋 Admin CRM Dashboard

Build a separate `/admin` route in the frontend (not linked from public nav) that shows:

- **Customer table** with search (name/phone/ID), filter by ticket status
- **Inline phone edit** — click phone number → edit in place → PATCH API call
- **Ticket board** — Kanban-style: Open | In Progress | Resolved columns
- **Stats bar** at top: total students, open tickets, high priority count
- **API log panel** — shows last 5 API calls made (method, endpoint, response code, timestamp)

This is the demo surface used when presenting the Webex CC ARIA agent integration.

Route: `https://<frontend-url>/admin`

---

## 🤖 Webex CC AI Agent Integration Notes

The backend API is designed to be called by **ARIA** running in Webex Contact Center AI Agent Builder via HTTP Action nodes.

### Typical ARIA call flow:
1. Caller dials Gamma TC main number
2. ARIA answers: "Hi, you've reached Gamma Technical College. I'm ARIA. How can I help you?"
3. Caller says their name or provides student ID
4. ARIA makes: `GET /customers?name=Marcus` or `GET /customers/GTC100023`
5. ARIA reads back student info and active ticket if exists
6. If escalation needed, ARIA passes context to live agent queue with full student record

### Phone lookup demo scenario:
```
Caller: "Hi, I'm Marcus Rivera, I'm having trouble logging into Canvas"
ARIA → GET /customers?name=Marcus Rivera
     ← returns GTC100023 with TKT-8821 (Canvas login loop, Open, High)
ARIA: "Hi Marcus! I can see you have an open ticket about Canvas access — 
       ticket TKT-8821. Let me connect you with IT support who already 
       has your case details."
```

### Update phone demo scenario:
```
Caller: "I have a new phone number"
ARIA → PATCH /customers/GTC100023/phone { "phone": "(508) 999-0000" }
     ← { success: true, previousPhone: "(508) 334-7812", newPhone: "(508) 999-0000" }
ARIA: "Got it, Marcus — I've updated your phone number to (508) 999-0000."
```

---

## ✅ Definition of Done

### Backend
- [ ] SQLite database initializes and seeds on first run
- [ ] All 20 student records present with correct data
- [ ] All 13 tickets linked correctly to students
- [ ] `GET /customers?phone=5083347812` returns Marcus Rivera
- [ ] `GET /customers?name=priya` returns Priya Nair (case-insensitive)
- [ ] `PATCH /customers/GTC100023/phone` updates phone and logs to `phone_history`
- [ ] `GET /tickets/status/Open` returns exactly 5 tickets
- [ ] `GET /stats` returns accurate counts
- [ ] CORS enabled — API accessible from any origin
- [ ] `/health` returns 200 with uptime

### Frontend
- [ ] All 7 pages render without errors
- [ ] Navbar links work and highlight active page
- [ ] Programs page filter works (All / by division)
- [ ] ARIA widget opens/closes and returns canned responses
- [ ] Responsive at 375px and 1440px
- [ ] `/admin` dashboard loads with student table
- [ ] Phone edit in admin calls PATCH endpoint and updates display
- [ ] Ticket board shows correct status columns

### Deployment
- [ ] `railway up` deploys both services successfully
- [ ] Frontend `VITE_API_URL` points to live backend URL
- [ ] `GET https://<backend>/health` returns 200
- [ ] `GET https://<frontend>/` loads Gamma TC homepage
- [ ] `GET https://<frontend>/admin` loads CRM dashboard

---

## 🗒️ Notes & Context

- **College name:** Gamma Technical College
- **Location:** Worcester, MA (main) + Shrewsbury, MA (satellite)
- **Main campus address:** 125 Gamma Drive, Worcester, MA 01605
- **Phone:** (508) 754-3400
- **Email pattern:** `firstname+ID@students.gammatc.edu`
- **ARIA agent name:** ARIA (Automated Response & Information Assistant)
- **Webex CC AI Agent school code:** 009743 (FAFSA)
- **Railway token:** `2c88c95d-9e95-4e0d-8c5a-04c65008f5da`
- **Modeled after:** Gwinnett Technical College — gwinnetttech.edu
- **MA financial aid context:** MassGrant + MassGrant Plus (replaces Georgia HOPE Grant)
- **Transfer program:** MassTransfer (replaces Georgia's TCSG articulation)
- **Accreditation:** NECHE (New England Commission of Higher Education)
- **LMS:** Canvas (not Blackboard)
- **Student portal:** Navigate
- **All data is synthetic** — for demo use only

---

*Last updated: April 2026 · Prakash Kini — Cisco CX · Gamma TC Demo Build*

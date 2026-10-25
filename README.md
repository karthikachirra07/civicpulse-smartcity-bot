<<<<<<< HEAD
<<<<<<< HEAD
# SmartCity AI — AI Chatbot for Citizen Service Assistance and Complaint Registration in Smart Cities

> **Academic EDP Project Prototype**  
> *SmartCity AI* is an interactive civic-technology platform prototype featuring an AI assistant, automated complaint lifecycle tracking, role-based workflows (Citizen, Municipal Officer, Administrator), and real-time governance analytics tailored for Hyderabad Municipal Administration.

---

## 📌 Problem Statement & Objectives

Citizens in rapidly expanding smart cities frequently struggle with fragmented municipal portals, opaque complaint resolution, and slow response times. **SmartCity AI** bridges this gap through:

1. **24/7 AI-Powered Citizen Assistance:** An intelligent chatbot that resolves municipal service inquiries, suggests relevant departments, detects emergency keywords, and drafts structured grievance tickets.
2. **Transparent Complaint Registration & Tracking:** Unique tracking identifiers (`SC-2026-XXXX`), dynamic SLA countdowns, step-by-step audit timelines, and citizen satisfaction ratings.
3. **Role-Based Governance Dashboards:**
   - **Citizens:** Submit complaints, track public/personal tickets, request re-openings, and view notifications.
   - **Municipal Officers:** Triage priority queues, manage departmental workloads, update statuses, and log internal/public resolution notes.
   - **Administrators:** Monitor executive KPIs, departmental SLAs, resolution trends, category breakdowns, and export audit data to CSV.
4. **Multilingual & Voice Accessibility:** English, Telugu (తెలుగు), and Hindi (हिंदी) language localization with Web Speech API voice dictation.

---

## 🛡️ Prototype & Academic Disclaimer

- **Simulation Notice:** All AI responses, ticket routing, notifications, and municipal operations are executed as an interactive prototype using browser `localStorage` persistence.
- **No Real-World Municipal Submission:** This project does not transmit complaints to real municipal authorities (e.g., GHMC, HMWS&SB, or TSRTC) or contact emergency services.
- **Safety First:** Emergency keywords (fire, flood, gas leak, medical) trigger automated guidance to official emergency hotlines (`112`, `100`, `101`, `108`).

---

## 🏗️ Architecture & Folder Structure

```
civicpulse-smartcity-bot/
├── index.html                   # HTML template with civic header metadata
├── package.json                 # Minimal, reliable dependencies (React 18 + Vite)
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration
└── src/
    ├── main.tsx                 # Application entry point
    ├── App.tsx                  # Main router setup & role-based route guards
    ├── index.css                # Civic-tech design tokens (Navy #0f172a, Teal #0f766e, Slate)
    ├── types/
    │   └── index.ts             # TypeScript interfaces (User, Complaint, Department, etc.)
    ├── services/
    │   ├── authService.ts       # Auth store, user directory, demo profiles
    │   ├── complaintService.ts  # Ticket generation, SLA calculation, CSV export, audit trail
    │   ├── departmentService.ts # 7 municipal departments (Roads, Waste, Water, etc.)
    │   ├── notificationService.ts # In-app notification center store
    │   └── aiChatService.ts     # Multi-turn intent detection, FAQ knowledge base, draft extractor
    ├── context/
    │   ├── AuthContext.tsx      # Auth & role state with 1-click test switcher
    │   ├── NotificationContext.tsx # Notifications store & unread counter
    │   └── LanguageContext.tsx  # Trilingual dictionary (EN, TE, HI) & speech synthesis
    ├── router/
    │   └── index.tsx            # Zero-dependency HTML5 history router & ProtectedRoute
    ├── components/
    │   ├── common/
    │   │   ├── Icons.tsx        # Zero-dependency SVG icons (Lucide-styled)
    │   │   ├── Logo.tsx         # Municipal civic seal emblem
    │   │   ├── StatusBadge.tsx  # Priority & status color badges
    │   │   ├── Charts.tsx       # Native SVG Bar, Donut, Area, and Trend charts
    │   │   ├── DemoBanner.tsx   # Academic EDP banner + 1-click role switcher
    │   │   └── VoiceMic.tsx     # Web Speech API voice input component
    │   ├── layout/
    │   │   ├── Navbar.tsx       # Header with language picker, notifications, profile menu
    │   │   ├── Sidebar.tsx      # Role-filtered desktop navigation sidebar
    │   │   ├── Footer.tsx       # Municipal helplines & academic footer
    │   │   └── DashboardLayout.tsx # Page wrapper with breadcrumbs
    │   └── chatbot/
    │       ├── ChatInterface.tsx # Interactive conversational message view
    │       └── FloatingChatbot.tsx # Global floating chatbot widget
    └── pages/
        ├── LandingPage.tsx      # Portal landing page with services, stats & FAQs
        ├── LoginPage.tsx        # Role-tabbed login with 1-click demo credential fill
        ├── RegisterPage.tsx     # Citizen registration form
        ├── ProfilePage.tsx      # User profile & ward settings
        ├── NotificationsPage.tsx # In-app alerts center
        ├── ChatbotPage.tsx      # Full-page dedicated AI assistant
        ├── TrackComplaintPage.tsx # Public grievance lookup by Ticket ID
        ├── citizen/
        │   ├── CitizenDashboard.tsx    # Citizen overview, active complaints, quick action
        │   ├── CitizenComplaintsPage.tsx # Filterable personal complaint list
        │   ├── ComplaintDetailPage.tsx # Complaint timeline, photo view, rating, re-open
        │   └── NewComplaintPage.tsx    # Multi-step complaint submission wizard
        ├── officer/
        │   ├── OfficerDashboard.tsx    # Department workload queue & overdue tracking
        │   └── OfficerComplaintDetailPage.tsx # Officer review, status update & note logging
        ├── admin/
        │   ├── AdminDashboard.tsx       # Executive KPIs, analytics charts, CSV export
        │   ├── AdminComplaintsPage.tsx  # Full database table with multi-criteria filters
        │   ├── AdminDepartmentsPage.tsx # Department SLA configuration
        │   └── AdminUsersPage.tsx       # System user directory
        ├── NotFoundPage.tsx     # 404 handler
        └── UnauthorizedPage.tsx # 403 access control handler
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0 or later) and **npm** installed on your system.

### 2. Installation
Open your terminal in the project directory:
```bash
cd "C:\Users\krishna kanth\.gemini\antigravity\scratch\civicpulse-smartcity-bot"
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/` (or the URL displayed in your terminal).

---

## 🔑 Demo Credentials & Quick Role Switching

To test all personas without manually logging in and out, use the **1-click Role Switcher** located in the top banner on every page, or log in with these preloaded credentials:

| Role | Name | Email | Password | Preloaded Jurisdiction / Focus |
| :--- | :--- | :--- | :--- | :--- |
| **Citizen** | Ananya Sharma | `citizen@smartcity.gov.in` | `citizen123` | Ward 42 - Jubilee Hills, Hyderabad |
| **Municipal Officer** | Eng. Suresh Reddy | `officer@smartcity.gov.in` | `officer123` | Roads & Potholes / Water Supply, Zone 3 |
| **Administrator** | Dr. Radhika Iyer | `admin@smartcity.gov.in` | `admin123` | Central Municipal Operations Command |

---

## 🔄 End-to-End Test Workflow

1. **Citizen Experience:**
   - Click **"Citizen"** in the top banner or log in as Ananya.
   - Open the **AI Assistant** (floating bottom-right button or `/chat`).
   - Type `"There is a large pothole on Jubilee Hills Road No. 36 causing traffic jams"`.
   - The chatbot detects intent, suggests Roads & Potholes with High priority, and offers a **"Register this Complaint"** button.
   - Click it to pre-fill the multi-step complaint form (`/citizen/new-complaint`).
   - Complete Step 2 & 3, attach a demo photo, and click **Submit**.
   - Note the generated ticket ID (e.g., `SC-2026-8910`).
2. **Officer Experience:**
   - Switch to **"Officer"** in the top banner.
   - Notice the newly created complaint in the **High Priority Work Queue**.
   - Click on the complaint to open the **Processing Console**.
   - Change the status from `Open` to `In Progress`, add an internal note: `"Inspected site. Asphalt patching crew dispatched"`.
3. **Public Tracking:**
   - Open `/track` in the navigation bar.
   - Enter your ticket ID (`SC-2026-8910`) to see the real-time public timeline and status update.
4. **Admin Governance & Analytics:**
   - Switch to **"Admin"** in the top banner.
   - Review updated KPIs on the **Executive Dashboard**.
   - Inspect the **Departmental SLA chart**, **Monthly volume trends**, and category donut breakdown.
   - Click **Export CSV** on `/admin/complaints` to download the entire audit register.

---

## 🌐 Future Full-Stack Production Integration

This prototype is intentionally structured to facilitate seamless backend integration:

```
[ Frontend: React / Vite ] 
       │
       ▼ (REST API / JWT)
[ Backend: Node.js + Express.js ]
  ├── /api/auth          --> bcrypt + JWT verification
  ├── /api/complaints    --> Mongoose / MongoDB Atlas
  ├── /api/departments   --> SLA & jurisdictional routing
  └── /api/ai/chat       --> LangChain / Gemini 1.5 Pro with RAG
       │
       ▼
[ MongoDB Database + Cloud Object Storage (S3 / GCS for Complaint Photos) ]
```

### Steps to Connect:
1. **API Service Abstraction:** Replace the `localStorage` operations in `src/services/complaintService.ts` and `src/services/authService.ts` with standard `fetch` or `axios` calls pointing to `VITE_API_BASE_URL`.
2. **LLM & RAG Integration:** In `src/services/aiChatService.ts`, replace the rule-based intent analyzer with a call to your backend `/api/ai/chat` endpoint, integrating Gemini with vector search over municipal citizen charters.
3. **Authentication:** Swap the simulated token in `src/services/authService.ts` with `httpOnly` JWT cookies or standard Bearer authorization headers.

---

## 📜 Academic Project Information

- **Project Title:** SmartCity AI — AI Chatbot for Citizen Service Assistance and Complaint Registration in Smart Cities
- **Project Domain:** Engineering Design Project (EDP) / Civic Technology / Smart Governance
- **Focus City:** Hyderabad (Telangana, India)
- **Year:** 2026
=======
# civicpulse-smartcity-bot
Citizens in smart cities often struggle with inefficient service access and slow complaint registration. Existing systems lack transparency, multilingual support, and real-time updates. There is a need for an intelligent chatbot that can provide 24/7 assistance, automate complaint handling, and integrate with smart city platforms.
>>>>>>> 721b59194ad54875e195a4fea0aa88b8066f9691
=======
# CivicPulse — AI-Powered Smart City Citizen Services

CivicPulse is a web application designed to help citizens access civic services, register complaints, and track their progress through a centralized platform.

## Features

- Citizen registration and login
- AI-powered civic-service assistance
- Complaint registration and tracking
- Complaint categorization and priority suggestions
- Municipal officer complaint management
- Administrator dashboard and analytics
- Responsive user interface

## Technology Stack

- Frontend: React, TypeScript, Vite
- Styling: Tailwind CSS
- Backend: Node.js and Express (if configured)
- Database: MongoDB (if configured)
- AI integration: To be configured through a secure backend service

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Project Status

CivicPulse is under development. Features requiring backend, database, or AI configuration must be connected and tested before production use.

## Security

Do not commit API keys, passwords, database credentials, or `.env` files to GitHub.
>>>>>>> c43f833f85ecedaaf73bd4ccaa5fbf5ecd62ea2c

# CivicPulse — AI-Powered Smart City Citizen Service & Complaint Registration Platform

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Live%20on%20Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://snappy-opal-vdlq0tf.tmp.now)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Academic Engineering Design Project (EDP)**  
> **Tagline:** *Smarter Services. Better Cities.*  
> **Jurisdiction:** Greater Hyderabad Municipal Corporation (GHMC) • Government of Telangana  
> **Live Demo:** [https://snappy-opal-vdlq0tf.tmp.now](https://snappy-opal-vdlq0tf.tmp.now)  
> **Claim Deployment:** [Claim to Your Vercel Account](https://vercel.com/claim-deployment?code=74881505-3d95-42de-9101-2d153ba5b4c7)

---

## 📖 Executive Summary & Problem Statement

Rapidly expanding metropolitan smart cities like Hyderabad face severe challenges with civic service grievance redressal:
- **Fragmented portals** where citizens must navigate complex bureaucratic department structures.
- **Opaque complaint tracking** leading to repeated grievances, unresolved public safety hazards, and citizen dissatisfaction.
- **Language barriers** hindering non-English speakers from effectively reporting issues.
- **Slow triage and assignment** overloading municipal officers with unstructured complaints.

**CivicPulse** is an enterprise-grade civic technology platform that unifies citizen service assistance, AI-driven grievance intake, automated department dispatch, SLA enforcement, and municipal governance into a single responsive system.

---

## 🌟 Key Platform Features

### 1. 3 Working Complaint Intake Pathways (Zero Blockers)
Citizens are never blocked by forced login barriers or fake dead ends. Grievances can be registered via:
1. **Homepage Fast Intake Widget (`/`)**: Directly on the landing page hero section. Pick a category, select a Hyderabad ward (Madhapur, Gachibowli, Banjara Hills, etc.), choose a common issue chip, and submit in seconds.
2. **AI Assistant 1-Click Intake (`/chatbot`)**: Natural language chat in English, Telugu, or Hindi. The AI detects the category, locality, and urgency, offering a **"⚡ Register Complaint Right Now (1-Click)"** button inside the conversation.
3. **Full Grievance Wizard (`/complaints/new`)**: Detailed multi-step form supporting photo attachments with live preview, GPS coordinates, AI department verification, and 1-click sample presets.

### 2. Live Grievance Tracking & SLA Countdown (`/track`)
- Every complaint generates an official ticket ID (e.g. `SC-2026-0001`).
- Interactive **4-Stage Visual Timeline Stepper**: *Submitted $\rightarrow$ Under Review $\rightarrow$ In Progress $\rightarrow$ Resolved*.
- Dynamic SLA countdown timer based on priority urgency (Critical: 6h, High: 12h, Medium: 24h, Low: 48h).
- Assigned officer details, department contacts, and citizen reopen mechanism.

### 3. Real User Authentication & Persistent Sessions
- Persistent user account registry stored in browser storage (`smartcity_user_accounts`).
- Citizen registration (`/register`) with name, email, phone, ward selection, and password.
- Secure login (`/login`) with credential validation, session retention, and genuine sign-out.
- One-click tester personas for rapid evaluator testing.

### 4. Role-Based Dashboards & Workflows
- **Citizen Portal (`/complaints`)**: View personal filed tickets, track progress, review past resolutions, and inspect public citywide reports.
- **Municipal Officer Command Queue (`/officer/dashboard`)**: Ward-specific grievance queue, priority sorting, status updates (*In Progress*, *Resolved*), and resolution inspection logs.
- **City Administrator GIS Analytics (`/admin/dashboard`)**: Executive KPIs, departmental SLA compliance charts, category donut breakdowns, ward heatmaps, and full CSV audit export.

### 5. Multilingual & Accessibility
- Trilingual localization: **English**, **Telugu (తెలుగు)**, and **Hindi (हिंदी)**.
- Integrated Web Speech API microphone dictation for hands-free voice complaints.
- High-contrast civic color palette meeting accessibility contrast guidelines.

---

## 🔑 Demo Credentials

To test all personas without registering a new account, use the 1-click buttons on the Login page or log in with these preloaded credentials:

| Role | Persona Name | Email | Password | Pre-configured Jurisdiction |
| :--- | :--- | :--- | :--- | :--- |
| **Citizen** | Ananya Sharma | `citizen@smartcity.gov.in` | `citizen123` | Ward 42 - Jubilee Hills, Hyderabad |
| **Municipal Officer** | Eng. Suresh Reddy | `officer@smartcity.gov.in` | `officer123` | Roads & Potholes / Water Supply (Zone 3) |
| **Administrator** | Dr. Radhika Iyer | `admin@smartcity.gov.in` | `admin123` | Central Municipal Operations Command (GHMC) |

*(You can also register a brand new citizen account at `/register` at any time).*

---

## 💻 Tech Stack & Architecture

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool & Bundler:** Vite 5
- **Styling & Design System:** Tailwind CSS (Navy `#142B4A`, Teal `#0F9D91`, Slate `#F5F7FA`)
- **Icons:** Zero-dependency SVG icon system (Lucide-inspired)
- **Data Visualization:** Native SVG charting components (Bar, Donut, Area, Trend)
- **State Management & Persistence:** React Context API + LocalStorage persistence
- **Routing:** Client-side HTML5 history router with SPA query parameter synchronization and route guards
- **Deployment:** Vercel Global Edge Network with SPA URL rewrites

```
civicpulse-smartcity-bot/
├── index.html                   # HTML template with civic header metadata
├── package.json                 # Dependencies & project scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration
├── vercel.json                  # Vercel SPA rewrite routing rules
├── netlify.toml                 # Netlify deployment configuration
├── public/
│   └── _redirects              # Static SPA fallback redirects
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions Pages deployment workflow
└── src/
    ├── main.tsx                 # Application entry point
    ├── App.tsx                  # Root component & route declarations
    ├── index.css                # Tailwind CSS & civic typography rules
    ├── types/
    │   └── index.ts             # TypeScript definitions (User, Complaint, Department, etc.)
    ├── services/
    │   ├── authService.ts       # Account registry, password verification, session lifecycle
    │   ├── complaintService.ts  # Ticket CRUD, SLA calculators, audit logs, CSV export
    │   ├── departmentService.ts # GHMC departments (Roads, Water, Waste, etc.)
    │   ├── notificationService.ts # In-app notification center
    │   └── aiChatService.ts     # Trilingual NLP, intent detection, 1-click in-chat ticket creation
    ├── context/
    │   ├── AuthContext.tsx      # Current user session state & login/logout methods
    │   ├── NotificationContext.tsx # Notification alerts & unread counters
    │   └── LanguageContext.tsx  # Trilingual dictionary (EN, TE, HI)
    ├── router/
    │   └── index.tsx            # Custom HTML5 router, Route, Link, useNavigate, useLocation
    ├── components/
    │   ├── common/              # Reusable icons, status badges, charts, civic header banner
    │   ├── layout/              # Navbar, Sidebar, Footer, DashboardLayout
    │   └── chatbot/             # ChatInterface, FloatingChatbot
    └── pages/
        ├── LandingPage.tsx      # Public portal with Hero Quick Grievance Widget & services
        ├── LoginPage.tsx        # Authentication with 1-click persona fills
        ├── RegisterPage.tsx     # Citizen registration
        ├── TrackComplaintPage.tsx # Grievance tracking stepper by Ticket ID
        ├── ChatbotPage.tsx      # Dedicated full-page AI assistant
        ├── citizen/             # Citizen dashboard, complaints list, detailed form
        ├── officer/             # Officer queue, review modal, status management
        └── admin/               # Admin analytics, department config, user directory
```

---

## 🛠️ Local Development & Build

### 1. Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### 2. Installation
```bash
git clone https://github.com/<your-username>/civicpulse-smartcity-bot.git
cd civicpulse-smartcity-bot
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized static bundle in the `dist/` directory.

### 5. Preview Production Build Locally
```bash
npm run preview
```
Serves the production build at [http://localhost:4173/](http://localhost:4173/).

---

## 🚀 Deployment

The project is pre-configured for instant deployment:

### Vercel (Current Live Deployment)
- Live URL: **[https://snappy-opal-vdlq0tf.tmp.now](https://snappy-opal-vdlq0tf.tmp.now)**
- Claim Link: **[Claim to Personal Vercel](https://vercel.com/claim-deployment?code=74881505-3d95-42de-9101-2d153ba5b4c7)**
- To deploy your own copy via CLI:
  ```bash
  npx vercel
  ```

### GitHub Pages (Automated via GitHub Actions)
Push the code to your GitHub repository:
```bash
git remote add origin https://github.com/<username>/civicpulse-smartcity-bot.git
git branch -M main
git push -u origin main
```
The included `.github/workflows/deploy.yml` workflow will automatically build and publish the site to your `github.io` domain.

---

## 🛡️ Academic Disclaimer & Safety Notice

- **Prototype Notice:** This platform is an academic engineering prototype. All tickets, AI classifications, and dispatch notifications are simulated in local storage.
- **No Real Municipal Affiliation:** This project is not officially affiliated with or operated by the Greater Hyderabad Municipal Corporation (GHMC), HMWS&SB, or the Government of Telangana.
- **Emergency Safeguard:** For immediate life-threatening emergencies, fires, crimes, or medical crises, do not use this portal. Contact official emergency response numbers immediately:
  - **112**: National Emergency Hotline
  - **100**: Police Control
  - **101**: Fire Department
  - **108**: Emergency Ambulance Service

---

## 📄 License & Attribution

Developed as an Academic Engineering Design Project (EDP) in Civic Technology and Smart City Governance (2026).

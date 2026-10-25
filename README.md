CivicPulse — AI-Assisted Civic Complaint Management
<p align="center">
  <strong>Smarter Services. Better Cities.</strong><br>
  Academic Engineering Design Project (EDP) focused on Hyderabad, Telangana
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Project-EDP-142B4A?style=for-the-badge" alt="Engineering Design Project">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</p>

Table of Contents
- Overview
- Problem Statement
- Objectives
- Target Area
- Features
- User Roles
- Technology Stack
- Architecture
- Project Structure
- Getting Started
- Demo Accounts
- Application Routes
- Deployment
- Limitations and Future Work
- Academic Disclaimer and Emergency Information
- Project Information
Overview
CivicPulse is an AI-assisted civic complaint management platform designed around the needs of citizens in the Greater Hyderabad Municipal Corporation (GHMC) area. It aims to make civic grievance reporting easier through a responsive interface, complaint tracking, multilingual assistance, and role-based dashboards.

The project is developed as an academic Engineering Design Project (EDP). Unless explicitly integrated with an authorized external service, complaint records and workflow updates should be treated as demonstration data rather than official municipal records.

Tagline: Smarter Services. Better Cities.
Initial geographic focus: Hyderabad, Telangana, India.

Demo link: Open CivicPulse
The demo URL above was supplied for this project and may be temporary. Verify that it is still active before sharing it.

Problem Statement
Citizens can face difficulties when reporting civic issues because complaint channels may be fragmented, tracking can be unclear, and language or accessibility barriers can make digital services harder to use. Municipal teams also need complaints to be organized by category, locality, priority, and status.

CivicPulse proposes a centralized interface for submitting and tracking civic grievances and for demonstrating complaint-management workflows.
Objectives
1. Provide an accessible interface for registering civic complaints.
2. Offer multiple complaint-intake pathways.
3. Support English, Telugu, and Hindi where implemented.
4. Organize complaints by category, locality, priority, and status.
5. Provide separate interfaces for citizens, officers, and administrators.
6. Show complaint progress through a clear status timeline.
7. Present summary statistics and analytics using available application data.
8. Provide a foundation for future integration with authorized municipal services.
Target Area
CivicPulse initially focuses on the Greater Hyderabad Municipal Corporation (GHMC) area.

Example complaint categories include:
- Road damage and potholes
- Water supply issues
- Drainage and sewage problems
- Garbage collection and sanitation
- Streetlight failures
- Public infrastructure maintenance
- Other civic grievances
Locality, ward, and zone information shown in the application should be treated as sample data unless it has been verified against an authoritative source. The project is not an official GHMC service.
Features
1. Complaint Intake
The application is designed to provide three complaint-intake pathways:
- Homepage quick intake (/) — a short form for selecting an issue category and entering complaint details.
- Chat assistant (/chatbot) — a conversational interface intended to help citizens describe an issue and prepare a complaint.
- Detailed complaint form (/complaints/new) — a structured form for entering grievance details and, where implemented, attaching a photo or location.
The exact availability of AI classification, one-click submission, GPS capture, and photo handling depends on the current code and should be tested before being described as fully functional.
2. Complaint Tracking
- View a complaint using its tracking identifier, where supported.
- Display the current complaint status.
- Show progress through stages such as Submitted, Under Review, In Progress, and Resolved.
- View complaint details and available updates.
These are application workflow states and do not indicate that GHMC has received or acknowledged a complaint.
3. Citizen Account and Dashboard
The citizen experience is intended to support account access, complaint history, complaint details, and status tracking. Authentication and persistence should be evaluated against the actual implementation before using real personal information.
4. Officer Dashboard
The officer interface is intended to demonstrate reviewing complaints, sorting by status or priority, and updating workflow states where those functions are implemented.
5. Administrator Dashboard
The administrator interface is intended to demonstrate complaint summaries, category breakdowns, and other analytics based on the data available to the application.
6. Multilingual and Accessible Interaction
English, Telugu, and Hindi support are intended to improve usability. Voice input and other browser-dependent features should be tested in the target browser and device before being advertised as fully supported.
User Roles
Role	Intended use
Citizen	Submit complaints and view complaint progress
Municipal officer	Review complaints and update workflow status
Administrator	View summary information and manage administrative workflows


Technology Stack
The following technologies are described for the current frontend architecture. Confirm the repository configuration if the implementation has changed.
Technology	Purpose
React	User interface
TypeScript	Typed application code
Vite	Development server and production build
Tailwind CSS	Styling and responsive layout
React Context API	Shared application state
Client-side routing	Navigation between application pages
Browser LocalStorage	Local persistence where implemented
Git and GitHub	Source control and repository hosting
Vercel or GitHub Pages	Possible frontend hosting options


A static frontend host does not run a separate backend server or database. Any backend, AI provider, or external service must be deployed and configured separately.
Architecture
Citizen / Officer / Administrator
                |
                v
         React Frontend
                |
        +-------+--------+
        |       |        |
        v       v        v
      Pages  Components Router
                |
                v
       Context / State Layer
                |
                v
          Service Layer
        +-------+--------+
        |       |        |
        v       v        v
       Auth  Complaints  Chat
                |
                v
       Configured Data Storage
This is a high-level logical diagram. It does not imply that a production backend, centralized database, or external AI service is connected.
Project Structure
The following is an illustrative structure based on the project documentation. File names may differ in the current repository.
civicpulse-smartcity-bot/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── chatbot/
│   ├── context/
│   ├── pages/
│   │   ├── citizen/
│   │   ├── officer/
│   │   └── admin/
│   ├── router/
│   ├── services/
│   │   ├── authService.ts
│   │   ├── complaintService.ts
│   │   ├── departmentService.ts
│   │   ├── notificationService.ts
│   │   └── aiChatService.ts
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
Getting Started
Prerequisites
- Node.js version compatible with the project dependencies (an active LTS release is recommended).
- npm, included with Node.js.
- Git.
1. Clone the repository
git clone https://github.com/karthikachirra07/civicpulse-smartcity-bot.git
2. Enter the project directory
cd civicpulse-smartcity-bot
3. Install dependencies
npm install
If the repository contains a valid package-lock.json, you can use npm ci for a clean dependency installation.
4. Start the development server
npm run dev
Open the local URL printed in the terminal. Vite commonly uses http://localhost:5173/.
5. Build for production
npm run build
A successful Vite build normally creates the production output in dist/.
6. Preview the production build
npm run preview
Vite commonly uses http://localhost:4173/ for the preview. The terminal output is the source of truth if a port is different.
Demo Accounts
The following demonstration credentials were supplied in the project notes. They will work only if they are configured in the current application.
Role	Email	Password
Citizen	citizen@smartcity.gov.in	citizen123
Municipal officer	officer@smartcity.gov.in	officer123
Administrator	admin@smartcity.gov.in	admin123


These are sample credentials, not official government accounts. Do not use these passwords for real accounts or store real credentials in the repository. If the demo is publicly accessible, consider removing or changing preset accounts before sharing it.
Application Routes
These routes are documented as intended routes. Confirm the current router before relying on each path.
Route	Intended purpose
/	Homepage and quick complaint intake
/login	Login
/register	Citizen registration
/chatbot	Conversational assistant
/complaints	Citizen complaint dashboard
/complaints/new	Detailed complaint form
/track	Complaint tracking
/officer/dashboard	Officer dashboard
/admin/dashboard	Administrator dashboard


Deployment
Vercel
1. Sign in to Vercel.
2. Import the GitHub repository.
3. Confirm the framework is detected as Vite.
4. Set the build command to npm run build and the output directory to dist, if these values are not detected automatically.
5. Deploy and test the resulting URL.
For client-side routing, configure a suitable single-page application fallback if refreshing a nested route returns a 404.
GitHub Pages
For a repository deployed at https://karthikachirra07.github.io/civicpulse-smartcity-bot/, the Vite configuration commonly needs the repository base path:
base: '/civicpulse-smartcity-bot/',
Add this property to the existing Vite configuration object and preserve its other settings.

Then:
1. Open the repository's Settings → Pages.
2. Set Build and deployment → Source to GitHub Actions.
3. Ensure .github/workflows/deploy.yml installs dependencies, runs npm run build, and publishes the dist/ directory.
4. Push the changes to main.
5. Open the Actions tab and confirm the workflow succeeds.
Expected URL after successful configuration and deployment:

https://karthikachirra07.github.io/civicpulse-smartcity-bot/

The URL will not work until GitHub Pages is enabled and the workflow completes successfully.
Push updates
git add .
git commit -m "Update CivicPulse"
git push
Review staged changes before committing. Do not commit API keys, private configuration, real passwords, or sensitive personal information.
Limitations and Future Work
Limitations
- Browser LocalStorage data is local to a browser profile and is not a shared multi-user database.
- A frontend-only deployment does not provide a backend API or centralized data store.
- Demo complaint records and status changes are not official municipal records.
- AI classification should not be treated as an authoritative decision without validation.
- GPS, photo upload, speech recognition, and notifications depend on browser permissions and implementation.
- The application is not an official GHMC complaint-submission channel unless an authorized integration is established.
Future enhancements
1. Add a secure backend API and centralized database.
2. Implement production-grade authentication and role-based authorization.
3. Integrate a verified AI service for multilingual assistance.
4. Add secure image storage and location validation.
5. Maintain auditable complaint assignment and status histories.
6. Verify ward, locality, and department information against authoritative sources.
7. Integrate official municipal services through authorized APIs, where available.
8. Improve accessibility, automated testing, monitoring, and privacy controls.
9. Consider supporting additional municipalities after validating the Hyderabad-focused implementation.
Academic Disclaimer and Emergency Information
CivicPulse is an academic Engineering Design Project. It is not officially affiliated with or operated by GHMC, HMWS&SB, or the Government of Telangana.

Unless an authorized integration is implemented and verified, complaints, AI classifications, ticket identifiers, status updates, analytics, and notifications are part of the application's demonstration environment. They should not be interpreted as official government acknowledgements or records.

Do not enter sensitive personal information into a public demo. Do not use CivicPulse as a substitute for emergency services.

For emergencies in India, use the appropriate official emergency channel. Common emergency numbers include:
Number	Service
112	Pan-India emergency response
100	Police assistance, where applicable
101	Fire services
108	Ambulance service, subject to local availability


Project Information
- Project name: CivicPulse
- Project type: Engineering Design Project (EDP) / academic capstone
- Domain: Civic technology and citizen services
- Initial geographic focus: Hyderabad, Telangana, India
- Repository: karthikachirra07/civicpulse-smartcity-bot
<p align="center">
  <strong>CivicPulse — Smarter Services. Better Cities.</strong><br>
  <em>A student project exploring more accessible civic grievance management.</em>
</p>

# SCAMURAI Watch

Act as a Principal Full-Stack UI/UX Engineer for Cybersecurity Platforms. Build a production-ready, dark-mode Web Dashboard MVP for "SCAMURAI" — an event-driven AI Physical Access Security & Anomaly Detection Platform that correlates Salto Door Locks, Gantner Smart Lockers, and CCTV analytics.

### DESIGN SYSTEM & TECH STACK
- Framework: React (Vite) + TypeScript + Tailwind CSS
- Design System: Dark mode cybersecurity theme (`#0f172a` slate background, `#1e293b` card surfaces, Lucide React icons, Shadcn UI patterns).
- Threat Highlighting: `#ef4444` (Critical Anomaly), `#f59e0b` (Sync Lag/Warning), `#10b981` (Normal State).

---

### CORE MODULES & WORKFLOWS

1. TOP COMMAND BAR & METRICS RIBBON
   - Title: "SCAMURAI | Physical Threat Intelligence"
   - Header Controls: Active Location ("HQ Server Wing"), Live Event Simulation Toggle ("Normal Mode" vs "Simulate Attack").
   - KPI Cards: 
     - "142" Monitored Nodes (Salto Doors & Gantner Lockers)
     - "3" Active Critical Threats
     - "4" Salto SVN Blacklist Sync Lag (>12h)
     - "78/100" Overall Site Risk Index

2. MODULE 1: REAL-TIME ANOMALY TICKER
   - Live stream displaying actionable AI alerts:
     - "5x Failed Badge Taps in 60s" (Salto Door 102)
     - "Serial Locker Skimming Detected" (Gantner Locker Bank B)
     - "Tailgating Anomaly" (Perimeter Gate)
     - "Blacklist Lag Infiltration" (Offline SVN Door)
   - Clicking any item triggers the slide-out AI Security Co-Pilot.

3. MODULE 2: SLIDE-OUT AI SECURITY CO-PILOT & ACTION DRAWER (RIGHT PANEL)
   - Slides out smoothly from the right side when an anomaly is selected.
   - Section A: Visual Evidence — Simulated CCTV player with bounding box overlay and multi-camera breadcrumb path (Re-ID timeline).
   - Section B: AI Threat Analysis & Confidence Score ("98.4% Confidence - Brute Force Pattern").
   - Section C: AI Interactive Action Box:
     - Shows prompt: "AI Recommendation: Lock Salto Reader #102 & Dispatch Field Guard."
     - Action Buttons: [Approve & Dispatch Guard] [Override Lockout] [Dismiss False Positive]
   - Section D: Consult Assistant — Quick action pills for the officer ("Show last 10m activity", "Check credential owner profile").

4. MODULE 3: HARDWARE TELEMETRY & HEALTH GRID
   - Tab 1 (Salto SVN Doors): Matrix showing battery %, last sync timestamp, and blacklist lag hours.
   - Tab 2 (Gantner Lockers): Grid view showing locker occupancy state, internal temperature, solenoid status, and dwell time.

5. MODULE 4: AUDIT DOSSIER & POSTMORTEM MODAL
   - Accessible via "Export Incident Dossier" button inside the AI Co-Pilot Drawer.
   - Full-screen modal containing: Incident Summary, Timestamped Audit Logs, Camera Snapshots, Actions Taken by Officer, and "Download PDF Audit Report" CTA.

Make all UI elements fully interactive, animated, and pre-populated with realistic security event data!

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://scamurai-ai-guard.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5632897e-cd13-450b-b5f4-1390685ba037).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

# mtm NetBRIEF — Network Summarizer Dashboard

mtm NetBRIEF is a premium enterprise Network Management System (NMS) dashboard that visualizes complex network traffic, latency, routes, and alert summaries. It acts as a summarized traffic monitoring center for Route Optimization and Analysis (ROA) operations.

---

## 🌲 Design Aesthetics (Forest Tech Vibe)

The dashboard has undergone a complete visual overhaul adopting a premium **Dark/Earthy Forest Tech** theme:
* **Deep Dark Green Base (`#18230F`):** Provides a high-contrast dark room context suitable for 24/7 Network Operations Center (NOC) environments.
* **Olive Surface Cards (`#27391C`):** Generates structural depth separating metrics, logs, and interactive layouts.
* **Medium Forest Borders (`#255F38`):** Clean and professional structural indicators.
* **Emerald Green Highlights (`#1F7D53`):** Accent status indicators, success states, and interactive states.
* **Glowing Accents:** Pulsing diagnostic status lights, dynamic neon top border bars, and soft glows for button clicks and menu selections.
* **High-Tech Vector Charting:** Recharts area charts are upgraded with dynamic fading linear gradients instead of flat low-opacity colors, presenting clean glowing trails.
* **Staggered Entry Animations:** Interactive transitions (Slide Up, Slide Left, Slide Right, and Scale Up) with staggered delays are applied differently to each widget card to build a fluid page load sequence.

---

## 🛠️ Tech Stack

* **Framework:** React 18, Vite 6, TypeScript
* **Styling:** Tailwind CSS v4, Vanilla CSS variables
* **Icons:** Lucide React
* **Data Visualization:** Recharts (responsive charting library)
* **Routing:** React Router v7

---

## 🚀 How to Run the Project

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Install Dependencies
Initialize the project modules:
```bash
npm install
# or
pnpm install
```

### 2. Start the Development Server
Launch the local developer environment:
```bash
npm run dev
```
Open your browser and navigate to the URL printed in the terminal (usually `http://localhost:5173`).

### 3. Build for Production
To bundle and optimize the project for deployment:
```bash
npm run build
```
This generates optimized HTML, JS, and CSS files inside the `dist/` directory.

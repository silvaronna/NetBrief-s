import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AlertsView } from "./pages/AlertsView";
import { TrafficView } from "./pages/TrafficView";
import { PerformanceView } from "./pages/PerformanceView";
import { DrillDownView } from "./pages/DrillDownView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: AlertsView },
      { path: "alerts", Component: AlertsView },
      { path: "traffic", Component: TrafficView },
      { path: "performance", Component: PerformanceView },
      { path: "drilldown/:type", Component: DrillDownView },
    ],
  },
]);

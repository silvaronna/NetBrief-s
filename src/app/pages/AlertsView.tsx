import { useAlertsData } from '../hooks/useAlertsData';
import { AlertTableWidget } from '../components/sections/AlertTableWidget';

export function AlertsView() {
  const { bgpAlerts, igpAlerts } = useAlertsData();

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <AlertTableWidget title="BGP Alerts" data={bgpAlerts} />
      <AlertTableWidget title="IGP Alerts" data={igpAlerts} />
    </div>
  );
}

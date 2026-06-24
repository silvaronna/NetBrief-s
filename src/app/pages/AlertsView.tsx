import { useAlertsData } from '../hooks/useAlertsData';
import { AlertTableWidget } from '../components/sections/AlertTableWidget';

export function AlertsView() {
  const { bgpAlerts, igpAlerts } = useAlertsData();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="animate-fade-in-left">
        <AlertTableWidget title="BGP Alerts" data={bgpAlerts} />
      </div>
      <div className="animate-fade-in-right animation-delay-150">
        <AlertTableWidget title="IGP Alerts" data={igpAlerts} />
      </div>
    </div>
  );
}

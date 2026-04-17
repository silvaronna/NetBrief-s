import { BGP_ALERTS, IGP_ALERTS } from '../../data';

export function useAlertsData() {
  return {
    bgpAlerts: BGP_ALERTS,
    igpAlerts: IGP_ALERTS
  };
}

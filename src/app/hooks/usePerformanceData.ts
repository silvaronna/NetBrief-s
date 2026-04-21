// src/app/hooks/usePerformanceData.ts

import { LATENCY_CONGESTION, TRAFFIC_3A_LINKS } from '../../data/index.ts';

export function usePerformanceData() {
  return {
    latencyData: LATENCY_CONGESTION.dataSource,
    links3AData: TRAFFIC_3A_LINKS.dataSource // Tambahkan ini
  };
}
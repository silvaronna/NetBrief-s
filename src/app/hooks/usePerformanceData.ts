// Ganti import-nya menjadi LATENCY_CONGESTION
import { LATENCY_CONGESTION } from '../../data/index.ts';

export function usePerformanceData() {
  return {
    latencyData: LATENCY_CONGESTION
  };
}
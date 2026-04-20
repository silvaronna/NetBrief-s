import { 
  TRAFFIC_TOP_NEIGHBOR_AS, 
  TRAFFIC_AGGREGATORS 
} from '../../data/index.ts';

export function useTrafficData() {
  return {
    neighborAS: TRAFFIC_TOP_NEIGHBOR_AS.dataSource,
    aggregators: TRAFFIC_AGGREGATORS
    // links dihapus dari sini
  };
}
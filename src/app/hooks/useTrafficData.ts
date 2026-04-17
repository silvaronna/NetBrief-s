import { 
  TRAFFIC_TOP_NEIGHBOR_AS, 
  TRAFFIC_AGGREGATORS, 
  TRAFFIC_3A_LINKS 
} from '../../data/index.ts';

export function useTrafficData() {
  return {
    neighborAS: TRAFFIC_TOP_NEIGHBOR_AS.dataSource,
    aggregators: TRAFFIC_AGGREGATORS,
    links: TRAFFIC_3A_LINKS.dataSource
  };
}

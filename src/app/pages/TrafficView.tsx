import { useTrafficData } from '../hooks/useTrafficData';
import { TopNeighborAsWidget } from '../components/sections/TopNeighborAsWidget';
import { TrafficAggregatorWidget } from '../components/sections/TrafficAggregatorWidget';
import { Traffic3ALinksWidget } from '../components/sections/Traffic3ALinksWidget';

export function TrafficView() {
  const { neighborAS, aggregators, links } = useTrafficData();

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <TopNeighborAsWidget data={neighborAS} />
      <TrafficAggregatorWidget data={aggregators} />
      <Traffic3ALinksWidget data={links} />
    </div>
  );
}

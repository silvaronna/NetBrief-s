import { useTrafficData } from '../hooks/useTrafficData';
import { TopNeighborAsWidget } from '../components/sections/TopNeighborAsWidget';
import { TrafficAggregatorWidget } from '../components/sections/TrafficAggregatorWidget';

export function TrafficView() {
  const { neighborAS, aggregators, links } = useTrafficData();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="animate-fade-in-up">
        <TopNeighborAsWidget data={neighborAS} />
      </div>
      <div className="animate-scale-up animation-delay-150">
        <TrafficAggregatorWidget data={aggregators} />
      </div>
    </div>
  );
}

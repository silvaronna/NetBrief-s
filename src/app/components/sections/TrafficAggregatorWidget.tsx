import { useNavigate } from 'react-router-dom';
import { ChevronRight, Activity, Network, Database, Globe } from 'lucide-react';

export function TrafficAggregatorWidget({ data }: { data: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#09090b] rounded-lg border border-[#27272a] shadow-lg flex flex-col hover:border-[rgba(43,127,255,0.3)] transition-colors">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272a] cursor-pointer group" onClick={() => navigate('/drilldown/aggregator')}>
        <h3 className="font-['Inter'] font-semibold text-[14px] text-[#f4f4f5] uppercase tracking-wide group-hover:text-[#2b7fff] transition-colors">Traffic Aggregator</h3>
        <ChevronRight size={16} className="text-[#71717b] group-hover:text-[#f4f4f5]" />
      </div>
      <div className="p-4 grid grid-cols-4 gap-4">
        {data.map((ag) => {
          const Icon = ag.icon === 'Activity' ? Activity : ag.icon === 'Network' ? Network : ag.icon === 'Database' ? Database : Globe;
          return (
            <div key={ag.id} onClick={() => navigate('/drilldown/aggregator')} className="border border-[#27272a] bg-[rgba(24,24,27,0.4)] rounded-lg p-4 flex flex-col items-center justify-center gap-3 hover:border-[#2b7fff] cursor-pointer hover:bg-[rgba(43,127,255,0.05)] transition-all">
              <div className="w-12 h-12 rounded-full bg-[rgba(43,127,255,0.1)] flex items-center justify-center text-[#2b7fff]">
                <Icon size={24} />
              </div>
              <div className="text-center">
                <p className="text-[11px] text-[#9f9fa9] font-semibold uppercase">{ag.label}</p>
                <p className="text-[18px] text-[#f4f4f5] font-['JetBrains_Mono'] mt-1">{ag.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

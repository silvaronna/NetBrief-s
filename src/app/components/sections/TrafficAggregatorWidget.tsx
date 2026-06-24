import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function TrafficAggregatorWidget({ data }: { data: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#27391C] rounded-xl border border-[#255F38] shadow-2xl flex flex-col hover:border-[#1F7D53] hover:shadow-[0_4px_25px_rgba(31,125,83,0.15)] transition-all duration-300 relative overflow-hidden group">
      {/* Premium indicator top line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#1F7D53]/60 to-transparent group-hover:via-[#1F7D53] transition-all duration-500" />
      
      <div 
        className="flex items-center justify-between px-4 py-3 border-b border-[#255F38] pt-4 cursor-pointer group" 
        onClick={() => navigate('/drilldown/aggregator')}
      >
        <h3 className="font-['Inter'] font-semibold text-[14px] text-[#f4f4f5] uppercase tracking-wide group-hover:text-[#1F7D53] transition-colors">
          Traffic Aggregator
        </h3>
        <ChevronRight size={16} className="text-[#a1a1aa] group-hover:text-[#1F7D53] transition-colors" />
      </div>

      <div className="p-4 grid grid-cols-4 gap-4">
        {data.map((ag) => {
          return (
            <div 
              key={ag.id} 
              onClick={() => navigate('/drilldown/aggregator')} 
              className="border border-[#255F38] bg-[rgba(24,35,15,0.4)] rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-[#1F7D53] hover:shadow-[0_0_10px_rgba(31,125,83,0.1)] cursor-pointer hover:bg-[rgba(31,125,83,0.08)] transition-all"
            >
              
              {/* IMAGE CONTAINER */}
              <div className="w-30 h-30 flex items-center justify-center">
                <img
                  src={ag.image}
                  alt={ag.label}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-center">
                <p className="text-[11px] text-[#9f9fa9] font-semibold uppercase">
                  {ag.label}
                </p>
                <p className="text-[18px] text-[#f4f4f5] font-['JetBrains_Mono'] mt-1">
                  {ag.value}
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

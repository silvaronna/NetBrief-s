import { useNavigate } from 'react-router-dom';
import { PanelHeader } from '../ui/PanelHeader';
import { TrafficGauge } from '../ui/TrafficGauge';

export function TopNeighborAsWidget({ data }: { data: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#27391C] rounded-xl border border-[#255F38] shadow-2xl flex flex-col hover:border-[#1F7D53] hover:shadow-[0_4px_25px_rgba(31,125,83,0.15)] transition-all duration-300 relative overflow-hidden group h-full">
      {/* Premium indicator top line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#1F7D53]/60 to-transparent group-hover:via-[#1F7D53] transition-all duration-500" />
      <div className="pt-1">
        {/* Cukup kirim title dan onDrillDown saja */}
        <PanelHeader 
          title="TOP 10 NEIGHBOR AS IN" 
          onDrillDown={() => navigate('/drilldown/neighbor-as')} 
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="border-b border-[#255F38] text-[#a1a1aa] text-[10px] uppercase font-['Inter'] tracking-wider">
              <th className="pb-3 px-2 w-10 text-center">#</th>
              <th className="pb-3 px-2 w-64">AS NAME / ASN</th>
              <th className="pb-3 px-2">TRAFFIC GAUGE</th>
              <th className="pb-3 px-2 w-32 text-right">TREND (24H)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((row, index) => (
              <tr 
                key={row.id} 
                className="border-b border-[rgba(37,95,56,0.15)] last:border-0 hover:bg-[rgba(37,95,56,0.1)] cursor-pointer transition-colors"
                onClick={() => navigate('/drilldown/neighbor-as')}
              >
                <td className="py-5 px-2 text-center text-[#71717b] text-[12px] font-['JetBrains_Mono']">{index + 1}</td>
                <td className="py-5 px-2 text-[#d4d4d8] text-[13px] font-medium truncate pr-4">{row.asn}</td>
                <td className="py-5 px-2">
                  <div className="w-full pr-8">
                    <TrafficGauge min={row.min || 0} max={row.max} current={row.value} />
                  </div>
                </td>
                <td className="py-5 px-2 text-right text-[12px] font-['JetBrains_Mono'] font-medium" style={{ color: row.trend === 'up' ? '#1F7D53' : '#ff3b30' }}>
                  {row.percentage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
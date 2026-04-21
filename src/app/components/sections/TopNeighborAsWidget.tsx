import { useNavigate } from 'react-router-dom';
import { PanelHeader } from '../ui/PanelHeader';
import { TrafficGauge } from '../ui/TrafficGauge';

export function TopNeighborAsWidget({ data }: { data: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#09090b] rounded-lg border border-[#27272a] shadow-lg flex flex-col hover:border-[rgba(43,127,255,0.3)] transition-colors h-full">
      {/* Cukup kirim title dan onDrillDown saja */}
      <PanelHeader 
        title="TOP 10 NEIGHBOR AS IN" 
        onDrillDown={() => navigate('/drilldown/neighbor-as')} 
      />
      <div className="p-4 flex-1 flex flex-col">
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="border-b border-[#27272a] text-[#71717b] text-[10px] uppercase font-['Inter'] tracking-wider">
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
                className="border-b border-[rgba(39,39,42,0.3)] last:border-0 hover:bg-[rgba(24,24,27,0.4)] cursor-pointer transition-colors"
                onClick={() => navigate('/drilldown/neighbor-as')}
              >
                <td className="py-5 px-2 text-center text-[#71717b] text-[12px] font-['JetBrains_Mono']">{index + 1}</td>
                <td className="py-5 px-2 text-[#d4d4d8] text-[13px] font-medium truncate pr-4">{row.asn}</td>
                <td className="py-5 px-2">
                  <div className="w-full pr-8">
                    <TrafficGauge min={row.min || 0} max={row.max} current={row.value} />
                  </div>
                </td>
                <td className="py-5 px-2 text-right text-[12px] font-['JetBrains_Mono'] font-medium" style={{ color: row.trend === 'up' ? '#00BC7D' : '#ff2056' }}>
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
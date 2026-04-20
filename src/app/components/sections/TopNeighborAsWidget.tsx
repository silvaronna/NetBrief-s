import { useNavigate } from 'react-router-dom';
import { PanelHeader } from '../ui/PanelHeader';
import { TrafficGauge } from '../ui/TrafficGauge';

export function TopNeighborAsWidget({ data }: { data: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#09090b] rounded-lg border border-[#27272a] shadow-lg flex flex-col hover:border-[rgba(43,127,255,0.3)] transition-colors">
      <PanelHeader title="Top 10 Neighbor AS IN" onDrillDown={() => navigate('/drilldown/neighbor-as')} />
      <div className="p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#27272a] text-[#71717b] text-[10px] uppercase font-['Inter'] tracking-wider">
              <th className="pb-3 px-2 w-8 text-center">#</th>
              <th className="pb-3 px-2 w-56">AS Name / ASN</th>
              <th className="pb-3 px-2 flex-grow">Traffic Gauge</th>
              <th className="pb-3 px-2 w-32 text-right">Trend (24h)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((row, idx) => (
              <tr key={row.id} className="border-b border-[rgba(39,39,42,0.3)] last:border-0 hover:bg-[rgba(24,24,27,0.4)] cursor-pointer transition-colors" onClick={() => navigate('/drilldown/neighbor-as')}>
                <td className="py-3 px-2 text-[#71717b] text-[12px] font-['JetBrains_Mono'] text-center">{idx + 1}</td>
                <td className="py-3 px-2 text-[#d4d4d8] text-[13px] font-medium">{row.asn}</td>
                <td className="py-3 px-2">
                  <div className="w-full">
                    <TrafficGauge 
                      min={row.min} 
                      max={row.max} 
                      current={row.rate}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-right text-[12px] font-['JetBrains_Mono'] font-medium" style={{ color: row.trend === 'up' ? '#00BC7D' : '#ff2056' }}>
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

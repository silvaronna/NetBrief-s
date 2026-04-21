import { useNavigate } from 'react-router-dom';
import { PanelHeader } from '../ui/PanelHeader';

export function LatencyCongestionWidget({ data }: { data: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#09090b] rounded-lg border border-[#27272a] shadow-lg flex flex-col hover:border-[rgba(43,127,255,0.3)] transition-colors">
      <PanelHeader 
        title="Latency & Congestion Watch" 
        onDrillDown={() => navigate('/drilldown/latency')}
      />
      <div className="p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#27272a] text-[#71717b] text-[10px] uppercase font-['Inter'] tracking-wider">
              <th className="pb-3 px-2 font-medium">Link Name</th>
              <th className="pb-3 px-2 font-medium">Interface</th>
              <th className="pb-3 px-2 font-medium text-right">Current</th>
              <th className="pb-3 px-2 font-medium text-right">Max</th>
              <th className="pb-3 px-2 font-medium text-right">Avg</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((row) => (
              <tr 
                key={row.id} 
                className="border-b border-[rgba(39,39,42,0.3)] last:border-0 hover:bg-[rgba(24,24,27,0.4)] cursor-pointer transition-colors"
                onClick={() => navigate('/drilldown/latency')}
              >
                <td className="py-3 px-2 text-[#d4d4d8] text-[13px] font-medium">{row.link}</td>
                <td className="py-3 px-2 text-[#9f9fa9] text-[12px] font-['JetBrains_Mono']">{row.interface}</td>
                <td className="py-3 px-2 text-right text-[12px] font-['JetBrains_Mono'] font-medium" style={{ color: row.isCongested ? '#ff637e' : '#d4d4d8' }}>{row.current}</td>
                <td className="py-3 px-2 text-right text-[#9f9fa9] text-[12px] font-['JetBrains_Mono']">{row.max}</td>
                <td className="py-3 px-2 text-right text-[#9f9fa9] text-[12px] font-['JetBrains_Mono']">{row.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { useNavigate } from 'react-router-dom';
import { PanelHeader } from '../ui/PanelHeader';
import { MiniBar } from '../ui/MiniBar';

export function Traffic3ALinksWidget({ data }: { data: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#09090b] rounded-lg border border-[#27272a] shadow-lg flex flex-col hover:border-[rgba(43,127,255,0.3)] transition-colors">
      <PanelHeader title="Top 10 Traffic 3A Links" onDrillDown={() => navigate('/drilldown/3a-links')} />
      <div className="p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#27272a] text-[#71717b] text-[10px] uppercase font-['Inter']">
              <th className="pb-2 w-8">#</th>
              <th className="pb-2 w-64">Link Name</th>
              <th className="pb-2">Utilization</th>
              <th className="pb-2 w-32">Trend (24h)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((row, idx) => (
              <tr key={row.id} className="border-b border-[rgba(39,39,42,0.3)] last:border-0 hover:bg-[rgba(24,24,27,0.4)] cursor-pointer" onClick={() => navigate('/drilldown/3a-links')}>
                <td className="py-2.5 text-[#71717b] text-[12px] font-['JetBrains_Mono']">{idx + 1}</td>
                <td className="py-2.5 text-[#d4d4d8] text-[13px]">{row.link}</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-4">
                    <span className="text-[#9f9fa9] text-[12px] w-16">{row.value}</span>
                    <MiniBar value={row.numericValue} max={1500} />
                  </div>
                </td>
                <td className="py-2.5 text-[12px] font-['JetBrains_Mono'] font-medium" style={{ color: row.trend === 'up' ? '#00BC7D' : '#ff2056' }}>
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

import { useNavigate } from 'react-router-dom';
import { PanelHeader } from '../ui/PanelHeader';

export function Traffic3ALinksWidget({ data }: { data: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#09090b] rounded-lg border border-[#27272a] shadow-lg flex flex-col hover:border-[rgba(43,127,255,0.3)] transition-colors">
      <PanelHeader title="Top 10 Traffic 3A Links" onDrillDown={() => navigate('/drilldown/3a-links')} />
      <div className="p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#27272a] text-[#71717b] text-[10px] uppercase font-['Inter'] tracking-wider">
              <th className="pb-3 px-2 w-48">Router Name</th>
              <th className="pb-3 px-2 w-32">Interface</th>
              <th className="pb-3 px-2 flex-grow">Interface Description</th>
              <th className="pb-3 px-2 w-28 text-right">Util In (%)</th>
              <th className="pb-3 px-2 w-28 text-right">Util Out (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((row) => (
              <tr key={row.id} className="border-b border-[rgba(39,39,42,0.3)] last:border-0 hover:bg-[rgba(24,24,27,0.4)] cursor-pointer transition-colors" onClick={() => navigate('/drilldown/3a-links')}>
                <td className="py-3 px-2 text-[#d4d4d8] text-[13px] font-medium">{row.router}</td>
                <td className="py-3 px-2 text-[#9f9fa9] text-[12px] font-['JetBrains_Mono']">{row.interface}</td>
                <td className="py-3 px-2 text-[#a1a1a6] text-[12px]">{row.description}</td>
                <td className="py-3 px-2 text-right text-[12px] font-['JetBrains_Mono'] font-medium text-[#e4e4e7]">{row.util_in.toFixed(1)}%</td>
                <td className="py-3 px-2 text-right text-[12px] font-['JetBrains_Mono'] font-medium text-[#e4e4e7]">{row.util_out.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

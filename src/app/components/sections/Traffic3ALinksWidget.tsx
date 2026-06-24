import { useNavigate } from 'react-router-dom';
import { PanelHeader } from '../ui/PanelHeader';

export function Traffic3ALinksWidget({ data }: { data: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#27391C] rounded-xl border border-[#255F38] shadow-2xl flex flex-col hover:border-[#1F7D53] hover:shadow-[0_4px_25px_rgba(31,125,83,0.15)] transition-all duration-300 relative overflow-hidden group">
      {/* Premium indicator top line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#1F7D53]/60 to-transparent group-hover:via-[#1F7D53] transition-all duration-500" />
      <div className="pt-1">
        <PanelHeader 
          title="Top 10 Traffic 3A Links" 
          onDrillDown={() => navigate('/drilldown/3a-links')} 
        />
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="border-b border-[#255F38] text-[#a1a1aa] text-[10px] uppercase font-['Inter'] tracking-wider">
              <th className="pb-3 px-2 w-10 text-center">#</th>
              <th className="pb-3 px-2 w-40">Link Name</th>
              <th className="pb-3 px-2 w-32">Interface</th>
              <th className="pb-3 px-2 flex-grow">Description</th>
              <th className="pb-3 px-2 w-28 text-right">Util In (%)</th>
              <th className="pb-3 px-2 w-28 text-right">Util Out (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((row, index) => (
              <tr 
                key={row.id} 
                className="border-b border-[rgba(37,95,56,0.15)] last:border-0 hover:bg-[rgba(37,95,56,0.1)] cursor-pointer transition-colors" 
                onClick={() => navigate('/drilldown/3a-links')}
              >
                <td className="py-3 px-2 text-center text-[#71717b] text-[12px] font-['JetBrains_Mono']">{index + 1}</td>
                <td className="py-3 px-2 text-[#d4d4d8] text-[13px] font-medium">{row.link}</td>
                <td className="py-3 px-2 text-[#9f9fa9] text-[12px] font-['JetBrains_Mono']">{row.interface}</td>
                <td className="py-3 px-2 text-[#a1a1aa] text-[12px] truncate max-w-[200px]">{row.description}</td>
                <td className="py-3 px-2 text-right text-[12px] font-['JetBrains_Mono'] font-medium text-[#e4e4e7]">{row.util_in_pct.toFixed(1)}%</td>
                <td className="py-3 px-2 text-right text-[12px] font-['JetBrains_Mono'] font-medium text-[#e4e4e7]">{row.util_out_pct.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
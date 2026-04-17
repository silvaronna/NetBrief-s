import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function LatencyCongestionWidget({ data }: { data: any }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#09090b] rounded-lg border border-[#27272a] shadow-lg flex flex-col hover:border-[rgba(43,127,255,0.3)] transition-colors">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272a] group cursor-pointer" onClick={() => navigate('/drilldown/latency')}>
        <div className="flex items-center gap-3">
          <h3 className="font-['Inter'] font-semibold text-[14px] text-[#f4f4f5] uppercase tracking-wide group-hover:text-[#2b7fff] transition-colors">Latency Congestion</h3>
          <span className="bg-[rgba(255,32,86,0.15)] border border-[rgba(255,32,86,0.3)] text-[#ff637e] text-[10px] px-2 py-0.5 rounded font-medium">
            &gt; {data.thresholdPercentage}% Increase
          </span>
        </div>
        <ChevronRight size={16} className="text-[#71717b] group-hover:text-[#f4f4f5]" />
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#27272a] text-[#71717b] text-[10px] uppercase font-['Inter']">
              <th className="pb-2 w-8">#</th>
              {data.columns.map((col: any) => (
                <th key={col.key} className="pb-2">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.dataSource.map((row: any, idx: number) => (
              <tr key={row.id} className="border-b border-[rgba(39,39,42,0.3)] last:border-0 hover:bg-[rgba(24,24,27,0.4)] cursor-pointer" onClick={() => navigate('/drilldown/latency')}>
                <td className="py-2.5 text-[#71717b] text-[12px] font-['JetBrains_Mono']">{idx + 1}</td>
                <td className="py-2.5 text-[#d4d4d8] text-[13px]">{row.link}</td>
                <td className="py-2.5 text-[#9f9fa9] text-[12px]">{row.interface}</td>
                <td className="py-2.5 text-[#f4f4f5] text-[12px] font-medium" style={{ color: row.isCongested ? '#ff637e' : '#d4d4d8' }}>{row.current}</td>
                <td className="py-2.5 text-[#9f9fa9] text-[12px]">{row.min}</td>
                <td className="py-2.5 text-[#9f9fa9] text-[12px]">{row.max}</td>
                <td className="py-2.5 text-[#9f9fa9] text-[12px]">{row.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { PanelHeader } from '../ui/PanelHeader';
import { MiniBar } from '../ui/MiniBar';

const parseValue = (valStr: string) => {
  if (!valStr) return 0;
  const num = parseFloat(valStr);
  return valStr.includes('TB') ? num * 1000 : valStr.includes('MB') ? num / 1000 : num;
};

export function TopNeighborAsWidget({ data }: { data: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#09090b] rounded-lg border border-[#27272a] shadow-lg flex flex-col hover:border-[rgba(43,127,255,0.3)] transition-colors">
      <PanelHeader title="Top 10 Neighbor AS IN" onDrillDown={() => navigate('/drilldown/neighbor-as')} />
      <div className="p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#27272a] text-[#71717b] text-[10px] uppercase font-['Inter']">
              <th className="pb-2 w-8">#</th>
              <th className="pb-2 w-64">AS Name / ASN</th>
              <th className="pb-2 w-[350px]">Traffic</th> {/* Lebarkan kolom traffic di sini */}
              <th className="pb-2 text-right">Trend (24h)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((row, idx) => {
              const maxHistory = parseValue(row.max);
              return (
                <tr key={row.id} className="border-b border-[rgba(39,39,42,0.3)] last:border-0 hover:bg-[rgba(24,24,27,0.4)] cursor-pointer" onClick={() => navigate('/drilldown/neighbor-as')}>
                  <td className="py-2.5 text-[#71717b] text-[12px] font-['JetBrains_Mono']">{idx + 1}</td>
                  <td className="py-2.5 text-[#d4d4d8] text-[13px]">{row.asn}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-4 pr-10"> {/* Tambahkan padding kanan agar tidak terlalu nempel */}
                      <span className="text-[#9f9fa9] text-[12px] w-16 shrink-0">{row.value}</span>
                      <MiniBar current={row.numericValue} maxHistory={maxHistory} absoluteMax={4000} />
                    </div>
                  </td>
                  <td className="py-2.5 text-right text-[12px] font-['JetBrains_Mono'] font-medium" style={{ color: row.trend === 'up' ? '#00BC7D' : '#ff2056' }}>
                    {row.percentage}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
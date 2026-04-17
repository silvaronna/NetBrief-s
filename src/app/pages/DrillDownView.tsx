import { useParams } from 'react-router-dom';
import { TRAFFIC_TOP_NEIGHBOR_AS, TRAFFIC_3A_LINKS, LATENCY_CONGESTION } from '../../data';
import { DetailTemplate, ColumnDef } from '../components/layout/DetailTemplate';

const parseValue = (valStr: string) => {
  if (!valStr) return 0;
  const num = parseFloat(valStr);
  return valStr.includes('TB') ? num * 1000 : valStr.includes('MB') ? num / 1000 : num;
};

export function DrillDownView() {
  const { type } = useParams();

  const getSourceData = () => {
    switch(type) {
      case 'neighbor-as': return { data: TRAFFIC_TOP_NEIGHBOR_AS.dataSource, title: 'Top 10 Neighbor AS IN Detailed', isTraffic: true };
      case '3a-links': return { data: TRAFFIC_3A_LINKS.dataSource, title: '3A Links Utilization Detailed', isTraffic: true };
      case 'latency': return { data: LATENCY_CONGESTION.dataSource, title: 'Latency Congestion Detailed', isTraffic: false };
      case 'aggregator': return { data: TRAFFIC_TOP_NEIGHBOR_AS.dataSource, title: 'Top 10 Drill-in Source AS', isTraffic: true };
      default: return { data: [], title: 'Detailed View', isTraffic: true };
    }
  };

  const { data, title, isTraffic } = getSourceData();

  let columns: ColumnDef[] = [];

if (type === 'neighbor-as' || type === 'aggregator' || type === '3a-links') {
    columns = [
      { 
        key: 'name', 
        label: type === '3a-links' ? 'Link Name' : 'AS Name / ASN',
        render: (row) => <span className="text-[13px] font-['Inter'] text-[#d4d4d8] font-medium">{row.asn || row.link}</span>
      },
      { 
        key: 'rate', 
        label: 'Current Rate',
        render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#f4f4f5]">{row.rate}</span>
      },
      { 
        key: 'range', 
        label: 'Min / Current / Max',
        render: (row) => {
          const absoluteMax = type === '3a-links' ? 2000 : 4000;
          const maxHistory = parseValue(row.max);
          const current = row.numericValue;
          
          const maxPct = Math.min(100, (maxHistory / absoluteMax) * 100);
          const currentPct = Math.max(0, Math.min(100, (current / maxHistory) * 100));

          return (
            <div className="grid grid-cols-[60px_minmax(120px,200px)_60px] items-center gap-3">
              {/* Teks Minimal */}
              <span className="text-[11px] text-[#71717b] text-right font-['JetBrains_Mono']">{row.min}</span>
              
              {/* Pipa Custom untuk DrillDown */}
              <div className="w-full h-2 bg-[#18181b] rounded-full overflow-hidden relative">
                 <div className="absolute top-0 left-0 h-full bg-[#3f3f46] rounded-full overflow-hidden" style={{ width: `${maxPct}%` }}>
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] rounded-full" style={{ width: `${currentPct}%` }} />
                 </div>
              </div>

              {/* Teks Maksimal */}
              <span className="text-[11px] text-[#71717b] text-left font-['JetBrains_Mono']">{row.max}</span>
            </div>
          )
        }
      },
      { 
        key: 'percentage', 
        label: 'Trend (24h)',
        render: (row) => (
          <span className="text-[12px] font-['JetBrains_Mono'] font-medium" style={{ color: row.trend === 'up' ? '#00BC7D' : '#ff2056' }}>
            {row.percentage}
          </span>
        )
      }
    ];
  } else if (type === 'latency') {
    columns = [
      { key: 'link', label: 'Link Name', render: (row) => <span className="text-[13px] font-['Inter'] text-[#d4d4d8] font-medium">{row.link}</span> },
      { key: 'interface', label: 'Interface', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#9f9fa9]">{row.interface}</span> },
      { key: 'current', label: 'Current', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] font-medium" style={{ color: row.isCongested ? '#ff637e' : '#d4d4d8' }}>{row.current}</span> },
      { key: 'max', label: 'Max', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#9f9fa9]">{row.max}</span> },
      { key: 'min', label: 'Min', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#9f9fa9]">{row.min}</span> },
      { key: 'avg', label: 'Avg', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#9f9fa9]">{row.avg}</span> }
    ];
  }

  return (
    <DetailTemplate 
      title={title}
      data={data}
      columns={columns}
      isTraffic={isTraffic}
    />
  );
}
import { useParams } from 'react-router-dom';
import { TRAFFIC_TOP_NEIGHBOR_AS, TRAFFIC_3A_LINKS, LATENCY_CONGESTION } from '../../data';
import { DetailTemplate, ColumnDef } from '../components/layout/DetailTemplate';
import { TrafficGauge } from '../components/ui/TrafficGauge';

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

  if (type === 'neighbor-as' || type === 'aggregator') {
    columns = [
      { key: 'name', label: 'AS Name / ASN', render: (row) => <span className="text-[13px] font-['Inter'] text-[#d4d4d8] font-medium">{row.asn || row.link}</span> },
      { key: 'gauge', label: 'Traffic Gauge', render: (row) => <div className="w-64"><TrafficGauge min={row.min} max={row.max} current={row.rate} /></div> },
      { key: 'min', label: 'Min', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#9f9fa9]">{row.min}</span> },
      { key: 'max', label: 'Max', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#9f9fa9]">{row.max}</span> },
      { key: 'percentage', label: 'Trend', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] font-medium" style={{ color: row.trend === 'up' ? '#00BC7D' : '#ff2056' }}>{row.percentage}</span> }
    ];
  } else if (type === '3a-links') {
    // --------------------------------------------------------
    // Tampilan Spesifik 3A-Links: Tanpa Gauge, Fokus Pada Rate
    // --------------------------------------------------------
    columns = [
      { key: 'link', label: 'Link Name', render: (row) => <span className="text-[13px] font-['Inter'] text-[#d4d4d8] font-medium whitespace-nowrap">{row.link}</span> },
      { key: 'interface', label: 'Interface Name', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#9f9fa9]">{row.interface}</span> },
      { key: 'description', label: 'Interface Description', render: (row) => <span className="text-[12px] text-[#a1a1a6]">{row.description}</span> },
      { key: 'util_in_pct', label: 'Util In (%)', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#e4e4e7]">{row.util_in_pct.toFixed(1)}%</span> },
      { key: 'util_in_rate', label: 'Util In (Rate)', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#0ea5e9] font-medium">{row.util_in_rate}</span> },
      { key: 'util_out_pct', label: 'Util Out (%)', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#e4e4e7]">{row.util_out_pct.toFixed(1)}%</span> },
      { key: 'util_out_rate', label: 'Util Out (Rate)', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] text-[#8b5cf6] font-medium">{row.util_out_rate}</span> },
      { key: 'trend', label: 'Trend', render: (row) => <span className="text-[12px] font-['JetBrains_Mono'] font-medium" style={{ color: row.trend === 'up' ? '#00BC7D' : '#ff2056' }}>{row.percentage}</span> }
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

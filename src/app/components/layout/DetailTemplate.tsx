import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { CHART_DATA_GENERATOR } from '../../../data/';
import { TimeIntervalSelector } from '../ui/TimeIntervalSelector';
import { useTimeInterval } from '../../hooks/useTimeInterval';

function formatBytes(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)} TB`;
  if (value >= 1) return `${Math.round(value)} GB`;
  return `${Math.round(value * 1000)} MB`;
}

function CustomTooltip({ active, payload, label, isTraffic }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[rgba(9,9,11,0.9)] border border-[#27272a] rounded-lg p-3 shadow-xl backdrop-blur-sm">
        <p className="text-[#d4d4d8] text-[12px] font-['JetBrains_Mono'] mb-2">{label}</p>
        <div className="flex flex-col gap-1">
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-item-${index}-${entry.dataKey}`} className="flex items-center gap-3 justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-[#9f9fa9] text-[11px] font-['Inter'] uppercase truncate max-w-[150px]">
                  {entry.name}
                </span>
              </div>
              <span className="text-[#f4f4f5] text-[12px] font-['JetBrains_Mono'] font-bold">
                {isTraffic ? formatBytes(entry.value) : `${Math.round(entry.value)}ms`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export type ColumnDef = {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'right' | 'center';
  render?: (row: any) => React.ReactNode;
};

export interface DetailTemplateProps {
  title: string;
  data: any[];
  columns: ColumnDef[];
  isTraffic?: boolean;
}

export function DetailTemplate({ title, data, columns, isTraffic = true }: DetailTemplateProps) {
  const navigate = useNavigate();
  const { interval, setInterval } = useTimeInterval('1h' as any);

  // State to manage selected rows
  const [selectedRows, setSelectedRows] = useState<Record<string, { color: string }>>({
    '1': { color: '#0EA5E9' },
    '2': { color: '#8B5CF6' }
  });

  const baseChartData = useMemo(() => {
    return CHART_DATA_GENERATOR(48, interval as any);
  }, [interval]);

  const chartData = useMemo(() => {
    return baseChartData.map(point => {
      const newPoint: any = { timestamp: point.timestamp, unix: point.unix };
      Object.keys(selectedRows).forEach(rowId => {
        const row = data.find(r => r.id === rowId);
        if (row) {
          const numValue = (row as any).numericValue || parseInt((row as any).current) || parseInt((row as any).traffic) || 1000;
          // Seed the random walk based on the point's unix time and rowId so it's consistent
          const seed = point.unix + parseInt(rowId);
          const pseudoRandom = Math.abs(Math.sin(seed) * 10000) % 1;
          const noise = (pseudoRandom - 0.5) * (numValue * 0.2); 
          newPoint[rowId] = Math.round((Math.max(0, numValue + noise)) * 100) / 100;
        }
      });
      return newPoint;
    });
  }, [selectedRows, data, baseChartData]);

  const toggleRow = (id: string) => {
    setSelectedRows(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        next[id] = { color: randomColor };
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded border border-[#27272a] bg-[#09090b] flex items-center justify-center text-[#9f9fa9] hover:bg-[#27272a] hover:text-[#f4f4f5] transition-all"
        >
          <ArrowLeft size={16} />
        </button>
        <h2 className="text-[#f4f4f5] font-['Inter'] font-semibold text-[16px] uppercase tracking-wide">
          {title}
        </h2>
      </div>

      <div className="bg-[#09090b] rounded-lg border border-[#27272a] shadow-lg flex flex-col flex-1 min-h-0">
        {/* Controls */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#27272a] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#71717b] uppercase tracking-wide">Interval</span>
            <TimeIntervalSelector 
              selectedInterval={interval} 
              onIntervalChange={setInterval}
            />
          </div>
          <button className="w-8 h-8 rounded border border-[#27272a] flex items-center justify-center text-[#71717b] hover:bg-[#27272a] hover:text-[#f4f4f5] transition-all">
            <ChevronRight size={14} className="rotate-90" />
          </button>
        </div>

        {/* Stacked Area Chart */}
        <div className="h-[250px] border-b border-[#27272a] p-5 shrink-0 bg-[rgba(24,24,27,0.2)]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="unix" 
                tickFormatter={(unix) => new Date(unix).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                stroke="#71717b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
              />
              <YAxis 
                stroke="#71717b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => isTraffic ? formatBytes(value) : `${value}ms`}
              />
              <Tooltip content={<CustomTooltip isTraffic={isTraffic} />} />
              {Object.keys(selectedRows)
                .filter(rowId => data.some(r => r.id === rowId))
                .map((rowId) => {
                  const row = data.find(r => r.id === rowId);
                  const name = (row as any)?.asn || (row as any)?.link || (row as any)?.peer || `ID: ${rowId}`;
                  return (
                    <Area 
                      key={`area-${rowId}`}
                      type="monotone" 
                      dataKey={rowId} 
                      name={name}
                      stroke={selectedRows[rowId].color} 
                      fill={selectedRows[rowId].color}
                      fillOpacity={0.2}
                      strokeWidth={2}
                      stackId="1"
                      activeDot={{ r: 4, strokeWidth: 0 }}
                      animationDuration={300}
                    />
                  );
                })}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Drill-down Table */}
        <div className="flex-1 overflow-auto relative">
          <table className="w-full min-w-max text-left border-collapse">
            <thead className="sticky top-0 bg-[rgba(24,24,27,0.95)] z-10">
              <tr>
                <th className="h-10 px-5 w-14 border-b border-[#27272a]"></th>
                {columns.map((col) => (
                  <th 
                    key={col.key} 
                    className={`h-10 px-5 font-medium text-[#71717b] text-[12px] uppercase border-b border-[#27272a] ${col.width || ''}`}
                    style={{ textAlign: col.align || 'left' }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row: any) => {
                const isSelected = !!selectedRows[row.id];
                const color = isSelected ? selectedRows[row.id].color : 'transparent';
                
                return (
                  <tr key={`table-row-${row.id}`} className="border-b border-[rgba(39,39,42,0.3)] hover:bg-[rgba(24,24,27,0.4)] transition-colors h-[48px]">
                    <td className="px-5 cursor-pointer" onClick={() => toggleRow(row.id)}>
                      <div 
                        className={`w-4 h-4 rounded-sm border ${isSelected ? 'border-transparent' : 'border-[#71717b]'} flex items-center justify-center transition-all`}
                        style={{ backgroundColor: isSelected ? color : 'transparent' }}
                      >
                        {isSelected && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#09090b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </td>
                    {columns.map((col) => (
                      <td 
                        key={col.key} 
                        className="px-5"
                        style={{ textAlign: col.align || 'left' }}
                      >
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

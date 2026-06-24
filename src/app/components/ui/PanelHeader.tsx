import { ChevronRight } from 'lucide-react';
import { TimeIntervalSelector } from './TimeIntervalSelector';
import { TimeIntervalType } from '../../hooks/useTimeInterval';

interface PanelHeaderProps {
  title: string;
  onDrillDown: () => void;
  // Tambahkan props untuk interval
  selectedInterval?: TimeIntervalType;
  onIntervalChange?: (interval: TimeIntervalType) => void;
}

export function PanelHeader({ 
  title, 
  onDrillDown, 
  selectedInterval, 
  onIntervalChange 
}: PanelHeaderProps) {
  return (
    <div 
      className="flex items-center justify-between px-4 py-3 border-b border-[#255F38] group cursor-pointer" 
      onClick={onDrillDown}
    >
      <h3 className="font-['Inter'] font-semibold text-[13px] text-[#f4f4f5] uppercase tracking-wider group-hover:text-[#1F7D53] transition-colors">
        {title}
      </h3>
      
      <div className="flex items-center gap-3">
        {/* Render selector jika props tersedia */}
        {selectedInterval && onIntervalChange && (
          <TimeIntervalSelector 
            selectedInterval={selectedInterval}
            onIntervalChange={onIntervalChange}
          />
        )}

        <button className="w-6 h-6 rounded border border-[#255F38] flex items-center justify-center text-[#a1a1aa] group-hover:bg-[#255F38] group-hover:text-[#ffffff] group-hover:border-[#1F7D53] transition-all">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
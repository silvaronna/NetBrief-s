import { ChevronRight } from 'lucide-react';

export function PanelHeader({ title, onDrillDown }: { title: string, onDrillDown: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272a] group cursor-pointer" onClick={onDrillDown}>
      <h3 className="font-['Inter'] font-semibold text-[14px] text-[#f4f4f5] uppercase tracking-wide group-hover:text-[#2b7fff] transition-colors">
        {title}
      </h3>
      <div className="flex items-center gap-3">
        {/* Inline Interval Selector */}
        <div className="flex bg-[rgba(24,24,27,0.5)] border border-[#27272a] rounded overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <button className="px-3 py-1 text-[11px] font-medium text-[#f4f4f5] bg-[rgba(43,127,255,0.15)] transition-colors hover:bg-[rgba(43,127,255,0.25)]">1H</button>
          <button className="px-3 py-1 text-[11px] font-medium text-[#71717b] border-l border-[#27272a] transition-colors hover:text-[#d4d4d8] hover:bg-[rgba(255,255,255,0.05)]">24H</button>
          <button className="px-3 py-1 text-[11px] font-medium text-[#71717b] border-l border-[#27272a] transition-colors hover:text-[#d4d4d8] hover:bg-[rgba(255,255,255,0.05)]">7D</button>
        </div>
        <button className="w-6 h-6 rounded border border-[#27272a] flex items-center justify-center text-[#71717b] group-hover:bg-[#27272a] group-hover:text-[#f4f4f5] transition-all">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
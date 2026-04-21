'use client';

import { TimeIntervalType } from '../../hooks/useTimeInterval';

export interface TimeIntervalSelectorProps {
  selectedInterval: TimeIntervalType;
  onIntervalChange: (interval: TimeIntervalType) => void;
  className?: string;
}

const INTERVAL_OPTIONS: { value: TimeIntervalType; label: string; title: string }[] = [
  { value: '5m', label: '5m', title: 'Granularitas 5 Menit' },
  { value: '30m', label: '30m', title: 'Granularitas 30 Menit' },
  { value: '1h', label: '1h', title: 'Granularitas 1 Jam' },
];

export function TimeIntervalSelector({
  selectedInterval,
  onIntervalChange,
  className = '',
}: TimeIntervalSelectorProps) {
  return (
    <div
      className={`inline-flex bg-[#18181b] border border-[#27272a] p-0.5 rounded shadow-sm ${className}`}
      role="group"
    >
      {INTERVAL_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={(e) => {
            e.stopPropagation(); // Mencegah trigger drill-down jika dipasang di PanelHeader
            onIntervalChange(option.value);
          }}
          title={option.title}
          className={`px-2.5 py-1 text-[10px] font-bold font-['JetBrains_Mono'] transition-all duration-200 rounded-[2px] ${
            selectedInterval === option.value
              ? 'bg-[#27272a] text-[#0ea5e9]'
              : 'text-[#71717b] hover:text-[#d4d4d8] hover:bg-[rgba(255,255,255,0.03)]'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
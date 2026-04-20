'use client';

import { TimeIntervalType } from '../../hooks/useTimeInterval';

export interface TimeIntervalSelectorProps {
  selectedInterval: TimeIntervalType;
  onIntervalChange: (interval: TimeIntervalType) => void;
  className?: string;
}

const INTERVAL_OPTIONS: { value: TimeIntervalType; label: string; title: string }[] = [
  { value: '1H', label: '1H', title: 'Last 1 Hour' },
  { value: '24H', label: '24H', title: 'Last 24 Hours' },
  { value: '7D', label: '7D', title: 'Last 7 Days' },
];

/**
 * TimeIntervalSelector Component
 * 
 * Inline button group for selecting time intervals.
 * Replaces the dropdown-based selector for improved accessibility
 * and reduced empty space in table headers.
 * 
 * Features:
 * - Keyboard accessible (Tab navigation, Enter/Space to select)
 * - Clear visual feedback for selected state
 * - Tooltips for each interval option
 */
export function TimeIntervalSelector({
  selectedInterval,
  onIntervalChange,
  className = '',
}: TimeIntervalSelectorProps) {
  return (
    <div
      className={`inline-flex gap-1 bg-gray-800 p-1 rounded-md ${className}`}
      role="group"
      aria-label="Time interval selector"
    >
      {INTERVAL_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onIntervalChange(option.value)}
          title={option.title}
          aria-pressed={selectedInterval === option.value}
          className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 ${
            selectedInterval === option.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'bg-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

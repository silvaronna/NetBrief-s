'use client';

import { useTrafficGaugeCalculations, parseTrafficValue } from '../../hooks/useTrafficGaugeCalculations';

export interface TrafficGaugeProps {
  min: string | number;
  max: string | number;
  current: string | number;
  tooltipPosition?: 'top' | 'bottom';
}

/**
 * TrafficGauge Component
 * 
 * Visualizes traffic as an interactive "pipe" showing:
 * - Historical Min (left anchor)
 * - Historical Max (right anchor)
 * - Current Traffic (colored fill indicator)
 * 
 * The bar represents the full range from Min to Max, with the fill
 * showing where the Current traffic sits within that range.
 * 
 * Example: If Min=100MB, Max=1000MB, Current=500MB,
 * the fill will show 44.4% (500-100)/(1000-100) of the bar width.
 */
export function TrafficGauge({
  min,
  max,
  current,
  tooltipPosition = 'top',
}: TrafficGaugeProps) {
  const calculations = useTrafficGaugeCalculations(min, max, current);
  const minValue = typeof min === 'string' ? parseTrafficValue(min) : min;
  const maxValue = typeof max === 'string' ? parseTrafficValue(max) : max;

  const minDisplay = typeof min === 'string' ? min : `${min} MB`;
  const maxDisplay = typeof max === 'string' ? max : `${max} MB`;

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Main gauge bar */}
      <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden group cursor-pointer">
        {/* Background: full range from min to max (gray) */}
        <div className="absolute inset-0 h-full bg-gray-700 rounded-full" />
        
        {/* Fill: current traffic within the range (colored) */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-300"
          style={{ width: `${calculations.fillPercentage}%` }}
          aria-label={`Traffic gauge: ${calculations.fillPercentage.toFixed(1)}% of range`}
        />

        {/* Tooltip on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div
            className={`absolute left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-gray-600 z-10 ${
              tooltipPosition === 'top' ? '-top-8' : 'top-full mt-1'
            }`}
          >
            {calculations.fillPercentage.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Min and Max labels */}
      <div className="flex justify-between text-xs text-gray-400">
        <span title={`Minimum: ${minDisplay}`}>{minDisplay}</span>
        <span title={`Maximum: ${maxDisplay}`}>{maxDisplay}</span>
      </div>
    </div>
  );
}

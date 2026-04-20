/**
 * useTrafficGaugeCalculations
 * 
 * Custom hook that encapsulates traffic gauge logic for calculating
 * the position and fill width of the traffic indicator relative to
 * the min-max historical range.
 * 
 * This hook is designed to be easily integrated with backend TSDB data.
 */

export interface TrafficGaugeData {
  min: number;
  max: number;
  current: number;
}

export interface TrafficGaugeCalculations {
  range: number;
  fillPercentage: number;
  isWithinRange: boolean;
}

/**
 * Parse traffic value string (e.g., "1.2 TB", "500 GB") to numeric MB
 */
export function parseTrafficValue(value: string): number {
  const trimmed = value.trim().toUpperCase();
  const match = trimmed.match(/^([\d.]+)\s*(GB|TB|MB|KB)$/);
  
  if (!match) return 0;
  
  const [_, numStr, unit] = match;
  const num = parseFloat(numStr);
  
  switch (unit) {
    case 'TB':
      return num * 1024 * 1024; // TB to MB
    case 'GB':
      return num * 1024; // GB to MB
    case 'MB':
      return num;
    case 'KB':
      return num / 1024; // KB to MB
    default:
      return 0;
  }
}

/**
 * Calculate traffic gauge metrics
 * 
 * Returns:
 * - range: The difference between max and min (the "width" of the gauge)
 * - fillPercentage: How far along the gauge the current value sits (0-100%)
 * - isWithinRange: Whether current falls between min and max
 */
export function useTrafficGaugeCalculations(
  min: number | string,
  max: number | string,
  current: number | string
): TrafficGaugeCalculations {
  // Convert string values to numeric if needed
  const minValue = typeof min === 'string' ? parseTrafficValue(min) : min;
  const maxValue = typeof max === 'string' ? parseTrafficValue(max) : max;
  const currentValue = typeof current === 'string' ? parseTrafficValue(current) : current;

  // Calculate the range (spread between min and max)
  const range = maxValue - minValue;

  // Ensure we don't divide by zero
  if (range <= 0) {
    return {
      range: 0,
      fillPercentage: 0,
      isWithinRange: true,
    };
  }

  // Calculate how far the current value is within the range (as a percentage)
  const offset = currentValue - minValue;
  const fillPercentage = Math.max(0, Math.min(100, (offset / range) * 100));

  // Check if current is actually within the min-max range
  const isWithinRange = currentValue >= minValue && currentValue <= maxValue;

  return {
    range,
    fillPercentage,
    isWithinRange,
  };
}

/**
 * Format numeric traffic value to human-readable format
 */
export function formatTrafficValue(mb: number): string {
  if (mb >= 1024 * 1024) {
    return `${(mb / (1024 * 1024)).toFixed(2)} TB`;
  } else if (mb >= 1024) {
    return `${(mb / 1024).toFixed(2)} GB`;
  } else {
    return `${mb.toFixed(2)} MB`;
  }
}

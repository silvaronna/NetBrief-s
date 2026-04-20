# Implementation Notes: UI Refactor for Neighbor AS Drill-Down

## Quick Start

The refactored UI is live in the application. To see the changes:

1. **Navigate to the drill-down page:**
   - Click on "Top 10 Neighbor AS" in the main dashboard
   - You'll see the new "Interval" selector with `[1H] [24H] [7D]` buttons

2. **Observe the new column structure:**
   - Column 1: AS Name (e.g., "AS32934 (FACEBOOK)")
   - Column 2: Traffic Gauge - the new "pipe" visualization
   - Column 3: Min - historical minimum
   - Column 4: Max - historical maximum
   - Column 5: Trend - colored indicator (green ↑ or red ↓)

3. **Interact with the gauge:**
   - Hover over any Traffic Gauge to see the fill percentage
   - The orange bar shows where current traffic sits between min and max

## Component API Reference

### TrafficGauge Component
```tsx
import { TrafficGauge } from '@/app/components/ui/TrafficGauge';

<TrafficGauge 
  min="800 GB"      // or: 800 (numeric in MB)
  max="1.20 TB"     // or: 1200000 (numeric in MB)
  current="950 GB"  // or: 950000 (numeric in MB)
  tooltipPosition="top"  // optional: 'top' | 'bottom'
/>
```

**Props:**
- `min` (string | number) - Historical minimum traffic
- `max` (string | number) - Historical maximum traffic
- `current` (string | number) - Current traffic value
- `tooltipPosition` (optional) - Position of hover tooltip

### TimeIntervalSelector Component
```tsx
import { TimeIntervalSelector } from '@/app/components/ui/TimeIntervalSelector';

<TimeIntervalSelector 
  selectedInterval="24H"
  onIntervalChange={(interval) => console.log(interval)}
/>
```

**Props:**
- `selectedInterval` (TimeIntervalType) - Current selected: '1H' | '24H' | '7D'
- `onIntervalChange` (callback) - Called when user clicks a button
- `className` (optional) - Additional CSS classes

### useTimeInterval Hook
```tsx
import { useTimeInterval } from '@/app/hooks/useTimeInterval';

const { interval, setInterval, isSelected } = useTimeInterval('24H');

// interval: current selected interval ('1H' | '24H' | '7D')
// setInterval(newInterval): Update selection
// isSelected(interval): Boolean check if interval is selected
```

### useTrafficGaugeCalculations Hook
```tsx
import { useTrafficGaugeCalculations } from '@/app/hooks/useTrafficGaugeCalculations';

const calculations = useTrafficGaugeCalculations(
  '800 GB',      // min
  '1.20 TB',     // max
  '950 GB'       // current
);

// Returns:
// {
//   range: 307200,           // max - min (in MB)
//   fillPercentage: 52.5,    // 0-100, where current sits in range
//   isWithinRange: true      // whether current is between min and max
// }
```

**Helper Functions:**
```tsx
import { parseTrafficValue, formatTrafficValue } from '@/app/hooks/useTrafficGaugeCalculations';

// Parse string to numeric MB
const mb = parseTrafficValue('1.5 GB');  // returns 1536

// Format numeric MB back to human-readable
const str = formatTrafficValue(1536);    // returns "1.50 GB"
```

## Data Structure Expected

The components expect data objects in this format (from TRAFFIC_TOP_NEIGHBOR_AS):

```ts
{
  id: '1',
  asn: 'AS23693 (TSEL23693)',
  rate: '3.31 TB',            // current traffic
  min: '1.2 TB',              // historical minimum
  max: '3.5 TB',              // historical maximum
  percentage: '+43.5%',       // trend indicator
  trend: 'up' | 'down',       // trend direction
  numericValue: 3310,         // numeric value in GB for calculations
}
```

## Integration with Backend

When ready to connect to a TSDB backend:

### Option 1: Replace mock data
```tsx
// In DrillDownView.tsx or a data layer
const { data } = await fetchNeighborASData(interval);
// Expects same structure as TRAFFIC_TOP_NEIGHBOR_AS.dataSource
```

### Option 2: Extend useTrafficGaugeCalculations
```tsx
export function useTrafficGaugeCalculations(
  min: number | string,
  max: number | string,
  current: number | string
) {
  // Can be updated to accept API response
  const apiData = useQuery(['traffic', min, max, current]);
  // ... rest of logic
}
```

### Option 3: Create interval-aware data fetching
```tsx
export function useTrafficDataByInterval(interval: TimeIntervalType) {
  return useQuery(
    ['traffic-data', interval],
    () => api.getNeighborASData(interval)
  );
}
```

Then use in DetailTemplate:
```tsx
const { interval } = useTimeInterval('24H');
const { data } = useTrafficDataByInterval(interval);
```

## Styling & Customization

All components use consistent color scheme:

**Colors (from design):**
- Background Dark: `#09090b`, `#18181b`, `#27272a`
- Text Primary: `#f4f4f5`, `#d4d4d8`
- Text Secondary: `#9f9fa9`, `#71717b`
- Gauge Fill: Orange (`from-orange-500 to-orange-600`)
- Gauge BG: Gray (`#3f3f46`)
- Trend Up: Green (`#00BC7D`)
- Trend Down: Red (`#ff2056`)

To customize:
1. **Gauge colors:** Edit `TrafficGauge.tsx` className for the fill div
2. **Button colors:** Edit `TimeIntervalSelector.tsx` for selected/unselected states
3. **Fonts:** Using `font-['Inter']` and `font-['JetBrains_Mono']` - defined globally

## Performance Notes

- **TrafficGauge:** Pure component, no expensive calculations in render
- **TimeIntervalSelector:** Simple button group, minimal re-renders
- **Calculations:** Move to hooks prevents recalculation on every render
- **Memoization:** Consider `useMemo` for large data lists if performance needed

## Known Limitations & Future Improvements

1. **Current limitations:**
   - Interval selector doesn't filter chart data yet (wired but not filtering)
   - TrafficGauge doesn't animate on value changes
   - No persistence of interval selection across page refreshes

2. **Recommended next steps:**
   - Connect interval selector to chart data refresh logic
   - Add smooth transitions when interval changes
   - Persist selected interval to localStorage/query params
   - Add tooltips showing exact values on gauge hover
   - Support custom intervals beyond fixed 1H/24H/7D

## Debugging

Enable component logging by adding:
```tsx
console.log('[v0] TrafficGauge received:', { min, max, current });
console.log('[v0] Calculations:', calculations);
```

Then remove after debugging.

## Files Reference

```
src/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   └── DetailTemplate.tsx (MODIFIED)
│   │   └── ui/
│   │       ├── TrafficGauge.tsx (NEW)
│   │       └── TimeIntervalSelector.tsx (NEW)
│   ├── hooks/
│   │   ├── useTrafficGaugeCalculations.ts (NEW)
│   │   └── useTimeInterval.ts (NEW)
│   ├── pages/
│   │   └── DrillDownView.tsx (MODIFIED)
│   └── data/
│       └── index.ts (unchanged - contains mock data)
```

## Support & Questions

For questions about implementation:
- Check the REFACTOR_SUMMARY.md for high-level overview
- Review the component JSDoc comments for API details
- Trace through hook logic for calculation details
- Check DrillDownView.tsx for integration example

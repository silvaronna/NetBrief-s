# Component Usage Examples

This document provides practical examples of how to use the new refactored components and hooks.

## Example 1: Basic TrafficGauge Usage

```tsx
import { TrafficGauge } from '@/app/components/ui/TrafficGauge';

export function SimpleGaugeExample() {
  return (
    <div className="p-4 space-y-4">
      {/* With string values */}
      <TrafficGauge 
        min="100 GB"
        max="1.5 TB"
        current="850 GB"
      />

      {/* With numeric values (in MB) */}
      <TrafficGauge 
        min={102400}      // 100 GB in MB
        max={1536000}     // 1.5 TB in MB
        current={870400}  // 850 GB in MB
      />

      {/* With tooltip at bottom */}
      <TrafficGauge 
        min="50 GB"
        max="200 GB"
        current="120 GB"
        tooltipPosition="bottom"
      />
    </div>
  );
}
```

## Example 2: TimeIntervalSelector with State Management

```tsx
import { TimeIntervalSelector } from '@/app/components/ui/TimeIntervalSelector';
import { useTimeInterval } from '@/app/hooks/useTimeInterval';

export function IntervalSelectorExample() {
  const { interval, setInterval, isSelected } = useTimeInterval('24H');

  const handleIntervalChange = (newInterval: '1H' | '24H' | '7D') => {
    setInterval(newInterval);
    console.log(`Switched to ${newInterval} view`);
    // Trigger data refresh here
  };

  return (
    <div className="space-y-4">
      <h2>Current Interval: {interval}</h2>
      
      <TimeIntervalSelector 
        selectedInterval={interval}
        onIntervalChange={handleIntervalChange}
      />

      {/* Display different content based on selected interval */}
      {isSelected('1H') && <p>Showing last 1 hour data...</p>}
      {isSelected('24H') && <p>Showing last 24 hours data...</p>}
      {isSelected('7D') && <p>Showing last 7 days data...</p>}
    </div>
  );
}
```

## Example 3: Using useTrafficGaugeCalculations Hook

```tsx
import { useTrafficGaugeCalculations, parseTrafficValue, formatTrafficValue } from '@/app/hooks/useTrafficGaugeCalculations';

export function CalculationsExample() {
  // Parse string values
  const minMB = parseTrafficValue('500 GB');      // 512000
  const maxMB = parseTrafficValue('2.5 TB');      // 2560000
  const currentMB = parseTrafficValue('1.2 TB');  // 1228800

  // Get calculations
  const { fillPercentage, range, isWithinRange } = useTrafficGaugeCalculations(
    minMB,
    maxMB,
    currentMB
  );

  // Format back to human-readable
  const rangeDisplay = formatTrafficValue(range);

  return (
    <div className="space-y-2">
      <p>Min: {formatTrafficValue(minMB)}</p>
      <p>Max: {formatTrafficValue(maxMB)}</p>
      <p>Current: {formatTrafficValue(currentMB)}</p>
      <p>Range: {rangeDisplay}</p>
      <p>Fill: {fillPercentage.toFixed(1)}%</p>
      <p>Status: {isWithinRange ? 'Normal' : 'Out of range'}</p>
    </div>
  );
}
```

## Example 4: Complete Data Table with Gauges

```tsx
import { TrafficGauge } from '@/app/components/ui/TrafficGauge';

interface TrafficRow {
  id: string;
  asn: string;
  min: string;
  max: string;
  rate: string;
  percentage: string;
  trend: 'up' | 'down';
}

export function TrafficTable({ data }: { data: TrafficRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">AS Name</th>
            <th className="p-3 text-left">Traffic Gauge</th>
            <th className="p-3 text-right">Min</th>
            <th className="p-3 text-right">Max</th>
            <th className="p-3 text-right">Trend</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{row.asn}</td>
              <td className="p-3">
                <div className="w-64">
                  <TrafficGauge 
                    min={row.min}
                    max={row.max}
                    current={row.rate}
                  />
                </div>
              </td>
              <td className="p-3 text-right font-mono">{row.min}</td>
              <td className="p-3 text-right font-mono">{row.max}</td>
              <td className="p-3 text-right">
                <span style={{ color: row.trend === 'up' ? '#00BC7D' : '#ff2056' }}>
                  {row.percentage}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Example 5: Integrating Interval Selection with Data Fetching

```tsx
import { useTimeInterval } from '@/app/hooks/useTimeInterval';
import { TimeIntervalSelector } from '@/app/components/ui/TimeIntervalSelector';
import { useState, useEffect } from 'react';

export function IntervalWithDataFetch() {
  const { interval, setInterval } = useTimeInterval('24H');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data whenever interval changes
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    const intervalInHours = interval === '1H' ? 1 : interval === '24H' ? 24 : 168;
    
    fetch(`/api/traffic-data?hours=${intervalInHours}`)
      .then(res => res.json())
      .then(newData => {
        setData(newData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      });
  }, [interval]);

  return (
    <div className="space-y-4">
      <TimeIntervalSelector 
        selectedInterval={interval}
        onIntervalChange={setInterval}
      />

      {loading && <p>Loading data...</p>}
      {data && <p>Loaded {data.length} records for {interval}</p>}
    </div>
  );
}
```

## Example 6: Advanced: Custom Gauge with Thresholds

```tsx
import { useTrafficGaugeCalculations } from '@/app/hooks/useTrafficGaugeCalculations';
import { TrafficGauge } from '@/app/components/ui/TrafficGauge';

export function AdvancedGaugeWithThresholds() {
  const min = '500 GB';
  const max = '2 TB';
  const current = '1.5 TB';

  const { fillPercentage } = useTrafficGaugeCalculations(min, max, current);

  // Determine warning level
  let warningLevel: 'ok' | 'warning' | 'critical' = 'ok';
  if (fillPercentage >= 80) warningLevel = 'critical';
  else if (fillPercentage >= 60) warningLevel = 'warning';

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <TrafficGauge min={min} max={max} current={current} />
        <span className={`text-sm font-bold ${
          warningLevel === 'critical' ? 'text-red-600' :
          warningLevel === 'warning' ? 'text-yellow-600' :
          'text-green-600'
        }`}>
          {warningLevel === 'critical' ? '🔴 Critical' :
           warningLevel === 'warning' ? '🟡 Warning' :
           '🟢 Normal'}
        </span>
      </div>
      <p className="text-sm text-gray-600">
        {fillPercentage.toFixed(1)}% of capacity used
      </p>
    </div>
  );
}
```

## Example 7: Combining All Components in a Dashboard Widget

```tsx
import React from 'react';
import { TimeIntervalSelector } from '@/app/components/ui/TimeIntervalSelector';
import { useTimeInterval } from '@/app/hooks/useTimeInterval';
import { TrafficGauge } from '@/app/components/ui/TrafficGauge';

export function TrafficDashboardWidget() {
  const { interval, setInterval } = useTimeInterval('24H');

  // Mock data - replace with real API call
  const mockAsData = [
    { 
      id: '1', 
      asn: 'AS32934 (FACEBOOK)',
      min: '800 GB',
      max: '1.20 TB',
      rate: '1.15 TB',
      percentage: '+43.5%',
      trend: 'up' as const
    },
    { 
      id: '2', 
      asn: 'AS15169 (GOOGLE)',
      min: '100 GB',
      max: '850 GB',
      rate: '750 GB',
      percentage: '+32.1%',
      trend: 'up' as const
    },
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-6 text-white space-y-4">
      {/* Header with interval selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Top Neighbor AS</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Interval:</span>
          <TimeIntervalSelector 
            selectedInterval={interval}
            onIntervalChange={setInterval}
          />
        </div>
      </div>

      {/* Data table */}
      <div className="space-y-3">
        {mockAsData.map((row) => (
          <div 
            key={row.id}
            className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 items-center p-3 bg-gray-800 rounded"
          >
            <div className="text-sm font-medium">{row.asn}</div>
            <div className="w-full">
              <TrafficGauge 
                min={row.min}
                max={row.max}
                current={row.rate}
              />
            </div>
            <div className="text-xs text-gray-400">{row.min}</div>
            <div className="text-xs text-gray-400">{row.max}</div>
            <div 
              className="text-sm font-bold text-right"
              style={{ color: row.trend === 'up' ? '#00BC7D' : '#ff2056' }}
            >
              {row.percentage}
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
        <p>Data last updated: {new Date().toLocaleTimeString()}</p>
        <p>Interval: {interval === '1H' ? 'Last 1 Hour' : interval === '24H' ? 'Last 24 Hours' : 'Last 7 Days'}</p>
      </div>
    </div>
  );
}
```

## Example 8: Error Handling and Edge Cases

```tsx
import { TrafficGauge } from '@/app/components/ui/TrafficGauge';
import { useTrafficGaugeCalculations } from '@/app/hooks/useTrafficGaugeCalculations';

export function EdgeCaseExamples() {
  return (
    <div className="space-y-6 p-4">
      {/* Case 1: Min equals Max (no range) */}
      <div>
        <h3>Case: Min = Max (no range)</h3>
        <TrafficGauge min="500 GB" max="500 GB" current="500 GB" />
        <p className="text-sm text-gray-600 mt-2">Expected: Full fill, fillPercentage = 0</p>
      </div>

      {/* Case 2: Current exceeds Max */}
      <div>
        <h3>Case: Current > Max</h3>
        <TrafficGauge min="100 GB" max="500 GB" current="600 GB" />
        <p className="text-sm text-gray-600 mt-2">Expected: Full fill (clamped to 100%)</p>
      </div>

      {/* Case 3: Current below Min */}
      <div>
        <h3>Case: Current &lt; Min</h3>
        <TrafficGauge min="500 GB" max="1 TB" current="200 GB" />
        <p className="text-sm text-gray-600 mt-2">Expected: Empty/minimal fill (clamped to 0%)</p>
      </div>

      {/* Case 4: Different unit combinations */}
      <div>
        <h3>Case: Mixed units (GB, TB, etc)</h3>
        <TrafficGauge min="512 MB" max="2.5 TB" current="1.2 GB" />
        <p className="text-sm text-gray-600 mt-2">Expected: Correctly normalized and calculated</p>
      </div>

      {/* Case 5: Display calculations */}
      <div>
        <h3>Case: Show calculation details</h3>
        <CalculationDetails min="100 GB" max="1 TB" current="550 GB" />
      </div>
    </div>
  );
}

function CalculationDetails({ 
  min, 
  max, 
  current 
}: { 
  min: string; 
  max: string; 
  current: string; 
}) {
  const { fillPercentage, range, isWithinRange } = useTrafficGaugeCalculations(min, max, current);

  return (
    <div className="bg-gray-100 p-3 rounded text-sm space-y-1 font-mono">
      <p>Min: {min}</p>
      <p>Max: {max}</p>
      <p>Current: {current}</p>
      <p>Range: {range.toFixed(0)} MB</p>
      <p>Fill %: {fillPercentage.toFixed(2)}%</p>
      <p>Within Range: {isWithinRange ? '✓ Yes' : '✗ No'}</p>
    </div>
  );
}
```

## Testing the Components

All examples can be tested by:

1. Creating a new route component
2. Importing the examples
3. Rendering them in the app
4. Verifying visual output and console logs

Example test setup:
```tsx
import React from 'react';
import { TrafficTable } from './examples/TrafficTable';
import { TRAFFIC_TOP_NEIGHBOR_AS } from '@/data';

export function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Component Test Page</h1>
      <TrafficTable data={TRAFFIC_TOP_NEIGHBOR_AS.dataSource} />
    </div>
  );
}
```

---

For more examples and API documentation, see:
- `REFACTOR_SUMMARY.md` - Overview and architecture
- `IMPLEMENTATION_NOTES.md` - Technical details and integration guide

# UI Standardization - API Reference & Developer Guide

## 1. TrafficGauge Component - Updated

### Location
`/src/app/components/ui/TrafficGauge.tsx`

### Props Interface
```typescript
interface TrafficGaugeProps {
  min: string | number;        // Minimum traffic value (e.g., "100 GB" or 100)
  max: string | number;        // Maximum traffic value (e.g., "1 TB" or 1000)
  current: string | number;    // Current traffic value (e.g., "500 GB" or 500)
  tooltipPosition?: 'top' | 'bottom';  // Tooltip position (default: 'top')
}
```

### Props Details

#### `min` (string | number)
- **Type**: String with unit suffix or numeric value
- **Examples**: "100 GB", "1.2 TB", "50 MB", 100
- **Usage**: Represents the historical minimum traffic value
- **Display**: Shows below left side of gauge bar
- **Validation**: Auto-parsed, handles TB/GB/MB conversions

#### `max` (string | number)
- **Type**: String with unit suffix or numeric value
- **Examples**: "1000 GB", "1 TB", "5 TB", 1000
- **Usage**: Represents the historical maximum traffic value
- **Display**: Shows below right side of gauge bar
- **Validation**: Auto-parsed, handles TB/GB/MB conversions

#### `current` (string | number)
- **Type**: String with unit suffix or numeric value
- **Examples**: "500 GB", "0.5 TB", "300 GB", 500
- **Usage**: Current traffic value shown in tooltip on hover
- **Display**: In tooltip (NEW: displays value, not percentage)
- **Validation**: Auto-parsed, handles TB/GB/MB conversions
- **Calculation**: Used to calculate fill percentage within min-max range

#### `tooltipPosition` (optional)
- **Type**: 'top' | 'bottom'
- **Default**: 'top'
- **Usage**: Determines where tooltip appears relative to gauge
- **Example**: `tooltipPosition="bottom"` shows tooltip below gauge

### Usage Examples

#### Basic Usage
```typescript
import { TrafficGauge } from '@/components/ui/TrafficGauge';

<TrafficGauge 
  min="100 GB"
  max="1 TB"
  current="500 GB"
/>
```

#### With Numeric Values
```typescript
<TrafficGauge 
  min={100}      // numeric in MB
  max={1000}     // numeric in MB
  current={500}  // numeric in MB
/>
```

#### With Custom Tooltip Position
```typescript
<TrafficGauge 
  min="1.2 TB"
  max="3.5 TB"
  current="3.31 TB"
  tooltipPosition="bottom"
/>
```

#### In TopNeighborAsWidget
```typescript
{data.slice(0, 5).map((row) => (
  <TrafficGauge 
    min={row.min}      // "1.2 TB"
    max={row.max}      // "3.5 TB"
    current={row.rate} // "3.31 TB"
  />
))}
```

### Output Behavior

#### Visual Output
```
Display (default position top):
┌─────────────────────────────────┐
│   Current Value (Tooltip)       │  ← appears on hover
│   e.g., "500 GB"                │
│                                 │
│   [================>   ]         │  ← gradient orange bar
│   100 GB ────────────── 1 TB    │  ← min/max labels
└─────────────────────────────────┘
```

#### Tooltip Content
- **Shows**: Actual current traffic value with units
- **Example**: "3.31 TB" (not percentage)
- **Trigger**: Mouse hover
- **Delay**: 0ms (instant, from Radix UI)
- **Position**: Top by default, bottom if specified

### CSS Classes Applied
```
Outer container:     flex flex-col gap-1 w-full
Gauge bar:           relative w-full h-3 rounded-full
Background:          bg-gray-800 (dark background)
Fill bar:            bg-gradient-to-r from-orange-500 to-orange-600
Min/Max labels:      text-xs text-gray-400
Tooltip trigger:     cursor-pointer
```

### Internal Calculation
```typescript
// Hook: useTrafficGaugeCalculations
const calculations = useTrafficGaugeCalculations(min, max, current);

// Returns:
{
  fillPercentage: 44.4,  // percentage of range filled
  range: "100 GB - 1 TB", // readable range
  isWithinRange: true     // if current is within min-max
}

// Calculation logic:
fillPercentage = ((current - min) / (max - min)) * 100
// Example: ((500 - 100) / (1000 - 100)) * 100 = 44.4%
```

### Error Handling
- **Invalid values**: Auto-corrected by parsing logic
- **Missing units**: Assumes MB if numeric
- **Current > Max**: Clamps fill to 100%
- **Current < Min**: Clamps fill to 0%

### Accessibility
```typescript
aria-label={`Traffic gauge: current value is ${currentDisplay}`}
// Example: "Traffic gauge: current value is 500 GB"
```

---

## 2. Data Structure - TRAFFIC_3A_LINKS Updated

### Location
`/src/data/index.ts`

### Interface
```typescript
interface Traffic3ALink {
  // Core Identity
  id: string;                    // Unique identifier
  router: string;               // Router name
  interface: string;            // Interface code
  description: string;          // Interface description
  
  // Utilization Metrics (NEW - CRITICAL)
  util_in: number;              // Utilization IN percentage (0-100)
  util_out: number;             // Utilization OUT percentage (0-100)
  
  // Metadata
  trend: 'up' | 'down';          // Trend direction
  percentage: string;            // Trend percentage (e.g., "+5.3%")
  
  // Backward Compatibility (OPTIONAL - for legacy code)
  link?: string;                 // Legacy link name
  value?: string;               // Legacy traffic value
  numericValue?: number;        // Legacy numeric value
  min?: string;                 // Legacy min traffic
  max?: string;                 // Legacy max traffic
  rate?: string;                // Legacy current traffic
}
```

### Data Sample
```typescript
{
  // Core Properties (NEW)
  id: '1',
  router: 'Core-Router-A',
  interface: 'xe-0/1/2',
  description: 'Tokyo Peering Link',
  util_in: 45.2,      // 45.2% utilization inbound
  util_out: 38.7,     // 38.7% utilization outbound
  trend: 'up',
  percentage: '+5.3%',
  
  // Backward Compatibility (KEPT)
  link: 'Link-A1',
  value: '1.2 TB',
  numericValue: 1200,
  min: '800 GB',
  max: '1.5 TB',
  rate: '1.2 TB'
}
```

### Properties Explanation

#### Router Name
- **Field**: `router`
- **Type**: string
- **Example**: "Core-Router-A", "Edge-Router-B"
- **Usage**: Primary identifier in widget display
- **Display**: Left-aligned, medium weight text

#### Interface
- **Field**: `interface`
- **Type**: string (networking notation)
- **Example**: "xe-0/1/2", "ge-1/0/1", "bundle-ether1"
- **Usage**: Physical interface identifier
- **Display**: Monospace font, technical codes
- **Note**: Standard Juniper/Cisco naming convention

#### Interface Description
- **Field**: `description`
- **Type**: string (human-readable)
- **Example**: "Tokyo Peering Link", "Singapore IXP Link"
- **Usage**: User-friendly description of link purpose
- **Display**: Flex-grow column (takes remaining space)
- **Characters**: Can be variable length

#### Utilization IN
- **Field**: `util_in`
- **Type**: number (percentage 0-100)
- **Example**: 45.2, 72.5, 32.8
- **Range**: 0 to 100 (or beyond for oversubscription)
- **Usage**: Inbound interface utilization percentage
- **Display**: Right-aligned, monospace, formatted to 1 decimal
- **Display Format**: "45.2%"

#### Utilization OUT
- **Field**: `util_out`
- **Type**: number (percentage 0-100)
- **Example**: 38.7, 65.1, 28.3
- **Range**: 0 to 100 (or beyond for oversubscription)
- **Usage**: Outbound interface utilization percentage
- **Display**: Right-aligned, monospace, formatted to 1 decimal
- **Display Format**: "38.7%"

### Displaying the Data

#### In Traffic3ALinksWidget
```typescript
<td className="py-3 px-2 text-right text-[12px] font-['JetBrains_Mono']">
  {row.util_in.toFixed(1)}%
</td>

<td className="py-3 px-2 text-right text-[12px] font-['JetBrains_Mono']">
  {row.util_out.toFixed(1)}%
</td>
```

#### Formatting
- **Decimal Places**: 1 (using `.toFixed(1)`)
- **Example**: 45.2, 72.5, 32.8 (NOT 45, 72, 32)
- **Unit**: Percentage symbol (%) added in template
- **Alignment**: Right-aligned for numeric columns

#### Accessing Data
```typescript
// In components
data.forEach(link => {
  console.log(link.router);        // "Core-Router-A"
  console.log(link.interface);     // "xe-0/1/2"
  console.log(link.description);   // "Tokyo Peering Link"
  console.log(link.util_in);       // 45.2
  console.log(link.util_out);      // 38.7
});
```

---

## 3. TopNeighborAsWidget Component - Refactored

### Location
`/src/app/components/sections/TopNeighborAsWidget.tsx`

### Props
```typescript
interface TopNeighborAsWidgetProps {
  data: Array<{
    id: string;
    asn: string;           // e.g., "AS23693 (TSEL23693)"
    value: string;         // e.g., "3.31 TB"
    numericValue: number;  // e.g., 3310 (in GB)
    percentage: string;    // e.g., "+43.5%"
    trend: 'up' | 'down';
    min: string;          // e.g., "1.2 TB"
    max: string;          // e.g., "3.5 TB"
    rate: string;         // e.g., "3.31 TB" (current)
  }>;
}
```

### Column Structure
```
┌─────┬────────────────────┬──────────────────┬─────────────┐
│ #   │ AS Name / ASN      │ Traffic Gauge    │ Trend (24h) │
├─────┼────────────────────┼──────────────────┼─────────────┤
│ w-8 │ w-56               │ flex-grow        │ w-32        │
└─────┴────────────────────┴──────────────────┴─────────────┘
```

### Implementation
```typescript
export function TopNeighborAsWidget({ data }: { data: any[] }) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-[#27272a] text-[#71717b] text-[10px] uppercase font-['Inter'] tracking-wider">
          <th className="pb-3 px-2 w-8 text-center">#</th>
          <th className="pb-3 px-2 w-56">AS Name / ASN</th>
          <th className="pb-3 px-2 flex-grow">Traffic Gauge</th>
          <th className="pb-3 px-2 w-32 text-right">Trend (24h)</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 5).map((row, idx) => (
          <tr key={row.id} className="border-b border-[rgba(39,39,42,0.3)] last:border-0 hover:bg-[rgba(24,24,27,0.4)] cursor-pointer transition-colors">
            <td className="py-3 px-2 text-[#71717b] text-[12px] font-['JetBrains_Mono'] text-center">
              {idx + 1}
            </td>
            <td className="py-3 px-2 text-[#d4d4d8] text-[13px] font-medium">
              {row.asn}
            </td>
            <td className="py-3 px-2">
              <TrafficGauge 
                min={row.min}
                max={row.max}
                current={row.rate}
              />
            </td>
            <td className="py-3 px-2 text-right text-[12px] font-['JetBrains_Mono'] font-medium" style={{ color: row.trend === 'up' ? '#00BC7D' : '#ff2056' }}>
              {row.percentage}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Key Features
- Shows top 5 AS entries (`.slice(0, 5)`)
- TrafficGauge component integrated
- Index numbers center-aligned
- AS names in medium weight
- Trend color-coded (green: up, red: down)
- Hover row highlighting

---

## 4. Traffic3ALinksWidget Component - Refactored

### Location
`/src/app/components/sections/Traffic3ALinksWidget.tsx`

### Props
```typescript
interface Traffic3ALinksWidgetProps {
  data: Array<{
    id: string;
    router: string;        // e.g., "Core-Router-A"
    interface: string;     // e.g., "xe-0/1/2"
    description: string;   // e.g., "Tokyo Peering Link"
    util_in: number;       // e.g., 45.2 (percentage)
    util_out: number;      // e.g., 38.7 (percentage)
    trend: 'up' | 'down';
    percentage: string;    // e.g., "+5.3%"
  }>;
}
```

### Column Structure
```
┌────────────────┬───────────┬──────────────────┬──────────┬──────────┐
│ Router Name    │ Interface │ Interface Desc   │ Util In  │ Util Out │
├────────────────┼───────────┼──────────────────┼──────────┼──────────┤
│ w-48           │ w-32      │ flex-grow        │ w-28     │ w-28     │
└────────────────┴───────────┴──────────────────┴──────────┴──────────┘
```

### Implementation
```typescript
export function Traffic3ALinksWidget({ data }: { data: any[] }) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-[#27272a] text-[#71717b] text-[10px] uppercase font-['Inter'] tracking-wider">
          <th className="pb-3 px-2 w-48">Router Name</th>
          <th className="pb-3 px-2 w-32">Interface</th>
          <th className="pb-3 px-2 flex-grow">Interface Description</th>
          <th className="pb-3 px-2 w-28 text-right">Util In (%)</th>
          <th className="pb-3 px-2 w-28 text-right">Util Out (%)</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 5).map((row) => (
          <tr key={row.id} className="border-b border-[rgba(39,39,42,0.3)] last:border-0 hover:bg-[rgba(24,24,27,0.4)] cursor-pointer transition-colors">
            <td className="py-3 px-2 text-[#d4d4d8] text-[13px] font-medium">
              {row.router}
            </td>
            <td className="py-3 px-2 text-[#9f9fa9] text-[12px] font-['JetBrains_Mono']">
              {row.interface}
            </td>
            <td className="py-3 px-2 text-[#a1a1a6] text-[12px]">
              {row.description}
            </td>
            <td className="py-3 px-2 text-right text-[12px] font-['JetBrains_Mono'] font-medium text-[#e4e4e7]">
              {row.util_in.toFixed(1)}%
            </td>
            <td className="py-3 px-2 text-right text-[12px] font-['JetBrains_Mono'] font-medium text-[#e4e4e7]">
              {row.util_out.toFixed(1)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Key Features
- Shows top 5 interface entries (`.slice(0, 5)`)
- NO ranking # column (unlike TopNeighborAsWidget)
- Router names in medium weight (primary identifier)
- Interface codes in monospace (technical)
- Descriptions in regular text (flexible)
- Utilization percentages right-aligned, monospace
- Both IN and OUT columns displayed

---

## 5. Styling Standards & Class Reference

### Table Header Classes
```typescript
"border-b border-[#27272a] text-[#71717b] text-[10px] uppercase font-['Inter'] tracking-wider"

Breakdown:
- border-b: Bottom border
- border-[#27272a]: Dark border color
- text-[#71717b]: Secondary text color (gray)
- text-[10px]: Small caps text
- uppercase: ALL CAPS
- font-['Inter']: Clean sans-serif
- tracking-wider: Increased letter spacing
```

### Table Cell Classes (Data)
```typescript
"py-3 px-2 text-[12px] text-[#d4d4d8]"

Breakdown:
- py-3: 12px vertical padding (top & bottom)
- px-2: 8px horizontal padding (left & right)
- text-[12px]: Regular reading size
- text-[#d4d4d8]: Primary text color (bright)
```

### Table Row Hover Classes
```typescript
"border-b border-[rgba(39,39,42,0.3)] last:border-0 hover:bg-[rgba(24,24,27,0.4)] cursor-pointer transition-colors"

Breakdown:
- border-b: Row separator
- last:border-0: No border on last row
- hover:bg-[rgba(24,24,27,0.4)]: Highlight on hover
- cursor-pointer: Clickable indicator
- transition-colors: Smooth color transition
```

### Right-Aligned Numeric Classes
```typescript
"text-right text-[12px] font-['JetBrains_Mono'] font-medium"

Breakdown:
- text-right: Align to right
- font-['JetBrains_Mono']: Monospace for numbers
- font-medium: Slightly heavier weight
```

---

## 6. Integration Examples

### Using in a Page Component
```typescript
import { TRAFFIC_TOP_NEIGHBOR_AS, TRAFFIC_3A_LINKS } from '@/data';
import { TopNeighborAsWidget } from '@/components/sections/TopNeighborAsWidget';
import { Traffic3ALinksWidget } from '@/components/sections/Traffic3ALinksWidget';

export function TrafficPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TopNeighborAsWidget data={TRAFFIC_TOP_NEIGHBOR_AS.dataSource} />
      <Traffic3ALinksWidget data={TRAFFIC_3A_LINKS.dataSource} />
    </div>
  );
}
```

### Extending with Backend Data
```typescript
const [topAsData, setTopAsData] = useState([]);

useEffect(() => {
  // Fetch from backend API
  fetch('/api/traffic/top-neighbor-as')
    .then(res => res.json())
    .then(data => setTopAsData(data));
}, []);

<TopNeighborAsWidget data={topAsData} />
```

### Custom Filtering
```typescript
const filteredLinks = TRAFFIC_3A_LINKS.dataSource.filter(
  link => link.util_in > 70  // Show only high-utilization interfaces
);

<Traffic3ALinksWidget data={filteredLinks} />
```

---

## 7. Backward Compatibility Notes

### Existing Code Still Works
```typescript
// OLD: Using legacy properties still works
const link = TRAFFIC_3A_LINKS.dataSource[0];
console.log(link.link);        // "Link-A1" (old)
console.log(link.value);       // "1.2 TB" (old)

// NEW: Can use new properties
console.log(link.router);      // "Core-Router-A"
console.log(link.util_in);     // 45.2
```

### MiniBar Component
- **Status**: Unchanged
- **Usage**: Still used in DrillDownView
- **Removal**: Not recommended (used elsewhere)
- **Notes**: Kept for backward compatibility

---

## 8. Migration Guide (If Using Old Structure)

### If You Have Old 3A Links Code
```typescript
// OLD WAY (still works, but deprecated for widgets)
const oldLink = {
  link: 'Link-A1',
  value: '1.2 TB',
  trend: 'up'
};

// NEW WAY (preferred for Traffic3ALinksWidget)
const newLink = {
  router: 'Core-Router-A',
  interface: 'xe-0/1/2',
  description: 'Tokyo Peering Link',
  util_in: 45.2,
  util_out: 38.7,
  trend: 'up'
};
```

### Update Your Components
```typescript
// BEFORE: Using raw traffic value
<MiniBar value={row.numericValue} max={1500} />

// AFTER: Using utilization percentage (no gauge needed)
{row.util_in.toFixed(1)}%
```

---

## Summary

| Component | Updated | Key Change |
|-----------|---------|-----------|
| TrafficGauge | Yes | Tooltip now shows current value instead of % |
| TRAFFIC_3A_LINKS | Yes | Added util_in/out, kept old properties |
| TopNeighborAsWidget | Yes | Now uses TrafficGauge instead of MiniBar |
| Traffic3ALinksWidget | Yes | Changed from traffic to utilization %, removed gauge |
| MiniBar | No | Unchanged (still used in DrillDownView) |

All APIs are production-ready and fully backward compatible.

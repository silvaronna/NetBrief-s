# Visual Guide: UI Refactor

## Before & After Comparison

### Before: Old Dropdown Interface
```
┌────────────────────────────────────────────────────────────┐
│ NEIGHBOR AS IN DETAILED                              ↓  ⇗ │
├────────────────────────────────────────────────────────────┤
│ [Last 24 Hours ▼]                           ↻  Refresh     │
│                                                              │
│  [CHART AREA - 250px height]                              │
│   ╔════════════════════════════════════════════════════╗   │
│   ║ 10000                                              ║   │
│   ║         ╱╲      ╱╲      ╱╲      ╱╲      ╱╲        ║   │
│   ║        ╱  ╲    ╱  ╲    ╱  ╲    ╱  ╲    ╱  ╲       ║   │
│   ║ 7500 ╱    ╲  ╱    ╲  ╱    ╲  ╱    ╲  ╱    ╲      ║   │
│   ║      ╱      ╲╱      ╲╱      ╲╱      ╲╱      ╲     ║   │
│   ║ 5000                                              ║   │
│   ║                                                    ║   │
│   ║ 2500                                              ║   │
│   ║                                                    ║   │
│   ║ 0                                                  ║   │
│   ║ 00:00 02:00 04:00 06:00 08:00 10:00...            ║   │
│   ╚════════════════════════════════════════════════════╝   │
│                                                              │
├────────────────────────────────────────────────────────────┤
│ ☐  UPSTREAM AS          CURRENT RATE    MIN / CURRENT / MAX │
├────────────────────────────────────────────────────────────┤
│ ▪  AS32934 (FACEBOOK)   1.20 TB     ▓▓▓░░░░░░░░░░░░░ │
│ ▪  AS15169 (GOOGLE)     850 GB      ░░░░░░░░░░░░░░░░░ │
│ □  AS16509 (AMAZON)     620 GB      ░░░░░░░░░░░░░░░░░ │
│ □  AS3335 (CLOUDFLARE)  410 GB      ░░░░░░░░░░░░░░░░░ │
└────────────────────────────────────────────────────────────┘

Issues:
- Dropdown takes valuable header space
- Column layout cramped
- Min/Current/Max mixed in one column
- No visual separation of concerns
```

### After: New Button Group & Gauge Interface
```
┌────────────────────────────────────────────────────────────┐
│ NEIGHBOR AS IN DETAILED                              ↓  ⇗ │
├────────────────────────────────────────────────────────────┤
│ Interval: [1H] [24H] [7D]                      ↻  Refresh  │
│                                                              │
│  [CHART AREA - 250px height]                              │
│   ╔════════════════════════════════════════════════════╗   │
│   ║ 10000                                              ║   │
│   ║         ╱╲      ╱╲      ╱╲      ╱╲      ╱╲        ║   │
│   ║        ╱  ╲    ╱  ╲    ╱  ╲    ╱  ╲    ╱  ╲       ║   │
│   ║ 7500 ╱    ╲  ╱    ╲  ╱    ╲  ╱    ╲  ╱    ╲      ║   │
│   ║      ╱      ╲╱      ╲╱      ╲╱      ╲╱      ╲     ║   │
│   ║ 5000                                              ║   │
│   ║                                                    ║   │
│   ║ 2500                                              ║   │
│   ║                                                    ║   │
│   ║ 0                                                  ║   │
│   ║ 00:00 02:00 04:00 06:00 08:00 10:00...            ║   │
│   ╚════════════════════════════════════════════════════╝   │
│                                                              │
├────────────────────────────────────────────────────────────┤
│ ☐  AS NAME / ASN      TRAFFIC GAUGE    MIN      MAX    TREND
├────────────────────────────────────────────────────────────┤
│ ▪  AS32934 (FACEBOOK) [═════●════════════] 800GB 1.20TB +43.5%
│ ▪  AS15169 (GOOGLE)   [═════════●═════════] 100GB  850GB +32.1%
│ □  AS16509 (AMAZON)   [═════════════●════] 100GB  620GB -12.0%
│ □  AS3335 (CLOUDFLARE)[═════════════●════] 200GB  410GB  +2.5%
└────────────────────────────────────────────────────────────┘

Improvements:
✓ Inline buttons save header space
✓ Clear visual hierarchy
✓ Separate Min/Max columns
✓ Traffic gauge shows range and position
✓ Trend indicators color-coded
```

## Component Details

### Traffic Gauge Visualization

#### Component Structure
```
┌─────────────────────────────────────────┐
│  Traffic Gauge Component                 │
├─────────────────────────────────────────┤
│                                         │
│  [══════●═════════════════════════]    │  ← Main gauge bar
│  800 GB                        1.20 TB  │  ← Min/Max labels
│                                         │
│  ↑ Hover to see: "50.5%"               │  ← Tooltip
│                                         │
└─────────────────────────────────────────┘

Calculation (Example):
  Min = 800 GB  (Left anchor)
  Max = 1.20 TB (Right anchor)
  Current = 950 GB
  
  Range = 1.20 TB - 800 GB = 400 GB
  Offset = 950 GB - 800 GB = 150 GB
  Fill% = 150 GB / 400 GB = 37.5%
  
  Visual: [═════●═════════════════════════]
          ▲                              ▲
        Min (800GB)              Max (1.20TB)
              ● at 37.5% position
```

#### Color Scheme
```
┌──────────────────────────────────────────┐
│ Gauge Colors                             │
├──────────────────────────────────────────┤
│                                          │
│  [  Gray Background  ]                   │  #3f3f46
│  [    Orange Fill    ]                   │  #f97316 → #ea580c
│                                          │
│  Min/Max Text                            │  #71717b
│                                          │
│  Tooltip Background                      │  #09090b (dark)
│  Tooltip Border                          │  #404040 (darker gray)
│  Tooltip Text                            │  #f4f4f5 (light)
│                                          │
└──────────────────────────────────────────┘
```

### TimeInterval Selector

#### Button States
```
┌─────────────────────────────────┐
│ Interval Selector States        │
├─────────────────────────────────┤
│                                 │
│ Default:  [1H] [24H] [7D]      │
│           ▲── Unselected        │
│                                 │
│ Selected: [1H] [24H] [7D]      │
│                ▲─ Selected      │
│           (white background)    │
│                                 │
│ Hover:    [1H] [24H] [7D]      │
│           ▲─ Hover state       │
│                                 │
└─────────────────────────────────┘

Styling:
├─ Unselected:
│  ├─ Background: transparent
│  ├─ Text: #71717b (gray)
│  └─ Hover: #71717b → #d4d4d8 + gray background
│
└─ Selected:
   ├─ Background: #ffffff (white)
   ├─ Text: #09090b (dark)
   └─ Shadow: subtle shadow for depth
```

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│                 DrillDownView                            │
│  - Routes traffic data to DetailTemplate                │
│  - Passes column configuration                          │
│  - Manages which data type to show                       │
└───────────────────────┬──────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│              DetailTemplate                              │
│  - Renders stacked area chart                           │
│  - Renders drill-down table                             │
│  - Manages row selection (colors)                       │
│  - Uses TimeIntervalSelector                            │
│  - Uses useTimeInterval hook                            │
└───────────────────────┬──────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   [Chart]    [Interval Selector]  [Table]
              [1H] [24H] [7D]         │
                                      ├─ AS Name ──────────────┐
                                      ├─ TrafficGauge ─────────┼─→ useTrafficGaugeCalculations
                                      ├─ Min ──────────────────┤
                                      ├─ Max ──────────────────┤
                                      └─ Trend ────────────────┘
```

## File Structure Diagram

```
src/app/
│
├─ components/
│  ├─ layout/
│  │  └─ DetailTemplate.tsx
│  │     ├─ imports: TimeIntervalSelector, useTimeInterval
│  │     └─ renders: interval selector, chart, table
│  │
│  └─ ui/
│     ├─ TrafficGauge.tsx
│     │  ├─ accepts: min, max, current
│     │  ├─ imports: useTrafficGaugeCalculations
│     │  └─ renders: gauge bar + labels + tooltip
│     │
│     └─ TimeIntervalSelector.tsx
│        ├─ accepts: selectedInterval, onIntervalChange
│        └─ renders: [1H] [24H] [7D] buttons
│
├─ hooks/
│  ├─ useTrafficGaugeCalculations.ts
│  │  ├─ exports: useTrafficGaugeCalculations hook
│  │  ├─ exports: parseTrafficValue function
│  │  ├─ exports: formatTrafficValue function
│  │  └─ logic: min/max/current → fillPercentage calculation
│  │
│  └─ useTimeInterval.ts
│     ├─ exports: useTimeInterval hook
│     ├─ state: interval ('1H' | '24H' | '7D')
│     └─ methods: setInterval, isSelected
│
└─ pages/
   └─ DrillDownView.tsx
      ├─ imports: TrafficGauge component
      ├─ defines: column structure
      └─ renders: DetailTemplate with traffic columns
```

## Interaction Flow

### User Clicks Interval Button
```
User clicks [24H] button
    │
    ▼
TimeIntervalSelector button click
    │
    ▼
onIntervalChange callback triggered
    │
    ▼
setInterval('24H') in useTimeInterval
    │
    ▼
DetailTemplate receives new interval
    │
    ▼
(Ready for) Data refresh from backend
    │
    ▼
Chart and table update with new data
```

### User Hovers Over Gauge
```
User hovers over gauge bar
    │
    ▼
TrafficGauge component detects hover
    │
    ▼
Tooltip appears with fill percentage
    │
    ▼
Tooltip shows: "50.5%"
    │
    ▼
User moves mouse away
    │
    ▼
Tooltip disappears (fade out)
```

## Responsive Layout

### Desktop (> 1024px)
```
┌─────────────────────────────────────────────────────────────┐
│ AS Name | Traffic Gauge (500px) | Min | Max | Trend | etc   │
├─────────────────────────────────────────────────────────────┤
│ AS32934 | [═════●════════════════════] | 800GB | 1.20TB | +43% │
└─────────────────────────────────────────────────────────────┘
Full width, horizontal scrolling available
```

### Tablet (768px - 1024px)
```
┌──────────────────────────────────────┐
│ AS Name | Gauge (300px) | Min/Max | Trend │
├──────────────────────────────────────┤
│ AS32934 | [═══●═══════] | 800GB | +43%  │
└──────────────────────────────────────┘
Gauge width reduced, still readable
```

### Mobile (< 768px)
```
┌──────────────────────┐
│ AS Name              │
│ AS32934 (FACEBOOK)   │
├──────────────────────┤
│ Gauge:               │
│ [═════●══════════]   │
│ 800GB    1.20TB      │
├──────────────────────┤
│ Min/Max: 800GB       │
│          1.20TB      │
├──────────────────────┤
│ Trend: +43.5% ↑      │
└──────────────────────┘
Stacked layout, full width gauge
```

## Performance Metrics

```
Component Rendering:
├─ TrafficGauge: O(1) - pure calculation, no loops
├─ TimeIntervalSelector: O(1) - 3 buttons, static
└─ DetailTemplate: O(n) - where n = number of rows

Memory Usage:
├─ Hook state: minimal (interval: 4 bytes, colors: per row)
└─ Component props: small (min, max, current values)

Bundle Size Impact:
├─ All new code: ~8KB minified + gzipped
├─ No external dependencies added
└─ Reuses existing libraries (recharts, tailwind)
```

---

For more details, see:
- `REFACTOR_SUMMARY.md` - Technical overview
- `IMPLEMENTATION_NOTES.md` - Integration guide
- `COMPONENT_EXAMPLES.md` - Code examples

// src/data/index.ts

/**
 * MASTER DATA DECLARATION & MOCK SERVICE
 * ---------------------------------------------------------
 * File ini bertindak sebagai "API Contract" sementara sebelum Backend Node.js siap.
 * Nantinya, data.dataSource akan diisi dari hasil fetch() ke TSDB.
 */

export const CONFIG = {
  latencyThreshold: 30,
};

export const TAB_MENU = [
  { id: 'alerts', label: 'Alerts', icon: 'AlertTriangle' },
  { id: 'traffic', label: 'Traffic', icon: 'Activity' },
  { id: 'performance', label: 'Performance', icon: 'Zap' },
];

// ==========================================
// 1. ALERTS SECTION
// ==========================================
export const BGP_ALERTS = {
  columns: [
    { key: 'time', label: 'Time' },
    { key: 'severity', label: 'Severity' },
    { key: 'source', label: 'Source' },
    { key: 'type', label: 'Type' },
    { key: 'message', label: 'Message' },
  ],
  dataSource: [
    { id: '1', time: '15 April 14:23:45', severity: 'Critical', source: 'TSEL23693.BGP', type: 'Prefix Drought', message: 'AS23693 stopped advertising 10.0.0.0/24 - Significant traffic drop detected on interface xe-0/1/2.' },
    { id: '2', time: '15 April 14:21:12', severity: 'Warning', source: 'TSEL23693.BGP', type: 'Link Flap', message: 'Neighbor state transition to DOWN - Too many transitions over last 5m.' },
    { id: '3', time: '15 April 14:15:00', severity: 'Info', source: 'TSEL23693.BGP', type: 'Route Change', message: 'Preferred path for 8.8.8.0/24 shifted to primary peer. Latency optimized.' },
    { id: '4', time: '15 April 14:05:32', severity: 'Critical', source: 'TSEL23693.BGP', type: 'Error Rate', message: 'High CRC error rate detected on bundle-ether1. >5% packet loss.' },
    { id: '5', time: '15 April 13:50:11', severity: 'Warning', source: 'TSEL23693.BGP', type: 'Prefix Flood', message: 'Sudden increase in advertised prefixes from AS23693 (+450). Max-prefix limit approaching.' },
    { id: '6', time: '15 April 13:45:22', severity: 'Info', source: 'TSEL23693.BGP', type: 'Session Up', message: 'BGP session established with neighbor 192.168.1.1' },
    { id: '7', time: '15 April 13:30:10', severity: 'Warning', source: 'TSEL23693.BGP', type: 'High Latency', message: 'Latency spiked to 120ms for AS24581 peer.' },
  ]
};

export const IGP_ALERTS = {
  columns: [
    { key: 'time', label: 'Time' },
    { key: 'severity', label: 'Severity' },
    { key: 'source', label: 'Source' },
    { key: 'type', label: 'Type' },
    { key: 'message', label: 'Message' },
  ],
  dataSource: [
    { id: '1', time: '15 April 14:20:00', severity: 'Critical', source: 'OSPF-Area0', type: 'Adjacency Loss', message: 'Lost adjacency with 10.0.0.2 on interface ge-0/0/1' },
    { id: '2', time: '15 April 14:10:00', severity: 'Warning', source: 'ISIS-L2', type: 'Metric Change', message: 'Metric for link to Core-Router-2 increased to 50' },
    { id: '3', time: '15 April 14:05:12', severity: 'Info', source: 'ISIS-L1', type: 'Database Sync', message: 'LSP synchronization completed successfully with neighbor 192.168.1.5' },
    { id: '4', time: '15 April 13:50:44', severity: 'Critical', source: 'OSPF-Area1', type: 'Interface Down', message: 'Interface xe-1/0/0 went down unexpectedly, causing multiple route recalculations and massive topology updates within the area.' },
    { id: '5', time: '15 April 13:42:01', severity: 'Warning', source: 'OSPF-Area0', type: 'Authentication', message: 'Authentication failure on ge-0/1/2 from 10.0.0.12' },
    { id: '6', time: '15 April 13:30:10', severity: 'Info', source: 'ISIS-L2', type: 'New Neighbor', message: 'New ISIS adjacency established with Core-Router-4' },
    { id: '7', time: '15 April 13:15:22', severity: 'Warning', source: 'OSPF-Area0', type: 'LSA Storm', message: 'High rate of LSA updates detected originating from router 10.0.0.25' },
    { id: '8', time: '15 April 13:00:05', severity: 'Critical', source: 'ISIS-L1', type: 'Adjacency Loss', message: 'Lost adjacency with Edge-Router-1. Link failure detected via BFD.' },
    { id: '9', time: '15 April 12:45:30', severity: 'Warning', source: 'OSPF-Area2', type: 'Hello Timer', message: 'Missed consecutive hello packets from 10.0.2.1 on interface ge-2/0/1' },
    { id: '10', time: '15 April 12:30:00', severity: 'Info', source: 'OSPF-Area0', type: 'SPF Run', message: 'Full SPF run triggered by topology change. Execution time: 15ms' },
    { id: '11', time: '15 April 12:10:15', severity: 'Critical', source: 'ISIS-L2', type: 'Overload', message: 'Router set overload bit. Bypassing transit traffic due to memory constraints.' },
    { id: '12', time: '15 April 11:55:00', severity: 'Warning', source: 'OSPF-Area1', type: 'MTU Mismatch', message: 'MTU mismatch detected on interface xe-0/2/1 with neighbor 10.1.1.2. Cannot form adjacency.' },
    { id: '13', time: '15 April 11:40:45', severity: 'Info', source: 'ISIS-L1', type: 'Metric Change', message: 'TE metric updated for link to Agg-Router-3' },
    { id: '14', time: '15 April 11:20:10', severity: 'Warning', source: 'OSPF-Area0', type: 'Retransmission', message: 'High LSA retransmission rate on bundle-ether2' },
    { id: '15', time: '15 April 11:05:00', severity: 'Critical', source: 'ISIS-L2', type: 'Checksum Error', message: 'Received LSP with invalid checksum from 192.168.2.1. Dropping packet to prevent routing loop.' },
    { id: '16', time: '15 April 10:45:20', severity: 'Warning', source: 'OSPF-Area2', type: 'Area Mismatch', message: 'Received hello with mismatched area ID from 10.2.2.5' },
    { id: '17', time: '15 April 10:30:00', severity: 'Info', source: 'OSPF-Area0', type: 'Graceful Restart', message: 'Neighbor 10.0.0.5 entered Graceful Restart mode' },
    { id: '18', time: '15 April 10:15:12', severity: 'Critical', source: 'ISIS-L1', type: 'System Error', message: 'ISIS process restarted unexpectedly due to segment fault in routing daemon.' }
  ]
};

// ==========================================
// 2. TRAFFIC SECTION
// ==========================================
export const TRAFFIC_TOP_NEIGHBOR_AS = {
  columns: [
    { key: 'asn', label: 'AS Name / ASN' },
    { key: 'value', label: 'Traffic' },
    { key: 'percentage', label: 'Trend (24h)' },
  ],
  dataSource: [
    { id: '1', asn: 'AS23693 (TSEL23693)', value: '3.31 TB', numericValue: 3310, percentage: '+43.5%', trend: 'up', min: '1.2 TB', max: '3.5 TB', rate: '3.31 TB' },
    { id: '2', asn: 'AS24581 (MYISP24581)', value: '952 GB', numericValue: 952, percentage: '+32.1%', trend: 'up', min: '450 GB', max: '1.1 TB', rate: '952 GB' },
    { id: '3', asn: 'AS1201 (CABLE20)', value: '620 GB', numericValue: 620, percentage: '-12.0%', trend: 'down', min: '500 GB', max: '800 GB', rate: '620 GB' },
    { id: '4', asn: 'AS7738 (TELKOMNET)', value: '412 GB', numericValue: 412, percentage: '+2.5%', trend: 'up', min: '300 GB', max: '500 GB', rate: '412 GB' },
    { id: '5', asn: 'AS3921 (ISAT39)', value: '298 GB', numericValue: 298, percentage: '-8.4%', trend: 'down', min: '250 GB', max: '400 GB', rate: '298 GB' },
    { id: '6', asn: 'AS21901 (BIZNET)', value: '156 GB', numericValue: 156, percentage: '+1.0%', trend: 'up', min: '100 GB', max: '200 GB', rate: '156 GB' },
    { id: '7', asn: 'AS4455 (XL)', value: '120 GB', numericValue: 120, percentage: '+5.0%', trend: 'up', min: '80 GB', max: '150 GB', rate: '120 GB' },
    { id: '8', asn: 'AS9981 (INDOSAT)', value: '95 GB', numericValue: 95, percentage: '-2.0%', trend: 'down', min: '60 GB', max: '120 GB', rate: '95 GB' },
    { id: '9', asn: 'AS1023 (CBN)', value: '88 GB', numericValue: 88, percentage: '+1.2%', trend: 'up', min: '50 GB', max: '100 GB', rate: '88 GB' },
    { id: '10', asn: 'AS5566 (MORATEL)', value: '75 GB', numericValue: 75, percentage: '-1.5%', trend: 'down', min: '40 GB', max: '90 GB', rate: '75 GB' },
  ]
};

export const TRAFFIC_AGGREGATORS = [
  { id: 'telkomnet', label: 'TELKOMNET (AS7713)', image: '/icons/telkom-logo.png', value: '4.5 TB' },
  { id: 'apjii', label: 'IIX (AS7597)', image: '/icons/apjii-logo.png', value: '1.2 TB' },
  { id: 'dciix', label: 'DCI-IX (AS138428)', image: '/icons/dci_ix-logo.png', value: '850 GB' },
  { id: 'jktix', label: 'JKT IX (AS137295)', image: '/icons/jkt_ix-logo.png', value: '2.1 TB' },
  { id: 'oixp', label: 'Open-IXP (AS7717)', image: '/icons/openixp-logo.png', value: '1.0 TB' },
];

export const TRAFFIC_3A_LINKS = {
  columns: [
    { key: 'link', label: 'Link Name' },
    { key: 'interface', label: 'Interface Name' },
    { key: 'description', label: 'Interface Description' },
    { key: 'util_in_pct', label: 'Utilization In (%)' },
    { key: 'util_in_rate', label: 'Utilization In (Rate)' },
    { key: 'util_out_pct', label: 'Utilization Out (%)' },
    { key: 'util_out_rate', label: 'Utilization Out (Rate)' },
    { key: 'percentage', label: 'Trend' }
  ],
  dataSource: [
    { id: '1', link: 'Core-Router-A', interface: 'xe-0/1/2', description: 'Tokyo Peering Link', util_in_pct: 45.2, util_in_rate: '45.2 Gbps', util_out_pct: 38.7, util_out_rate: '38.7 Gbps', trend: 'up', percentage: '+5.3%' },
    { id: '2', link: 'Edge-Router-B', interface: 'ge-1/0/1', description: 'Singapore IXP Link', util_in_pct: 72.5, util_in_rate: '7.25 Gbps', util_out_pct: 65.1, util_out_rate: '6.51 Gbps', trend: 'up', percentage: '+8.2%' },
    { id: '3', link: 'Peering-Router-C', interface: 'bundle-ether1', description: 'India Direct Link', util_in_pct: 32.8, util_in_rate: '65.6 Gbps', util_out_pct: 28.3, util_out_rate: '56.6 Gbps', trend: 'down', percentage: '-3.1%' },
    { id: '4', link: 'Core-Router-D', interface: 'xe-2/0/0', description: 'Vietnam Transit Link', util_in_pct: 58.4, util_in_rate: '5.84 Gbps', util_out_pct: 52.1, util_out_rate: '5.21 Gbps', trend: 'up', percentage: '+2.7%' },
    { id: '5', link: 'Edge-Router-E', interface: 'ge-0/0/3', description: 'Malaysia Exchange Link', util_in_pct: 21.6, util_in_rate: '2.16 Gbps', util_out_pct: 19.5, util_out_rate: '1.95 Gbps', trend: 'down', percentage: '-1.8%' },
  ]
};

// ==========================================
// 3. PERFORMANCE SECTION
// ==========================================
export const LATENCY_CONGESTION = {
  thresholdPercentage: 30, // threshold visually represented as > 30%
  columns: [
    { key: 'link', label: 'Link Name' },
    { key: 'interface', label: 'Interface' },
    { key: 'current', label: 'Current' },
    { key: 'max', label: 'Max latency' },
    { key: 'min', label: 'Min latency' },
    { key: 'avg', label: 'Average latency' },
  ],
  dataSource: [
    { id: '1', link: 'Core-Router-A', interface: 'xe-0/1/2', current: '35ms', max: '45ms', min: '12ms', avg: '20ms', isCongested: true, numericValue: 35 },
    { id: '2', link: 'Edge-Router-B', interface: 'ge-1/0/1', current: '18ms', max: '22ms', min: '10ms', avg: '15ms', isCongested: false, numericValue: 18 },
    { id: '3', link: 'Peering-Router-C', interface: 'bundle-ether1', current: '60ms', max: '85ms', min: '25ms', avg: '40ms', isCongested: true, numericValue: 60 },
    { id: '4', link: 'Core-Router-D', interface: 'xe-2/0/0', current: '11ms', max: '15ms', min: '8ms', avg: '10ms', isCongested: false, numericValue: 11 },
    { id: '5', link: 'Edge-Router-E', interface: 'ge-0/0/3', current: '40ms', max: '55ms', min: '15ms', avg: '25ms', isCongested: true, numericValue: 40 },
  ]
};

// ==========================================
// 4. UTILITIES / GENERATORS
// ==========================================
export const CHART_DATA_GENERATOR = (count = 24) => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - (count - i - 1) * 3600000);
    data.push({
      timestamp: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      val1: Math.floor(Math.random() * 500) + 200,
      val2: Math.floor(Math.random() * 400) + 100,
      val3: Math.floor(Math.random() * 300) + 50,
      val4: Math.floor(Math.random() * 200) + 20,
      unix: time.getTime()
    });
  }
  return data;
};

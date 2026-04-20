// src/app/pages/PerformanceView.tsx

import { usePerformanceData } from '../hooks/usePerformanceData';
import { LatencyCongestionWidget } from '../components/sections/LatencyCongestionWidget';
import { Traffic3ALinksWidget } from '../components/sections/Traffic3ALinksWidget'; // Jangan lupa import komponen widget-nya

export function PerformanceView() {
  // Panggil kedua data dari satu hook yang sama
  const { latencyData, links3AData } = usePerformanceData();

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div className="grid grid-cols-1 gap-6">
        {/* Render widget 3A Links menggunakan data yang benar */}
        <Traffic3ALinksWidget data={links3AData} />
        
        {/* Render widget Latency */}
        <LatencyCongestionWidget data={latencyData} />
      </div>
    </div>
  );
}
// src/app/pages/PerformanceView.tsx

import { usePerformanceData } from '../hooks/usePerformanceData';
import { LatencyCongestionWidget } from '../components/sections/LatencyCongestionWidget';
import { Traffic3ALinksWidget } from '../components/sections/Traffic3ALinksWidget'; // Jangan lupa import komponen widget-nya

export function PerformanceView() {
  // Panggil kedua data dari satu hook yang sama
  const { latencyData, links3AData } = usePerformanceData();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="animate-fade-in-left">
        {/* Render widget 3A Links menggunakan data yang benar */}
        <Traffic3ALinksWidget data={links3AData} />
      </div>
      
      <div className="animate-fade-in-right animation-delay-150">
        {/* Render widget Latency */}
        <LatencyCongestionWidget data={latencyData} />
      </div>
    </div>
  );
}
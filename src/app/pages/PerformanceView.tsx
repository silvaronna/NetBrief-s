import { usePerformanceData } from '../hooks/usePerformanceData';
import { LatencyCongestionWidget } from '../components/sections/LatencyCongestionWidget';

export function PerformanceView() {
  const { latencyData } = usePerformanceData();

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Widget Utama */}
      <LatencyCongestionWidget data={latencyData} />
      
      {/* Jika nanti ada widget Jitter atau Packet Loss, tinggal tambah di bawah */}
    </div>
  );
}

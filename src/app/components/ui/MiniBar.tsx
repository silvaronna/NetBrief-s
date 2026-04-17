export function MiniBar({ current, maxHistory, absoluteMax = 4000 }: { current: number, maxHistory: number, absoluteMax?: number }) {
  // Menghitung persentase historical peak terhadap kapasitas absolut (background abu-abu)
  const maxPct = Math.min(100, (maxHistory / absoluteMax) * 100);
  
  // Menghitung persentase traffic saat ini terhadap historical peak (warna gradien)
  const currentPct = Math.max(0, Math.min(100, (current / maxHistory) * 100));

  return (
    // Background dasar (sisa kapasitas)
    <div className="w-full h-2 bg-[#18181b] rounded-full overflow-hidden relative">
       {/* Historical Max (Warna abu-abu/History Shadow) */}
       <div 
          className="absolute top-0 left-0 h-full bg-[#3f3f46] rounded-full overflow-hidden transition-all duration-700 ease-in-out" 
          style={{ width: `${maxPct}%` }}
       >
          {/* Current Value (Berwarna Gradien) */}
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] rounded-full transition-all duration-700 ease-in-out" 
            style={{ width: `${currentPct}%` }}
          />
       </div>
    </div>
  );
}
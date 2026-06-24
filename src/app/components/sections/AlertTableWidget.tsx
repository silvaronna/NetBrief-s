import { useState } from 'react';
import { Search } from 'lucide-react';

export function AlertTableWidget({ title, data }: { title: string, data: any }) {
  // 1. State untuk menyimpan keyword pencarian
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Logika filter data secara dinamis
  const filteredData = data.dataSource.filter((row: any) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      row.source.toLowerCase().includes(searchLower) ||
      row.type.toLowerCase().includes(searchLower) ||
      row.message.toLowerCase().includes(searchLower) ||
      row.severity.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="bg-[#27391C] rounded-xl border border-[#255F38] shadow-2xl flex flex-col hover:border-[#1F7D53] hover:shadow-[0_4px_25px_rgba(31,125,83,0.15)] transition-all duration-300 relative overflow-hidden group">
      {/* Premium indicator top line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#1F7D53]/60 to-transparent group-hover:via-[#1F7D53] transition-all duration-500" />
      
      {/* HEADER SECTION & SEARCH BAR */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#255F38] pt-4">
        <h3 className="font-['Inter'] font-semibold text-[14px] text-[#f4f4f5] uppercase tracking-wide">
          {title}
        </h3>
        
        {/* Search Input Box */}
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={14} className="text-[#a1a1aa]" />
          </div>
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[rgba(24,35,15,0.6)] border border-[#255F38] text-[#f4f4f5] text-[12px] rounded-md pl-9 pr-3 py-1.5 focus:outline-none focus:border-[#1F7D53] focus:ring-1 focus:ring-[#1F7D53] transition-all placeholder:text-[#a1a1aa]"
          />
        </div>
      </div>

      {/* TABLE CONTAINER 
        max-h-[450px]: Membatasi tinggi kontainer kira-kira sebesar 12 baris.
        overflow-y-auto: Menambahkan scrollbar vertikal jika baris lebih dari 12.
      */}
      <div className="p-0 overflow-x-auto overflow-y-auto max-h-[450px]">
        <table className="w-full text-left relative">
          
          {/* Sticky Header: Agar saat di-scroll ke bawah, header tabel tidak ikut hilang */}
          <thead className="sticky top-0 bg-[#27391C] z-10 border-b border-[#255F38]">
            <tr className="text-[#a1a1aa] text-[10px] uppercase font-['Inter'] tracking-wider">
              {data.columns.map((col: any) => (
                <th key={col.key} className="py-3 px-4 bg-[#27391C]">{col.label}</th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row: any) => (
                <tr key={row.id} className="border-b border-[rgba(37,95,56,0.15)] last:border-0 hover:bg-[rgba(37,95,56,0.1)] transition-colors">
                  <td className="py-2.5 px-4 text-[#9f9fa9] text-[12px] whitespace-nowrap">{row.time}</td>
                  <td className="py-2.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${
                        row.severity === 'Critical' 
                          ? 'bg-[rgba(239,68,68,0.15)] text-[#fca5a5] border-[rgba(239,68,68,0.3)] shadow-[0_0_6px_rgba(239,68,68,0.15)]' 
                          : row.severity === 'Warning' 
                            ? 'bg-[rgba(249,115,22,0.15)] text-[#fdba74] border-[rgba(249,115,22,0.3)] shadow-[0_0_6px_rgba(249,115,22,0.15)]' 
                            : 'bg-[rgba(31,125,83,0.15)] text-[#a7f3d0] border-[rgba(31,125,83,0.3)] shadow-[0_0_6px_rgba(31,125,83,0.15)]'
                      }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            row.severity === 'Critical' 
                              ? 'bg-[#ef4444] animate-pulse' 
                              : row.severity === 'Warning' 
                                ? 'bg-[#f97316] animate-pulse' 
                                : 'bg-[#1F7D53] animate-pulse'
                          }`} />
                          {row.severity}
                      </span>
                  </td>
                  <td className="py-2.5 px-4 text-[#d4d4d8] text-[12px]">{row.source}</td>
                  <td className="py-2.5 px-4 text-[#d4d4d8] text-[12px]">{row.type}</td>
                  <td className="py-2.5 px-4 text-[#a1a1aa] text-[12px]">{row.message}</td>
                </tr>
              ))
            ) : (
              /* State jika hasil pencarian tidak ditemukan */
              <tr>
                <td colSpan={5} className="py-12 text-center text-[#a1a1aa] text-[13px]">
                  No alerts found matching <span className="text-[#f4f4f5]">"{searchTerm}"</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

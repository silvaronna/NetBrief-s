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
    <div className="bg-[#09090b] rounded-lg border border-[#27272a] shadow-lg flex flex-col hover:border-[rgba(43,127,255,0.3)] transition-colors">
      
      {/* HEADER SECTION & SEARCH BAR */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272a]">
        <h3 className="font-['Inter'] font-semibold text-[14px] text-[#f4f4f5] uppercase tracking-wide">
          {title}
        </h3>
        
        {/* Search Input Box */}
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={14} className="text-[#71717b]" />
          </div>
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[rgba(24,24,27,0.5)] border border-[#27272a] text-[#d4d4d8] text-[12px] rounded-md pl-9 pr-3 py-1.5 focus:outline-none focus:border-[#2b7fff] focus:ring-1 focus:ring-[rgba(43,127,255,0.5)] transition-all placeholder:text-[#71717b]"
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
          <thead className="sticky top-0 bg-[#09090b] z-10 shadow-[0_1px_0_#27272a]">
            <tr className="text-[#71717b] text-[10px] uppercase font-['Inter']">
              {data.columns.map((col: any) => (
                <th key={col.key} className="py-3 px-4 bg-[#09090b]">{col.label}</th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row: any) => (
                <tr key={row.id} className="border-b border-[rgba(39,39,42,0.3)] last:border-0 hover:bg-[rgba(24,24,27,0.4)]">
                  <td className="py-2.5 px-4 text-[#9f9fa9] text-[12px] whitespace-nowrap">{row.time}</td>
                  <td className="py-2.5 px-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${row.severity === 'Critical' ? 'bg-[rgba(255,32,86,0.15)] text-[#ff637e] border border-[rgba(255,32,86,0.3)]' : row.severity === 'Warning' ? 'bg-[rgba(249,115,22,0.15)] text-[#F97316] border border-[rgba(249,115,22,0.3)]' : 'bg-[rgba(43,127,255,0.15)] text-[#2B7FFF] border border-[rgba(43,127,255,0.3)]'}`}>
                          {row.severity}
                      </span>
                  </td>
                  <td className="py-2.5 px-4 text-[#d4d4d8] text-[12px]">{row.source}</td>
                  <td className="py-2.5 px-4 text-[#d4d4d8] text-[12px]">{row.type}</td>
                  <td className="py-2.5 px-4 text-[#71717b] text-[12px]">{row.message}</td>
                </tr>
              ))
            ) : (
              /* State jika hasil pencarian tidak ditemukan */
              <tr>
                <td colSpan={5} className="py-12 text-center text-[#71717b] text-[13px]">
                  No alerts found matching <span className="text-[#d4d4d8]">"{searchTerm}"</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

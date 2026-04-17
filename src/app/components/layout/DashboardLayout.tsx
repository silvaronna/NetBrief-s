import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, Activity, AlertTriangle, Zap, Settings, User, Info } from "lucide-react";

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'alerts', label: 'Alerts', path: '/', icon: AlertTriangle, activeColor: '#00BC7D', bg: 'rgba(0,188,125,0.1)' },
    { id: 'traffic', label: 'Traffic', path: '/traffic', icon: Activity, activeColor: '#2B7FFF', bg: 'rgba(43,127,255,0.1)' },
    { id: 'performance', label: 'Performance', path: '/performance', icon: Zap, activeColor: '#F97316', bg: 'rgba(249,115,22,0.1)' }
  ];

  const currentTab = location.pathname.split('/')[1] || 'alerts';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-['Inter',sans-serif] flex flex-col">
      {/* Header */}
      <header className="h-[79px] bg-[rgba(9,9,11,0.8)] shadow-md shrink-0 flex items-center justify-between px-6 border-b border-[#27272a] relative z-50">
        <div className="flex items-center gap-4">
          
          {/* 2. Gunakan tag <img> untuk me-render logo */}
          <img 
            src="/mtm-logo.png"
            alt="MTM Logo" 
            className="w-10 h-10 object-contain hover:scale-105 transition-transform cursor-pointer" 
            onClick={() => navigate('/')} 
          />
          
          <div>
            <h1 className="font-bold text-[18px] tracking-wide uppercase text-[#f4f4f5]">mtm NetBRIEF</h1>
            <p className="font-['JetBrains_Mono',monospace] text-[12px] text-[#71717b]">Summarized Network Utilization</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex gap-4">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id || (tab.id === 'alerts' && location.pathname === '/');
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={`
                    flex items-center gap-2 h-10 px-3 transition-all duration-300 rounded-md
                    hover:scale-105
                  `}
                  style={{
                    color: isActive ? tab.activeColor : 'rgba(159,159,169,0.5)',
                    textShadow: isActive ? `0px 4px 6px ${tab.activeColor}` : 'none',
                    backgroundColor: isActive ? tab.bg : 'transparent',
                  }}
                >
                  <tab.icon 
                    size={16} 
                    stroke={isActive ? tab.activeColor : 'rgba(159,159,169,0.5)'} 
                  />
                  <span className={`font-['JetBrains_Mono',monospace] text-[15px] ${isActive ? 'font-bold' : 'font-normal'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`w-10 h-10 rounded-md border flex items-center justify-center transition-colors ${isMenuOpen ? 'bg-[#27272a] border-[#3f3f46] text-[#f4f4f5]' : 'bg-[rgba(24,24,27,0.5)] border-[rgba(39,39,42,0.5)] text-[#9f9fa9] hover:bg-[#27272a] hover:text-[#f4f4f5]'}`}
            >
              <Menu size={20} />
            </button>
            
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[rgba(9,9,11,0.95)] backdrop-blur-md border border-[#27272a] rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col py-1">
                  <button className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#d4d4d8] hover:bg-[#27272a] hover:text-[#f4f4f5] transition-colors w-full text-left">
                    <Settings size={14} className="text-[#9f9fa9]" />
                    <span>Configuration</span>
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#d4d4d8] hover:bg-[#27272a] hover:text-[#f4f4f5] transition-colors w-full text-left">
                    <User size={14} className="text-[#9f9fa9]" />
                    <span>User</span>
                  </button>
                  <div className="h-[1px] bg-[#27272a] my-1" />
                  <button className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#d4d4d8] hover:bg-[#27272a] hover:text-[#f4f4f5] transition-colors w-full text-left">
                    <Info size={14} className="text-[#9f9fa9]" />
                    <span>About</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative z-0">
        <Outlet />
      </main>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, Activity, AlertTriangle, Zap, Settings, User, Info } from "lucide-react";

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'alerts', label: 'Alerts', path: '/', icon: AlertTriangle, activeColor: '#1F7D53', bg: 'rgba(31,125,83,0.15)' },
    { id: 'traffic', label: 'Traffic', path: '/traffic', icon: Activity, activeColor: '#1F7D53', bg: 'rgba(31,125,83,0.15)' },
    { id: 'performance', label: 'Performance', path: '/performance', icon: Zap, activeColor: '#1F7D53', bg: 'rgba(31,125,83,0.15)' }
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
    <div className="min-h-screen bg-gradient-to-br from-[#18230F] via-[#121c0b] to-[#0d1607] text-[#f4f4f5] font-['Inter',sans-serif] flex flex-col">
      {/* Header */}
      <header className="h-[79px] bg-[rgba(24,35,15,0.75)] backdrop-blur-lg shadow-2xl shrink-0 flex items-center justify-between px-6 border-b border-[#255F38]/40 relative z-50 animate-header-down">
        <div className="flex items-center gap-4">
          
          {/* logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#1F7D53] rounded-full blur-md opacity-25 group-hover:opacity-75 transition-opacity duration-500" />
            <img 
              src="/mtm-logo.png"
              alt="MTM Logo" 
              className="w-10 h-10 object-contain relative z-10 hover:rotate-6 transition-transform cursor-pointer" 
              onClick={() => navigate('/')} 
            />
          </div>
          
          <div>
            <h1 className="font-bold text-[18px] tracking-widest uppercase text-[#ffffff] glow-text-emerald">mtm NetBRIEF</h1>
            <p className="font-['JetBrains_Mono',monospace] text-[11px] text-[#a7f3d0]/70 tracking-wider">Summarized Network Utilization</p>
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
                    flex flex-col items-center justify-center gap-1 h-12 px-4 transition-all duration-300 rounded-lg relative overflow-hidden group
                  `}
                  style={{
                    color: isActive ? tab.activeColor : 'rgba(244,244,245,0.6)',
                  }}
                >
                  {/* Subtle hover background tab */}
                  <div className="absolute inset-0 bg-[rgba(31,125,83,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-center gap-2 relative z-10 transition-transform duration-300 group-hover:scale-105">
                    <tab.icon 
                      size={15} 
                      stroke={isActive ? tab.activeColor : 'rgba(244,244,245,0.6)'} 
                    />
                    <span className={`font-['JetBrains_Mono',monospace] text-[14px] ${isActive ? 'font-bold' : 'font-normal'}`}>
                      {tab.label}
                    </span>
                  </div>

                  {/* Active glowing underline dot */}
                  {isActive && (
                    <span 
                      className="absolute bottom-1 w-1.5 h-1.5 rounded-full glow-border-emerald"
                      style={{ backgroundColor: tab.activeColor }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 ${isMenuOpen ? 'bg-[#27391C] border-[#1F7D53] text-[#ffffff] shadow-[0_0_10px_rgba(31,125,83,0.3)]' : 'bg-[rgba(39,57,28,0.4)] border-[#255F38] text-[#e4e4e7] hover:bg-[#27391C] hover:border-[#1F7D53] hover:text-[#ffffff] hover:scale-105'}`}
            >
              <Menu size={20} />
            </button>
            
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[rgba(39,57,28,0.95)] backdrop-blur-lg border border-[#1F7D53]/50 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex flex-col py-1.5">
                  <button className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#d4d4d8] hover:bg-[#255F38] hover:text-[#ffffff] transition-colors w-full text-left">
                    <Settings size={14} className="text-[#a1a1aa]" />
                    <span>Configuration</span>
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#d4d4d8] hover:bg-[#255F38] hover:text-[#ffffff] transition-colors w-full text-left">
                    <User size={14} className="text-[#a1a1aa]" />
                    <span>User</span>
                  </button>
                  <div className="h-[1px] bg-[#255F38]/60 my-1.5 mx-2" />
                  <button className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#d4d4d8] hover:bg-[#255F38] hover:text-[#ffffff] transition-colors w-full text-left">
                    <Info size={14} className="text-[#a1a1aa]" />
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
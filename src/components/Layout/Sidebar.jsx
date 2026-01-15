import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  QrCode, 
  FileText, 
  BarChart3,
  LogOut,
  Hexagon 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/users', icon: Users, label: 'User Management' },
    { path: '/qr-codes', icon: QrCode, label: 'QR Codes' },
    { path: '/landing-pages', icon: FileText, label: 'Landing Pages' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#0f172a] text-gray-300 flex flex-col border-r border-slate-800 z-50">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/50 bg-[#0f172a]">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-900/20">
            <Hexagon size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-none">AdminPanel</h1>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">System Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                    ${active 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                      : 'hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <item.icon 
                    size={20} 
                    className={`transition-colors ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                    strokeWidth={active ? 2.5 : 2}
                  />
                  <span>{item.label}</span>
                  
                  {/* Active Indicator Dot */}
                  {active && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/30" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User / Logout Section */}
      <div className="p-4 border-t border-slate-800 bg-[#0f172a]">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
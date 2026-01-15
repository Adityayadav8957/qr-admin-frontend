import { useAuth } from '../../context/AuthContext';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 right-0 left-72 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 z-40 transition-all duration-300">
      <div className="h-full px-8 flex items-center justify-between">
        
        {/* Left Side: Page Title or Search */}
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full max-w-sm hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Quick search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition duration-150 sm:text-sm"
            />
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-4">
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" />
          </button>

          <div className="h-8 w-px bg-gray-200 mx-1" />

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 leading-none">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-500 mt-1">{user?.email || 'admin@system.com'}</p>
            </div>
            
            <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <ChevronDown size={16} className="text-gray-400 mr-1 sm:block hidden" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
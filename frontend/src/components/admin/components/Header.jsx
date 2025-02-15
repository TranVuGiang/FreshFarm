import { Bell, Search, ChevronDown, Menu as MenuIcon } from 'lucide-react';

export const Header = ({ setSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <MenuIcon className="h-6 w-6 text-gray-500" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="relative p-2">
            <Bell className="h-6 w-6 text-gray-500" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/api/placeholder/32/32" alt="Avatar" className="w-8 h-8 rounded-full" />
            <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};
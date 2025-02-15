import { useNavigate } from 'react-router-dom';
import { Package, HelpCircle, LogOut, X } from 'lucide-react';

export const Sidebar = ({ sidebarOpen, setSidebarOpen, menuItems }) => {
  const navigate = useNavigate();

  const renderMenuItem = (item) => {
    if (item.submenu) {
      return (
        <div key={item.title}>
          <div className="flex items-center gap-4 px-4 py-3 text-gray-600">
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.title}</span>
          </div>
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100">
            {item.submenu.map((subItem) => (
              <button
                key={subItem.title}
                onClick={() => navigate(`/admin/${subItem.path}`)}
                className="flex items-center w-full gap-4 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <subItem.icon className="h-5 w-5" />
                <span className="font-medium">{subItem.title}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <button
        key={item.title}
        onClick={() => navigate(`/admin/${item.path}`)}
        className="flex items-center w-full gap-4 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
      >
        <item.icon className="h-5 w-5" />
        <span className="font-medium">{item.title}</span>
      </button>
    );
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold text-gray-800">FreshFarm</span>
        </div>
        <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>
      
      <nav className="p-4 space-y-1">
        {menuItems.map(renderMenuItem)}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <div className="space-y-1">
          <button className="flex items-center w-full gap-4 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <HelpCircle className="h-5 w-5" />
            <span className="font-medium">Trợ giúp</span>
          </button>
          <button className="flex items-center w-full gap-4 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
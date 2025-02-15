import React from "react";
import { NavLink } from "react-router-dom";
import { ChevronRight, LogOut } from "lucide-react";

const DashboardSidebar = ({
  menuItems,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  accountSubMenuOpen,
  setAccountSubMenuOpen,
  user,
}) => {
  return (
    <aside
      className={`
        lg:block fixed lg:relative inset-y-0 left-0
        transform lg:transform-none transition-transform duration-300
        w-64 bg-white shadow-lg lg:shadow-none
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      <div className="flex flex-col pt-8 items-center justify-center">
        <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt="Avatar" className="w-14 h-14 rounded-full" />
        <span className="hidden sm:block font-montserrat text-xl">{user.name}</span>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.value}>
            {item.subMenu ? (
              <>
                {/* Nút cha của mục có subMenu */}
                <button
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-50"
                  onClick={() => setAccountSubMenuOpen(!accountSubMenuOpen)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  <ChevronRight
                    className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${
                      accountSubMenuOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {accountSubMenuOpen && (
                  <div className="ml-6 space-y-1">
                    {item.subMenu.map((subItem) => (
                      <NavLink
                        key={subItem.value}
                        to={`/user/${item.value}/${subItem.value}`}
                        className={({ isActive }) =>
                          `w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                            isActive
                              ? "bg-green-50 text-green-600"
                              : "text-gray-600 hover:bg-gray-50"
                          }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <subItem.icon className="w-5 h-5" />
                        <span>{subItem.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={`/user/${item.value}`}
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            )}
          </div>
        ))}
        <hr className="my-6" />
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;

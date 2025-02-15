import { useContext, useState } from "react";
import { Menu } from "lucide-react";
import { TabContent } from "@/components/user/content/tabContent";
import DashboardSidebar from "@/components/user/sidebar/TabSidebar";
import { useParams } from "react-router-dom";
import { DataContext } from "@/constants/DataProvider";
import { menuItemsUserDashboard } from "@/constants/DataIndex";

const UserDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [accountSubMenuOpen, setAccountSubMenuOpen] = useState(false);

  // Lấy tham số từ URL. Với cấu trúc route: /dashboard/:tab hoặc /dashboard/account/:subTab
  const { tab, subTab } = useParams();
  const activeTab = subTab || tab || "account";

  console.log(activeTab);

  const { userDetail } = useContext(DataContext);

  const notifications = [
    { id: 1, message: "Đơn hàng #12345 đang được giao", time: "1 giờ trước" },
    { id: 2, message: "Ưu đãi mới: Giảm 10% cho rau củ", time: "2 giờ trước" },
  ];

  let title = "";
  menuItemsUserDashboard.forEach((item) => {
    if (item.subMenu) {
      const found = item.subMenu.find((subItem) => subItem.value === activeTab);
      if (found) {
        title = found.label;
      }
    } else if (item.value === activeTab) {
      title = item.label;
    }
  });
  if (!title) {
    // Nếu không tìm thấy, mặc định hiển thị "Tài khoản"
    title = "Tài khoản";
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 pt-20 md:pt-44 lg:pt-40 pb-10">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          {/* Aside Navigation */}
          <DashboardSidebar
            menuItems={menuItemsUserDashboard}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            accountSubMenuOpen={accountSubMenuOpen}
            setAccountSubMenuOpen={setAccountSubMenuOpen}
            user={userDetail}
          />

          {/* Main Content */}
          <main className="flex-1 lg:ml-6">
            <div className="mb-6 flex">
              <div className="flex items-center">
                <button
                  className="lg:hidden mr-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>
            <TabContent
              tab={activeTab}
              user={userDetail}
              notifications={notifications}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

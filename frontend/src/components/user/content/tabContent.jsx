import Account from "../components/Account";
import Notifications from "../components/Notifications";
import OrderTrackingPage from "../components/OrderDetail";
import OrderManagement from "../components/OrderManagement";

export const TabContent = ({ tab, user, notifications }) => {
  switch (tab) {
    case "user-profile":
      return <Account user={user} />;
    case "purchase":
      return <OrderManagement />;
    case "notifications":
      return <Notifications notifications={notifications} />;
    case "order": 
    return <OrderTrackingPage />
    default:
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">
            Chức năng đang phát triển
          </h3>
          <p className="text-gray-600">Tính năng này sẽ sớm được cập nhật.</p>
        </div>
      );
  }
};

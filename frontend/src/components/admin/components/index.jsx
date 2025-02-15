
import OrdersManagement from "../contents/mangements/Orders";
import CategoriesManagement from "../contents/mangements/Categories";
import ProductsManagement from "../contents/mangements/Products";
import CustomersManagement from "../contents/mangements/Customers";
import PaymentsManagement from "../contents/mangements/Payments";
import Dashboard from "@/components/admin/Dashboard";
import Settings from "../Settings";


export const MainContent = ({ tab }) => {
  switch (tab) {
    case "dashboard":
      return <Dashboard />;
    case "orders":
      return <OrdersManagement />;
    case "categories":
      return <CategoriesManagement />;
    case "products":
      return <ProductsManagement />;
    case "customers":
      return <CustomersManagement />;
    case "payments":
      return <PaymentsManagement />;
    case "settings":
      return <Settings />;
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

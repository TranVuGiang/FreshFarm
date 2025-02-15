import { MainContent } from "@/components/admin/components/index";
import { Header } from "@/components/admin/components/Header";
import { Sidebar } from "@/components/admin/components/SideBar";
import { menuItemsAdminDashboard } from "@/constants/DataIndex";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { tab } = useParams()
  const activeTab = tab || 'dashboard';
  console.log(tab)

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        menuItems={menuItemsAdminDashboard}
      />
      <div className="lg:pl-64">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="p-6">
          <MainContent tab={activeTab}/>
        </main>
      </div>
    </div>
  );
};
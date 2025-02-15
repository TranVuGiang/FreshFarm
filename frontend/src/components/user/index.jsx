// DashboardHeader.jsx
import React from 'react';
import { Menu } from 'lucide-react';

const DashboardHeader = ({ user, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">FreshFarm</h1>
          </div>
          <div className="flex items-center space-x-4">
            <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
            <span className="hidden sm:block">{user.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

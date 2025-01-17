import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      {/* Thanh điều hướng chính */}
      <div className="w-full flex items-center justify-between px-5 py-4 bg-green-900">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white">🌾 FreshFarm</span>
        </div>

        {/* Thanh tìm kiếm (Ẩn trên màn hình nhỏ) */}
        <div className="hidden md:flex items-center justify-center w-1/2">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-black" />
            </button>
          </div>
        </div>

        {/* Icon điều hướng */}
        <div className="flex items-center space-x-4 text-white">
          <UserIcon className="h-6 w-6 cursor-pointer hover:text-gray-300" />
          <ShoppingCartIcon className="h-6 w-6 cursor-pointer hover:text-gray-300" />
          {/* Menu toggle button (hiện trên màn hình nhỏ) */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu di động */}
      {isMenuOpen && (
        <div className="lg:hidden bg-green-700 text-white p-5 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-black" />
            </button>
          </div>
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 rounded-md hover:bg-green-700"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md hover:bg-green-700"
              >
                Products
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md hover:bg-green-700"
              >
                About Us
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md hover:bg-green-700"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="hidden bg-white shadow-lg text-green-900 md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex items-center justify-center h-14">
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#" className="rounded-md relative group">
                  Home
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-900 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </a>
                <a href="#" className="rounded-md relative group">
                  Products
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-900 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </a>
                <a href="#" className="rounded-md relative group">
                  About Us
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-900 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </a>
                <a href="#" className="rounded-md relative group">
                  Contact
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-900 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-green-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

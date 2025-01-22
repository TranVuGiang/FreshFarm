import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

const navLists = ["Trang chủ", "Nổi bật", "Bán chạy", "Giới thiệu", "Liên hệ"];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header className="fixed w-full z-50 font-montserrat">
      <div className="  ">
        {/* Thanh điều hướng chính */}
        <div
          className={`w-full flex items-center justify-between px-5 py-4 ${
            isScrolled
              ? "bg-black shadow-lg transition duration-500"
              : "bg-transparent"
          }`}
        >
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
            <span className="relative cursor-pointer hover:text-gray-300">
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="absolute flex justify-center -top-2 -right-2 border-2 border-red-600 text-[12px] text-white text-center bg-red-500 rounded-xl w-5 h-5">
                1
              </span>
            </span>
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
              {navLists.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-3 py-2 rounded-md hover:bg-green-700"
                >
                  item
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav
        className={`hidden bg-transparent shadow-lg bg-white ${
          isScrolled
            ? "shadow-lg transition duration-500 text-black"
            : "bg-opacity-30 text-white"
        } md:block z-10`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex items-center justify-center h-14">
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navLists.map((nav, i) => (
                  <a key={i} href="#" className="rounded-md relative group">
                    {nav}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-900 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                  </a>
                ))}
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

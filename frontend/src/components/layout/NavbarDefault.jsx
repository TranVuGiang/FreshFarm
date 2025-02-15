import { useContext, useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import ShoppingCart from "./ShoppingCart";
import LoginPage from "@/pages/login";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "@/constants/DataProvider";
import { api_ShowShoppingCart } from "@/utils/authService";
import { ErrorNotification } from "../notifications";
import { navLists } from "@/constants/DataIndex";


const NavbarDefault = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);

  const navigate = useNavigate();
  const { token, setCartCount, cartCount } = useContext(DataContext)

  useEffect(() => {
    const loadCarts = async() => {
      if(token) {
        const resp = await api_ShowShoppingCart(token);
        console.log(resp.data.cart_details);
        const totalItems = resp.data.cart_details.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
      }
    }
    loadCarts();
  }, [token, setCartCount])

    // Handle Search
    const handleSearch = (event) => {
      event.preventDefault();
      navigate(`/products/search?q=${searchQuery}`);
    };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsAccountMenuOpen(false);
    window.location.reload();
  };

  //handleCartOpen 
  const handleCartOpen = (e) => {
    e.preventDefault();
    if(!token) {
      setCheckLogin(true);
    } else {
      setIsCartOpen(true);
    }
  }

  if (checkLogin) {
    return (
      <ErrorNotification
        isOpen={checkLogin}
        onClose={() => setCheckLogin(false)}
        title={"Thông báo"}
        message={"Bạn cần đăng nhập để mua hàng"}
        buttonText={"Tiếp tục"}
      />
    );
  }
  

  return (
    <header className="fixed w-full z-30 font-montserrat">
      <div className="">
        {/* Thanh điều hướng chính */}
        <div
          className={`w-full flex items-center justify-between px-5 py-4 bg-black shadow-lg`}
        >
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white cursor-pointer"
            >
              🌾 FreshFarm
            </Link>
          </div>

          {/* Thanh tìm kiếm (Ẩn trên màn hình nhỏ) */}
          <div className="hidden md:flex items-center justify-center w-1/2">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-black" />
              </button>
            </form>
          </div>

          {/* Icon điều hướng */}
          <div className="flex items-center space-x-4 text-white">
            {token ? (
              <div className="relative">
                <button
                  className="relative cursor-pointer hover:text-gray-300"
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                >
                  <UserIcon className="h-6 w-6" />
                </button>
                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg py-2 z-20">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                      Thông tin tài khoản
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  className="relative cursor-pointer hover:text-gray-300"
                  onClick={() => navigate("/login")}
                >
                  <UserIcon className="h-6 w-6" />
                </button>
               
              </div>
            )}
            <div className="relative">
              <button
                className="relative cursor-pointer hover:text-gray-300"
                onClick={handleCartOpen}
              >
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="absolute flex justify-center -top-2 -right-2 border-2 border-red-600 text-[12px] text-white text-center bg-red-500 rounded-xl w-5 h-5">
                  {cartCount}
                </span>
              </button>
              <ShoppingCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </div>
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
              {navLists.map((nav, i) => (
                <Link
                  key={i}
                  to={nav.path}
                  className="rounded-md relative group"
                >
                  {nav.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-900 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NavbarDefault */}
      <nav
        className={`hidden bg-transparent shadow-lg bg-white transition duration-500 text-black md:block z-10`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex items-center justify-center h-14">
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navLists.map((nav, i) => (
                  <Link key={i} to={nav.path} className="rounded-md relative group">
                    {nav.label}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-900 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                  </Link>
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

export default NavbarDefault;

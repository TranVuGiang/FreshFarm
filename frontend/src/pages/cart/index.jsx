import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart as CartIcon,
  Trash2,
  Plus,
  Minus,
  CheckSquare,
  Square,
} from "lucide-react";
import { DataContext } from "@/constants/DataProvider";
import {
  api_DeleteShoppingCart,
  api_ShowShoppingCart,
} from "@/utils/authService";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);

  const { token } = useContext(DataContext);
  const navigate = useNavigate()


  useEffect(() => {
    if (token) {
      const getCartItems = async () => {
        const resp = await api_ShowShoppingCart(token);
        console.log(resp.data);
        if(!resp.data.cart_details.length > 0) {
          setSelectedItems(null);
          return
        }
        setCartItems(resp.data);
      };
      getCartItems();
    }
  }, [token]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      cart_details: prevCartItems.cart_details.map((item) =>
        item.id_cart_detail === id ? { ...item, quantity: newQuantity } : item
      ),
      // Recalculate total price
      total_price: prevCartItems.cart_details.reduce((total, item) => {
        if (item.id_cart_detail === id) {
          return total + item.price * newQuantity;
        }
        return total + item.price * item.quantity;
      }, 0),
    }));
  };

  const removeItem = async (id_cart_detail) => {
    if (!token) return;

    try {
      const resp = await api_DeleteShoppingCart(token, id_cart_detail);

      if (resp.status === true) {
        setCartItems((prevCartItems) => ({
          ...prevCartItems,
          cart_details: prevCartItems.cart_details.filter(
            (item) => item.id_cart_detail !== id_cart_detail
          ),
          total_price: prevCartItems.cart_details
            .filter((item) => item.id_cart_detail !== id_cart_detail)
            .reduce((total, item) => total + item.price * item.quantity, 0),
        }));

        setSelectedItems((prevSelected) =>
          prevSelected.filter((id) => id !== id_cart_detail)
        );
      } else {
        console.error("Lỗi khi xóa sản phẩm:", resp);
      }
      const resp2 = await api_ShowShoppingCart(token);
      setCartItems(resp2.data);
    } catch (error) {
      console.error("Xóa sản phẩm thất bại:", error);
    }
  };

  const removeSelectedItems = () => {
    setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const calculateTotal = () => {
    return cartItems.total_price;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 sm:px-6 lg:px-8 pt-24 md:pt-44 lg:pt-44 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Giỏ hàng của bạn
          </h1>
          <CartIcon className="w-6 h-6 text-gray-600" />
        </div>

        <motion.div
          layout
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6"
        >
          {console.log(cartItems)
          }
          {cartItems === null || cartItems.cart_details.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 sm:py-12"
            >
              <CartIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-base sm:text-lg">
                Giỏ hàng trống
              </p>
            </motion.div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 pb-4 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-0">
                  <button
                    onClick={toggleSelectAll}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    {selectedItems.length === cartItems.length ? (
                      <CheckSquare className="w-5 h-5 text-green-600" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                    <span>Chọn tất cả</span>
                  </button>
                  {selectedItems.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={removeSelectedItems}
                      className="text-red-500 hover:text-red-600 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Xóa đã chọn ({selectedItems.length})</span>
                    </motion.button>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {cartItems.length} sản phẩm
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <AnimatePresence>
                    {cartItems.cart_details.map((item) => (
                      <motion.div
                        key={item.id_cart_detail}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center py-4 sm:py-6 border-b border-gray-100 gap-4 sm:gap-0"
                      >
                        <button
                          onClick={() => toggleSelectItem(item.id_cart_detail)}
                          className="sm:mr-4"
                        >
                          {selectedItems.includes(item.id_cart_detail) ? (
                            <CheckSquare className="w-5 h-5 text-green-600" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400" />
                          )}
                        </button>

                        <div className="flex items-start gap-4 sm:gap-6 flex-1">
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-md"
                          />

                          <div className="flex-1">
                            <h3 className="text-base sm:text-lg font-medium text-gray-800">
                              {item.product.name}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {/* {item.category} */}
                            </p>
                            <p className="text-green-600 font-medium mt-1">
                              {item.price.toLocaleString()}đ
                            </p>

                            <div className="flex items-center justify-between mt-4 sm:mt-2">
                              <div className="flex items-center bg-gray-50 rounded-lg p-1 sm:p-2">
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    updateQuantity(
                                      item.id_cart_detail,
                                      item.quantity - 1
                                    )
                                  }
                                  className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                  <Minus className="w-4 h-4 text-gray-600" />
                                </motion.button>
                                <span className="mx-4 font-medium text-gray-700">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    updateQuantity(
                                      item.id_cart_detail,
                                      item.quantity + 1
                                    )
                                  }
                                  className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="w-4 h-4 text-gray-600" />
                                </motion.button>
                              </div>

                              <div className="flex items-center gap-4">
                                <p className="text-base sm:text-lg font-medium text-gray-800">
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}
                                  đ
                                </p>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    removeItem(item.id_cart_detail)
                                  }
                                  className="text-red-500 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <motion.div layout className="mt-6 sm:mt-8 border-t pt-4 sm:pt-6">
                <div className="flex justify-between text-base sm:text-lg font-medium">
                  <span>Tổng cộng</span>
                  <span className="text-green-600">
                    {calculateTotal().toLocaleString()}đ
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-4 px-6 rounded-xl font-medium shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
                  onClick={() => navigate('/check-out')}
                >
                  Thanh toán ngay
                </motion.button>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShoppingCart;

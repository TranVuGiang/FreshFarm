import { SuccessNotification } from "@/components/notifications";
import { DataContext } from "@/constants/DataProvider";
import {
  api_Checkout,
  api_ShowShoppingCart,
  api_UpdateUserInfo,
} from "@/utils/authService";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { token, userDetail, triggerCartUpdate } = useContext(DataContext);
  const [cartItems, setCartItems] = useState(null); // Dữ liệu giỏ hàng lấy từ API
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  // Lấy giỏ hàng từ API khi có token
  useEffect(() => {
    if (token) {
      const getCartItems = async () => {
        try {
          const resp = await api_ShowShoppingCart(token);
          if (resp?.data) {
            setCartItems(resp.data);
          }
        } catch (error) {
          console.error("Lỗi khi lấy giỏ hàng:", error);
        }
      };
      getCartItems();
    }
  }, [token]);

  // Khi có userDetail, tự động điền thông tin vào form
  useEffect(() => {
    if (userDetail) {
      setFormData({
        name: userDetail.name || "",
        email: userDetail.email || "",
        phone: userDetail.phone || "",
        address: userDetail.address || "",
      });
    }
  }, [userDetail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    return cartItems?.total_price || 0;
  };

  const handleSubmit = async () => {
    try {
      await api_Checkout(token);
      setIsSuccess(true);
      triggerCartUpdate()
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:px-6 lg:px-8 pt-24 md:pt-44 lg:pt-44 pb-10">
       <SuccessNotification
        isOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          window.location.href = '/danh-muc';
        }}
        title={"Đặt hàng thành công"}
        message={"Cảm ơn bạn đã mua sắm tại đây"}
        buttonText={"Tiếp tục"}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
          FreshFarm
        </h1>
        {/* Bọc toàn bộ nội dung vào trong một form để xử lý submit thanh toán */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Thông tin khách hàng */}
            <div className="bg-white border rounded shadow">
              <div className="border-b p-4">
                <h2 className="text-xl font-bold">Thông tin giao hàng</h2>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Địa chỉ giao hàng
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Chi tiết đơn hàng */}
            <div className="bg-white border rounded shadow">
              <div className="border-b p-4">
                <h2 className="text-xl font-bold">Chi tiết đơn hàng</h2>
              </div>
              <div className="p-4 space-y-4">
                {cartItems &&
                cartItems.cart_details &&
                cartItems.cart_details.length > 0 ? (
                  cartItems.cart_details.map((item) => (
                    <div
                      key={item.id_cart_detail}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">
                          SL: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Giỏ hàng trống</p>
                )}
                <div className="flex justify-between items-center pt-4">
                  <p className="font-bold">Tổng cộng:</p>
                  <p className="font-bold text-xl text-green-700">
                    {calculateTotal().toLocaleString()}đ
                  </p>
                </div>
              </div>
              <div className="p-4 border-t">
                <button
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  onClick={handleSubmit}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

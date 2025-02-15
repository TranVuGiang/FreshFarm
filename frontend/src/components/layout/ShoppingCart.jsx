import { XIcon, Leaf } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "@/constants/DataProvider";
import {
  api_DeleteShoppingCart,
  api_ShowShoppingCart,
} from "@/utils/authService";
import { Link } from "react-router-dom";

const ShoppingCart = ({ isOpen, onClose }) => {
  const wrapperRef = useRef(null);
  const [cartItems, setCartItems] = useState(null);

  const { token, cartUpdate, triggerCartUpdate } = useContext(DataContext);


  //Load Cart items
  useEffect(() => {
    if (token) {
      const getCartItems = async () => {
        const resp = await api_ShowShoppingCart(token);
        setCartItems(resp.data);
      };
      getCartItems();
    }
  }, [token, cartUpdate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleRemoveItem = async (id_cart_detail) => {
    if (!token) return;
    const resp = await api_DeleteShoppingCart(token, id_cart_detail);
    if (resp.status === true) {
      setCartItems((prev) => ({
        ...prev,
        cart_details: prev.cart_details.filter(
          (item) => item.id_cart_detail !== id_cart_detail
        ),
      }));
      triggerCartUpdate()
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="relative z-40"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
      id="shoppingCart"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div
              className="pointer-events-auto w-screen max-w-md"
              ref={wrapperRef}
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-6 w-6 text-green-600" />
                      <h2
                        className="text-xl font-medium text-green-800"
                        id="slide-over-title"
                      >
                        Giỏ Hàng FreshFarm
                      </h2>
                    </div>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                      >
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Đóng</span>
                        <XIcon className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cartItems.cart_details.map((cat) => (
                          <li className="flex py-6" key={cat.id_cart_detail}>
                            <div className="size-24 shrink-0 overflow-hidden rounded-lg border border-gray-200">
                              <img
                                src={cat.product.image}
                                alt={cat.product.name}
                                className="size-full object-cover"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a
                                      href="#"
                                      className="text-green-700 hover:text-green-800"
                                    >
                                      {cat.product.name}
                                    </a>
                                  </h3>
                                  <p className="ml-4">{cat.price}đ</p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500">
                                    Số lượng: {cat.quantity}
                                  </span>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-red-600 hover:text-red-500"
                                    onClick={() =>
                                      handleRemoveItem(cat.id_cart_detail)
                                    }
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Tổng giá: </p>
                    <p>{cartItems.total_price}đ</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Phí vận chuyển sẽ được tính ở bước thanh toán.
                  </p>
                  <div className="mt-6">
                    <Link
                      to={'/gio-hang'}
                      className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                    >
                      Thanh toán ngay
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      hoặc{" "}
                      <button
                        type="button"
                        className="font-medium text-green-600 hover:text-green-500"
                        onClick={onClose}
                      >
                        Tiếp tục mua sắm
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

import React, { useContext, useEffect, useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CreateSlug } from "@/utils/createUrlSlug";
import { api_AddShoppingCart, api_ShowShoppingCart } from "@/utils/authService";
import { DataContext } from "@/constants/DataProvider";
import { ErrorNotification, SimpleSuccessNotification } from "@/components/notifications";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [checkLogin, setCheckLogin] = useState(false);
  const { token, setCartCount, triggerCartUpdate } = useContext(DataContext);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);
  if(checkLogin) {
    return (
      <ErrorNotification 
        isOpen={checkLogin} 
        onClose={() => setCheckLogin(false)}
        title={"Thông báo"}
        message={"Bạn cần đăng nhập để mua hàng"}
        buttonText={"Tiếp tục"}
      />
    )
  }

  const calculateDiscountedPrice = () => {
    // Chuyển đổi giá và chiết khấu sang số
    const price = Number(product.price);
    const discount = Number(product.discount);

    // Kiểm tra chuyển đổi có thành công không
    if (isNaN(price) || isNaN(discount) || discount <= 0) {
      return product.price.toLocaleString("vi-VN") + " đ";
    }

    // Tính giá sau chiết khấu
    const discountAmount = price * (discount / 100);
    const discountedPrice = price - discountAmount;

    // Định dạng giá theo tiếng Việt
    return discountedPrice.toLocaleString("vi-VN") + " VND";
  };

  const handleProductDetail = (name, id) => {
    const productSlug = CreateSlug(name);
    navigate(`/danh-muc/chitietsanpham?name=${productSlug}&id=${id}`);
  };

  const handleAddToCart = async (id_product) => {
    try {
      if (token) {
        const resp = await api_AddShoppingCart(token, id_product, 1);
        console.log(resp);
        setCheckLogin(false);
        setAddToCartSuccess(true);
        const resp2 = await api_ShowShoppingCart(token) 
        const newTotalItems = resp2.data.cart_details.reduce(
          (sum, item) => sum + item.quantity, 
          0
        );
        setCartCount(newTotalItems);
        triggerCartUpdate();
      } else {
        setCheckLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <SimpleSuccessNotification 
        isOpen={addToCartSuccess}
        onClose={() => setAddToCartSuccess(false)}
      />
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ">
      
      {/* Product Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{product.discount}%
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-30 md:bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-4">
          <button className="opacity-100 md:opacity-0 group-hover:opacity-100 bg-white p-2 rounded-full shadow-md transform hover:scale-110 transition-all">
            <Heart className="text-gray-700" size={20} />
          </button>
          <button
            onClick={() => handleAddToCart(product.id_product)}
            className="opacity-100 md:opacity-0 group-hover:opacity-100 bg-white p-2 rounded-full shadow-md transform hover:scale-110 transition-all"
          >
            <ShoppingCart className="text-gray-700" size={20} />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div
        onClick={() => handleProductDetail(product.name, product.id_product)}
        className="cursor-pointer p-4 space-y-2 flex-center flex-col"
      >
        <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            {product.discount > 0 ? (
              <div className="flex-center flex-col">
                <span className="text-gray-400 line-through text-sm">
                  {product.price.toLocaleString("vi-VN")} VND
                </span>
                <span className="text-red-600 font-bold text-base md:text-lg">
                  {calculateDiscountedPrice()}/Kg
                </span>
              </div>
            ) : (
              <span className="text-green-600 font-bold text-base md:text-lg">
                {product.price.toLocaleString("vi-VN")} VND/Kg
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductCard;

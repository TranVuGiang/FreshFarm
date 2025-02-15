import React, { useContext, useEffect, useRef, useState } from "react";
import { Star, Truck, ShieldCheck, Heart } from "lucide-react";
import {
  api_AddShoppingCart,
  api_ShowProductDetail,
  api_ShowShoppingCart,
} from "@/utils/authService";
import { useLocation } from "react-router-dom";
import { DataContext } from "@/constants/DataProvider";
import { motion } from "framer-motion";
import { SimpleSuccessNotification } from "@/components/notifications";
const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("id");
  const { token, setCartCount, triggerCartUpdate } = useContext(DataContext);

  const handleAddToCart = async (id_product) => {
    try {
      if (token) {
        const resp = await api_AddShoppingCart(token, id_product, quantity);
        console.log(resp);
        setAddToCartSuccess(true);
        const cartResp = await api_ShowShoppingCart(token);
          const newTotalItems = cartResp.data.cart_details.reduce(
            (sum, item) => sum + item.quantity, 
            0
          );
          setCartCount(newTotalItems);
        triggerCartUpdate();
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    const loadProductDetail = async () => {
      const resp = await api_ShowProductDetail(query);
      console.log(resp);
      setProducts(resp.data);
    };
    loadProductDetail();
  }, [query]);

  const product = {
    name: "Cà Chua Organic Da Lat",
    price: 35000,
    originalPrice: 45000,
    description:
      "Cà chua organic được trồng tại Đà Lạt, đảm bảo không sử dụng thuốc trừ sâu, phân bón hóa học. Màu đỏ tươi, vị ngọt đậm đà, giàu vitamin C và các chất chống oxy hóa.",
    origin: "Đà Lạt, Lâm Đồng",
    certification: "Chứng nhận VietGAP",
    weight: "500g/hộp",
    images: [
      "/api/placeholder/500/500",
      "/api/placeholder/500/500",
      "/api/placeholder/500/500",
      "/api/placeholder/500/500",
    ],
  };

  const relatedProducts = [
    {
      id: 1,
      name: "Dưa Leo Baby Organic",
      price: 28000,
      originalPrice: 35000,
      image: "https://iwater.vn/Image/Picture/New/333/rau_cu.jpg",
      rating: 4.8,
      reviewCount: 86,
    },
    {
      id: 2,
      name: "Cà Rốt Baby Đà Lạt",
      price: 32000,
      originalPrice: 40000,
      image: "https://iwater.vn/Image/Picture/New/333/rau_cu.jpg",
      rating: 4.7,
      reviewCount: 124,
    },
    {
      id: 3,
      name: "Ớt Chuông Đỏ Organic",
      price: 45000,
      originalPrice: 55000,
      image: "https://iwater.vn/Image/Picture/New/333/rau_cu.jpg",
      rating: 4.9,
      reviewCount: 92,
    },
    {
      id: 4,
      name: "Xà Lách Lô Lô Xanh",
      price: 25000,
      originalPrice: 30000,
      image: "https://iwater.vn/Image/Picture/New/333/rau_cu.jpg",
      rating: 4.6,
      reviewCount: 78,
    },
  ];

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const ProductCard = ({ product }) => (
    <div className="group cursor-pointer">
      <div className="aspect-square rounded-lg overflow-hidden mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
        {product.name}
      </h3>
      <div className="flex items-center space-x-1 mt-1">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-sm text-gray-600">{product.rating}</span>
        <span className="text-sm text-gray-400">({product.reviewCount})</span>
      </div>
      <div className="flex items-baseline space-x-2 mt-1">
        <span className="font-medium text-green-600">
          {product.price.toLocaleString("vi-VN")}đ
        </span>
        <span className="text-sm text-gray-500 line-through">
          {product.originalPrice.toLocaleString("vi-VN")}đ
        </span>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 pt-24 md:pt-44 lg:pt-44 pb-10">
       <SimpleSuccessNotification 
        isOpen={addToCartSuccess}
        onClose={() => setAddToCartSuccess(false)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden border-2">
            <img
              src={products.image}
              alt={products.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {products.name}
            </h1>
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-500">(150 đánh giá)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-green-600">
                {/* Chua chinh gia */}
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              {/* Chua lam */}
              <span className="text-lg text-gray-500 line-through">
                {product.originalPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
            <span className="inline-block px-2 py-1 text-sm text-red-600 bg-red-100 rounded">
              Giảm 22%
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Số lượng:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => handleAddToCart(products.id_product)}
                className="flex-1 px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
               
                Thêm vào giỏ hàng
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Heart className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Truck className="w-6 h-6 text-green-600" />
              <span className="text-sm">Giao hàng miễn phí</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-green-600" />
              <span className="text-sm">Đảm bảo chất lượng</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-green-600" />
              <span className="text-sm">Cam kết hoàn tiền</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin sản phẩm</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-3 py-2 border-b">
                <span className="text-gray-600">Xuất xứ</span>
                <span className="col-span-2">{products.origin}</span>
              </div>
              <div className="grid grid-cols-3 py-2 border-b">
                <span className="text-gray-600">Chứng nhận</span>
                <span className="col-span-2">
                  {products.certification}
                </span>{" "}
                {/* Chua lam */}
              </div>
              <div className="grid grid-cols-3 py-2 border-b">
                <span className="text-gray-600">Khối lượng</span>
                <span className="col-span-2">{products.weight}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed">
              {products.description}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Sản phẩm liên quan
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

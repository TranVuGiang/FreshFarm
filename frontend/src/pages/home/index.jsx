import React, { useContext, useEffect, useState, lazy, Suspense, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ActionButton from "@/shared/ActionButton";
import ProductCard from "@/shared/ProductCard";
import { api_GetUserDetails } from "@/utils/authService";
import { DataContext } from "@/constants/DataProvider";

// Lazy Load các Component lớn
const Hero = lazy(() => import("@/components/home/Hero"));
const Discover = lazy(() => import("@/components/home/Disscover"));
const Promotion = lazy(() => import("@/components/home/Promotion"));

const HomePage = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [products, setProducts] = useState([]);
  const { token } = useContext(DataContext)
  console.log(token)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api_GetUserDetails(); // Giả sử API trả về danh sách sản phẩm
        setProducts(response.products || []);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  // Dùng useMemo để tránh re-render danh sách sản phẩm
  const memoizedProducts = useMemo(() => products, [products]);

  return (
    <>
      {/* Hero Section */}
      <section ref={sectionRef}>
        <Suspense fallback={<div>Loading Hero...</div>}>
          {inView && <Hero />}
        </Suspense>
      </section>

      {/* Discover Our Categories */}
      <section ref={sectionRef}>
        <Suspense fallback={<div>Loading Discover...</div>}>
          {inView && <Discover />}
        </Suspense>
      </section>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<div>Loading Promotion...</div>}>
          <Promotion products={memoizedProducts} />
        </Suspense>
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center">
          <div className="text-start space-y-6 mb-7">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Eco-Friendly Choices</h2>
            <p className="text-lg md:text-xl text-black">Explore a variety of fresh produce options.</p>
          </div>
          <ActionButton title="Shop Now" style="bg-white border-black border-[1px] text-black hover:bg-black hover:text-white transition-all duration-500 " />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {memoizedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-space-100 text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FreshFarm?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🌱", title: "100% Organic", desc: "All our products are grown naturally without harmful chemicals" },
              { icon: "🚚", title: "Fast Delivery", desc: "Same day delivery to ensure maximum freshness" },
              { icon: "💯", title: "Best Quality", desc: "We guarantee the quality of all our products" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const heroImageSlider = [
  "/images/bg-image1.png",
  "/images/bg-image2.png",
  "/images/farm.png",
];
// import required modules
import ActionButton from "@/shared/ActionButton";
import Hero from "@/components/home/Hero";
import Disscover from "@/components/home/Disscover";
import ProductCard from "@/shared/ProductCard";
import Promotion from "@/components/home/Promotion";
import { useInView } from "react-intersection-observer";
import { jwtDecode } from "jwt-decode";
import { api_GetUserDetails } from "@/utils/authService";


const HomePage = () => {
  const { ref: heroRef, inView: heroIsVisible } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { ref: discoverRef, inView: discoverIsVisible } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { ref: promotionRef, inView: promotionIsVisible } = useInView();
  const { ref: featureRef, inView: featureIsVisible } = useInView();

  const [products, setProducts] = useState([])


  useEffect(() => {
    // Fetch products
    const token = localStorage.getItem("token");
    console.log(token);
    
    if(token) {
      const loadUser = async () => {
        const resp = await api_GetUserDetails(token);
        console.log(resp)
      }
    loadUser();

    }
  } ,[])

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
      >
        {heroIsVisible ? <Hero /> : null}
      </section>
      {/* Discover Our Categories */}
      <section
        ref={discoverRef}
      >
       {discoverIsVisible ?  <Disscover /> : null}
      </section>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Promotion products={products} />
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center">
          <div className="text-start space-y-6 mb-7">
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              Eco-Friendly Choices
            </h2>
            <p className="text-lg md:text-xl text-black">
              Explore a variety of fresh produce options.
            </p>
          </div>
          <div className="text-end">
            <ActionButton
              title="Shop Now"
              style={
                "bg-white border-black border-[1px] text-black hover:bg-black hover:text-white transition-all duration-500 "
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-space-100 text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose FreshFarm?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
              <p>
                All our products are grown naturally without harmful chemicals
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p>Same day delivery to ensure maximum freshness</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-2">Best Quality</h3>
              <p>We guarantee the quality of all our products</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

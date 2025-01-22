import React from "react";
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
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import ActionButton from "@/shared/ActionButton";
import Hero from "@/components/home/Hero";
import Disscover from "@/components/home/Disscover";
const products = [
  {
    name: "Organic Vegetables",
    description: "Fresh from our fields",
    price: "$4.99/kg",
  },
  {
    name: "Free Range Eggs",
    description: "Farm fresh daily",
    price: "$3.99/dozen",
  },
  {
    name: "Artisan Honey",
    description: "Pure and natural",
    price: "$8.99/jar",
  },
  {
    name: "Fresh Fruits",
    description: "Seasonal selection",
    price: "$5.99/kg",
  },
];

const HomePages = () => {
  return (
    <>
     {/* Hero Section */}
      <Hero />
      {/* Discover Our Categories */}
      <Disscover />

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          Our Fresh Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
            >
              <div className="h-48 bg-green-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-800 font-bold">
                    {product.price}
                  </span>
                  <button className="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
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

export default HomePages;

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
import { Autoplay, EffectFade } from "swiper/modules";
import ActionButton from "@/shared/ActionButton";
import { useGSAP } from "@gsap/react";
import { animateWidthGsap } from "@/utils/animations";
import gsap from "gsap";
const Hero = () => {

  useGSAP(() => {
    gsap.to('#hero-title', {
      opacity: 1,
      y: 0
    })
  }, [])

  return (
    <>
      {/* Hero Section */}
      <div className="relative text-white h-screen font-montserrat">
        {/* Swiper Slider */}
        <div className="absolute top-0 left-0 w-full h-full">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            lazy={true}
            loop={true}
            className="mySwiper w-full h-full"
          >
            {heroImageSlider.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className="w-full h-full object-cover object-center"
                  src={image}
                  alt={`Slide ${index + 1}`}
                  loading="lazy"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 h-full flex items-center">
          <div id="hero-title" className="relative text-start z-10 opacity-0 translate-y-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Farm Fresh Goodness
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Chào mừng đến với FreshFarm Trải nghiệm sự tươi ngon của sản phẩm
              từ nông trại đến bàn ăn được giao tận nhà. Khám phá các sản phẩm
              hữu cơ và bền vững có nguồn gốc từ nông dân địa phương.
            </p>
            <ActionButton
              title='Shop Now'
              style={'bg-white text-black'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

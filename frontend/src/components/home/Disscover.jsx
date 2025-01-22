import ActionButton from "@/shared/ActionButton";
import React from "react";

const Disscover = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 font-montserrat">
        <div className="text-center space-y-6 mb-7">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            Discover Our Categories
          </h2>
          <p className="text-lg md:text-xl text-black">
            Explore a variety of fresh produce options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Vegetables Category */}
          <div className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer">
            <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/vegetables.png"
                alt="Fresh Vegetables"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Fresh Vegetables</h3>
                  <p className="text-sm mb-4">
                    Locally sourced, organic vegetables
                  </p>
                  <ActionButton
                    title={"Shop Now"}
                    backgroundColor="bg-white"
                    textColor={"text-black"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fruits Category */}
          <div className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer">
            <div className="absolute inset-0 bg-green-200 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/fruits.png"
                alt="Fresh Fruits"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Fresh Fruits</h3>
                <p className="text-sm mb-4">Seasonal and exotic fruits</p>
                <ActionButton
                    title={"Shop Now"}
                    backgroundColor="bg-white"
                    textColor={"text-black"}
                  />
              </div>
            </div>
          </div>

          {/* Dairy Category */}
          <div className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer">
            <div className="absolute inset-0 bg-green-200 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/dairy.png"
                alt="Dairy Products"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Dairy Products</h3>
                <p className="text-sm mb-4">Fresh milk, cheese, and more</p>
                <ActionButton
                    title={"Shop Now"}
                    backgroundColor="bg-white"
                    textColor={"text-black"}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disscover;

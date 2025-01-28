import ActionButton from "@/shared/ActionButton";
import ProductCard from "@/shared/ProductCard";
import React from "react";

const Promotion = ({ products }) => {
  return (
    <section>
      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center">
          <div className="text-start space-y-6 mb-7">
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              Our Fresh Products
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
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotion;

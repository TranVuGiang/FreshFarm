import React from "react";

const ProductCard = ({ name, description, price}) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
        <div className="h-48 bg-green-100"></div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            {name}
          </h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-green-800 font-bold">{price}</span>
            <button className="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

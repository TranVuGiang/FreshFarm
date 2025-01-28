import React from 'react';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-50 font-montserrat">
      <div className="text-center">
        <div className="animate-pulse">
          <span className="text-6xl font-bold text-green-800 block mb-4">🌾 FreshFarm</span>
          <div className="h-2 bg-green-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
          <div className="h-2 bg-green-300 rounded w-32 mx-auto animate-pulse"></div>
        </div>
        <div className="mt-8 flex justify-center items-center space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
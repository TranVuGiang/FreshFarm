import React from 'react';
import { ShoppingCart, FileText, DollarSign, CheckCircle, Truck, PackageCheck } from 'lucide-react';

const ShippingSteps = () => {
    
  const steps = [
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'CHO VÀO GIỎ'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'ĐẶT HÀNG'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'THANH TOÁN VẬN CHUYỂN'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'XÁC NHẬN'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'CHUYỂN HÀNG'
    },
    {
      icon: <PackageCheck className="w-8 h-8" />,
      title: 'KẾT THÚC ĐƠN HÀNG'
    }
  ];

  return (
    <div className="w-full py-8 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="rounded-full border-2 border-green-600 p-4 mb-4 w-20 h-20 flex items-center justify-center">
                <div className="text-white">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-sm font-medium text-white">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShippingSteps;
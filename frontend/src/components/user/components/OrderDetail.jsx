import React from 'react';
import { CheckCircle, Truck, Package, Star, Receipt, ArrowLeft } from 'lucide-react';

const OrderTrackingPage = () => {
  const orderSteps = [
    { id: 1, title: 'Đơn Hàng Đã Đặt', time: '09:54 09-02-2025', icon: Receipt, completed: true },
    { id: 2, title: 'Đã Xác Nhận Thông Tin Thanh Toán', time: '10:24 09-02-2025', icon: CheckCircle, completed: true },
    { id: 3, title: 'Đã Giao Cho ĐVVC', time: '11:27 10-02-2025', icon: Package, completed: true },
    { id: 4, title: 'Chờ Giao Hàng', time: '', icon: Truck, completed: false },
    { id: 5, title: 'Đánh Giá', time: '', icon: Star, completed: false }
  ];

  const deliveryUpdates = [
    {
      time: '16:11 10-02-2025',
      status: 'Đang vận chuyển',
      detail: 'Đơn hàng đã đến kho phân loại Xã Tân Phú Trung, Huyện Củ Chi, TP. Hồ Chí Minh'
    },
    {
      time: '16:11 10-02-2025',
      status: 'Đơn hàng đã đến bưu cục',
      detail: ''
    },
    {
      time: '13:58 10-02-2025',
      status: 'Đơn hàng đã rời bưu cục',
      detail: ''
    },
    {
      time: '13:01 10-02-2025',
      status: 'Đơn hàng đã đến bưu cục Phường Trung Mỹ Tây, Quận 12, TP. Hồ Chí Minh',
      detail: ''
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <button className="flex items-center text-gray-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="ml-1">TRỞ LẠI</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <div>MÃ ĐƠN HÀNG: 250209PC194UJW</div>
            <div className="text-red-500">ĐANG GIAO HÀNG</div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
      <div className='relative overflow-x-auto md:overflow-x-visible'>
      <div className="flex justify-between items-center relative h-[150px]">
          {/* Thanh ngang nền */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
          {orderSteps.map((step) => (
            <div key={step.id} className="relative flex flex-col flex-shrink-0 md:flex-shrink items-center text-center md:w-full h-full px-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                step.completed ? 'bg-green-500' : 'bg-gray-200'
              }`}>
                <step.icon className={`w-6 h-6 ${step.completed ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <div className="mt-2 text-sm">
                <div className="font-medium">{step.title}</div>
                {step.time && <div className="text-gray-500 text-xs">{step.time}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Delivery Info */}
      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Địa Chỉ Nhận Hàng</h2>
        <div className="space-y-2 text-sm">
          <div className="font-medium">Trần Vũ Giang</div>
          <div>(+84) 364744327</div>
          <div>Chùa Phước Duyên, Xã Củ Bi, Huyện Châu Đức, Bà Rịa - Vũng Tàu</div>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Theo Dõi Đơn Hàng</h2>
        <div className="space-y-6">
          {deliveryUpdates.map((update, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4">
              <div className="min-w-[100px] text-sm text-gray-500">{update.time}</div>
              <div className="relative flex-1">
                <div className="w-3 h-3 bg-green-500 rounded-full absolute left-0 top-2"></div>
                <div className="border-l-2 border-gray-200 pl-6 pb-6">
                  <div className="font-medium">{update.status}</div>
                  {update.detail && <div className="text-sm text-gray-600 mt-1">{update.detail}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
    
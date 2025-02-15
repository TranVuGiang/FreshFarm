import React, { useContext, useEffect, useState } from "react";
import {
  Package,
  ChevronRight,
  Clock,
  XCircle,
  Box,
  Truck,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DataContext } from "@/constants/DataProvider";
import { api_GetMyOrders } from "@/utils/authService";

const ORDER_STATUS = {
  ORDER: 0,
  PACK: 1,
  TRANSPORT: 2,
  RECEIVE: 3,
  DESTROY: 4,
};

const ORDER_STATUS_INFO = {
  [ORDER_STATUS.ORDER]: {
    label: "Đã đặt hàng",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    icon: Clock,
  },
  [ORDER_STATUS.PACK]: {
    label: "Đang đóng gói",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    icon: Box,
  },
  [ORDER_STATUS.TRANSPORT]: {
    label: "Đang vận chuyển",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    icon: Truck,
  },
  [ORDER_STATUS.RECEIVE]: {
    label: "Đã nhận hàng",
    color: "text-green-600",
    bgColor: "bg-green-50",
    icon: CheckCircle,
  },
  [ORDER_STATUS.DESTROY]: {
    label: "Đã hủy",
    color: "text-red-600",
    bgColor: "bg-red-50",
    icon: XCircle,
  },
};

const OrderManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [orders, setOrders] = useState([]);
  const { token } = useContext(DataContext);

  useEffect(() => {
    if (token) {
      const fetchOrders = async () => {
        try {
          const resp = await api_GetMyOrders(token);
          setOrders(resp.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
      fetchOrders();
    }
  }, [token]);

  const filteredOrders =
    selectedStatus !== null
      ? orders.filter((order) => order.status === selectedStatus)
      : orders;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedStatus === null
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setSelectedStatus(null)}
        >
          Tất cả
        </button>
        {Object.entries(ORDER_STATUS_INFO).map(([status, info]) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
              selectedStatus === parseInt(status)
                ? `${info.bgColor} ${info.color}`
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedStatus(parseInt(status))}
          >
            <info.icon className="w-4 h-4" />
            {info.label}
          </button>
        ))}
      </div>

      <div className="divide-y">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const statusInfo = ORDER_STATUS_INFO[order.status];
            return (
              <div key={order.id_bill} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4 cursor-pointer">
                  <Link to={`order?id_bill=${order.id_bill}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-lg">#{order.id_bill}</span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${statusInfo.bgColor} ${statusInfo.color}`}>
                        <statusInfo.icon className="w-4 h-4" />
                        {statusInfo.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.delivery_date}</p>
                  </Link>
                  <span className="font-medium text-lg">{order.total}đ</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Chi tiết đơn hàng</h4>
                  <div className="space-y-2">
                    {order.bill_details.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.product.name} x{item.quantity}</span>
                        <span>{item.price}đ</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-gray-500">Không tìm thấy đơn hàng nào</div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;

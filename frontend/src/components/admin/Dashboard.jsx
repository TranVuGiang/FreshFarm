import { BarChart, ShoppingCart, Users, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for charts
const generateChartData = (base, variance) => {
  return Array.from({ length: 12 }, (_, i) => ({
    name: `Tháng ${i + 1}`,
    value: base + Math.random() * variance,
  }));
};

const chartData = {
  revenue: generateChartData(2000000, 500000),
  orders: generateChartData(100, 30),
  customers: generateChartData(500, 100),
  products: generateChartData(70, 20)
};

const stats = [
  { title: "Tổng doanh thu", value: "2.6M VND", icon: BarChart, change: "+12.5%" },
  { title: "Đơn hàng mới", value: "124", icon: ShoppingCart, change: "+8.2%" },
  { title: "Khách hàng", value: "573", icon: Users, change: "+4.6%" },
  { title: "Sản phẩm", value: "82", icon: Package, change: "+2.3%" },
];

const DashboardCard = ({ title, value, icon: Icon, change }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <span className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  );
};

const StatChart = ({ data, color }) => {
  return (
    <div className="h-48 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Thống kê tổng quan</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Biến động doanh thu</h2>
          <StatChart data={chartData.revenue} color="#2563eb" />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Biến động đơn hàng</h2>
          <StatChart data={chartData.orders} color="#16a34a" />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Biến động khách hàng</h2>
          <StatChart data={chartData.customers} color="#9333ea" />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Biến động sản phẩm</h2>
          <StatChart data={chartData.products} color="#ea580c" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
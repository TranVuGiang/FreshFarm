import React from 'react';
import { Leaf, Truck, Shield, Heart, Package, MapPin, Smile } from 'lucide-react';
import { ClockIcon, TruckIcon } from '@heroicons/react/24/solid';

const AboutPage = () => {
    const deliveryMethods = [
        {
          icon: <TruckIcon className="w-12 h-12 mx-auto text-green-600 mb-4" />,
          title: "Giao Hàng Tiêu Chuẩn",
          description: "Giao hàng trong vòng 24-48h tới các quận nội thành",
          details: "Phí giao hàng: 20.000đ - 35.000đ"
        },
        {
          icon: <ClockIcon className="w-12 h-12 mx-auto text-green-600 mb-4" />,
          title: "Giao Hàng Nhanh",
          description: "Giao hàng trong vòng 2-4h tại các quận trung tâm",
          details: "Phí giao hàng: 50.000đ"
        },
        {
          icon: <Package className="w-12 h-12 mx-auto text-green-600 mb-4" />,
          title: "Đóng Gói An Toàn",
          description: "Đảm bảo sản phẩm tươi ngon, nguyên vẹn khi đến tay khách hàng",
          details: "Túi và thùng giữ nhiệt chuyên dụng"
        }
      ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-44 font-montserrat">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Về FreshFarm</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          FreshFarm - Đồng hành cùng bạn trên hành trình dinh dưỡng và sức khỏe, 
          mang đến những sản phẩm tươi ngon, an toàn và chất lượng từ nông trại đến bàn ăn của bạn.
        </p>
      </div>

      {/* Câu chuyện */}
      <section className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-semibold text-green-700 mb-6">Câu Chuyện Của Chúng Tôi</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Được thành lập từ năm 2020, FreshFarm ra đời từ khát vọng kết nối trực tiếp 
            những nhà nông chuyên nghiệp với người tiêu dùng, loại bỏ các khâu trung gian 
            không cần thiết để mang đến những sản phẩm sạch, dinh dưỡng với giá cả hợp lý.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Chúng tôi tin rằng mỗi sản phẩm đều chứa đựng câu chuyện và tâm huyết 
            của những người nông dân, và sứ mệnh của chúng tôi là giúp những câu chuyện 
            ấy được lan tỏa đến mọi gia đình.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img 
            src="/api/placeholder/500/400" 
            alt="FreshFarm Farm" 
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="bg-green-50 py-16 px-6 rounded-lg">
        <h2 className="text-3xl font-semibold text-green-700 text-center mb-12">
          Giá Trị Cốt Lõi
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <Leaf className="w-12 h-12 mx-auto text-green-600 mb-4" />,
              title: "Tự Nhiên",
              description: "Cam kết không sử dụng hóa chất, thuốc trừ sâu"
            },
            {
              icon: <Truck className="w-12 h-12 mx-auto text-green-600 mb-4" />,
              title: "Tươi Mới",
              description: "Vận chuyển nhanh chóng từ nông trại đến tay khách hàng"
            },
            {
              icon: <Shield className="w-12 h-12 mx-auto text-green-600 mb-4" />,
              title: "An Toàn",
              description: "Kiểm soát chất lượng nghiêm ngặt tại mỗi khâu"
            },
            {
              icon: <Heart className="w-12 h-12 mx-auto text-green-600 mb-4" />,
              title: "Bền Vững",
              description: "Hỗ trợ và phát triển cộng đồng nông dân địa phương"
            }
          ].map((value, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-xl transition-all"
            >
              {value.icon}
              <h3 className="text-xl font-semibold text-green-800 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cam kết */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-semibold text-green-700 mb-6">
          Cam Kết Của Chúng Tôi
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-4">
            Chúng tôi không chỉ là một nơi bán thực phẩm, mà còn là người đồng hành 
            trên hành trình dinh dưỡng và sức khỏe của bạn. Mỗi sản phẩm tại FreshFarm 
            đều được lựa chọn kỹ lưỡng, với tiêu chí chất lượng, an toàn và giá trị dinh dưỡng.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Hãy đồng hành cùng chúng tôi, để mỗi bữa ăn của bạn đều trở nên tươi ngon, 
            bổ dưỡng và an toàn.
          </p>
        </div>
      </section>
      {/* Delivery Section */}
      <section className="bg-green-50 py-16 px-6 rounded-lg mt-16">
        <h2 className="text-3xl font-semibold text-green-700 text-center mb-12">
          Dịch Vụ Giao Hàng
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {deliveryMethods.map((method, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-xl transition-all"
            >
              {method.icon}
              <h3 className="text-xl font-semibold text-green-800 mb-3">{method.title}</h3>
              <p className="text-gray-600 mb-2">{method.description}</p>
              <p className="text-green-700 font-medium">{method.details}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-green-800 mb-6">
            Khu Vực Phục Vụ
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-green-100 px-4 py-2 rounded-full">
              <MapPin className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-gray-700">Quận 1, 2, 3</span>
            </div>
            <div className="flex items-center bg-green-100 px-4 py-2 rounded-full">
              <MapPin className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-gray-700">Quận 5, 10</span>
            </div>
            <div className="flex items-center bg-green-100 px-4 py-2 rounded-full">
              <MapPin className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-gray-700">Quận 7, 9</span>
            </div>
          </div>
          <div className="mt-6 flex items-center text-green-700">
            <Smile className="mr-2 w-6 h-6" />
            <p>Chúng tôi đang mở rộng phạm vi phục vụ. Liên hệ để biết thêm chi tiết!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
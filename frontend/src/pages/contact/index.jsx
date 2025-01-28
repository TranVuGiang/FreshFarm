import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, MapIcon } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form
    console.log("Form submitted:", formData);
    alert("Cảm ơn bạn đã liên hệ với FreshFarm!");
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-44">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Liên Hệ</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với
          FreshFarm ngay!
        </p>
      </div>

      {/* Map Section */}
      <div className="mb-12">
        <div className="flex items-center justify-center mb-6">
          <MapIcon className="w-8 h-8 text-green-600 mr-2" />
          <h2 className="text-2xl font-semibold text-green-800">Địa Điểm</h2>
        </div>
        <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1582632456647!106.689825!3d10.796152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ3JzQ0LjYiTiAxMDbCsDQxJzIzLjQiRQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="FreshFarm Location"
          ></iframe>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Thông tin liên hệ */}
        <div className="bg-green-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">
            Thông Tin Liên Hệ
          </h2>

          <div className="space-y-6">
            <div className="flex items-center">
              <MapPin className="w-6 h-6 text-green-600 mr-4" />
              <span>Số 123 Đường Nông Trại, Quận 2, TP.HCM</span>
            </div>

            <div className="flex items-center">
              <Phone className="w-6 h-6 text-green-600 mr-4" />
              <span>0123 456 789</span>
            </div>

            <div className="flex items-center">
              <Mail className="w-6 h-6 text-green-600 mr-4" />
              <span>support@freshfarm.vn</span>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Giờ Làm Việc
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
              <p>Thứ 7: 8:00 - 12:00</p>
              <p>Chủ Nhật: Nghỉ</p>
            </div>
          </div>
        </div>

        {/* Form liên hệ */}
        <div>
          <h2 className="text-2xl font-semibold text-green-800 mb-6">
            Gửi Tin Nhắn
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-700">
                Họ và Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-gray-700">
                Số Điện Thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-gray-700">
                Nội Dung
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Send className="mr-2" /> Gửi Tin Nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

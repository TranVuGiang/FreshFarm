import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '@/constants/DataProvider';
import { api_UpdateUserInfo } from '@/utils/authService';

const Account = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const { token, userDetail } = useContext(DataContext)
  const [isSuccess, setIsSuccess] = useState(false);

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  // Hàm ẩn/mask email
  const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    const maskedUsername =
      username.substring(0, 2) + '*'.repeat(Math.max(username.length - 2, 0));
    return `${maskedUsername}@${domain}`;
  };

  // Hàm ẩn/mask số điện thoại
  const maskPhone = (phone) => {
    return '*'.repeat(Math.max(phone.length - 4, 0)) + phone.slice(-4);
  };

  // Định nghĩa validation schema với Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Họ và tên không được để trống'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email không được để trống'),
    phone: Yup.string().required('Số điện thoại không được để trống'),
  });

  const handleSubmit = async (values) => {
    if(token) {
        setIsSuccess(true)
        await api_UpdateUserInfo(token, values);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Thông tin tài khoản</h3>
        <Formik
          initialValues={{
            name: userDetail.name,
            email: userDetail.email,
            phone: userDetail.phone,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form className="space-y-4">
              {/* Trường Họ và tên */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Họ và tên
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full px-3 py-2 border ${
                    errors.name && touched.name
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Trường Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    value={showEmail ? values.email : maskEmail(values.email)}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.email && touched.email
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmail(!showEmail)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-green-600 hover:text-green-700"
                  >
                    {showEmail ? 'Ẩn' : 'Hiện'}
                  </button>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Trường Số điện thoại */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Số điện thoại
                </label>
                <div className="relative">
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    value={showPhone ? values.phone : maskPhone(values.phone)}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.phone && touched.phone
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPhone(!showPhone)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-green-600 hover:text-green-700"
                  >
                    {showPhone ? 'Ẩn' : 'Hiện'}
                  </button>
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Lưu thay đổi
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Account;

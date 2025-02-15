import React, { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Mail, Lock, LogIn, XIcon, User } from "lucide-react";
import * as Yup from "yup";
import { api_SignUp } from "@/utils/authService";
import {
  ErrorNotification,
  SuccessNotification,
} from "@/components/notifications";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState({
    success: false,
    message: "",
  });
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Vui lòng nhập họ và tên"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: Yup.string()
      .min(8, "Mật khẩu phải dài ít nhất 8 ký tự")
      .required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Vui lòng nhập xác nhận mật khẩu"),
  });

  const handleSubmit = async (values) => {
    try {
      const resp = await api_SignUp({
        name: values.fullName,
        email: values.email,
        password: values.password,
      });
      if (resp?.status === 500) {
        setIsError({ error: true, message: resp.response.data.message });
        return;
      }
      setIsSuccess({ success: true, message: "Đăng ký thành công" });
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center font-montserrat px-4 py-12 sm:px-6 lg:px-8">
      <SuccessNotification
        isOpen={isSuccess.success}
        onClose={() => setIsSuccess((prev) => ({ ...prev, success: false }))}
        message={isSuccess.message} 
        title={"Thông báo"}
        buttonText={"Đóng"}
      />
      <ErrorNotification
        isOpen={isError.error}
        onClose={() => setIsError((prev) => ({ ...prev, error: false }))}
        message={isError.message}
        title={"Thông báo"}
        buttonText={"Đóng"}
      />
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all space-y-8">
        {/* Close Button */}
        <button className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors group">
          <XIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                className="w-8 h-8 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="text-sm text-gray-500">
            Tham gia FreshFarm ngay hôm nay
          </p>
        </div>

        {/* Form */}
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-1">
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors h-5 w-5" />
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Họ và tên"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
                  />
                </div>
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm pl-2"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors h-5 w-5" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email của bạn"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm pl-2"
                />
              </div>

              {/* Password Fields */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors h-5 w-5" />
                    <Field
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm pl-2"
                  />
                </div>

                <div className="space-y-1">
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors h-5 w-5" />
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Xác nhận mật khẩu"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm pl-2"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang tạo tài khoản...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Tạo tài khoản</span>
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>

        {/* Login Link */}
        <div className="text-center pt-2">
          <p className="text-gray-600 text-sm">
            Đã có tài khoản?{" "}
            <Link to={'/login'} className="text-green-600 hover:text-green-700 font-medium transition-colors">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

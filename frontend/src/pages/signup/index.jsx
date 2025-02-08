import React, { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Mail, Lock, LogIn, XIcon, User } from "lucide-react";
import * as Yup from "yup";
import { api_SignUp } from "@/utils/authService";
import { SuccessNotification } from "@/components/notifications";

const SignupPage = ({ isOpen, onClose, onSwitchToLogin }) => {
  const wrapperRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);
  if (!isOpen) return null;

  // Schema validation với Yup
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
      setIsSuccess(true);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  };

  if (isSuccess) {
    return (
      <>
        <SuccessNotification
          isOpen={isSuccess}
          onClose={() => setIsSuccess(false)}
          title={"Đăng ký thành công"}
          message={"Bạn đã có thể đăng nhập với thành khoản vừa tạo"}
          buttonText={"Đóng"}
        />
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-8 relative"
            ref={wrapperRef}
          >
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <XIcon className="h-6 w-6" />
            </button>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-800">
                Create Account
              </h2>
              <p className="mt-2 text-gray-600">
                Tham gia FreshFarm ngay hôm nay
              </p>
            </div>

            <Formik
              initialValues={{
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                terms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="space-y-4">
                    {/* Full Name Field */}
                    <div className="relative">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Field
                          type="text"
                          name="fullName"
                          placeholder="Họ và tên"
                          className="w-full pl-10 pr-4 text-black py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="w-full pl-10 text-black pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Field
                          type="password"
                          name="password"
                          placeholder="Password"
                          className="w-full pl-10 pr-4 text-black py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Field
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          className="w-full pl-10 pr-4 py-3 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>
                      {isSubmitting ? "Đang tạo..." : "Tạo tài khoản"}
                    </span>
                  </button>
                </Form>
              )}
            </Formik>

            <div className="text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

import React, { useEffect, useRef, useState } from "react";
import { Mail, Lock, LogIn, XIcon } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SignupPage from "../signup";
import ForgotPasswordPage from "../forgotpassword";

const LoginPage = ({ isOpen, onClose }) => {
  const wrapperRef = useRef(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  if (showSignUp) {
    return (
      <SignupPage
        isOpen={showSignUp}
        onClose={() => {
          setShowSignUp(false);
          onClose();
        }}
        onSwitchToLogin={() => setShowSignUp(false)}
      />
    );
  }

  if (showForgotPassword) {
    return (
      <ForgotPasswordPage
        isOpen={showForgotPassword}
        onClose={() => {
          setShowForgotPassword(false);
          onClose();
        }}
      />
    );
  }

  // Định nghĩa schema validation với Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });

  const handleSubmit = (values) => {
    console.log("Login attempt:", values);
  };

  return (
    <div className="fixed inset-0 z-50 font-montserrat">
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
              <h2 className="text-3xl font-bold text-green-800">FreshFarm</h2>
            </div>

            {/* Formik Form */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <div className="relative">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full pl-10 pr-4 text-black py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
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
                        className="w-full pl-10 text-black pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-600">
                        Nhớ mật khẩu
                      </span>
                    </label>
                    <button
                      className="text-sm text-green-600 hover:text-green-700"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Quên mật khẩu?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                    disabled={isSubmitting}
                  >
                    <LogIn className="h-5 w-5" />
                    <span>
                      {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                    </span>
                  </button>
                </Form>
              )}
            </Formik>

            <div className="text-center text-sm text-gray-600">
              Không có tài khoản?{" "}
              <button
                onClick={() => setShowSignUp(true)}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

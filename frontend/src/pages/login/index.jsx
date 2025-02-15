import { useContext, useState } from "react";
import { Mail, Lock, LogIn, XIcon, Loader2 } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api_LogIn } from "@/utils/authService";
import {
  ErrorNotification,
} from "@/components/notifications";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "@/constants/DataProvider";

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });

  const navigate = useNavigate();
  const { setToken } = useContext(DataContext);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });

  const handleSubmit = async (values) => {
    try {
      const resp = await api_LogIn({
        email: values.email,
        password: values.password,
      });
      console.log(resp);

      if (!resp || resp.status === 401) {
        setIsError({ error: true, message: resp.response.data.message });
        return;
      }
      if (resp.status === true) {
        // Lưu token vào LocalStorage hoặc SessionStorage
        if (rememberMe) {
          localStorage.setItem("token", resp.token);
          setToken(resp.token);
        } else {
          sessionStorage.setItem("token", resp.token);
          setToken(resp.token);
        }

        // Điều hướng dựa vào role của user
        if (resp.user?.role === 1) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
    console.log("Login attempt:", values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center font-montserrat px-4 py-12 sm:px-6 lg:px-8">

      <ErrorNotification
        isOpen={isError.error}
        onClose={() => setIsError((prev) => ({ ...prev, error: false }))}
        message={isError.message}
        title={"Thông báo"}
        buttonText={"Đóng"}
      />
      <div className="w-full max-w-md space-y-8">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 relative border border-gray-100">
          {/* Close Button */}
          <button className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <XIcon className="h-5 w-5 text-gray-400" />
          </button>

          {/* Logo & Title */}
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
            <h2 className="text-3xl font-bold text-gray-900">FreshFarm</h2>
            <p className="text-gray-500 text-sm">Đăng nhập để tiếp tục</p>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* Email Field */}
                <div className="space-y-1">
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 h-5 w-5 transition-colors" />
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

                {/* Password Field */}
                <div className="space-y-1">
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 h-5 w-5 transition-colors" />
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="w-4 h-4 border-2 border-gray-300 rounded text-green-600 focus:ring-green-500 focus:ring-offset-0 transition-colors cursor-pointer"
                      />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                      Nhớ mật khẩu
                    </span>
                  </label>
                  <Link
                    to={"/forgot-password"}
                    className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Đang đăng nhập...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>Đăng nhập</span>
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Sign Up Link */}
          <div className="text-center pt-4">
            <p className="text-gray-600 text-sm">
              Không có tài khoản?{" "}
              <Link
                to={"/register"}
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

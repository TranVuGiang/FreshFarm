import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api_AdminLogIn } from "@/utils/authService";
import { useNavigate } from "react-router-dom";
import { DataContext } from "@/constants/DataProvider";
import { ErrorNotification } from "@/components/notifications";
import LoadingSpinner from "@/components/loading/loadingspinner";

const AdminLoginPage = () => {
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setToken } = useContext(DataContext);
  // Định nghĩa schema validation với Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu là bắt buộc"),
    rememberMe: Yup.boolean(),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const resp = await api_AdminLogIn({
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
        if (values.rememberMe) {
          localStorage.setItem("token-ad", resp.token);
          setToken(resp.token);
        } else {
          sessionStorage.setItem("token-ad", resp.token);
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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLoading && <LoadingSpinner />}
      <ErrorNotification
        isOpen={isError.error}
        onClose={() => setIsError((prev) => ({ ...prev, error: false }))}
        message={isError.message}
        title={"Thông báo"}
        buttonText={"Đóng"}
      />
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">FreshFarm</h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please login to your account
          </p>
        </div>

        {/* Formik form */}
        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mt-8 space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@freshfarm.com"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.email && touched.email
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.password && touched.password
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Field
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLoginPage;

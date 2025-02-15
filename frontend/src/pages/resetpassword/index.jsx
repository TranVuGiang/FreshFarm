import React, { useState } from "react";
import { Lock, XIcon, CheckCircle, EyeOff, Eye } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api_ResetPassword } from "@/utils/authService";
import {
  ErrorNotification,
  SuccessNotification,
} from "@/components/notifications";
import { Navigate, useNavigate } from "react-router-dom";

const NewPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState({
    success: false,
    message: "",
  });
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);

  const email = queryParams.get("email");
  const token = queryParams.get("t");

  // Password strength indicators
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "" };
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const texts = ["Yếu", "Trung bình", "Khá", "Mạnh"];
    const colors = ["red-500", "yellow-500", "blue-500", "green-500"];

    return {
      strength,
      text: texts[strength - 1] || "",
      color: colors[strength - 1] || "",
    };
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .required("Vui lòng nhập mật khẩu mới"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
      .required("Vui lòng xác nhận mật khẩu mới"),
  });

  const handleResetPassword = async (values) => {
    try {
      const resp = await api_ResetPassword({
        token: token,
        email: email,
        password: values.newPassword,
        confirm_password: values.confirmNewPassword,
      });
      if (resp?.status === 400) {
        setIsError({
          error: true,
          message: "Email đã hết hạn vui lòng xác nhận lại email",
        });
        return <Navigate to={'/forgot-password'} replace/>;
      }
      if(resp?.status === 500) {
        setIsError({
          error: true,
          message: resp.response.data.message,
        });
        return;
      }
      setIsSuccess({ success: true, message: resp.message });
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 5000);
      console.log(resp);
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
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Tạo mật khẩu mới</h2>
          <p className="text-sm text-gray-500">
            Vui lòng tạo một mật khẩu mạnh để bảo vệ tài khoản của bạn
          </p>
        </div>

        <Formik
          initialValues={{ newPassword: "", confirmNewPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleResetPassword}
        >
          {({ values, isSubmitting }) => {
            const passwordStrength = getPasswordStrength(values.newPassword);
            return (
              <Form className="space-y-6">
                {/* New Password Field */}
                <div className="space-y-1">
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors h-5 w-5" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="Nhập mật khẩu mới"
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-sm pl-2"
                  />

                  {/* Password Strength Indicator */}
                  {values.newPassword && (
                    <div className="mt-2 space-y-2">
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, index) => (
                          <div
                            key={index}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              index < passwordStrength.strength
                                ? `bg-${passwordStrength.color}`
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-sm text-${passwordStrength.color}`}>
                        {passwordStrength.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1">
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors h-5 w-5" />
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmNewPassword"
                      placeholder="Xác nhận mật khẩu"
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmNewPassword"
                    component="div"
                    className="text-red-500 text-sm pl-2"
                  />
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
                      <span>Đang cập nhật...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Cập nhật mật khẩu</span>
                    </>
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default NewPasswordPage;

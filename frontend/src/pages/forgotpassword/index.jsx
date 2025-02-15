import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Mail, XIcon, KeyRound, Loader2 } from "lucide-react";
import * as Yup from "yup";
import { api_ForgotPassword } from "@/utils/authService";
import { ErrorNotification } from "@/components/notifications";

const ForgotPasswordPage = () => {
  const [sentEmail, setSentEmail] = useState("");
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState({
    success: false,
    message: "",
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
  });

  const handleSubmit = async (values) => {
    try {
      const resp = await api_ForgotPassword({email: values.email});
      if (resp?.status === 404) {
        setIsError({ error: true, message: resp.response.data.message });
        return;
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setSentEmail(values.email);
    }, 1000);
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
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all">
        {/* Close Button */}
        <button className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors group">
          <XIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
        </button>

        {!sentEmail ? (
          <>
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <KeyRound className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Quên mật khẩu?
              </h2>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Đừng lo lắng! Chỉ cần nhập email của bạn và chúng tôi sẽ gửi
                link đặt lại mật khẩu.
              </p>
            </div>

            {/* Form */}
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="mt-8 space-y-6">
                  <div className="space-y-1">
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors h-5 w-5" />
                      <Field
                        type="email"
                        name="email"
                        placeholder="Nhập email của bạn"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm pl-2"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="h-5 w-5" />
                        <span>Gửi link đặt lại mật khẩu</span>
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          // Success State
          <div className="text-center space-y-6 py-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Kiểm tra email của bạn
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Chúng tôi đã gửi link đặt lại mật khẩu đến
                <span className="font-medium text-gray-700 block mt-1">
                  {sentEmail}
                </span>
              </p>
            </div>
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors duration-200">
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

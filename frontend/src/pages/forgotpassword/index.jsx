import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Mail, XIcon, KeyRound } from "lucide-react";
import * as Yup from "yup";
import { SuccessNotification } from "@/components/notifications";

const ForgotPasswordPage = ({ isOpen, onClose }) => {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  if (!isOpen) return null;

  // Schema validation với Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Password reset request:", values.email);
    setIsSuccessOpen(true);
    
  };

  if (isSuccessOpen) {
    return (
      <SuccessNotification
        isOpen={isSuccessOpen}
        onClose={() => {
            setIsSuccessOpen(false); 
            onClose(); 
          }}
        title="Thành công"
        message="Link đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư và click vào link để đặt lại mật khẩu."
        buttonText="Đóng"
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-8 relative">
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <XIcon className="h-6 w-6" />
            </button>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-800">
                Forgot Password
              </h2>
              <p className="mt-2 text-gray-600">
                Nhập email của bạn để đặt lại mật khẩu
              </p>
            </div>

            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="relative">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                  >
                    <KeyRound className="h-5 w-5" />
                    <span>
                      {isSubmitting ? "Đang xử lý..." : "Reset Password"}
                    </span>
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

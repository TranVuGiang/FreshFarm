import React, { useState } from "react";
import { Lock, XIcon, CheckCircle } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NewPasswordPage = () => {
  const [isPasswordSet, setIsPasswordSet] = useState(false);

  // Định nghĩa schema validation với Yup
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Vui lòng nhập mật khẩu mới"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
      .required("Vui lòng xác nhận mật khẩu mới"),
  });

  const handleSubmit = (values) => {
    console.log("New password set:", values);
    setIsPasswordSet(true);
  };

  return (
    <div className="fixed inset-0 z-50 font-montserrat">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-8 relative">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-800">
                Tạo mật khẩu mới
              </h2>
            
            </div>

            {/* Formik Form */}
            <Formik
              initialValues={{ newPassword: "", confirmNewPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {/* New Password Field */}
                  <div className="relative">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        type="password"
                        name="newPassword"
                        placeholder="Nhập mật khẩu mới"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Confirm New Password Field */}
                  <div className="relative">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        type="password"
                        name="confirmNewPassword"
                        placeholder="Xác nhận mật khẩu"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <ErrorMessage
                      name="confirmNewPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                    disabled={isSubmitting}
                  >
                    <Lock className="h-5 w-5" />
                    <span>
                      {isSubmitting ? "Đang thiết lập lại..." : "Đặt lại mật khẩu"}
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

export default NewPasswordPage;

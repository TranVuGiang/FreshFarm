import React, { useEffect } from "react";
import { CheckCircle, LucideCheckCircle, XCircle, XIcon } from "lucide-react";

export const SuccessNotification = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText,
}) => {
  if (!isOpen) return null;

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
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                {title}
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>

              <button
                onClick={onClose}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ErrorNotification = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText,
}) => {
  if (!isOpen) return null;

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
              <div className="flex justify-center mb-4">
                <XCircle className="h-16 w-16 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-red-800 mb-2">{title}</h2>
              <p className="text-gray-600 mb-6">{message}</p>

              <button
                onClick={onClose}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SimpleSuccessNotification = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-black bg-opacity-70 rounded-lg shadow-lg p-14 flex items-center space-x-3">
        <LucideCheckCircle className="h-10 w-10 text-green-600" />
        <span className="text-white font-medium text-xl">
          Thêm vào giỏ hàng thành công!
        </span>
      </div>
    </div>
  );
};


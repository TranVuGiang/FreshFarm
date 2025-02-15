
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Spinner */}
      <div className="relative animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
    </div>
  );
};

export default LoadingSpinner;

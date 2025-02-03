import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-900">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingPage;

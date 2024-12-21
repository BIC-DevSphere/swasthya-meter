import React from "react";

const Button = ({content, loading}) => {

  const buttonText = content === 'Sign In' ? 'Sign In' : 'Sign Up';
    const displayText = loading ? (content === 'Sign In' ? "Signing In..." : "Signing Up...") : buttonText;

  return (
    <button disabled={loading} className="group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800">
      <span className="relative rounded-full bg-white px-20 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
        {displayText} 
      </span>
    </button>
  );
};

export default Button;

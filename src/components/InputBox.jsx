import React from "react";

const InputBox = ({ content, className, type, name }) => {
  return (
    <div className="mb-5">
      <input
        name={name}
        type={type}
        id={type}
        className={`block w-full border border-gray-400 bg-gray-50 p-3 py-4 text-sm font-medium text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${className}`}
        placeholder={content}
        required
      />
    </div>
  );
};

export default InputBox;

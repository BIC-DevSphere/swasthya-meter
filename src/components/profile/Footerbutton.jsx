import React from "react";

const Footerbutton = () => {
  return (
    <div className="flex flex-row-reverse justify-center gap-4 text-right md:justify-start">
      <button className="rounded-md bg-green-400 px-12 py-2 shadow-md transition duration-300 hover:bg-green-500">
        Confirm
      </button>
      <button className="rounded-md border-2 border-gray-800 px-12 py-2 transition duration-300 hover:border-gray-200 hover:bg-gray-300">
        Cancel
      </button>
    </div>
  );
};

export default Footerbutton;

"use client";
import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const DeleteModal = ({ isVisible, hideToggleModal }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="mx-5 w-full max-w-xl space-y-10 overflow-hidden rounded-2xl bg-white p-7 px-10 shadow-2xl">
        <div className="delete-title flex items-center justify-between">
          <h1 className="text-2xl font-bold">Are you sure?</h1>
          <RxCrossCircled
            onClick={hideToggleModal}
            className="cursor-pointer text-3xl"
          />
        </div>
        <div className="delete-message">
          <p className="text-sm">
            This action will remove the report from database.
          </p>
        </div>
        <div className="delete-button flex justify-between">
          <button
            type="button"
            className="mb-2 me-2 rounded-full bg-gray-400 px-10 py-2.5 text-center text-sm font-bold text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Cancel
          </button>
          <button
            type="button"
            className="mb-2 me-2 rounded-full bg-red-400 px-10 py-2.5 text-center text-sm font-bold text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

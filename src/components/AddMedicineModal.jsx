"use client";
import React, { useState } from "react";
import { CiCircleChevLeft } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import InputBox from "./InputBox";
import axios from "axios";
import toast from "react-hot-toast";

const AddMedicineModal = ({ isVisible, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const dosage = formData.get("dosage");
    const time = formData.get("time");
    const frequency = formData.get("amount");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const notes = formData.get("notes");
    const sD = new Date(startDate);
    const eD = new Date(endDate);
    if (sD > eD) {
      throw new Error('End Date should be greater than Start Date');
    }
    try {
      const response = await axios.post('/api/medicine', {
        dosage, frequency, time, startDate, endDate, notes, name
      });
      console.log(response.status)
      if (response.statusText === 'OK') {
        toast.success('Medicine saved successfully');
        onClose();
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Failed to save medicine ', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="mx-5 w-full max-w-2xl space-y-6 rounded-2xl bg-white p-8 shadow-2xl transition-all"
        >
          <div className="flex items-center border-b border-gray-100 pb-4">
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <CiCircleChevLeft className="text-2xl text-gray-600" />
            </button>
            <h1 className="flex-1 text-center text-2xl font-bold bg-gradient-to-r from-[#196eb0] to-[#1e88e5] bg-clip-text text-transparent">
              Add New Medicine
            </h1>
          </div>
          
          <p className="text-sm text-gray-500 italic text-center">
            Please fill in the medicine details below
          </p>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Medicine Name", name: "name", content: "Enter medicine name" },
                { label: "Dosage", name: "dosage", content: "Enter dosage" },
                { label: "Time", name: "time", content: "Enter time (e.g., 08:00, 14:00)" },
                { label: "Amount", name: "amount", content: "Enter amount" },
                { label: "Start Date", name: "startDate", type: "date" },
                { label: "End Date", name: "endDate", type: "date" }
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label 
                    htmlFor={field.name}
                    className="text-sm font-semibold text-gray-700 block"
                  >
                    {field.label}
                  </label>
                  <InputBox
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 
                             focus:border-blue-400 focus:ring-4 focus:ring-blue-100 
                             transition-all duration-200 bg-gray-50"
                    content={field.content}
                    name={field.name}
                    type={field.type}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Notes
              </label>
              <textarea
                name="notes"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 
                         focus:border-blue-400 focus:ring-4 focus:ring-blue-100 
                         transition-all duration-200 bg-gray-50 min-h-[100px]"
                placeholder="Enter additional notes..."
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-gradient-to-r from-[#196eb0] to-[#1e88e5] 
                         py-4 px-8 font-semibold text-white transition-all duration-300 
                         hover:from-[#145d94] hover:to-[#1976d2] focus:ring-4 
                         focus:ring-blue-200 active:transform active:scale-[0.98]
                         disabled:opacity-70 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Saving...
                  </span>
                ) : "Save Medicine"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddMedicineModal;

import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

const EditMedicineModal = ({ isVisible, onClose, onSave, medicine }) => {
  const [name, setName] = useState(medicine.name);
  const [dosage, setDosage] = useState(medicine.dosage);
  const [image, setImage] = useState(medicine.image);
  const [times, setTimes] = useState(medicine.times.join(", "));

  const handleSave = () => {
    const updatedMedicine = {
      ...medicine,
      name,
      dosage,
      image,
      times: times.split(",").map((time) => time.trim()),
    };
    onSave(updatedMedicine);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Edit Medicine</h2>
          <RxCrossCircled
            onClick={onClose}
            className="cursor-pointer text-2xl"
          />
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Medicine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border p-2"
          />
          <input
            type="text"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full rounded border p-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded border p-2"
          />
          <input
            type="text"
            placeholder="Times (comma separated)"
            value={times}
            onChange={(e) => setTimes(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMedicineModal;

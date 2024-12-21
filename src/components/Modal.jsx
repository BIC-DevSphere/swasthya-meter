import React, { useState } from "react";
import { ChevronDown, Check, Stethoscope, X } from "lucide-react";
import { Input } from "./ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { getSuggestions } from "@/lib/GeminiClient";

const categoriesData = [
  { value: "blood", label: "Blood Test" },
  { value: "cholesterol", label: "Cholesterol" },
  { value: "diabetes", label: "Diabetes" },
];

const Modal = ({ close }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(false);

  const handleMetricChange = (key, value) => {
    setMetrics((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const weight = formData.get("weight");
    const height = formData.get("height");
    const feet = parseInt(height.split(".")[0], 10);
    const inches = parseInt(height.split(".")[1], 10);
    const totalInches = feet * 12 + inches;
    const cm = totalInches * 2.54;
    const meters = cm / 100;
    const bmi = (weight / (meters * meters)).toFixed(2);
    try {
      const response = await axios.post("/api/report", {
        weight,
        height,
        bmi,
        metrics,
        category: selectedCategory,
      });
      setLoading(false);
      console.log(response);
      if (response.status === 201) {
        toast.success("Metrics submitted successfully");
        close();
        const userData = response.data.userReport;
        const prompt = `
        Analyze the following user health stats: ${JSON.stringify(userData)}. Provide 5 personalized suggestions focusing on specific stats that are unusually high, low, or trending in a potentially concerning direction. Each suggestion should be an object with the following fields:  
          - "stat": The name of the specific stat being discussed.  
          - "issue": A brief explanation of the problem (e.g., "This stat is higher than normal and could be dangerous").  
          - "suggestion": A practical, user-friendly recommendation to address the issue.  
          - "reason": A concise explanation of why this suggestion is important.  
          - "precautions": Any potential risks or steps to avoid worsening the issue.  
          
        Return the response as an array of objects in JSON format.
        `;

        const suggestions = await getSuggestions(prompt);
        const cleanedData = suggestions.replace(/```json|```/g, "");

        try {
          const response = await axios.post("/api/user", {
            suggestions: cleanedData,
          });
        } catch (error) {
          toast.error("Error fetching suggestions:", error);
        }
      } else {
        toast.error("Error submitting metrics");
      }
    } catch (error) {
      toast.error("Error submitting metrics:", error);
    }
  };

  const renderCategoryFields = () => {
    switch (selectedCategory) {
      case "blood":
        return (
          <>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Hemoglobin
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="12-16 g/dL (women), 14-18 g/dL (men)"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleMetricChange("hemoglobin", e.target.value)
                  }
                />
                <span className="absolute right-3 top-3 text-sm text-gray-400">
                  g/dL
                </span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Blood Pressure
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="120/80 - 180/140 mmHg"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleMetricChange("bloodPressure", e.target.value)
                  }
                />
                <span className="absolute right-3 top-3 text-sm text-gray-400">
                  mmHg
                </span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                WBC Count
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="4,000 - 11,000 cells/uL"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleMetricChange("whiteBloodCellCount", e.target.value)
                  }
                />
                <span className="absolute right-3 top-3 text-sm text-gray-400">
                  cells/uL
                </span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                RBC Count
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="4.7 - 6.1 million/uL (men), 4.2 - 5.4 million/uL (women)"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleMetricChange("redBloodCellCount", e.target.value)
                  }
                />
                <span className="absolute right-3 top-3 text-sm text-gray-400">
                  cells/uL
                </span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Platelet Count
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="150,000 - 450,000 cells/uL"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleMetricChange("plateletCount", e.target.value)
                  }
                />
                <span className="absolute right-3 top-3 text-sm text-gray-400">
                  cells/uL
                </span>
              </div>
            </div>
          </>
        );
      case "cholesterol":
        return (
          <>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Total Cholesterol
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="<200 mg/dL"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleMetricChange("totalCholesterol", e.target.value)
                  }
                />
                <span className="absolute right-3 top-3 text-sm text-gray-400">
                  mg/dL
                </span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                HDL Cholesterol
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder=">40 mg/dL (men), >50 mg/dL (women)"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleMetricChange("hdlCholesterol", e.target.value)
                  }
                />
                <span className="absolute right-3 top-3 text-sm text-gray-400">
                  mg/dL
                </span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                LDL Cholesterol
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="<100 mg/dL"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleMetricChange("ldlCholesterol", e.target.value)
                  }
                />
                <span className="absolute right-3 top-3 text-sm text-gray-400">
                  mg/dL
                </span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Triglycerides
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="<150 mg/dL"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleMetricChange("triglycerides", e.target.value)
                  }
                />
                <span className="absolute right-3 top-3 text-sm text-gray-400">
                  mg/dL
                </span>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-teal-400 p-6">
          <div className="flex items-center space-x-4">
            <Stethoscope className="h-12 w-12 text-white" />
            <h2 className="text-2xl font-bold text-white">Swasthya Meter</h2>
          </div>
          <button
            onClick={() => close()}
            className="text-white hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categoriesData.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-3 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="weight"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Weight(kg)
              </label>
              <div className="relative">
                <Input placeholder="60" type="number" name="weight" />
              </div>
            </div>
            <div>
              <label
                htmlFor="height"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Height(feet)
              </label>
              <div className="relative">
                <Input placeholder="eg: 5.9" type="string" name="height" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">{renderCategoryFields()}</div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 py-3 text-white transition-opacity hover:opacity-90"
          >
            <Check size={20} />
            <span>{loading ? "submitting" : "submit"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

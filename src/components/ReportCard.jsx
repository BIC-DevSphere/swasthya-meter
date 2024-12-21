import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronUp,
  Activity,
  Droplet,
  Heart,
  Edit,
  Delete,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteModal from "./DeleteModal";
const ReportCard = ({
  item,
  toggleDetails,
  uniqueKey,
  detailsVisible,
  date,
  index,
}) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  
  const toggleDeleteModal = () => {
    setDeleteModalVisible((prev) => !prev);
  };

  const formatMetricName = (name) => {
    // Formatting the camelCase name to more readable format
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const formatMetricValue = (value, key) => {
    if (value === 0 || value === "0/0") {
      return null;
    }
    if (key === "dateUploaded") {
      return new Date(value).toLocaleDateString();
    }
    if (typeof value === "number") {
      return `${value} mg/dL`;
    }
    if (typeof value === "string") {
      return value;
    }
    return "Not measured";
  };

  const getReportIcon = (reportType) => {
    const icons = {
      cholesterol: "Heart",
      bloodPressure: "Activity",
      bloodSugar: "Droplet",
    };
    return icons[reportType] || "Activity";
  };

  const getIcon = (iconName) => {
    const icons = {
      Activity: <Activity className="h-6 w-6 text-blue-600" />,
      Droplet: <Droplet className="h-6 w-6 text-red-600" />,
      Heart: <Heart className="h-6 w-6 text-purple-600" />,
    };
    return icons[iconName] || null;
  };

  return (
    <Card
      key={uniqueKey}
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b bg-white p-4">
          <div className="flex items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-blue-100">
              {getIcon(getReportIcon(item.reportType))}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900">
                  {item.reportType.charAt(0).toUpperCase() +
                    item.reportType.slice(1)}{" "}
                  Report
                </h3>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                  {new Date(item.dateUploaded).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-500">Last Updated:</span>
                <span className="text-base font-medium text-gray-700">
                  {new Date(item.dateUploaded).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => toggleDetails(date, index)}
          >
            <div className="flex items-center gap-2">
              {detailsVisible[`${date}-${index}`] ? "Less" : "More"}
              <ChevronUp
                className={`transform transition-transform duration-200 ${
                  detailsVisible[`${date}-${index}`] ? "" : "rotate-180"
                }`}
              />
            </div>
          </Button>
        </div>

        {detailsVisible[`${date}-${index}`] && (
          <div className="bg-gray-50 p-6">
            <div className="mb-8 flex items-center justify-between">
              <h4 className="text-center text-lg font-semibold text-gray-700">
                Health Metrics
              </h4>
              <div className="edit-delete-buttons flex items-center justify-center gap-2">
                <button>
                  <Edit className="cursor-pointer transition duration-300 hover:text-gray-500" />
                </button>
                <button>
                  <Delete
                    className="cursor-pointer transition duration-300 hover:text-red-400"
                    detailsVisible={toggleDeleteModal}
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {Object.entries(item.healthMetrics).map(([key, value]) => {
                const formattedValue = formatMetricValue(value, key);
                return (
                  formattedValue && (
                    <div key={key} className="space-y-1">
                      <div className="text-sm text-gray-500">
                        {formatMetricName(key)}
                      </div>
                      <div className="font-medium text-gray-900">
                        {formattedValue}
                      </div>
                    </div>
                  )
                );
              })}
            </div>
            <DeleteModal
              isVisible={deleteModalVisible}
            //   hideToggleModal={toggleDelete}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportCard;

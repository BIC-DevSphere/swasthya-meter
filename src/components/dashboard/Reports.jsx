"use client";
import React, { useState, useEffect } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReportCard from "../ReportCard";
import Modal from "../Modal";
import axios from "axios";
import { format, isToday, isYesterday } from "date-fns";

const Reports = () => {
  const [reports, setReports] = useState([]);

  const fetchData = async () => {
    const result = await axios.get("/api/report");
    setReports(result.data.reports);
  };
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const [detailsVisible, setDetailsVisible] = useState(
    Array(reports.length).fill(false),
  );

  const groupedReports = reports.reduce((acc, report) => {
    const date = new Date(report.dateUploaded);
    let formattedDate;

    if (isToday(date)) {
      formattedDate = "Today";
    } else if (isYesterday(date)) {
      formattedDate = "Yesterday";
    } else {
      const daysAgo = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
      formattedDate =
        daysAgo <= 7 ? `${daysAgo} days ago` : format(date, "yyyy-MM-dd");
    }

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(report);
    return acc;
  }, {});

  const toggleDetails = (date, index) => {
    setDetailsVisible((prev) => {
      const newDetailsVisible = { ...prev };
      const key = `${date}-${index}`;
      newDetailsVisible[key] = !newDetailsVisible[key];
      return newDetailsVisible;
    });
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Medical Reports</h1>
        <Button
          onClick={handleShowForm}
          className="flex items-center gap-2 bg-blue-600 p-6 text-white hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Report
        </Button>
      </div>

      {showForm && <Modal close={handleHideForm} />}

      {reports.length === 0 && (
        <div className="text-center text-gray-500">
          No reports available. Add a report to get started.
        </div>
      )}
      <div className="space-y-8">
        {Object.entries(groupedReports).map(([date, reports]) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-600">
              <Calendar size={20} />
              {date}
            </div>

            {reports.map((item, index) => {
              const uniqueKey = `${date}-${index}`;
              //using uniqueKey instead of index as key because index is resetting for every new date group.
              return (
                <ReportCard
                  key={uniqueKey}
                  date={date}
                  index={index}
                  toggleDetails={toggleDetails}
                  item={item}
                  uniqueKey={uniqueKey}
                  detailsVisible={detailsVisible}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;

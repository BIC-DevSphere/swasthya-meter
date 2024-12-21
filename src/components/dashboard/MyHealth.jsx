import React, { useState } from "react";
import {
  Heart,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Droplet,
  Activity as Pulse,
  LineChart,
  FlaskConical,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const SuggestionCard = ({ data, onAccept, className }) => {
  const [accepted, setAccepted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    onAccept(data);
  };

  return (
    <Card
      className={`group overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-blue-200 hover:ring-offset-2 ${className} mt-10`}
    >
      <div className="relative p-6">
        <div className="flex flex-col items-start justify-between md:flex-row">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
              <AlertCircle className="text-red-500" size={20} />
              <h3 className="text-lg font-semibold text-gray-800">
                {data.stat.toUpperCase()}
              </h3>
            </div>

            <p className="text-gray-700">{data.issue}</p>

            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <Info size={16} />
              {expanded ? "Hide details" : "Learn more"}
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {!accepted ? (
            <button
              onClick={handleAccept}
              className="ml-4 flex transform items-center gap-2 self-end rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg md:self-start"
            >
              <Heart size={16} className="animate-pulse" />
              Acknowledge
            </button>
          ) : (
            <div className="ml-4 flex items-center rounded-full bg-green-50 px-4 py-2 text-green-600">
              <CheckCircle2 size={20} />
              <span className="ml-2 text-sm font-medium">Acknowledged</span>
            </div>
          )}
        </div>

        <div
          className={`mt-4 space-y-4 overflow-hidden transition-all duration-300 ${expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="rounded-lg bg-blue-50/50 p-4">
            <h4 className="mb-2 font-medium text-gray-700">Suggestion:</h4>
            <p className="text-gray-600">{data.suggestion}</p>
          </div>

          <div className="rounded-lg bg-white/80 p-4">
            <h4 className="mb-2 font-medium text-gray-700">Reason:</h4>
            <p className="text-gray-600">{data.reason}</p>
          </div>

          <div className="rounded-lg bg-amber-50/50 p-4">
            <h4 className="mb-2 font-medium text-gray-700">Precautions:</h4>
            <p className="text-gray-600">{data.precautions}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const MyHealth = () => {
  const [suggestions, setSuggestions] = useState([]);

  React.useEffect(() => {
    const detailedSuggestions =
      JSON.parse(localStorage.getItem("userData")) || [];
    // If there is no health suggestion than it exits the hook
    if (detailedSuggestions.healthSuggestions.length === 0) {
      setSuggestions(null);
      return;
    }
    console.log(detailedSuggestions);
    const suggestionList = JSON.parse(detailedSuggestions.healthSuggestions[0]);
    console.log(suggestionList);
    setSuggestions(suggestionList);
  }, []);

  const handleAcceptSuggestion = (suggestion) => {
    console.log("Acknowledged health metric:", suggestion);
  };

  return (
    <div className="mx-auto max-w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mb-8 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <Heart size={28} className="text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">
            Health Statistics Dashboard
          </h2>
        </div>
        <p className="text-gray-600">
          Monitor your health metrics and review recommendations
        </p>
      </div>

      {/* Recommendations Section */}
      {suggestions === null ? (
        <div>No Record Found</div>
      ) : (
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
            <AlertCircle className="text-red-500" />
            Health Alerts & Recommendations
          </h3>
          <div className="space-y-6">
            {Array.isArray(suggestions) &&
              suggestions.map((item, index) => (
                <SuggestionCard
                  key={index}
                  data={item}
                  className={"bg-white"}
                  onAccept={handleAcceptSuggestion}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyHealth;

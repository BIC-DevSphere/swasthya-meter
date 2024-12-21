import React, { useState } from 'react';
import {
  Heart,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  Info,
  BarChart,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const SuggestionCard = ({ suggestion, onAccept }) => {
  const [accepted, setAccepted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    onAccept(suggestion);
  };


  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-blue-200 hover:ring-offset-2">
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50" />

        <div className="relative p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <BarChart className="text-blue-500" size={20} />
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                  {suggestion.stat}
                </h3>
              </div>

              <p className="text-gray-700 text-sm mb-3">
                <strong>Issue:</strong> {suggestion.issue}
              </p>

              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-sm text-blue-600 mt-2 hover:text-blue-700 transition-colors"
              >
                <Info size={16} />
                {expanded ? "Hide details" : "Learn more"}
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {!accepted ? (
              <button
                onClick={handleAccept}
                className="
                  ml-4 px-6 py-2 
                  bg-gradient-to-r from-blue-500 to-blue-600 
                  text-white rounded-full 
                  hover:from-blue-600 hover:to-blue-700 
                  transition-all duration-300
                  shadow-md hover:shadow-lg
                  transform hover:-translate-y-0.5
                  flex items-center gap-2
                "
              >
                <Heart size={16} className="animate-pulse" />
                Got it!
              </button>
            ) : (
              <div className="flex items-center text-green-600 ml-4 bg-green-50 px-4 py-2 rounded-full">
                <CheckCircle2 size={20} />
                <span className="ml-2 text-sm font-medium">Noted</span>
              </div>
            )}
          </div>

          <div
            className={`
              mt-4 space-y-4 overflow-hidden transition-all duration-300
              ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            {suggestion.suggestion && (
              <div className="bg-white/80 rounded-lg p-4 backdrop-blur-sm">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Star size={16} className="text-yellow-400" />
                  Recommendation
                </h4>
                <p className="text-gray-600">{suggestion.suggestion}</p>
              </div>
            )}

            {suggestion.reason && suggestion.reason.length > 0 && (
              <div className="bg-white/80 rounded-lg p-4 backdrop-blur-sm">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Star size={16} className="text-yellow-400" />
                  Why this matters
                </h4>
                <p className="text-gray-600">{suggestion.reason}</p>

              </div>
            )}

            {Array.isArray(suggestion.precautions) && suggestion.precautions.length > 0 && (
              <div className="bg-amber-50/50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Info size={16} className="text-amber-500" />
                  Precautions
                </h4>
                <ul className="space-y-3">
                  {suggestion?.precautions?.map((precaution, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                      {precaution}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SuggestionCard;

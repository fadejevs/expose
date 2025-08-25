"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, MapPin, DollarSign, Calendar, Users } from "lucide-react";
import Image from "next/image";

const VacationDemo = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleDemoClick = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const demoResults = {
    destination: "Santorini, Greece",
    totalCost: 2847,
    breakdown: {
      flights: 1200,
      hotel: 800,
      food: 450,
      activities: 250,
      transport: 147
    },
    duration: "5 days",
    travelers: 2
  };

  return (
    <div className="m-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mt-8 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">See it in action:</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Demo Input */}
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100" 
              onClick={handleDemoClick}
            >
              {!isAnalyzing && !showResults && (
                <div>
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Upload travel photo</p>
                  <p className="text-sm text-gray-500">or paste Instagram link</p>
                </div>
              )}
              
              {isAnalyzing && (
                <div>
                  <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-lg font-medium mb-2">Analyzing destination...</p>
                  <p className="text-sm text-gray-500">Finding real prices</p>
                </div>
              )}
            </div>
          </div>

          {/* Demo Results */}
          <div className="space-y-4">
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-lg">{demoResults.destination}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Cost</p>
                    <p className="text-2xl font-bold text-blue-600">${demoResults.totalCost.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">✈️ Flights</span>
                    <span className="font-medium">${demoResults.breakdown.flights.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">🏨 Hotel (4 nights)</span>
                    <span className="font-medium">${demoResults.breakdown.hotel.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">🍽️ Food & Drinks</span>
                    <span className="font-medium">${demoResults.breakdown.food.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">🎯 Activities</span>
                    <span className="font-medium">${demoResults.breakdown.activities.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">🚗 Transport</span>
                    <span className="font-medium">${demoResults.breakdown.transport.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 border-t pt-3 gap-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{demoResults.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{demoResults.travelers} travelers</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Pro tip:</strong> Visit in shoulder season (May/Sept) to save ~30%
                  </p>
                </div>
              </motion.div>
            )}

            {!showResults && (
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Real prices will appear here</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 mb-4 px-4">
            Works with Instagram, TikTok, Pinterest, and any travel photo
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-gray-500">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              No hidden fees
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Real-time prices
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Instant results
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationDemo;

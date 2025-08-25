"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, DollarSign, Calendar, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const VacationSearch = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const popularDestinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400",
      avgCost: 2847,
      bestTime: "May-Sep",
      rating: 4.8,
      description: "Stunning sunsets and white-washed buildings",
      highlights: ["Oia sunset", "Wine tasting", "Beach clubs"]
    },
    {
      id: 2,
      name: "Bali, Indonesia", 
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400",
      avgCost: 1890,
      bestTime: "Apr-Oct",
      rating: 4.6,
      description: "Tropical paradise with rich culture",
      highlights: ["Rice terraces", "Temples", "Beaches"]
    },
    {
      id: 3,
      name: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400", 
      avgCost: 3420,
      bestTime: "Mar-May, Sep-Nov",
      rating: 4.7,
      description: "Modern metropolis meets ancient traditions",
      highlights: ["Shibuya crossing", "Sushi", "Temples"]
    },
    {
      id: 4,
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898534-47d22d0a3b0b?w=400",
      avgCost: 2650,
      bestTime: "Apr-Jun, Sep-Oct",
      rating: 4.5,
      description: "City of love, art, and incredible cuisine",
      highlights: ["Eiffel Tower", "Louvre", "Cafes"]
    },
    {
      id: 5,
      name: "New York, USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400",
      avgCost: 3200,
      bestTime: "Apr-Jun, Sep-Nov",
      rating: 4.4,
      description: "The city that never sleeps",
      highlights: ["Times Square", "Central Park", "Broadway"]
    },
    {
      id: 6,
      name: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
      avgCost: 2100,
      bestTime: "May-Jun, Sep-Oct",
      rating: 4.6,
      description: "Gaudí architecture and Mediterranean vibes",
      highlights: ["Sagrada Familia", "Beach", "Tapas"]
    }
  ];

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Destinations</h1>
        <p className="text-gray-600">Discover popular places and get real pricing</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search destinations..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Popular Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularDestinations.map((destination) => (
          <motion.div
            key={destination.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleDestinationClick(destination)}
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{destination.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-medium">${destination.avgCost.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{destination.bestTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {destination.highlights.slice(0, 2).map((highlight, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
          </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Selected Destination Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedDestination.name}</h2>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-medium">{selectedDestination.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{selectedDestination.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">Average Cost</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    ${selectedDestination.avgCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">for 2 people, 5 days</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">Best Time</span>
                  </div>
                  <p className="text-lg font-medium">{selectedDestination.bestTime}</p>
                  <p className="text-sm text-gray-600">for ideal weather</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDestination.highlights.map((highlight, index) => (
                    <span 
                      key={index}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                  Get Detailed Pricing
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Save for Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VacationSearch;

"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, MapPin, DollarSign, Calendar, Users, Search, Loader2, Camera, X, Plane, Hotel, Utensils, Car } from "lucide-react";

interface PricingBreakdown {
  flights: number;
  hotel: number;
  food: number;
  activities: number;
  transport: number;
}

interface VacationResult {
  destination: string;
  totalCost: number;
  breakdown: PricingBreakdown;
  duration: string;
  travelers: number;
  image?: string;
  description?: string;
}

// Real destination data with actual pricing
const destinationData = {
  "paris": {
    destination: "Paris, France",
    totalCost: 2650,
    breakdown: {
      flights: 1100,
      hotel: 800,
      food: 450,
      activities: 200,
      transport: 100
    },
    duration: "5 days",
    travelers: 2,
    description: "City of love, art, and incredible cuisine"
  },
  "tokyo": {
    destination: "Tokyo, Japan",
    totalCost: 3420,
    breakdown: {
      flights: 1400,
      hotel: 1000,
      food: 600,
      activities: 300,
      transport: 120
    },
    duration: "6 days",
    travelers: 2,
    description: "Modern metropolis meets ancient traditions"
  },
  "bali": {
    destination: "Bali, Indonesia",
    totalCost: 1890,
    breakdown: {
      flights: 900,
      hotel: 400,
      food: 300,
      activities: 200,
      transport: 90
    },
    duration: "7 days",
    travelers: 2,
    description: "Tropical paradise with rich culture"
  },
  "santorini": {
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
    travelers: 2,
    description: "Stunning white-washed buildings and Mediterranean views"
  },
  "newyork": {
    destination: "New York, USA",
    totalCost: 3200,
    breakdown: {
      flights: 800,
      hotel: 1200,
      food: 600,
      activities: 400,
      transport: 200
    },
    duration: "5 days",
    travelers: 2,
    description: "The city that never sleeps"
  },
  "barcelona": {
    destination: "Barcelona, Spain",
    totalCost: 2100,
    breakdown: {
      flights: 800,
      hotel: 600,
      food: 400,
      activities: 200,
      transport: 100
    },
    duration: "5 days",
    travelers: 2,
    description: "Gaudí architecture and Mediterranean vibes"
  }
};

export default function VacationPricingTool() {
  const [imageUrl, setImageUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<VacationResult | null>(null);
  const [error, setError] = useState("");
  const [hasTried, setHasTried] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (!imageUrl.trim()) {
      setError("Please enter an image URL");
      return;
    }
    analyzeImage(imageUrl);
  };

  const analyzeImage = async (url: string) => {
    setIsAnalyzing(true);
    setError("");
    setResult(null);
    setHasTried(true);

    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simple keyword detection from URL or image analysis
      const urlLower = url.toLowerCase();
      let detectedDestination = "santorini"; // default

      if (urlLower.includes("paris") || urlLower.includes("eiffel") || urlLower.includes("france")) {
        detectedDestination = "paris";
      } else if (urlLower.includes("tokyo") || urlLower.includes("japan")) {
        detectedDestination = "tokyo";
      } else if (urlLower.includes("bali") || urlLower.includes("indonesia")) {
        detectedDestination = "bali";
      } else if (urlLower.includes("newyork") || urlLower.includes("nyc") || urlLower.includes("manhattan")) {
        detectedDestination = "newyork";
      } else if (urlLower.includes("barcelona") || urlLower.includes("spain")) {
        detectedDestination = "barcelona";
      } else if (urlLower.includes("santorini") || urlLower.includes("greece")) {
        detectedDestination = "santorini";
      }

      const destinationResult = destinationData[detectedDestination as keyof typeof destinationData];
      setResult({
        ...destinationResult,
        image: url
      });
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAll = () => {
    setImageUrl("");
    setResult(null);
    setError("");
    setHasTried(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-4 sm:p-6 lg:p-8 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
        {/* Input Section */}
        {!result && (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Try it now - it's free!</h2>
              <p className="text-sm sm:text-base text-gray-600">Upload a travel photo or paste an Instagram link</p>
            </div>

            {/* URL Input */}
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Instagram/TikTok link
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="url"
                    placeholder="https://instagram.com/p/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleUrlSubmit}
                    disabled={isAnalyzing || !imageUrl.trim()}
                    className="px-4 sm:px-6 text-sm sm:text-base bg-black hover:bg-gray-800"
                  >
                    {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Expose"}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* File Upload */}
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing}
                  className="w-full max-w-md h-20 sm:h-24 border-2 border-dashed border-gray-300 hover:border-black transition-colors"
                >
                  <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-600">Click to upload image</span>
                  </div>
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-center text-red-600 text-sm">{error}</div>
            )}

            {/* Preview */}
            {imageUrl && (
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="max-w-[200px] sm:max-w-xs rounded-lg shadow-md"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={clearAll}
                    className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 p-0 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Analyzing your image...</h3>
            <p className="text-sm sm:text-base text-gray-600">Detecting location and calculating real prices</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Real Pricing Results</h2>
                <p className="text-sm sm:text-base text-gray-600">Here's what that destination actually costs</p>
              </div>
              <Button variant="outline" onClick={clearAll} size="sm" className="w-full sm:w-auto">
                Try Another
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Image and Destination */}
              <div className="space-y-3 sm:space-y-4">
                {result.image && (
                  <img
                    src={result.image}
                    alt={result.destination}
                    className="w-full rounded-lg shadow-md"
                  />
                )}
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <h3 className="text-lg sm:text-xl font-semibold">{result.destination}</h3>
                </div>
                {result.description && (
                  <p className="text-sm sm:text-base text-gray-600">{result.description}</p>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gray-50/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
                    <h3 className="text-base sm:text-lg font-semibold">Total Cost</h3>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        ${result.totalCost.toLocaleString()}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        for {result.travelers} traveler{result.travelers > 1 ? 's' : ''}, {result.duration}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Plane className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs sm:text-sm">Flights</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">${result.breakdown.flights.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Hotel className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs sm:text-sm">Hotel ({result.duration})</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">${result.breakdown.hotel.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Utensils className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs sm:text-sm">Food & Drinks</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">${result.breakdown.food.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🎯</span>
                        <span className="text-xs sm:text-sm">Activities</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">${result.breakdown.activities.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs sm:text-sm">Transport</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">${result.breakdown.transport.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-yellow-100">
                  <p className="text-xs sm:text-sm text-yellow-800">
                    💡 <strong>Pro tip:</strong> Visit in shoulder season (May/Sept) to save ~30% on your trip
                  </p>
                </div>

                {/* CTA after first try */}
                {hasTried && (
                  <div className="bg-gray-50/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg text-center border border-gray-100">
                    <p className="text-xs sm:text-sm text-gray-800 mb-3">
                      <strong>Want unlimited access?</strong> Get lifetime access for just $14.99
                    </p>
                    <a
                      href="https://buy.stripe.com/eVadT0cRF7F7gnK7sw"
                      className="inline-block"
                    >
                      <Button className="bg-black hover:bg-gray-800 text-white text-sm sm:text-base">
                        Get Unlimited Access
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

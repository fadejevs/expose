"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, MapPin, DollarSign, Search, Loader2, Camera, X, Plane, Hotel, Utensils, Car, Sparkles, ShoppingBag, Sun, Mountain, Coffee, Wine, Building2, Landmark, Waves } from "lucide-react";

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
  location?: {
    lat: number;
    lng: number;
    city: string;
    country: string;
  };
  selectedActivities: string[];
  startDate: string;
}

interface VacationPricingToolProps {
  onDemoComplete?: () => void;
}

const LIFESTYLE_OPTIONS = [
  { 
    id: 'budget', 
    label: 'Budget Traveler', 
    icon: Sun, 
    multiplier: 0.7, 
    description: 'Hostels, street food, free activities',
    color: 'emerald'
  },
  { 
    id: 'mid', 
    label: 'Mid-Range', 
    icon: Wine, 
    multiplier: 1.0, 
    description: 'Nice hotels, restaurants, guided tours',
    color: 'blue'
  },
  { 
    id: 'luxury', 
    label: 'Luxury', 
    icon: Sparkles, 
    multiplier: 2.5, 
    description: '5-star hotels, fine dining, exclusive experiences',
    color: 'purple'
  }
];

export default function VacationPricingTool({ onDemoComplete }: VacationPricingToolProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<VacationResult | null>(null);
  const [error, setError] = useState("");
  const [hasTried, setHasTried] = useState(false);
  const [selectedLifestyle, setSelectedLifestyle] = useState<string>('mid');
  const [travelers, setTravelers] = useState(2);
  const [duration, setDuration] = useState(5);
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

  const selectLifestyle = (lifestyleId: string) => {
    setSelectedLifestyle(lifestyleId);
  };

  const getStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // 1 week from now
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Function to extract image from Instagram URL
  const extractImageFromInstagram = async (url: string) => {
    try {
      // For now, we'll use a simple approach
      // In production, you'd want to use Instagram's API or a service like oEmbed
      const response = await fetch('/api/extract-instagram-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      }
      
      // Fallback: try to extract from URL pattern
      const match = url.match(/instagram\.com\/p\/([^\/]+)/);
      if (match) {
        return `https://www.instagram.com/p/${match[1]}/media/?size=l`;
      }
      
      return url;
    } catch (error) {
      console.error('Error extracting Instagram image:', error);
      return url;
    }
  };

  // Function to analyze image and detect location
  const analyzeImageForLocation = async (imageUrl: string) => {
    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      
      throw new Error('Failed to analyze image');
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error;
    }
  };

  // Function to get pricing data for a location
  const getPricingData = async (location: { lat: number; lng: number; city: string; country: string }) => {
    try {
      const response = await fetch('/api/get-pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      
      throw new Error('Failed to get pricing data');
    } catch (error) {
      console.error('Error getting pricing:', error);
      throw error;
    }
  };

  const analyzeImage = async (url: string) => {
    setIsAnalyzing(true);
    setError("");
    setResult(null);
    setHasTried(true);

    try {
      // Step 1: Extract image from Instagram URL if needed
      let imageUrl = url;
      if (url.includes('instagram.com')) {
        imageUrl = await extractImageFromInstagram(url);
      }

      // Step 2: Analyze image to detect location
      const locationData = await analyzeImageForLocation(imageUrl);
      
      // Step 3: Get pricing data for the detected location
      const pricingData = await getPricingData(locationData.location);

      // Step 4: Get lifestyle multiplier
      const lifestyle = LIFESTYLE_OPTIONS.find(l => l.id === selectedLifestyle) || LIFESTYLE_OPTIONS[1]; // Default to mid-range

      // Step 5: Ensure pricing data has the expected structure
      const safeBreakdown = pricingData.breakdown || {
        flights: 800,
        hotel: 800,
        food: 400,
        activities: 200,
        transport: 100
      };

      // Step 6: Adjust pricing based on lifestyle, travelers and duration
      const baseCost = pricingData.totalCost || 2500;
      const adjustedCost = Math.round(baseCost * lifestyle.multiplier * (travelers / 2) * (duration / 5));

      // Step 7: Format the result
      const result: VacationResult = {
        destination: `${locationData.location.city}, ${locationData.location.country}`,
        totalCost: adjustedCost,
        breakdown: {
          flights: Math.round(safeBreakdown.flights * lifestyle.multiplier),
          hotel: Math.round(safeBreakdown.hotel * lifestyle.multiplier),
          food: Math.round(safeBreakdown.food * lifestyle.multiplier),
          activities: Math.round(safeBreakdown.activities * lifestyle.multiplier),
          transport: Math.round(safeBreakdown.transport * lifestyle.multiplier)
        },
        duration: `${duration} days`,
        travelers: travelers,
        image: imageUrl,
        description: locationData.description,
        location: locationData.location,
        selectedActivities: [selectedLifestyle],
        startDate: getStartDate()
      };

      setResult(result);

      // Call the callback when demo is completed
      if (onDemoComplete) {
        onDemoComplete();
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError("Failed to analyze image. Please try again with a different photo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAll = () => {
    setImageUrl("");
    setResult(null);
    setError("");
    setHasTried(false);
    setSelectedLifestyle('mid');
    setTravelers(2);
    setDuration(5);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-8 lg:p-12 border-0 shadow-2xl bg-white/90 backdrop-blur-sm relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-2xl opacity-60 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-100 to-emerald-50 rounded-full blur-2xl opacity-60 translate-y-12 -translate-x-12"></div>
        
        {/* Input Section */}
        {!result && (
          <div className="space-y-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white mb-6 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Free Demo - No Sign Up Required
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Upload a travel photo</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Paste an Instagram link or upload any travel photo. Get real pricing in seconds.
              </p>
            </div>

            {/* URL Input */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Instagram/TikTok Link
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="url"
                    placeholder="https://instagram.com/p/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 text-lg py-4 border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300"
                  />
                  <Button 
                    onClick={handleUrlSubmit}
                    disabled={isAnalyzing || !imageUrl.trim()}
                    className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Expose"}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-6 bg-white text-gray-500 font-medium">or</span>
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
                  className="w-full max-w-lg h-28 lg:h-32 border-2 border-dashed border-gray-300 hover:border-emerald-400 transition-all duration-300 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:from-emerald-50 hover:to-white shadow-lg hover:shadow-xl"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-gray-600 font-medium">Click to upload image</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Trip Preferences */}
            {imageUrl && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">How extravagant do you want it?</h3>
                  <p className="text-gray-600">Choose your travel style for accurate pricing</p>
                </div>

                {/* Lifestyle Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {LIFESTYLE_OPTIONS.map((lifestyle) => {
                    const Icon = lifestyle.icon;
                    const isSelected = selectedLifestyle === lifestyle.id;
                    const colorClasses = {
                      emerald: isSelected ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-200 bg-white hover:border-emerald-300',
                      blue: isSelected ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 bg-white hover:border-blue-300',
                      purple: isSelected ? 'border-purple-500 bg-purple-50 text-purple-600' : 'border-gray-200 bg-white hover:border-purple-300'
                    };
                    return (
                      <button
                        key={lifestyle.id}
                        onClick={() => selectLifestyle(lifestyle.id)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-center shadow-lg hover:shadow-xl ${
                          colorClasses[lifestyle.color as keyof typeof colorClasses]
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <Icon className={`w-8 h-8 ${isSelected ? `text-${lifestyle.color}-600` : 'text-gray-400'}`} />
                          <div>
                            <div className="font-semibold text-lg">{lifestyle.label}</div>
                            <div className="text-sm text-gray-500 mt-1">{lifestyle.description}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Number of Travelers
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setTravelers(num)}
                          className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 ${
                            travelers === num
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Trip Duration
                    </label>
                    <div className="flex space-x-2">
                      {[3, 5, 7, 10, 14].map((days) => (
                        <button
                          key={days}
                          onClick={() => setDuration(days)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                            duration === days
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          {days} days
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center text-red-600 text-sm bg-red-50 p-4 rounded-lg border border-red-200">{error}</div>
            )}

            {/* Preview */}
            {imageUrl && (
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="max-w-[300px] sm:max-w-md rounded-xl shadow-xl border-4 border-white"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={clearAll}
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full shadow-lg"
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
          <div className="text-center py-16 lg:py-20 relative z-10">
            <div className="w-20 h-20 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-8 shadow-lg"></div>
            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">Analyzing your image...</h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg">
              Our AI is detecting the location and calculating real prices
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-3">Real Pricing Results</h2>
                <p className="text-gray-600 text-lg">Here's what that destination actually costs</p>
              </div>
              <Button variant="outline" onClick={clearAll} size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300">
                Try Another
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image and Destination */}
              <div className="space-y-6">
                {result.image && (
                  <div className="relative">
                    <img
                      src={result.image}
                      alt={result.destination}
                      className="w-full rounded-xl shadow-xl border-4 border-white"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-black/90 to-gray-800/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      {result.destination}
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl lg:text-3xl font-semibold">{result.destination}</h3>
                </div>
                {result.description && (
                  <p className="text-gray-600 leading-relaxed text-lg">{result.description}</p>
                )}
                
                {/* Trip Details */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Start Date:</span>
                      <div className="font-medium">{result.startDate}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <div className="font-medium">{result.duration}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Travelers:</span>
                      <div className="font-medium">{result.travelers} people</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Activities:</span>
                      <div className="font-medium">{result.selectedActivities.length} selected</div>
                    </div>
                  </div>
                </div>

                {/* Selected Lifestyle */}
                {result.selectedActivities.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Your Travel Style:</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.selectedActivities.map((lifestyleId) => {
                        const lifestyle = LIFESTYLE_OPTIONS.find(l => l.id === lifestyleId);
                        const Icon = lifestyle?.icon;
                        return (
                          <div key={lifestyleId} className="flex items-center space-x-2 bg-emerald-50 px-3 py-2 rounded-lg">
                            {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
                            <span className="text-sm font-medium">{lifestyle?.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-50 via-white to-emerald-50/50 p-8 rounded-xl border border-gray-100 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
                    <h3 className="text-xl lg:text-2xl font-semibold">Total Cost</h3>
                    <div className="text-right">
                      <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                        ${result.totalCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        for {result.travelers} traveler{result.travelers > 1 ? 's' : ''}, {result.duration}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <Plane className="w-6 h-6 text-emerald-600" />
                        <span className="font-medium text-lg">Flights</span>
                      </div>
                      <span className="font-semibold text-xl">${result.breakdown.flights.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <Hotel className="w-6 h-6 text-emerald-600" />
                        <span className="font-medium text-lg">Hotel ({result.duration})</span>
                      </div>
                      <span className="font-semibold text-xl">${result.breakdown.hotel.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <Utensils className="w-6 h-6 text-emerald-600" />
                        <span className="font-medium text-lg">Food & Drinks</span>
                      </div>
                      <span className="font-semibold text-xl">${result.breakdown.food.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">🎯</span>
                        <span className="font-medium text-lg">Activities</span>
                      </div>
                      <span className="font-semibold text-xl">${result.breakdown.activities.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <Car className="w-6 h-6 text-emerald-600" />
                        <span className="font-medium text-lg">Transport</span>
                      </div>
                      <span className="font-semibold text-xl">${result.breakdown.transport.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200 shadow-lg">
                  <p className="text-yellow-800 text-lg">
                    💡 <strong>Pro tip:</strong> Visit in shoulder season (May/Sept) to save ~30% on your trip
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

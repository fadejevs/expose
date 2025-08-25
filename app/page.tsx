"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, MapPin, DollarSign, Calendar, Users, Search, Loader2, Camera, Link as LinkIcon } from "lucide-react";
import VacationPricingTool from "./components/VacationPricingTool";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black text-white mb-4 sm:mb-6">
            ✈️ Expose the real cost of travel
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            That dream vacation you saw on Instagram?
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block sm:inline"> It's actually $2,847.</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
            Upload any travel photo and expose the real cost in 10 seconds.
          </p>
          <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 px-4">
            No more FOMO. No more hidden fees. Just the truth.
          </p>
        </div>

        {/* Main Tool */}
        <VacationPricingTool />

        {/* How it works */}
        <div className="mt-16 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Upload Photo</h3>
              <p className="text-sm sm:text-base text-gray-600 px-2">Paste a link or upload any travel photo from Instagram, TikTok, or anywhere</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">AI Detection</h3>
              <p className="text-sm sm:text-base text-gray-600 px-2">Our AI identifies the location and analyzes the scene for accurate pricing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Expose Prices</h3>
              <p className="text-sm sm:text-base text-gray-600 px-2">Get detailed cost breakdown including flights, hotels, food, and activities</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to expose real prices?</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">
              Try it once for free, then get unlimited access for $14.99
            </p>
            <a
              href="https://buy.stripe.com/eVadT0cRF7F7gnK7sw"
              className="inline-block"
            >
              <Button className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Get Unlimited Access for $14.99
              </Button>
            </a>
            <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 px-4">
              * One-time payment, lifetime access. Works on Instagram, TikTok, Pinterest, anywhere you see travel content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, MapPin, DollarSign, Search, Camera, ArrowRight, CheckCircle, Sparkles, Globe, TrendingUp, Shield } from "lucide-react";
import VacationPricingTool from "./components/VacationPricingTool";
import { useState } from "react";

export default function Home() {
  const [hasTriedDemo, setHasTriedDemo] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-gray-100 to-emerald-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full blur-3xl opacity-40"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-black to-gray-800 text-white mb-8 shadow-lg">
              ✈️ Expose the real cost of travel
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8 max-w-5xl mx-auto">
              That dream vacation you saw on Instagram?
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent block"> It's actually $2,847.</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Upload any travel photo and get the real cost in 10 seconds.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Try Demo Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 hover:border-black px-8 py-4 text-lg font-semibold rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('https://buy.stripe.com/eVadT0cRF7F7gnK7sw', '_blank')}
              >
                Get Lifetime Access - $14.99
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-teal-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                </div>
                <span>Join 122+ travelers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Try it now - completely free</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload a travel photo or paste an Instagram link. See real pricing in seconds.
            </p>
          </div>

          <VacationPricingTool onDemoComplete={() => setHasTriedDemo(true)} />

          {hasTriedDemo && (
            <div className="mt-16 text-center">
              <Card className="p-8 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <div className="flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mr-4" />
                  <h3 className="text-2xl font-bold">Demo completed!</h3>
                </div>
                <p className="text-gray-600 mb-8 text-lg">
                  You've seen how powerful Expose is. Get unlimited access to analyze any travel photo, anytime.
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://buy.stripe.com/eVadT0cRF7F7gnK7sw', '_blank')}
                >
                  Get Unlimited Access - $14.99
                </Button>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">How it works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to get real travel pricing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">1. Upload Photo</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Paste a link or upload any travel photo from Instagram, TikTok, or anywhere
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Search className="w-10 h-10 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">2. AI Detection</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our AI identifies the location and analyzes the scene for accurate pricing
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">3. Get Prices</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Receive detailed cost breakdown including flights, hotels, food, and activities
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Final CTA */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Card className="p-12 lg:p-16 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to expose real prices?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join thousands of travelers who never get ripped off by Instagram posts again
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('https://buy.stripe.com/eVadT0cRF7F7gnK7sw', '_blank')}
              >
                Get Unlimited Access for $14.99
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 hover:border-black px-8 py-4 text-lg font-semibold rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Try Demo First
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                One-time payment, lifetime access
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                Works on Instagram, TikTok, Pinterest
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                No hidden fees, no subscriptions
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
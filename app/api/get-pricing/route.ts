import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { location } = await request.json();

    if (!location || !location.city || !location.country) {
      return NextResponse.json({ error: 'Location data is required' }, { status: 400 });
    }

    const pricingData = getPricingForLocation(location);

    return NextResponse.json(pricingData);

  } catch (error) {
    console.error('Error getting pricing:', error);
    return NextResponse.json(
      { error: 'Failed to get pricing data' },
      { status: 500 }
    );
  }
}

async function getPricingForLocation(location: { lat: number; lng: number; city: string; country: string }) {
  // Use fallback pricing based on location
  return getFallbackPricing(location);
}

function getFallbackPricing(location: { city: string; country: string }) {
  const fallbackPricing: { [key: string]: any } = {
    // Europe
    'Paris': { totalCost: 2650, breakdown: { flights: 800, hotel: 1000, food: 500, activities: 250, transport: 100 } },
    'London': { totalCost: 2800, breakdown: { flights: 800, hotel: 1250, food: 550, activities: 350, transport: 150 } },
    'Rome': { totalCost: 2400, breakdown: { flights: 900, hotel: 900, food: 425, activities: 225, transport: 90 } },
    'Barcelona': { totalCost: 2100, breakdown: { flights: 700, hotel: 750, food: 400, activities: 200, transport: 50 } },
    'Amsterdam': { totalCost: 2300, breakdown: { flights: 750, hotel: 850, food: 450, activities: 200, transport: 50 } },
    'Berlin': { totalCost: 2200, breakdown: { flights: 800, hotel: 800, food: 400, activities: 200, transport: 100 } },
    'Prague': { totalCost: 1800, breakdown: { flights: 700, hotel: 600, food: 350, activities: 150, transport: 50 } },
    'Budapest': { totalCost: 1700, breakdown: { flights: 750, hotel: 550, food: 300, activities: 150, transport: 50 } },
    'Venice': { totalCost: 2500, breakdown: { flights: 900, hotel: 950, food: 450, activities: 200, transport: 100 } },
    'Santorini': { totalCost: 2847, breakdown: { flights: 1000, hotel: 1000, food: 450, activities: 250, transport: 147 } },
    'Mykonos': { totalCost: 2600, breakdown: { flights: 950, hotel: 900, food: 450, activities: 200, transport: 100 } },
    'Dubrovnik': { totalCost: 2200, breakdown: { flights: 800, hotel: 800, food: 400, activities: 200, transport: 100 } },
    
    // Asia
    'Tokyo': { totalCost: 3420, breakdown: { flights: 1200, hotel: 1250, food: 600, activities: 300, transport: 70 } },
    'Kyoto': { totalCost: 3200, breakdown: { flights: 1200, hotel: 1100, food: 550, activities: 250, transport: 100 } },
    'Osaka': { totalCost: 3100, breakdown: { flights: 1200, hotel: 1050, food: 550, activities: 200, transport: 100 } },
    'Bali': { totalCost: 1890, breakdown: { flights: 900, hotel: 500, food: 300, activities: 200, transport: 90 } },
    'Singapore': { totalCost: 3300, breakdown: { flights: 1100, hotel: 1250, food: 550, activities: 300, transport: 125 } },
    'Bangkok': { totalCost: 2100, breakdown: { flights: 800, hotel: 700, food: 350, activities: 200, transport: 50 } },
    'Phuket': { totalCost: 2200, breakdown: { flights: 850, hotel: 750, food: 350, activities: 200, transport: 50 } },
    'Seoul': { totalCost: 3000, breakdown: { flights: 1100, hotel: 1000, food: 500, activities: 250, transport: 150 } },
    'Hong Kong': { totalCost: 3200, breakdown: { flights: 1000, hotel: 1200, food: 550, activities: 300, transport: 150 } },
    'Taipei': { totalCost: 2800, breakdown: { flights: 900, hotel: 1000, food: 500, activities: 250, transport: 150 } },
    'Mumbai': { totalCost: 1800, breakdown: { flights: 700, hotel: 600, food: 300, activities: 200, transport: 100 } },
    'Delhi': { totalCost: 1700, breakdown: { flights: 700, hotel: 550, food: 300, activities: 150, transport: 100 } },
    'Goa': { totalCost: 1600, breakdown: { flights: 800, hotel: 400, food: 250, activities: 150, transport: 100 } },
    
    // Americas
    'New York': { totalCost: 3200, breakdown: { flights: 600, hotel: 1500, food: 600, activities: 400, transport: 100 } },
    'Los Angeles': { totalCost: 2800, breakdown: { flights: 500, hotel: 1200, food: 550, activities: 350, transport: 200 } },
    'Miami': { totalCost: 2500, breakdown: { flights: 400, hotel: 1000, food: 500, activities: 300, transport: 300 } },
    'Las Vegas': { totalCost: 2200, breakdown: { flights: 400, hotel: 800, food: 400, activities: 400, transport: 200 } },
    'San Francisco': { totalCost: 3000, breakdown: { flights: 500, hotel: 1300, food: 600, activities: 400, transport: 200 } },
    'Chicago': { totalCost: 2600, breakdown: { flights: 400, hotel: 1100, food: 550, activities: 350, transport: 200 } },
    'Toronto': { totalCost: 2400, breakdown: { flights: 400, hotel: 1000, food: 500, activities: 300, transport: 200 } },
    'Vancouver': { totalCost: 2600, breakdown: { flights: 500, hotel: 1100, food: 550, activities: 300, transport: 150 } },
    'Montreal': { totalCost: 2200, breakdown: { flights: 400, hotel: 900, food: 450, activities: 250, transport: 200 } },
    'Mexico City': { totalCost: 1800, breakdown: { flights: 400, hotel: 600, food: 400, activities: 200, transport: 200 } },
    'Cancun': { totalCost: 2200, breakdown: { flights: 500, hotel: 800, food: 450, activities: 250, transport: 200 } },
    'Rio de Janeiro': { totalCost: 2400, breakdown: { flights: 800, hotel: 800, food: 400, activities: 300, transport: 100 } },
    'Buenos Aires': { totalCost: 2000, breakdown: { flights: 700, hotel: 700, food: 350, activities: 200, transport: 50 } },
    'Lima': { totalCost: 1900, breakdown: { flights: 600, hotel: 600, food: 350, activities: 200, transport: 150 } },
    'Cusco': { totalCost: 2100, breakdown: { flights: 700, hotel: 600, food: 350, activities: 300, transport: 150 } },
    
    // Middle East & Africa
    'Dubai': { totalCost: 3500, breakdown: { flights: 1000, hotel: 1500, food: 500, activities: 400, transport: 175 } },
    'Abu Dhabi': { totalCost: 3400, breakdown: { flights: 1000, hotel: 1400, food: 500, activities: 400, transport: 175 } },
    'Istanbul': { totalCost: 2000, breakdown: { flights: 600, hotel: 700, food: 400, activities: 200, transport: 100 } },
    'Cappadocia': { totalCost: 1800, breakdown: { flights: 600, hotel: 600, food: 350, activities: 200, transport: 50 } },
    'Marrakech': { totalCost: 1900, breakdown: { flights: 600, hotel: 600, food: 350, activities: 200, transport: 150 } },
    'Cairo': { totalCost: 2100, breakdown: { flights: 700, hotel: 700, food: 350, activities: 200, transport: 150 } },
    'Cape Town': { totalCost: 2500, breakdown: { flights: 800, hotel: 800, food: 400, activities: 300, transport: 200 } },
    'Nairobi': { totalCost: 2200, breakdown: { flights: 700, hotel: 700, food: 350, activities: 300, transport: 150 } },
    
    // Oceania
    'Sydney': { totalCost: 3800, breakdown: { flights: 1200, hotel: 1200, food: 600, activities: 400, transport: 400 } },
    'Melbourne': { totalCost: 3600, breakdown: { flights: 1200, hotel: 1100, food: 550, activities: 350, transport: 400 } },
    'Auckland': { totalCost: 3500, breakdown: { flights: 1200, hotel: 1000, food: 500, activities: 300, transport: 500 } },
    'Queenstown': { totalCost: 3200, breakdown: { flights: 1200, hotel: 900, food: 450, activities: 400, transport: 250 } },
    'Fiji': { totalCost: 2800, breakdown: { flights: 1000, hotel: 800, food: 400, activities: 300, transport: 300 } },
    'Bora Bora': { totalCost: 4500, breakdown: { flights: 1200, hotel: 1500, food: 600, activities: 400, transport: 800 } }
  };

  const defaultPricing = {
    totalCost: 2500,
    breakdown: { flights: 800, hotel: 800, food: 400, activities: 200, transport: 100 }
  };

  return {
    ...(fallbackPricing[location.city] || defaultPricing),
    duration: "5 days",
    travelers: 2
  };
}

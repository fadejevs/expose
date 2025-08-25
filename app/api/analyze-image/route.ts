import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Enhanced location detection from URL patterns
    const locationData = extractLocationFromUrl(imageUrl);

    if (!locationData) {
      return NextResponse.json({ error: 'Could not detect location from image' }, { status: 400 });
    }

    return NextResponse.json({
      location: locationData,
      description: `${locationData.city}, ${locationData.country}`,
      landmarks: [],
      labels: []
    });

  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}

function extractLocationFromUrl(url: string) {
  const urlLower = url.toLowerCase();
  
  // Enhanced location patterns with more destinations
  const locationPatterns = [
    // Europe
    { pattern: /paris|france|eiffel|notre.*dame|champs.*elysées/, city: 'Paris', country: 'France' },
    { pattern: /london|uk|england|britain|big.*ben|tower.*bridge/, city: 'London', country: 'UK' },
    { pattern: /rome|italy|colosseum|vatican|trevi.*fountain/, city: 'Rome', country: 'Italy' },
    { pattern: /barcelona|spain|catalonia|sagrada.*familia|park.*guell/, city: 'Barcelona', country: 'Spain' },
    { pattern: /amsterdam|netherlands|holland|canals|tulips/, city: 'Amsterdam', country: 'Netherlands' },
    { pattern: /berlin|germany|brandenburg.*gate|reichstag/, city: 'Berlin', country: 'Germany' },
    { pattern: /prague|czech|republic|charles.*bridge|old.*town/, city: 'Prague', country: 'Czech Republic' },
    { pattern: /budapest|hungary|parliament|chain.*bridge/, city: 'Budapest', country: 'Hungary' },
    { pattern: /venice|italy|canals|gondola|rialto/, city: 'Venice', country: 'Italy' },
    { pattern: /santorini|greece|oia|fira|caldera/, city: 'Santorini', country: 'Greece' },
    { pattern: /mykonos|greece|windmills|beaches/, city: 'Mykonos', country: 'Greece' },
    { pattern: /dubrovnik|croatia|old.*town|game.*of.*thrones/, city: 'Dubrovnik', country: 'Croatia' },
    
    // Asia
    { pattern: /tokyo|japan|shibuya|harajuku|akihabara/, city: 'Tokyo', country: 'Japan' },
    { pattern: /kyoto|japan|temples|cherry.*blossoms|geisha/, city: 'Kyoto', country: 'Japan' },
    { pattern: /osaka|japan|dotonbori|castle/, city: 'Osaka', country: 'Japan' },
    { pattern: /bali|indonesia|ubud|seminyak|kuta/, city: 'Bali', country: 'Indonesia' },
    { pattern: /singapore|marina.*bay|gardens.*by.*bay/, city: 'Singapore', country: 'Singapore' },
    { pattern: /bangkok|thailand|wat.*phra|khao.*san/, city: 'Bangkok', country: 'Thailand' },
    { pattern: /phuket|thailand|patong|kata.*beach/, city: 'Phuket', country: 'Thailand' },
    { pattern: /seoul|korea|gangnam|hongdae|myeongdong/, city: 'Seoul', country: 'South Korea' },
    { pattern: /hong.*kong|victoria.*peak|central/, city: 'Hong Kong', country: 'Hong Kong' },
    { pattern: /taipei|taiwan|101|shilin/, city: 'Taipei', country: 'Taiwan' },
    { pattern: /mumbai|india|gateway.*of.*india/, city: 'Mumbai', country: 'India' },
    { pattern: /delhi|india|red.*fort|qutub.*minar/, city: 'Delhi', country: 'India' },
    { pattern: /goa|india|beaches|old.*goa/, city: 'Goa', country: 'India' },
    
    // Americas
    { pattern: /new.*york|nyc|manhattan|brooklyn|times.*square/, city: 'New York', country: 'USA' },
    { pattern: /los.*angeles|la|hollywood|venice.*beach/, city: 'Los Angeles', country: 'USA' },
    { pattern: /miami|florida|south.*beach|wynwood/, city: 'Miami', country: 'USA' },
    { pattern: /las.*vegas|nevada|strip|casino/, city: 'Las Vegas', country: 'USA' },
    { pattern: /san.*francisco|sf|golden.*gate|alcatraz/, city: 'San Francisco', country: 'USA' },
    { pattern: /chicago|illinois|millennium.*park|magnificent.*mile/, city: 'Chicago', country: 'USA' },
    { pattern: /toronto|canada|cn.*tower|distillery/, city: 'Toronto', country: 'Canada' },
    { pattern: /vancouver|canada|stanley.*park|gastown/, city: 'Vancouver', country: 'Canada' },
    { pattern: /montreal|canada|old.*montreal|notre.*dame/, city: 'Montreal', country: 'Canada' },
    { pattern: /mexico.*city|cdmx|zocalo|chapultepec/, city: 'Mexico City', country: 'Mexico' },
    { pattern: /cancun|mexico|playa.*del.*carmen|tulum/, city: 'Cancun', country: 'Mexico' },
    { pattern: /rio.*de.*janeiro|brazil|copacabana|christ.*redeemer/, city: 'Rio de Janeiro', country: 'Brazil' },
    { pattern: /buenos.*aires|argentina|recoleta|la.*boca/, city: 'Buenos Aires', country: 'Argentina' },
    { pattern: /lima|peru|miraflores|barranco/, city: 'Lima', country: 'Peru' },
    { pattern: /cusco|peru|machu.*picchu|sacred.*valley/, city: 'Cusco', country: 'Peru' },
    
    // Middle East & Africa
    { pattern: /dubai|uae|burj.*khalifa|palm.*jumeirah/, city: 'Dubai', country: 'UAE' },
    { pattern: /abu.*dhabi|uae|sheikh.*zayed|ferrari.*world/, city: 'Abu Dhabi', country: 'UAE' },
    { pattern: /istanbul|turkey|hagia.*sophia|blue.*mosque/, city: 'Istanbul', country: 'Turkey' },
    { pattern: /cappadocia|turkey|hot.*air.*balloon/, city: 'Cappadocia', country: 'Turkey' },
    { pattern: /marrakech|morocco|medina|jemaa.*elfnaa/, city: 'Marrakech', country: 'Morocco' },
    { pattern: /cairo|egypt|pyramids|sphinx/, city: 'Cairo', country: 'Egypt' },
    { pattern: /cape.*town|south.*africa|table.*mountain/, city: 'Cape Town', country: 'South Africa' },
    { pattern: /nairobi|kenya|masai.*mara/, city: 'Nairobi', country: 'Kenya' },
    
    // Oceania
    { pattern: /sydney|australia|opera.*house|bondi/, city: 'Sydney', country: 'Australia' },
    { pattern: /melbourne|australia|federation.*square/, city: 'Melbourne', country: 'Australia' },
    { pattern: /auckland|new.*zealand|sky.*tower/, city: 'Auckland', country: 'New Zealand' },
    { pattern: /queenstown|new.*zealand|adventure/, city: 'Queenstown', country: 'New Zealand' },
    { pattern: /fiji|pacific|islands/, city: 'Fiji', country: 'Fiji' },
    { pattern: /bora.*bora|french.*polynesia/, city: 'Bora Bora', country: 'French Polynesia' }
  ];

  // Check for location patterns in the URL
  for (const location of locationPatterns) {
    if (location.pattern.test(urlLower)) {
      return {
        lat: 0,
        lng: 0,
        city: location.city,
        country: location.country
      };
    }
  }

  // If no pattern matches, return a default location
  return {
    lat: 0,
    lng: 0,
    city: 'Santorini',
    country: 'Greece'
  };
}

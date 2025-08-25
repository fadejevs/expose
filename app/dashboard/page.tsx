"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, MapPinned, Trash, Search, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { createClient } from "../lib/supabase/client";
import { useEffect, useState } from "react";

interface VacationSearch {
  id: string;
  destination: string;
  total_cost: number;
  travelers: number;
  duration: string;
  created_at: string;
  image?: string;
}

export default function DashboardPage() {
  const [vacationSearches, setVacationSearches] = useState<VacationSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getSearches = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Get vacation searches
          const { data: searches } = await supabase
            .from('vacation_searches')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          setVacationSearches(searches || []);
        }
      } catch (error) {
        console.error('Error fetching searches:', error);
      } finally {
        setLoading(false);
      }
    };

    getSearches();
  }, [supabase]);

  // Mock data for demo (remove this when you have real data)
  const mockVacationSearches = [
    {
      id: "1",
      destination: "Santorini, Greece",
      total_cost: 2847,
      travelers: 2,
      duration: "5 days",
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400"
    },
    {
      id: "2",
      destination: "Bali, Indonesia",
      total_cost: 1890,
      travelers: 1,
      duration: "7 days",
      created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400"
    },
    {
      id: "3",
      destination: "Tokyo, Japan",
      total_cost: 3420,
      travelers: 2,
      duration: "6 days",
      created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400"
    }
  ];

  // Use real data if available, otherwise use mock data
  const searches = vacationSearches.length > 0 ? vacationSearches : mockVacationSearches;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your searches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Vacation Searches</h1>
          <div className="para">
            <p>
              Track your travel research and get real prices for any destination.
            </p>
          </div>
        </div>

        <Button asChild className="btn border-radius">
          <Link href="/dashboard/new">New Search</Link>
        </Button>
      </div>

      {searches.length == 0 ? (
        <div className="flex min-h-[200px] flex-col items-center border-radius justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            No searches yet
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            Start by searching for your next dream destination.
          </p>

          <Button asChild className="btn border-radius">
            <Link href="/dashboard/new">Search Destination</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {searches.map((search) => (
            <Card
              key={search.id}
              className="flex items-center justify-between p-6 border-radius hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={search.image}
                    alt={search.destination}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-xl text-primary">
                    {search.destination}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>${search.total_cost.toLocaleString()}</span>
                    <span>•</span>
                    <span>{search.travelers} traveler{search.travelers > 1 ? 's' : ''}</span>
                    <span>•</span>
                    <span>{search.duration}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(search.created_at))}
                  </p>
                </div>
              </div>

              <div className="flex gap-x-4">
                <Button variant="outline" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button asChild className="border-radius add">
                  <a
                    href={`https://www.google.com/maps/?q=${encodeURIComponent(search.destination)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-3 mb-3">
          <DollarSign className="w-6 h-6 text-blue-600" />
          <h3 className="font-semibold text-lg text-blue-800">Pro Tips</h3>
        </div>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• Book flights 2-3 months in advance for best prices</li>
          <li>• Consider shoulder season (May/Sept) to save 20-30%</li>
          <li>• Use incognito mode when searching for flights</li>
          <li>• Check multiple airports for better deals</li>
        </ul>
      </div>
    </div>
  );
}




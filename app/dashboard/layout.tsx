"use client";
import { ReactNode, useEffect, useState } from "react";
import { DashboardNav } from "../components/DashboardNav";
import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lifetimeAccess, setLifetimeAccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('Auth error:', error);
          router.push('/auth/signin');
          return;
        }

        if (!user) {
          console.log('No user found, redirecting to signin');
          router.push('/auth/signin');
          return;
        }

        console.log('User found:', user.email);
        setUser(user);

        // Check if user has lifetime access (for now, assume they do)
        setLifetimeAccess(true);
        setLoading(false);
      } catch (error) {
        console.error('Error getting user:', error);
        router.push('/auth/signin');
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setLifetimeAccess(true);
        setLoading(false);
      } else {
        setUser(null);
        setLifetimeAccess(false);
        setLoading(false);
        router.push('/auth/signin');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  if (!lifetimeAccess) {
    return (
      <div className="relative mt-10 m-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          <aside className="md:w-[200px] hidden md:block">
            <DashboardNav/>
          </aside>
          <div className="flex-1">
            <div className="container grid flex-1 gap-12 md:grid-cols-1">
              <div className="items-center justify-center px-6 sm:px-10 py-6 text-center bg-red-100 border-radius mb-8 cool-box">
                <div className="absolute top-2 left-29 -translate-x-4 -translate-y-4">
                  <div className="emoji index-module_emoji__1XBIX index-module_animate__wave__1uYZ0">✈️</div>
                </div>
                <div>
                  <div className="text-center">
                    <h1 className="text-xl sm:text-2xl font-bold text-center">
                      <span className="underline-text">Welcome, {user?.email || "Traveler"}!</span>
                    </h1>
                  </div>
                  <p className="mx-auto max-w-[400px] text-sm sm:text-base">
                    Unlock real vacation pricing for any destination in the world.
                  </p>
                  <div className="flex justify-center mt-4">
                    <a
                      href="https://buy.stripe.com/eVadT0cRF7F7gnK7sw"
                      className="inline-block"
                    >
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base">
                        Get Unlimited Access for $14.99
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 m-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      {/* Mobile Menu Button */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center space-x-2"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Menu</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mb-6">
            <DashboardNav />
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="md:w-[200px] hidden md:block">
          <DashboardNav />
        </aside>

        <div className="flex-1">
          <div className="container grid flex-1 gap-2 md:grid-cols-1">
            <div className="items-center justify-center px-6 sm:px-10 py-6 text-center bg-blue-100 border-radius mb-8 cool-box">
              <div className="absolute top-2 left-29 -translate-x-4 -translate-y-4">
                <div className="emoji index-module_emoji__1XBIX index-module_animate__wave__1uYZ0">✈️</div>
              </div>
              <div>
                <div className="text-center">
                  <h1 className="text-xl sm:text-2xl font-bold text-center">
                    <span className="underline-text">Welcome back, {user?.email || "Traveler"}!</span>
                  </h1>
                </div>
                <p className="mx-auto max-w-[400px] text-gray-600 text-sm sm:text-base">
                  Ready to discover your next adventure? Start exploring destinations below.
                </p>
              </div>
            </div>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
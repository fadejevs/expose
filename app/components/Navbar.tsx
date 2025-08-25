"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "./UserNav";
import { createClient } from "@/app/lib/supabase/client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-gray-900 hidden sm:block">Expose</span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <UserNav
                email={user.email}
                image={user.user_metadata?.avatar_url || ""}
                name={user.user_metadata?.full_name || user.email}
                onSignOut={handleSignOut}
              />
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="text-xs sm:text-sm px-2 sm:px-3 bg-black hover:bg-gray-800">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

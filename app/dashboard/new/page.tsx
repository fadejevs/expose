"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function NewPage() {
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Create new vacation search
      const { error } = await supabase
        .from('vacation_searches')
        .insert({
          destination,
          description,
          total_cost: 0, // Will be calculated later
          travelers: 1,
          duration: "3 days",
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error creating vacation search:", error);
      alert("Failed to create vacation search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">New Vacation Search</h1>
          <p className="text-lg text-muted-foreground">
            Add a new destination to track pricing
          </p>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              type="text"
              placeholder="e.g., Santorini, Greece"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any notes about this destination..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Search"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

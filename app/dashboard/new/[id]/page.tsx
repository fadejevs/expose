"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function EditPage({ params }: { params: { id: string } }) {
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('vacation_searches')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) {
          console.error("Error fetching vacation search:", error);
          return;
        }

        if (data) {
          setDestination(data.destination);
          setDescription(data.description || "");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('vacation_searches')
        .update({
          destination,
          description,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id);

      if (error) {
        throw error;
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating vacation search:", error);
      alert("Failed to update vacation search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Edit Vacation Search</h1>
          <p className="text-lg text-muted-foreground">
            Update your destination details
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

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push("/dashboard")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Updating..." : "Update Search"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

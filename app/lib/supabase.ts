import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  name?: string
  email: string
  stripe_customer_id?: string
  lifetime_access?: boolean
  created_at: string
  updated_at: string
}

export interface VacationSearch {
  id: string
  destination: string
  total_cost: number
  travelers: number
  duration: string
  image?: string
  breakdown?: any
  created_at: string
  updated_at: string
  user_id: string
}

export interface SavedDestination {
  id: string
  name: string
  image?: string
  avg_cost: number
  best_time: string
  rating?: number
  description?: string
  highlights?: any
  created_at: string
  updated_at: string
  user_id: string
}

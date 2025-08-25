-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  lifetime_access BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vacation_searches table
CREATE TABLE IF NOT EXISTS vacation_searches (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  destination TEXT NOT NULL,
  total_cost INTEGER NOT NULL,
  travelers INTEGER NOT NULL,
  duration TEXT NOT NULL,
  image TEXT,
  breakdown JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE
);

-- Create saved_destinations table
CREATE TABLE IF NOT EXISTS saved_destinations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  image TEXT,
  avg_cost INTEGER NOT NULL,
  best_time TEXT NOT NULL,
  rating DECIMAL(3,2),
  description TEXT,
  highlights JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_vacation_searches_user_id ON vacation_searches(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_destinations_user_id ON saved_destinations(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vacation_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_destinations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (auth.uid()::text = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id);

-- Vacation searches policies
CREATE POLICY "Users can view own vacation searches" ON vacation_searches
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own vacation searches" ON vacation_searches
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own vacation searches" ON vacation_searches
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own vacation searches" ON vacation_searches
  FOR DELETE USING (auth.uid()::text = user_id);

-- Saved destinations policies
CREATE POLICY "Users can view own saved destinations" ON saved_destinations
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own saved destinations" ON saved_destinations
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own saved destinations" ON saved_destinations
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own saved destinations" ON saved_destinations
  FOR DELETE USING (auth.uid()::text = user_id);

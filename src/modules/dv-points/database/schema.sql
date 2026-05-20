-- DV Points main table
CREATE TABLE IF NOT EXISTS dv_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  store_id UUID,
  points INTEGER DEFAULT 0,
  level TEXT DEFAULT 'Bronze',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- DV Points history table
CREATE TABLE IF NOT EXISTS dv_points_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  points INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(user_id) REFERENCES dv_points(user_id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_dv_points_user_id ON dv_points(user_id);
CREATE INDEX IF NOT EXISTS idx_dv_points_history_user_id ON dv_points_history(user_id);
CREATE INDEX IF NOT EXISTS idx_dv_points_history_created_at ON dv_points_history(created_at);

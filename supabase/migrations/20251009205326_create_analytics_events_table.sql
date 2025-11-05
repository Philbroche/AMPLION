/*
  # Create Analytics Events Table

  1. New Tables
    - `analytics_events`
      - `id` (uuid, primary key) - Unique event identifier
      - `event_name` (text) - Name of the event
      - `event_category` (text) - Event category for grouping
      - `event_data` (jsonb) - Additional event data
      - `user_email` (text) - Email if user is identified
      - `session_id` (text) - Session identifier
      - `ip_address` (inet) - User IP address
      - `user_agent` (text) - Browser user agent
      - `referrer` (text) - Referrer URL
      - `created_at` (timestamptz) - Event timestamp
  
  2. Security
    - Enable RLS on `analytics_events` table
    - Add policy for public inserts (event tracking)
    - Add policy for admin reads

  3. Indexes
    - Index on event_name for event type queries
    - Index on event_category for grouping
    - Index on user_email for user activity tracking
    - Index on created_at for time-based analysis
*/

CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  event_category text,
  event_data jsonb DEFAULT '{}',
  user_email text,
  session_id text,
  ip_address inet,
  user_agent text,
  referrer text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert analytics events"
  ON analytics_events
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can read analytics events"
  ON analytics_events
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_category ON analytics_events(event_category);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_email ON analytics_events(user_email);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
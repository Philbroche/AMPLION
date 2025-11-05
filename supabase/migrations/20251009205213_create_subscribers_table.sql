/*
  # Create Subscribers Table

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key) - Unique subscriber identifier
      - `email` (text, unique) - Subscriber email address
      - `first_name` (text) - Subscriber first name
      - `last_name` (text) - Subscriber last name
      - `status` (text) - Subscription status (pending, confirmed, unsubscribed)
      - `convertkit_id` (text) - ConvertKit subscriber ID for integration
      - `tags` (text array) - Tags for segmentation
      - `subscribed_at` (timestamptz) - When they initially subscribed
      - `confirmed_at` (timestamptz) - When they confirmed subscription
      - `unsubscribed_at` (timestamptz) - When they unsubscribed
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS on `subscribers` table
    - Add policy for public inserts (newsletter signups)
    - Add policy for admin-only reads

  3. Indexes
    - Index on email for fast lookups
    - Index on status for filtering
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  status text DEFAULT 'pending',
  convertkit_id text,
  tags text[] DEFAULT '{}',
  subscribed_at timestamptz DEFAULT now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert subscribers"
  ON subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can read subscribers"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at);
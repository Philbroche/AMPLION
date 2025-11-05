/*
  # Create Products Table

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique product identifier
      - `name` (text) - Product name
      - `slug` (text, unique) - URL-friendly product identifier
      - `description` (text) - Product description
      - `short_description` (text) - Brief product summary
      - `price` (numeric) - Product price in dollars
      - `features` (jsonb) - Array of product features
      - `demo_video_url` (text) - URL to demo video
      - `thumbnail_url` (text) - URL to product thumbnail image
      - `category` (text) - Product category
      - `is_active` (boolean) - Whether product is available
      - `sort_order` (integer) - Display order
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS on `products` table
    - Add policy for public reads of active products
    - Add policy for admin management

  3. Indexes
    - Index on slug for URL lookups
    - Index on category for filtering
    - Index on is_active for active products
    - Index on sort_order for display ordering
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  short_description text,
  price numeric(10,2) NOT NULL,
  features jsonb DEFAULT '[]',
  demo_video_url text,
  thumbnail_url text,
  category text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active products"
  ON products
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admin can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON products(sort_order);
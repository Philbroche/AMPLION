/*
  # Create Discount Codes Table

  1. New Tables
    - `discount_codes`
      - `id` (uuid, primary key) - Unique discount code identifier
      - `code` (text, unique) - Discount code (e.g., WELCOME10)
      - `discount_type` (text) - Type of discount (percentage, fixed)
      - `discount_value` (numeric) - Discount amount (e.g., 10 for 10% or $10)
      - `minimum_purchase` (numeric) - Minimum purchase amount to apply
      - `max_uses` (integer) - Maximum number of times code can be used
      - `times_used` (integer) - Number of times code has been used
      - `active` (boolean) - Whether code is currently active
      - `expires_at` (timestamptz) - Expiration date
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS on `discount_codes` table
    - Add policy for public reads of active codes
    - Add policy for admin management

  3. Indexes
    - Index on code for fast lookups
    - Index on active status
    - Index on expires_at for expiration checks
*/

CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value numeric(10,2) NOT NULL,
  minimum_purchase numeric(10,2) DEFAULT 0,
  max_uses integer,
  times_used integer DEFAULT 0,
  active boolean DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active discount codes"
  ON discount_codes
  FOR SELECT
  TO public
  USING (active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Admin can manage discount codes"
  ON discount_codes
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE INDEX IF NOT EXISTS idx_discount_codes_code ON discount_codes(code);
CREATE INDEX IF NOT EXISTS idx_discount_codes_active ON discount_codes(active);
CREATE INDEX IF NOT EXISTS idx_discount_codes_expires_at ON discount_codes(expires_at);
/*
  # Create Orders Table

  1. New Tables
    - `orders`
      - `id` (uuid, primary key) - Unique order identifier
      - `order_number` (text, unique) - Human-readable order number
      - `email` (text) - Customer email address
      - `subscriber_id` (uuid) - Foreign key to subscribers table
      - `stripe_payment_intent_id` (text) - Stripe payment intent ID
      - `stripe_customer_id` (text) - Stripe customer ID
      - `items` (jsonb) - Array of ordered items
      - `subtotal` (numeric) - Subtotal before discount and tax
      - `discount_code` (text) - Applied discount code
      - `discount_amount` (numeric) - Discount amount applied
      - `tax` (numeric) - Tax amount
      - `total` (numeric) - Final total amount
      - `status` (text) - Order status (pending, paid, failed, refunded)
      - `paid_at` (timestamptz) - When payment was confirmed
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS on `orders` table
    - Add policy for users to read their own orders
    - Add policy for public inserts (order creation)
    - Add policy for admin reads and updates

  3. Indexes
    - Index on order_number for lookups
    - Index on email for customer queries
    - Index on stripe_payment_intent_id for webhook processing
    - Index on status for order management
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  email text NOT NULL,
  subscriber_id uuid REFERENCES subscribers(id),
  stripe_payment_intent_id text,
  stripe_customer_id text,
  items jsonb NOT NULL DEFAULT '[]',
  subtotal numeric(10,2) NOT NULL,
  discount_code text,
  discount_amount numeric(10,2) DEFAULT 0,
  tax numeric(10,2) DEFAULT 0,
  total numeric(10,2) NOT NULL,
  status text DEFAULT 'pending',
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO public
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Admin can read all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_payment_intent_id ON orders(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
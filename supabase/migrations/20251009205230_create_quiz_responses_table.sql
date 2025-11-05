/*
  # Create Quiz Responses Table

  1. New Tables
    - `quiz_responses`
      - `id` (uuid, primary key) - Unique response identifier
      - `email` (text) - Respondent email address
      - `subscriber_id` (uuid) - Foreign key to subscribers table
      - `business_type` (text) - Type of business they run
      - `current_challenges` (text) - Their biggest operational challenges
      - `automation_goals` (text) - Areas they want to automate
      - `company_size` (text) - Number of employees
      - `current_tools` (text) - Software/tools currently using
      - `budget_range` (text) - Monthly automation budget
      - `timeline` (text) - Implementation timeline preference
      - `additional_notes` (text) - Detailed automation goals
      - `recommendation_sent` (boolean) - Whether recommendation email was sent
      - `completed_at` (timestamptz) - When quiz was completed
      - `created_at` (timestamptz) - Record creation timestamp
  
  2. Security
    - Enable RLS on `quiz_responses` table
    - Add policy for public inserts (quiz submissions)
    - Add policy for admin reads
    - Add policy for users to read their own responses

  3. Indexes
    - Index on email for lookups
    - Index on completed_at for sorting
*/

CREATE TABLE IF NOT EXISTS quiz_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  subscriber_id uuid REFERENCES subscribers(id),
  business_type text,
  current_challenges text,
  automation_goals text,
  company_size text,
  current_tools text,
  budget_range text,
  timeline text,
  additional_notes text,
  recommendation_sent boolean DEFAULT false,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert quiz responses"
  ON quiz_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can read quiz responses"
  ON quiz_responses
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can read own quiz responses"
  ON quiz_responses
  FOR SELECT
  TO public
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE INDEX IF NOT EXISTS idx_quiz_responses_email ON quiz_responses(email);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_completed_at ON quiz_responses(completed_at);
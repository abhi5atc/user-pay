/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `mobile` (text)
      - `address` (text)
      - `seat_no` (text)
      - `joining_date` (timestamptz)
      - `created_at` (timestamptz)

    - `payments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `payment_date` (timestamptz)
      - `payment_mode` (text)
      - `amount` (numeric)
      - `paid_for_month` (text)
      - `remarks` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  mobile text NOT NULL,
  address text NOT NULL,
  seat_no text NOT NULL,
  joining_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  payment_date timestamptz NOT NULL,
  payment_mode text NOT NULL,
  amount numeric NOT NULL,
  paid_for_month text NOT NULL,
  remarks text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON users
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON users
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON users
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Enable delete access for authenticated users" ON users
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users" ON payments
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON payments
  FOR INSERT TO authenticated WITH CHECK (true);
/*
  # Create favicons table and storage

  1. New Tables
    - `favicons`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `original_image` (text, URL of original image)
      - `favicon_package` (jsonb, contains URLs of generated favicons)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `favicons` table
    - Add policies for authenticated users to manage their favicons
*/

CREATE TABLE IF NOT EXISTS favicons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  original_image text NOT NULL,
  favicon_package jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE favicons ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own favicons
CREATE POLICY "Users can insert their own favicons"
  ON favicons
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to view their own favicons
CREATE POLICY "Users can view their own favicons"
  ON favicons
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to update their own favicons
CREATE POLICY "Users can update their own favicons"
  ON favicons
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
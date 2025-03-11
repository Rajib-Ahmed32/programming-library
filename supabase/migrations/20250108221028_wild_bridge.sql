/*
  # Create Books Table and Storage

  1. New Tables
    - `books`
      - `id` (uuid, primary key)
      - `title` (text)
      - `author` (text)
      - `file_path` (text)
      - `uploaded_by` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `books` table
    - Add policies for reading and uploading books
*/

-- Create the books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  file_path text NOT NULL,
  uploaded_by text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read books"
  ON books
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only specific email can upload books"
  ON books
  FOR INSERT
  TO public
  USING (uploaded_by = 'rajcy1@gmail.com');

-- Create storage bucket for PDFs
INSERT INTO storage.buckets (id, name)
VALUES ('books', 'books')
ON CONFLICT DO NOTHING;

-- Set up storage policies
CREATE POLICY "Anyone can read book files"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'books');

CREATE POLICY "Only specific email can upload book files"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (
    bucket_id = 'books' AND
    auth.email() = 'rajcy1@gmail.com'
  );
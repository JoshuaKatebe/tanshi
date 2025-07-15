-- Storage policies for the 'tanshi' bucket
-- Run this in your Supabase SQL editor

-- Allow anyone to upload files to the tanshi bucket
CREATE POLICY "Allow public uploads to tanshi bucket" ON storage.objects
FOR INSERT 
TO public 
WITH CHECK (
  bucket_id = 'tanshi' AND 
  (storage.foldername(name))[1] = 'quotes'
);

-- Allow anyone to view files in the tanshi bucket
CREATE POLICY "Allow public to view tanshi files" ON storage.objects
FOR SELECT 
TO public 
USING (bucket_id = 'tanshi');

-- Optional: Allow file deletion (you might want to restrict this to authenticated users only)
-- CREATE POLICY "Allow authenticated users to delete their files" ON storage.objects
-- FOR DELETE 
-- TO authenticated 
-- USING (bucket_id = 'tanshi' AND auth.uid()::text = (storage.foldername(name))[2]);

-- If you haven't already, make sure the bucket exists and is public
-- This can also be done through the Supabase dashboard
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('tanshi', 'tanshi', true) 
-- ON CONFLICT DO NOTHING;

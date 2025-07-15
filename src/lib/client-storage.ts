import { createClient } from '@supabase/supabase-js';

// Create a client-side Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadFileDirectly(file: File): Promise<string> {
  try {
    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      throw new Error(validationError);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
    const filePath = `quotes/${fileName}`;

    // Upload directly to Supabase Storage from client
    const { data, error } = await supabaseClient.storage
      .from('tanshi')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error('Failed to upload file to storage');
    }

    // Get public URL
    const { data: publicUrlData } = supabaseClient.storage
      .from('tanshi')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
}

export function validateFile(file: File): string | null {
  const allowedTypes = [
    'image/jpeg', 
    'image/png', 
    'image/jpg', 
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return 'Invalid file type. Please upload PDF, DOC, DOCX, or image files.';
  }

  if (file.size > maxSize) {
    return 'File size too large. Maximum size is 10MB.';
  }

  return null; // No error
}

// Alternative: Get a signed upload URL for even larger files
export async function getSignedUploadUrl(fileName: string): Promise<{ uploadUrl: string; filePath: string }> {
  const timestamp = Date.now();
  const fileExtension = fileName.split('.').pop();
  const uniqueFileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
  const filePath = `quotes/${uniqueFileName}`;

  const { data, error } = await supabaseClient.storage
    .from('tanshi')
    .createSignedUploadUrl(filePath);

  if (error) {
    throw new Error('Failed to create upload URL');
  }

  return {
    uploadUrl: data.signedUrl,
    filePath
  };
}

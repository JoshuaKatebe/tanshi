'use client';

import { useState } from 'react';
import { uploadFileDirectly, validateFile } from '@/lib/client-storage';

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; url?: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setResult({ success: false, message: 'Please select a file first' });
      return;
    }

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setResult({ success: false, message: validationError });
      return;
    }

    setUploading(true);
    try {
      const url = await uploadFileDirectly(file);
      setResult({ success: true, message: 'File uploaded successfully!', url });
    } catch (error) {
      setResult({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Upload failed' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test File Upload</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select a file to upload
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700"
            />
          </div>

          {file && (
            <div className="text-sm text-gray-400">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
                     text-white font-semibold py-2 px-4 rounded-lg
                     transition-colors duration-200"
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>

          {result && (
            <div className={`p-4 rounded-lg ${
              result.success ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
            }`}>
              <p className="font-semibold">{result.message}</p>
              {result.url && (
                <div className="mt-2">
                  <p className="text-sm">File URL:</p>
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 break-all text-xs"
                  >
                    {result.url}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}</p>
            <p>Storage Endpoint: https://zryyzkmuppwvyjjbtxsh.supabase.co/storage/v1/s3</p>
            <p>Region: eu-west-2</p>
            <p>Bucket: tanshi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

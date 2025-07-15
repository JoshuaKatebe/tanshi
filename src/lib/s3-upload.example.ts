// This is an example of how to implement S3 uploads
// You would need to install: npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Option 1: Generate presigned URL from API route
export async function getS3PresignedUrl(fileName: string) {
  const response = await fetch('/api/get-upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName }),
  });

  if (!response.ok) {
    throw new Error('Failed to get upload URL');
  }

  const { uploadUrl, fileUrl } = await response.json();
  return { uploadUrl, fileUrl };
}

// Option 2: Direct upload to S3 using presigned URL
export async function uploadToS3(file: File) {
  // Get presigned URL from your API
  const { uploadUrl, fileUrl } = await getS3PresignedUrl(file.name);

  // Upload directly to S3
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to upload to S3');
  }

  return fileUrl;
}

// Example API route for generating presigned URLs (/api/get-upload-url/route.ts)
/*
import { S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  const { fileName } = await request.json();
  
  const key = `quotes/${Date.now()}-${fileName}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  return Response.json({ uploadUrl, fileUrl });
}
*/

import { NextResponse } from 'next/server';

// In production, store these in environment variables
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'tanshi2024!'
};

export function checkAuth(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export function createAuthToken(): string {
  // Simple token generation - in production, use JWT
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return Buffer.from(`${timestamp}:${random}`).toString('base64');
}

export function validateAuthToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [timestamp] = decoded.split(':');
    const tokenAge = Date.now() - parseInt(timestamp);
    
    // Token expires after 24 hours
    return tokenAge < 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

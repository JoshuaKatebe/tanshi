'use client';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function EmailJSInit() {
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'HA8hwtBcSWVYyEYkY';
    console.log('[EmailJSInit] Initializing EmailJS with public key:', publicKey);
    emailjs.init(publicKey);
  }, []);

  return null;
}

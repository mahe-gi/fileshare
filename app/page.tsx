import LandingPage from './landing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FileShare - Free Instant File Sharing with QR Codes | No Sign-Up Required',
  description: 'Share files instantly with QR codes. Upload PDF, DOCX, PNG, JPG, GIF files up to 100MB. Free, secure, and fast. No registration needed. Files auto-delete after 60 minutes.',
  keywords: [
    'file sharing',
    'QR code file sharing',
    'instant file transfer',
    'free file upload',
    'secure file sharing',
    'temporary file sharing',
    'share files online',
    'no signup file sharing',
    'quick file transfer',
    'send files free',
  ],
  openGraph: {
    title: 'FileShare - Free Instant File Sharing with QR Codes',
    description: 'Share files instantly with QR codes. Free, secure, and fast. No sign-up required.',
    type: 'website',
    url: 'https://fileshare.vercel.app',
  },
  alternates: {
    canonical: 'https://fileshare.vercel.app',
  },
};

export default function Home() {
  return <LandingPage />;
}

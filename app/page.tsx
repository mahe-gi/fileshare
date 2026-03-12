import LandingPage from './landing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QRFlowX - Free QR Code & File Sharing Tools | Flow Your Files',
  description: 'QRFlowX - Complete suite of free tools: Upload files with QR codes, scan QR codes, generate QR codes from text, shorten URLs, and create digital business cards. Flow your files instantly!',
  keywords: [
    'QRFlowX',
    'QR code generator',
    'file sharing',
    'QR code scanner',
    'text to QR code',
    'URL shortener',
    'vCard generator',
    'instant file transfer',
    'free QR tools',
    'flow files',
  ],
  openGraph: {
    title: 'QRFlowX - Flow Your Files Through QR',
    description: 'Complete suite of free QR code and file sharing tools. Flow your files instantly!',
    type: 'website',
    url: 'https://qrflowx.vercel.app',
  },
  alternates: {
    canonical: 'https://qrflowx.vercel.app',
  },
};

export default function Home() {
  return <LandingPage />;
}

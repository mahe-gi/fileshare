import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://qrflowx.vercel.app'),
  title: {
    default: 'QRFlowX - Flow Your Files Through QR | Free & Instant',
    template: '%s | QRFlowX'
  },
  description: 'QRFlowX - Complete suite of free QR code and file sharing tools. Upload files, generate QR codes, scan QR codes, shorten URLs, and create digital business cards. Flow your files instantly!',
  keywords: [
    'QRFlowX',
    'QR code generator',
    'file sharing',
    'QR code scanner',
    'text to QR code',
    'URL shortener',
    'vCard generator',
    'digital business card',
    'instant file transfer',
    'secure file sharing',
    'free QR tools',
    'flow files',
    'QR flow',
    'no signup file sharing'
  ],
  authors: [{ name: 'QRFlowX' }],
  creator: 'QRFlowX',
  publisher: 'QRFlowX',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qrflowx.vercel.app',
    title: 'QRFlowX - Flow Your Files Through QR',
    description: 'Complete suite of free QR code and file sharing tools. Flow your files instantly with QR codes.',
    siteName: 'QRFlowX',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QRFlowX - Flow Your Files Through QR',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QRFlowX - Flow Your Files Through QR',
    description: 'Complete suite of free QR code and file sharing tools. Flow your files instantly!',
    images: ['/og-image.png'],
    creator: '@qrflowx',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo.svg',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://qrflowx.vercel.app',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://qrflowx.vercel.app" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="QRFlowX" />
      </head>
      <body>{children}</body>
    </html>
  );
}

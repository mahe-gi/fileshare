import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://fileshare.vercel.app'),
  title: {
    default: 'FileShare - Instant File Sharing with QR Codes | Free & Secure',
    template: '%s | FileShare'
  },
  description: 'Share files instantly with QR codes. Free, secure, and fast file sharing. No sign-up required. Upload PDF, DOCX, images up to 100MB. Files auto-delete after 60 minutes for privacy.',
  keywords: [
    'file sharing',
    'QR code file sharing',
    'instant file transfer',
    'secure file sharing',
    'free file sharing',
    'upload files',
    'share files online',
    'temporary file sharing',
    'QR code generator',
    'file transfer',
    'send files',
    'share documents',
    'quick file share',
    'no signup file sharing',
    'private file sharing'
  ],
  authors: [{ name: 'FileShare' }],
  creator: 'FileShare',
  publisher: 'FileShare',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fileshare.vercel.app',
    title: 'FileShare - Instant File Sharing with QR Codes',
    description: 'Share files instantly with QR codes. Free, secure, and fast. No sign-up required. Upload and share files in seconds.',
    siteName: 'FileShare',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FileShare - Instant File Sharing with QR Codes',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FileShare - Instant File Sharing with QR Codes',
    description: 'Share files instantly with QR codes. Free, secure, and fast. No sign-up required.',
    images: ['/og-image.png'],
    creator: '@fileshare',
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
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://fileshare.vercel.app',
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
        <link rel="canonical" href="https://fileshare.vercel.app" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FileShare" />
      </head>
      <body>{children}</body>
    </html>
  );
}

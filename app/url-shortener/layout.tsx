import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Shortener - QRFlowX',
  description: 'Create short, memorable links that are easy to share. Free URL shortening service with instant results.',
  openGraph: {
    title: 'URL Shortener - QRFlowX',
    description: 'Shorten long URLs into clean, memorable links.',
    url: 'https://qrflowx.vercel.app/url-shortener',
  },
  alternates: {
    canonical: 'https://qrflowx.vercel.app/url-shortener',
  },
};

export default function URLShortenerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

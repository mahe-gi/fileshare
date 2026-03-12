import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Code Scanner - QRFlowX',
  description: 'Upload and decode QR codes from images. Fast, secure, and free QR code scanner. Works with any image format.',
  openGraph: {
    title: 'QR Code Scanner - QRFlowX',
    description: 'Upload and decode QR codes from images instantly.',
    url: 'https://qrflowx.vercel.app/scanner',
  },
  alternates: {
    canonical: 'https://qrflowx.vercel.app/scanner',
  },
};

export default function ScannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

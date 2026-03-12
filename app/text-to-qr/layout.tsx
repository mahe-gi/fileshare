import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text to QR Code Generator - QRFlowX',
  description: 'Convert any text, URL, phone number, or message into a QR code. Free, instant, and high-quality QR code generation.',
  openGraph: {
    title: 'Text to QR Code Generator - QRFlowX',
    description: 'Convert any text or URL into a scannable QR code instantly.',
    url: 'https://qrflowx.vercel.app/text-to-qr',
  },
  alternates: {
    canonical: 'https://qrflowx.vercel.app/text-to-qr',
  },
};

export default function TextToQRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

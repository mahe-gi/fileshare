import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'vCard Generator - Digital Business Card - QRFlowX',
  description: 'Create digital business cards with QR codes. Share contact information that saves directly to phones. Free vCard generator.',
  openGraph: {
    title: 'vCard Generator - QRFlowX',
    description: 'Create digital business cards with QR codes instantly.',
    url: 'https://qrflowx.vercel.app/vcard-generator',
  },
  alternates: {
    canonical: 'https://qrflowx.vercel.app/vcard-generator',
  },
};

export default function VCardGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

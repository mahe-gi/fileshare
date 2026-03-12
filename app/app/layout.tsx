import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Files - QRFlowX',
  description: 'Upload and share your files instantly with QR codes. Drag and drop files or click to browse. Supports PDF, DOCX, PNG, JPG, GIF up to 100MB.',
  openGraph: {
    title: 'Upload Files - QRFlowX',
    description: 'Upload and share your files instantly with QR codes.',
    url: 'https://qrflowx.vercel.app/app',
  },
  alternates: {
    canonical: 'https://qrflowx.vercel.app/app',
  },
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

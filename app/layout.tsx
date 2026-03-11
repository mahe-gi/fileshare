import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manoj Sir's File Sharing Platform",
  description: "Upload files and share via QR code - Built with gratitude for Manoj Sir's mentorship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

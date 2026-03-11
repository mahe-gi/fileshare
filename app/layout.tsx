import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickShare QR",
  description: "Upload files and share via QR code",
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

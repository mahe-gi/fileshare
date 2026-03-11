import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FileShare - Instant File Sharing",
  description: "Share files instantly with QR codes. Secure, fast, and simple file sharing solution.",
  icons: {
    icon: '/favicon.ico',
  },
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

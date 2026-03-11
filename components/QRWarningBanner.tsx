'use client';

/**
 * Warning banner component to inform users about 60-minute QR code validity
 */
export default function QRWarningBanner() {
  return (
    <div className="text-center mb-4 animate-fade-in">
      <p className="text-sm text-gray-600">
        ⏰ This QR code will work for 60 minutes
      </p>
    </div>
  );
}

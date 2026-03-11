import { useRef, useEffect } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import ShareActions from './ShareActions';
import QRWarningBanner from './QRWarningBanner';

interface ResultsDisplayProps {
  downloadUrl: string;
  fileName: string;
}

export default function ResultsDisplay({ downloadUrl, fileName }: ResultsDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<HTMLCanvasElement | null>(null);

  // Get canvas element after QRCodeDisplay renders
  useEffect(() => {
    if (containerRef.current) {
      const canvas = containerRef.current.querySelector('canvas');
      qrCodeRef.current = canvas;
    }
  }, [downloadUrl]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 sm:space-y-8 px-4">
      {/* 60-minute warning banner */}
      <QRWarningBanner />

      {/* File name header */}
      <div className="text-center animate-fade-in">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
          File Ready to Share
        </h2>
        <p className="text-sm sm:text-base text-gray-600 break-words px-2">{fileName}</p>
      </div>

      {/* Download URL as clickable link */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3">
          Download Link:
        </label>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline underline break-all text-xs sm:text-sm font-medium transition-colors duration-200"
        >
          {downloadUrl}
        </a>
      </div>

      {/* QR Code Display */}
      <div ref={containerRef} className="flex justify-center bg-white rounded-xl p-6 sm:p-8 border-2 border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <QRCodeDisplay url={downloadUrl} />
      </div>

      {/* Share Actions */}
      <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <ShareActions downloadUrl={downloadUrl} qrCodeRef={qrCodeRef} />
      </div>
    </div>
  );
}

export { type ResultsDisplayProps };

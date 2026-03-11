import { useRef, useEffect } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import ShareActions from './ShareActions';

interface ResultsDisplayProps {
  downloadUrl: string;
  fileName: string;
  isMultiple?: boolean;
}

export default function ResultsDisplay({ downloadUrl, fileName, isMultiple = false }: ResultsDisplayProps) {
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
    <div className={`${isMultiple ? 'w-full' : 'w-full max-w-2xl mx-auto'} space-y-4 px-4`}>
      {/* File name header */}
      <div className="text-center animate-fade-in">
        <h3 className={`${isMultiple ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'} font-semibold text-gray-200 mb-2`}>
          {isMultiple ? fileName : 'File Ready to Share'}
        </h3>
        {!isMultiple && <p className="text-sm sm:text-base text-gray-400 break-words px-2">{fileName}</p>}
      </div>

      {/* Download URL as clickable link */}
      <div className="bg-gray-800 rounded-xl p-3 sm:p-4 border-2 border-gray-600 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Download Link:
        </label>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 hover:underline underline break-all text-xs font-medium transition-colors duration-200"
        >
          {downloadUrl}
        </a>
      </div>

      {/* QR Code Display */}
      <div ref={containerRef} className="flex justify-center bg-gray-800 rounded-xl p-4 sm:p-6 border-2 border-gray-600 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
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

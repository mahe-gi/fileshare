import { useRef, useEffect } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import ShareActions from './ShareActions';

interface ResultsDisplayProps {
  downloadUrl: string;
  fileName: string;
  isMultiple?: boolean;
}

export default function ResultsDisplay({ 
  downloadUrl, 
  fileName, 
  isMultiple = false
}: ResultsDisplayProps) {
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
    <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
      {/* File info */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 mb-1">File name</p>
            <p className="font-semibold text-gray-900 break-words">{fileName}</p>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div ref={containerRef} className="flex justify-center mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <QRCodeDisplay url={downloadUrl} />
      </div>

      {/* Actions */}
      <ShareActions downloadUrl={downloadUrl} qrCodeRef={qrCodeRef} isCompact={false} />

      {/* Download link */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Direct Link
        </label>
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <input
            type="text"
            value={downloadUrl}
            readOnly
            className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
          />
          <button
            onClick={() => navigator.clipboard.writeText(downloadUrl)}
            className="flex-shrink-0 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export { type ResultsDisplayProps };

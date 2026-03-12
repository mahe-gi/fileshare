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
    <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 shadow-sm">
      {/* File info */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">File info</p>
            <p className="font-bold text-gray-900 break-words text-lg">{fileName}</p>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div ref={containerRef} className="flex justify-center mb-8 p-8 bg-white rounded-xl border-2 border-gray-200">
        <QRCodeDisplay url={downloadUrl} />
      </div>

      {/* Actions */}
      <ShareActions downloadUrl={downloadUrl} qrCodeRef={qrCodeRef} isCompact={false} />

      {/* Share this page section */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
          Share this page
        </label>
        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200 group hover:border-gray-300 transition-colors">
          <input
            type="text"
            value={downloadUrl}
            readOnly
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none font-mono"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(downloadUrl);
            }}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="Copy link"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Direct download link */}
      <div className="mt-4">
        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
          Direct download link
        </label>
        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200 group hover:border-gray-300 transition-colors">
          <input
            type="text"
            value={downloadUrl}
            readOnly
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none font-mono"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(downloadUrl);
            }}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="Copy link"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export { type ResultsDisplayProps };

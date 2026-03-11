import { useRef, useEffect } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import ShareActions from './ShareActions';

interface UploadedFile {
  fileName: string;
  fileSize: number;
  downloadUrl: string;
}

interface ResultsDisplayProps {
  downloadUrl: string;
  fileName: string;
  isMultiple?: boolean;
  showFilesList?: boolean;
  filesList?: UploadedFile[];
}

export default function ResultsDisplay({ 
  downloadUrl, 
  fileName, 
  isMultiple = false,
  showFilesList = false,
  filesList = []
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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={`${isMultiple ? 'w-full' : 'w-full max-w-2xl mx-auto'} ${isMultiple ? 'space-y-3' : 'space-y-4'}`}>
      {/* File name header */}
      <div className={`${isMultiple ? 'bg-gray-800 rounded-lg p-3 border border-gray-700' : 'text-center'} animate-fade-in`}>
        {isMultiple ? (
          <div className="flex items-center gap-2">
            <span className="text-lg">📄</span>
            <p className="text-sm font-semibold text-gray-200 truncate flex-1">{fileName}</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-2">
              {showFilesList ? 'Scan to View All Files' : 'File Ready to Share'}
            </h3>
            <p className="text-sm sm:text-base text-gray-400 break-words px-2">{fileName}</p>
          </>
        )}
      </div>

      {/* Files list preview for multiple files */}
      {showFilesList && filesList.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Files included:</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filesList.map((file, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-400 bg-gray-900 p-2 rounded">
                <span>📄</span>
                <span className="flex-1 truncate">{file.fileName}</span>
                <span className="text-gray-500">{formatFileSize(file.fileSize)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Display - Most important, show first */}
      <div ref={containerRef} className="flex justify-center bg-gray-800 rounded-xl p-4 sm:p-6 border-2 border-gray-600 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in" style={{ animationDelay: showFilesList ? '0.2s' : '0.1s' }}>
        <QRCodeDisplay url={downloadUrl} />
      </div>

      {/* Share Actions */}
      <div className="flex justify-center animate-fade-in" style={{ animationDelay: showFilesList ? '0.3s' : '0.2s' }}>
        <ShareActions downloadUrl={downloadUrl} qrCodeRef={qrCodeRef} isCompact={isMultiple} />
      </div>

      {/* Download URL - Less prominent, collapsible for multiple files */}
      {!isMultiple && !showFilesList && (
        <div className="bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-600 shadow-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
      )}
    </div>
  );
}

export { type ResultsDisplayProps, type UploadedFile };

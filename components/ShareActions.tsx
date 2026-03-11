import { useState } from 'react';

interface ShareActionsProps {
  downloadUrl: string;
  qrCodeRef: React.RefObject<HTMLCanvasElement>;
  isCompact?: boolean;
}

export default function ShareActions({ downloadUrl, qrCodeRef, isCompact = false }: ShareActionsProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      // Check if Clipboard API is available
      if (!navigator.clipboard) {
        // Fallback for browsers without Clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = downloadUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        return;
      }

      // Use Clipboard API
      await navigator.clipboard.writeText(downloadUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Silently fail - user can still manually copy the URL
    }
  };

  const handleDownloadQR = () => {
    const canvas = qrCodeRef.current;
    if (!canvas) {
      console.error('QR code canvas not found');
      return;
    }

    try {
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create blob from canvas');
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the object URL
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Failed to download QR code:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <button
        onClick={handleCopyToClipboard}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        aria-label="Copy download URL to clipboard"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        {copySuccess ? 'Copied!' : 'Copy Link'}
      </button>
      
      <button
        onClick={handleDownloadQR}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        aria-label="Download QR code as PNG image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download QR
      </button>
    </div>
  );
}

export { type ShareActionsProps };

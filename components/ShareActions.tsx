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
    <div className={`flex ${isCompact ? 'flex-col gap-2 w-full' : 'flex-col sm:flex-row gap-3 w-full max-w-md'}`}>
      <button
        onClick={handleCopyToClipboard}
        className={`${isCompact ? 'flex-1 px-4 py-2 text-xs' : 'flex-1 px-6 py-3 text-sm sm:text-base'} bg-gray-700 text-white rounded-lg hover:bg-gray-600 active:bg-gray-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border border-gray-500`}
        aria-label="Copy download URL to clipboard"
      >
        {copySuccess ? '✓ Copied!' : 'Copy Link'}
      </button>
      
      <button
        onClick={handleDownloadQR}
        className={`${isCompact ? 'flex-1 px-4 py-2 text-xs' : 'flex-1 px-6 py-3 text-sm sm:text-base'} bg-gray-700 text-white rounded-lg hover:bg-gray-600 active:bg-gray-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border border-gray-500`}
        aria-label="Download QR code as PNG image"
      >
        Download QR
      </button>
    </div>
  );
}

export { type ShareActionsProps };

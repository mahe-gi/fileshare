/**
 * Example usage of ShareActions component
 * 
 * This file demonstrates how to integrate ShareActions with QRCodeDisplay
 * in the main application page.
 */

import { useRef } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import ShareActions from './ShareActions';

export default function ShareActionsExample() {
  const downloadUrl = 'https://tmpfiles.org/dl/12345/example-file.pdf';
  
  // Create a ref to access the QR code canvas
  const qrCodeContainerRef = useRef<HTMLDivElement>(null);
  
  // Function to get the canvas element from QRCodeDisplay
  const getQRCanvas = (): HTMLCanvasElement | null => {
    return qrCodeContainerRef.current?.querySelector('canvas') || null;
  };

  // Create a ref object that ShareActions can use
  const canvasRef = {
    get current() {
      return getQRCanvas();
    }
  } as React.RefObject<HTMLCanvasElement>;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Display the download URL */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Download URL:</p>
        <a 
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {downloadUrl}
        </a>
      </div>

      {/* Display the QR code */}
      <div ref={qrCodeContainerRef}>
        <QRCodeDisplay url={downloadUrl} />
      </div>

      {/* Share actions (copy and download) */}
      <ShareActions 
        downloadUrl={downloadUrl}
        qrCodeRef={canvasRef}
      />
    </div>
  );
}

/**
 * Integration notes:
 * 
 * 1. The QRCodeDisplay component renders a canvas element inside a div
 * 2. We need to get a reference to that canvas for the download functionality
 * 3. Use a container ref on the parent div and query for the canvas element
 * 4. Create a ref object that dynamically gets the canvas when accessed
 * 5. Pass both the downloadUrl and canvasRef to ShareActions
 * 
 * Requirements satisfied:
 * - 4.2: Copy-to-clipboard button provided
 * - 4.3: Clipboard API copies URL on click
 * - 4.4: Confirmation message displayed after successful copy
 * - 4.5: Download button for QR code provided
 * - 4.6: QR code saved as PNG on download button click
 */

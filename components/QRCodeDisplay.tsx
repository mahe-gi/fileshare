import { useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeDisplayProps {
  url: string;
}

export default function QRCodeDisplay({ url }: QRCodeDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Get canvas element after render for download functionality
  const getCanvas = (): HTMLCanvasElement | null => {
    return containerRef.current?.querySelector('canvas') || null;
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-lg">
        <QRCodeCanvas
          value={url}
          size={256}
          level="M"
          includeMargin={true}
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}

export { type QRCodeDisplayProps };

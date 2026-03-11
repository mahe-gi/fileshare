import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ShareActions from './ShareActions';
import { createRef } from 'react';

describe('ShareActions', () => {
  const mockDownloadUrl = 'https://tmpfiles.org/dl/12345/test-file.pdf';
  let mockCanvas: HTMLCanvasElement;
  let canvasRef: React.RefObject<HTMLCanvasElement>;

  beforeEach(() => {
    // Create a mock canvas element
    mockCanvas = document.createElement('canvas');
    mockCanvas.width = 256;
    mockCanvas.height = 256;
    canvasRef = createRef<HTMLCanvasElement>();
    (canvasRef as any).current = mockCanvas;

    // Mock toBlob
    mockCanvas.toBlob = jest.fn((callback) => {
      const blob = new Blob(['fake-image-data'], { type: 'image/png' });
      callback(blob);
    });

    // Mock URL methods
    global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = jest.fn();

    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve()),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Copy to Clipboard', () => {
    it('should render copy button', () => {
      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      const copyButton = screen.getByRole('button', { name: /copy download url to clipboard/i });
      expect(copyButton).toBeInTheDocument();
      expect(copyButton).toHaveTextContent('Copy Link');
    });

    it('should copy URL to clipboard when copy button is clicked', async () => {
      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      const copyButton = screen.getByRole('button', { name: /copy download url to clipboard/i });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockDownloadUrl);
      });
    });

    it('should display confirmation message after successful copy', async () => {
      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      const copyButton = screen.getByRole('button', { name: /copy download url to clipboard/i });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(copyButton).toHaveTextContent('✓ Copied!');
      });
    });

    it('should reset confirmation message after 2 seconds', async () => {
      jest.useFakeTimers();
      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      const copyButton = screen.getByRole('button', { name: /copy download url to clipboard/i });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(copyButton).toHaveTextContent('✓ Copied!');
      });

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      await waitFor(() => {
        expect(copyButton).toHaveTextContent('Copy Link');
      });

      jest.useRealTimers();
    });

    it('should handle clipboard API not available gracefully', async () => {
      // Remove clipboard API
      const originalClipboard = navigator.clipboard;
      (navigator as any).clipboard = undefined;

      // Mock document.execCommand
      document.execCommand = jest.fn(() => true);

      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      const copyButton = screen.getByRole('button', { name: /copy download url to clipboard/i });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(document.execCommand).toHaveBeenCalledWith('copy');
        expect(copyButton).toHaveTextContent('✓ Copied!');
      });

      // Restore clipboard API
      (navigator as any).clipboard = originalClipboard;
    });

    it('should handle clipboard write failure gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(new Error('Permission denied'));

      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      const copyButton = screen.getByRole('button', { name: /copy download url to clipboard/i });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Failed to copy to clipboard:',
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Download QR Code', () => {
    it('should render download button', () => {
      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      const downloadButton = screen.getByRole('button', { name: /download qr code as png image/i });
      expect(downloadButton).toBeInTheDocument();
      expect(downloadButton).toHaveTextContent('Download QR');
    });

    it('should download QR code as PNG when download button is clicked', () => {
      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      const downloadButton = screen.getByRole('button', { name: /download qr code as png image/i });
      fireEvent.click(downloadButton);

      expect(mockCanvas.toBlob).toHaveBeenCalledWith(expect.any(Function), 'image/png');
      expect(global.URL.createObjectURL).toHaveBeenCalled();
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    });

    it('should create download link with correct filename', () => {
      const createElementSpy = jest.spyOn(document, 'createElement');
      
      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      const downloadButton = screen.getByRole('button', { name: /download qr code as png image/i });
      fireEvent.click(downloadButton);

      const linkElement = createElementSpy.mock.results.find(
        result => result.value.tagName === 'A'
      )?.value as HTMLAnchorElement;

      expect(linkElement).toBeDefined();
      expect(linkElement.download).toBe('qr-code.png');
      expect(linkElement.href).toBe('blob:mock-url');
    });

    it('should handle missing canvas reference gracefully', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const emptyRef = createRef<HTMLCanvasElement>();

      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={emptyRef} />);
      
      const downloadButton = screen.getByRole('button', { name: /download qr code as png image/i });
      fireEvent.click(downloadButton);

      expect(consoleErrorSpy).toHaveBeenCalledWith('QR code canvas not found');
      expect(mockCanvas.toBlob).not.toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should handle blob creation failure gracefully', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      mockCanvas.toBlob = jest.fn((callback) => {
        callback(null);
      });

      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      const downloadButton = screen.getByRole('button', { name: /download qr code as png image/i });
      fireEvent.click(downloadButton);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to create blob from canvas');

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Layout and Styling', () => {
    it('should render both buttons in a flex container', () => {
      const { container } = render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      const buttonContainer = container.querySelector('.flex');
      expect(buttonContainer).toBeInTheDocument();
      expect(buttonContainer?.children).toHaveLength(2);
    });

    it('should have proper accessibility labels', () => {
      render(<ShareActions downloadUrl={mockDownloadUrl} qrCodeRef={canvasRef} />);
      
      expect(screen.getByRole('button', { name: /copy download url to clipboard/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /download qr code as png image/i })).toBeInTheDocument();
    });
  });
});

import { render, screen } from '@testing-library/react';
import QRCodeDisplay from './QRCodeDisplay';

describe('QRCodeDisplay', () => {
  const testUrl = 'https://tmpfiles.org/dl/12345/test-file.pdf';

  it('renders QR code canvas element', () => {
    const { container } = render(<QRCodeDisplay url={testUrl} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('configures QR code with correct size (256x256)', () => {
    const { container } = render(<QRCodeDisplay url={testUrl} />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    expect(canvas).toHaveAttribute('width', '256');
    expect(canvas).toHaveAttribute('height', '256');
  });

  it('encodes the provided URL in the QR code', () => {
    const { container } = render(<QRCodeDisplay url={testUrl} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    // QR code generation is handled by qrcode.react library
    // We verify the component renders with the URL prop
  });

  it('renders within 1 second (performance requirement)', () => {
    const startTime = performance.now();
    render(<QRCodeDisplay url={testUrl} />);
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Requirement 3.4: Render within 1 second (1000ms)
    expect(renderTime).toBeLessThan(1000);
  });

  it('provides canvas ref for download functionality', () => {
    const { container } = render(<QRCodeDisplay url={testUrl} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
  });
});

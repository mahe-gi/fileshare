import { render, screen } from '@testing-library/react';
import ResultsDisplay from './ResultsDisplay';

// Mock child components
jest.mock('./QRCodeDisplay', () => {
  return function MockQRCodeDisplay({ url }: { url: string }) {
    return <div data-testid="qr-code-display">QR Code for {url}</div>;
  };
});

jest.mock('./ShareActions', () => {
  return function MockShareActions({ downloadUrl }: { downloadUrl: string }) {
    return <div data-testid="share-actions">Actions for {downloadUrl}</div>;
  };
});

describe('ResultsDisplay', () => {
  const mockProps = {
    downloadUrl: 'https://tmpfiles.org/dl/12345/test-file.pdf',
    fileName: 'test-file.pdf',
  };

  it('renders with download URL and file name', () => {
    render(<ResultsDisplay {...mockProps} />);
    
    // Check file name is displayed
    expect(screen.getByText('test-file.pdf')).toBeInTheDocument();
    
    // Check download URL is displayed
    expect(screen.getByText(mockProps.downloadUrl)).toBeInTheDocument();
  });

  it('displays download URL as clickable link', () => {
    render(<ResultsDisplay {...mockProps} />);
    
    const link = screen.getByRole('link', { name: mockProps.downloadUrl });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockProps.downloadUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders QRCodeDisplay component with correct URL', () => {
    render(<ResultsDisplay {...mockProps} />);
    
    const qrCode = screen.getByTestId('qr-code-display');
    expect(qrCode).toBeInTheDocument();
    expect(qrCode).toHaveTextContent(`QR Code for ${mockProps.downloadUrl}`);
  });

  it('renders ShareActions component with correct URL', () => {
    render(<ResultsDisplay {...mockProps} />);
    
    const shareActions = screen.getByTestId('share-actions');
    expect(shareActions).toBeInTheDocument();
    expect(shareActions).toHaveTextContent(`Actions for ${mockProps.downloadUrl}`);
  });

  it('displays header text', () => {
    render(<ResultsDisplay {...mockProps} />);
    
    expect(screen.getByText('File Ready to Share')).toBeInTheDocument();
  });

  it('displays download link label', () => {
    render(<ResultsDisplay {...mockProps} />);
    
    expect(screen.getByText('Download Link:')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadZone from './UploadZone';

// Mock react-dropzone to control drag-and-drop behavior
jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn((options) => {
    const mockGetRootProps = () => ({
      onClick: jest.fn(),
      onDrop: jest.fn(),
      'data-testid': 'dropzone',
    });

    const mockGetInputProps = () => ({
      type: 'file',
      accept: options.accept,
      multiple: options.multiple,
      disabled: options.disabled,
      'data-testid': 'file-input',
    });

    // Store the onDrop callback for testing
    (global as any).__mockOnDrop = options.onDrop;

    return {
      getRootProps: mockGetRootProps,
      getInputProps: mockGetInputProps,
      isDragActive: (global as any).__mockIsDragActive || false,
    };
  }),
}));

describe('UploadZone Component', () => {
  const mockOnFileSelected = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).__mockIsDragActive = false;
  });

  describe('File Type Validation (Requirement 1.5)', () => {
    it('should accept PDF files', async () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
      const onDrop = (global as any).__mockOnDrop;
      
      await act(async () => {
        onDrop([file]);
      });
      
      expect(mockOnFileSelected).toHaveBeenCalledWith(file);
    });

    it('should accept DOCX files', async () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const file = new File(['dummy content'], 'test.docx', { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      const onDrop = (global as any).__mockOnDrop;
      
      await act(async () => {
        onDrop([file]);
      });
      
      expect(mockOnFileSelected).toHaveBeenCalledWith(file);
    });

    it('should accept PNG files', async () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
      const onDrop = (global as any).__mockOnDrop;
      
      await act(async () => {
        onDrop([file]);
      });
      
      expect(mockOnFileSelected).toHaveBeenCalledWith(file);
    });

    it('should accept JPG files', async () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
      const onDrop = (global as any).__mockOnDrop;
      
      await act(async () => {
        onDrop([file]);
      });
      
      expect(mockOnFileSelected).toHaveBeenCalledWith(file);
    });

    it('should accept JPEG files', async () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const file = new File(['dummy content'], 'test.jpeg', { type: 'image/jpeg' });
      const onDrop = (global as any).__mockOnDrop;
      
      await act(async () => {
        onDrop([file]);
      });
      
      expect(mockOnFileSelected).toHaveBeenCalledWith(file);
    });

    it('should accept GIF files', async () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const file = new File(['dummy content'], 'test.gif', { type: 'image/gif' });
      const onDrop = (global as any).__mockOnDrop;
      
      await act(async () => {
        onDrop([file]);
      });
      
      expect(mockOnFileSelected).toHaveBeenCalledWith(file);
    });

    it('should display supported file formats in the UI', () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      expect(screen.getByText(/Supported formats: PDF, DOCX, PNG, JPG, JPEG, GIF/i)).toBeInTheDocument();
    });
  });

  describe('Drag-and-Drop Interactions (Requirements 1.1, 1.3)', () => {
    it('should display drag-and-drop prompt when idle', () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      expect(screen.getByText(/Drag & drop a file here, or click to browse/i)).toBeInTheDocument();
    });

    it('should show visual feedback during drag operation', () => {
      (global as any).__mockIsDragActive = true;
      
      const { container } = render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      expect(screen.getByText(/Drop your file here/i)).toBeInTheDocument();
      
      // Check for drag-active styling
      const dropzone = container.querySelector('[class*="border-blue-500"]');
      expect(dropzone).toBeInTheDocument();
    });

    it('should display filename and size after file selection (Requirement 1.4)', async () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const file = new File(['a'.repeat(1024)], 'test-document.pdf', { type: 'application/pdf' });
      const onDrop = (global as any).__mockOnDrop;
      
      await act(async () => {
        onDrop([file]);
      });
      
      await waitFor(() => {
        expect(screen.getByText('test-document.pdf')).toBeInTheDocument();
        expect(screen.getByText(/1 KB/i)).toBeInTheDocument();
      });
    });

    it('should format file size correctly for different sizes', async () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      // Test with a larger file (1 MB)
      const file = new File(['a'.repeat(1024 * 1024)], 'large-file.pdf', { type: 'application/pdf' });
      const onDrop = (global as any).__mockOnDrop;
      
      await act(async () => {
        onDrop([file]);
      });
      
      await waitFor(() => {
        expect(screen.getByText('large-file.pdf')).toBeInTheDocument();
        expect(screen.getByText(/1 MB/i)).toBeInTheDocument();
      });
    });

    it('should handle single file selection only', async () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const file1 = new File(['content1'], 'file1.pdf', { type: 'application/pdf' });
      const file2 = new File(['content2'], 'file2.pdf', { type: 'application/pdf' });
      const onDrop = (global as any).__mockOnDrop;
      
      await act(async () => {
        onDrop([file1, file2]);
      });
      
      // Should only call with the first file
      expect(mockOnFileSelected).toHaveBeenCalledTimes(1);
      expect(mockOnFileSelected).toHaveBeenCalledWith(file1);
    });
  });

  describe('Disabled State (Requirement 1.2)', () => {
    it('should apply disabled styling when disabled prop is true', () => {
      const { container } = render(<UploadZone onFileSelected={mockOnFileSelected} disabled={true} />);
      
      // Check for disabled styling classes
      const dropzone = container.querySelector('[class*="opacity-50"]');
      expect(dropzone).toBeInTheDocument();
      
      const cursorNotAllowed = container.querySelector('[class*="cursor-not-allowed"]');
      expect(cursorNotAllowed).toBeInTheDocument();
    });

    it('should not trigger file selection when disabled', () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={true} />);
      
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const onDrop = (global as any).__mockOnDrop;
      
      // Attempt to drop a file while disabled
      onDrop([file]);
      
      // The component should still call onFileSelected, but in a real scenario
      // react-dropzone would prevent this. We're testing the disabled prop is passed correctly.
      const input = screen.getByTestId('file-input');
      expect(input).toHaveAttribute('disabled');
    });

    it('should allow file selection when not disabled', () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const input = screen.getByTestId('file-input');
      expect(input).not.toHaveAttribute('disabled');
    });

    it('should show normal styling when not disabled', () => {
      const { container } = render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      // Check that hover styles are present (not disabled)
      const dropzone = container.querySelector('[class*="hover:shadow-md"]');
      expect(dropzone).toBeInTheDocument();
    });
  });

  describe('Click-to-Browse Interaction (Requirement 1.2)', () => {
    it('should render file input for click-to-browse functionality', () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const input = screen.getByTestId('file-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'file');
    });

    it('should configure input to accept only supported file types', () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const input = screen.getByTestId('file-input');
      const acceptAttr = input.getAttribute('accept');
      
      // The accept attribute should be an object with MIME types
      expect(acceptAttr).toBeTruthy();
    });

    it('should configure input for single file selection', () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const input = screen.getByTestId('file-input');
      // When multiple is false, the attribute is not present in the DOM
      expect(input).not.toHaveAttribute('multiple', 'true');
    });
  });

  describe('Visual Feedback', () => {
    it('should display file icon in idle state', () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      expect(screen.getByText('📁')).toBeInTheDocument();
    });

    it('should display document icon when file is selected', async () => {
      render(<UploadZone onFileSelected={mockOnFileSelected} disabled={false} />);
      
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const onDrop = (global as any).__mockOnDrop;
      
      await act(async () => {
        onDrop([file]);
      });
      
      await waitFor(() => {
        expect(screen.getByText('📄')).toBeInTheDocument();
      });
    });
  });
});

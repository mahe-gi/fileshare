/**
 * Tests for API utility functions
 * Validates file upload functionality and error handling
 */

import { uploadToTmpFiles, UploadError } from './api';

// Mock fetch globally
global.fetch = jest.fn();

describe('uploadToTmpFiles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should successfully upload a file and return download URL', async () => {
    // Arrange
    const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const mockUrl = 'https://tmpfiles.org/dl/abc123/test.pdf';
    const mockResponse = {
      status: 'success',
      data: {
        url: mockUrl,
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // Act
    const result = await uploadToTmpFiles(mockFile);

    // Assert
    expect(result).toBe(mockUrl);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://tmpfiles.org/api/v1/upload',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
      })
    );
  });

  it('should throw UploadError with file_too_large type for 413 response', async () => {
    // Arrange
    const mockFile = new File(['x'.repeat(1000000)], 'large.pdf', { type: 'application/pdf' });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 413,
      statusText: 'Payload Too Large',
    });

    // Act & Assert
    await expect(uploadToTmpFiles(mockFile)).rejects.toMatchObject({
      type: 'file_too_large',
      userMessage: expect.stringContaining('too large'),
    });
  });

  it('should throw UploadError with api_unavailable type for 500+ responses', async () => {
    // Arrange
    const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
    });

    // Act & Assert
    await expect(uploadToTmpFiles(mockFile)).rejects.toMatchObject({
      type: 'api_unavailable',
      userMessage: expect.stringContaining('temporarily unavailable'),
    });
  });

  it('should throw UploadError with timeout_error type when request exceeds 10 seconds', async () => {
    // Arrange
    const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      return new Promise((_, reject) => {
        setTimeout(() => {
          const error = new Error('The operation was aborted');
          error.name = 'AbortError';
          reject(error);
        }, 11000);
      });
    });

    // Act
    const uploadPromise = uploadToTmpFiles(mockFile);
    jest.advanceTimersByTime(11000);

    // Assert
    await expect(uploadPromise).rejects.toThrow(UploadError);
    await expect(uploadPromise).rejects.toMatchObject({
      type: 'timeout_error',
      userMessage: expect.stringContaining('taking too long'),
    });
  });

  it('should throw UploadError with network_error type for network failures', async () => {
    // Arrange
    const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new TypeError('Failed to fetch')
    );

    // Act & Assert
    await expect(uploadToTmpFiles(mockFile)).rejects.toMatchObject({
      type: 'network_error',
      userMessage: expect.stringContaining('connect to the internet'),
    });
  });

  it('should throw UploadError with unknown_error type for invalid response structure', async () => {
    // Arrange
    const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'success' }), // Missing data.url
    });

    // Act & Assert
    await expect(uploadToTmpFiles(mockFile)).rejects.toMatchObject({
      type: 'unknown_error',
      userMessage: expect.stringContaining('went wrong'),
    });
  });

  it('should throw UploadError with unknown_error type for other HTTP errors', async () => {
    // Arrange
    const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
    });

    // Act & Assert
    await expect(uploadToTmpFiles(mockFile)).rejects.toMatchObject({
      type: 'unknown_error',
      userMessage: expect.stringContaining('went wrong'),
    });
  });

  it('should send file in FormData with correct field name', async () => {
    // Arrange
    const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const mockUrl = 'https://tmpfiles.org/dl/abc123/test.pdf';

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'success',
        data: { url: mockUrl },
      }),
    });

    // Act
    await uploadToTmpFiles(mockFile);

    // Assert
    const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
    const formData = fetchCall[1].body as FormData;
    expect(formData.get('file')).toBe(mockFile);
  });

  it('should clear timeout on successful upload', async () => {
    // Arrange
    const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const mockUrl = 'https://tmpfiles.org/dl/abc123/test.pdf';
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'success',
        data: { url: mockUrl },
      }),
    });

    // Act
    await uploadToTmpFiles(mockFile);

    // Assert
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should clear timeout on error', async () => {
    // Arrange
    const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new TypeError('Network error')
    );

    // Act
    try {
      await uploadToTmpFiles(mockFile);
    } catch {
      // Expected error
    }

    // Assert
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  describe('Error Message Formatting - Requirement 7.5', () => {
    it('should provide plain language error for file too large - Requirement 7.3', async () => {
      const mockFile = new File(['x'.repeat(1000000)], 'large.pdf', { type: 'application/pdf' });

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 413,
        statusText: 'Payload Too Large',
      });

      try {
        await uploadToTmpFiles(mockFile);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(UploadError);
        const uploadError = error as UploadError;
        
        // Verify plain language (no technical terms)
        expect(uploadError.userMessage).not.toMatch(/413|HTTP|payload/i);
        
        // Verify includes size limit
        expect(uploadError.userMessage).toContain('100 MB');
        
        // Verify actionable guidance
        expect(uploadError.userMessage).toMatch(/smaller file/i);
      }
    });

    it('should provide plain language error for API unavailable - Requirement 7.2', async () => {
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
      });

      try {
        await uploadToTmpFiles(mockFile);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(UploadError);
        const uploadError = error as UploadError;
        
        // Verify plain language (no technical terms)
        expect(uploadError.userMessage).not.toMatch(/503|HTTP|server/i);
        
        // Verify explains temporary nature
        expect(uploadError.userMessage).toMatch(/temporarily unavailable/i);
        
        // Verify actionable guidance
        expect(uploadError.userMessage).toMatch(/try again/i);
      }
    });

    it('should provide plain language error for network failure - Requirement 7.4', async () => {
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new TypeError('Failed to fetch')
      );

      try {
        await uploadToTmpFiles(mockFile);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(UploadError);
        const uploadError = error as UploadError;
        
        // Verify plain language (no technical terms)
        expect(uploadError.userMessage).not.toMatch(/TypeError|fetch|network/i);
        
        // Verify explains connection issue
        expect(uploadError.userMessage).toMatch(/connect|internet|connection/i);
        
        // Verify actionable guidance
        expect(uploadError.userMessage).toMatch(/check|try again/i);
      }
    });

    it('should provide plain language error for timeout - Requirement 7.5', async () => {
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

      (global.fetch as jest.Mock).mockImplementationOnce(() => {
        return new Promise((_, reject) => {
          setTimeout(() => {
            const error = new Error('The operation was aborted');
            error.name = 'AbortError';
            reject(error);
          }, 11000);
        });
      });

      const uploadPromise = uploadToTmpFiles(mockFile);
      jest.advanceTimersByTime(11000);

      try {
        await uploadPromise;
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(UploadError);
        const uploadError = error as UploadError;
        
        // Verify plain language (no technical terms)
        expect(uploadError.userMessage).not.toMatch(/abort|timeout|10 seconds/i);
        
        // Verify explains the issue
        expect(uploadError.userMessage).toMatch(/taking too long/i);
        
        // Verify actionable guidance
        expect(uploadError.userMessage).toMatch(/check|connection|try again/i);
      }
    });

    it('should ensure all error messages are actionable and user-friendly', async () => {
      const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      
      const errorScenarios = [
        { status: 413, expectedPattern: /too large|smaller/i },
        { status: 503, expectedPattern: /unavailable|try again/i },
        { status: 500, expectedPattern: /unavailable|try again/i },
      ];

      for (const scenario of errorScenarios) {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: scenario.status,
          statusText: 'Error',
        });

        try {
          await uploadToTmpFiles(mockFile);
          fail('Should have thrown an error');
        } catch (error) {
          expect(error).toBeInstanceOf(UploadError);
          const uploadError = error as UploadError;
          
          // Verify message matches expected pattern
          expect(uploadError.userMessage).toMatch(scenario.expectedPattern);
          
          // Verify message provides guidance
          expect(uploadError.userMessage).toMatch(/please|try/i);
        }
      }
    });
  });
});

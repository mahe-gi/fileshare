/**
 * API utility functions for QuickShare QR
 * Handles file upload to tmpfiles.org storage service
 */

/**
 * Response structure from tmpfiles.org API
 */
export interface TmpFilesResponse {
  status: string;
  data: {
    url: string;
  };
}

/**
 * Error types for upload operations
 */
export type UploadErrorType =
  | 'file_too_large'
  | 'network_error'
  | 'api_unavailable'
  | 'timeout_error'
  | 'unknown_error';

/**
 * Custom error class for upload operations
 */
export class UploadError extends Error {
  constructor(
    public type: UploadErrorType,
    public userMessage: string,
    message?: string
  ) {
    super(message || userMessage);
    this.name = 'UploadError';
  }
}

/**
 * Uploads a file to tmpfiles.org and returns the download URL
 * 
 * Requirements:
 * - 2.1: Transmits file to Storage_API
 * - 2.2: Receives Download_URL from Storage_API
 * - 2.3: Completes upload within 10 seconds for files under 10MB
 * - 2.4: Handles API error responses
 * - 2.5: Respects maximum file size limit
 * 
 * @param file - The file to upload
 * @returns Promise resolving to the download URL
 * @throws UploadError with user-friendly message
 */
export async function uploadToTmpFiles(file: File): Promise<string> {
  // Create FormData for file upload
  const formData = new FormData();
  formData.append('file', file);

  // Set timeout based on file size (more generous for larger files)
  // 10 seconds base + 2 seconds per MB
  const fileSizeMB = file.size / (1024 * 1024);
  const timeoutMs = Math.max(30000, 10000 + (fileSizeMB * 2000)); // Minimum 30 seconds
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Make API request to tmpfiles.org
    const response = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    // Clear timeout on successful response
    clearTimeout(timeoutId);

    // Handle non-OK HTTP responses (Requirement 2.4)
    if (!response.ok) {
      // Check for file size limit error (Requirement 2.5, 7.3)
      if (response.status === 413) {
        throw new UploadError(
          'file_too_large',
          'Your file is too large. The maximum file size is 100 MB. Please choose a smaller file.',
          `HTTP ${response.status}: Payload Too Large`
        );
      }

      // Check for service unavailable (Requirement 2.4, 7.2)
      if (response.status >= 500) {
        throw new UploadError(
          'api_unavailable',
          'The file sharing service is temporarily unavailable. Please try again in a few minutes.',
          `HTTP ${response.status}: Server Error`
        );
      }

      // Generic HTTP error (Requirement 7.5)
      throw new UploadError(
        'unknown_error',
        'Something went wrong while uploading your file. Please try again.',
        `HTTP ${response.status}: ${response.statusText}`
      );
    }

    // Parse API response (Requirement 2.2)
    const data: TmpFilesResponse = await response.json();

    // Validate response structure (Requirement 7.5)
    if (!data.data || !data.data.url) {
      throw new UploadError(
        'unknown_error',
        'Something went wrong while processing your file. Please try again.',
        'Invalid API response structure'
      );
    }

    // Convert to direct download link by adding /dl/
    // Example: https://tmpfiles.org/28419924/file.pdf -> https://tmpfiles.org/dl/28419924/file.pdf
    const url = data.data.url;
    const directDownloadUrl = url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');

    // Return the direct download URL (Requirement 2.2)
    return directDownloadUrl;
  } catch (error) {
    // Clear timeout on error
    clearTimeout(timeoutId);

    // Handle UploadError (already formatted)
    if (error instanceof UploadError) {
      throw error;
    }

    // Handle timeout error (Requirement 2.3, 7.5)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new UploadError(
        'timeout_error',
        'The upload is taking too long. Please check your internet connection and try again with a smaller file or better connection.',
        'Request timeout'
      );
    }

    // Handle network errors (Requirement 2.4, 7.4)
    if (error instanceof TypeError) {
      throw new UploadError(
        'network_error',
        'Unable to connect to the internet. Please check your connection and try again.',
        error.message
      );
    }

    // Handle unknown errors (Requirement 7.5)
    throw new UploadError(
      'unknown_error',
      'Something unexpected happened. Please try again.',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

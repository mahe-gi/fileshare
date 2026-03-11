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
 * Upload progress callback type
 */
export type ProgressCallback = (progress: number) => void;

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
 * Maximum file size in bytes (100 MB)
 */
export const MAX_FILE_SIZE = 100 * 1024 * 1024;

/**
 * Validates file size before upload
 */
export function validateFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

/**
 * Checks if user is online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Uploads a file with retry logic and progress tracking
 */
async function uploadWithRetry(
  file: File,
  onProgress?: ProgressCallback,
  retryCount = 0,
  maxRetries = 3
): Promise<string> {
  try {
    return await uploadToTmpFilesInternal(file, onProgress);
  } catch (error) {
    // Don't retry for file size errors or if max retries reached
    if (error instanceof UploadError && error.type === 'file_too_large') {
      throw error;
    }
    
    if (retryCount < maxRetries) {
      // Wait before retry (exponential backoff: 1s, 2s, 4s)
      const delay = Math.pow(2, retryCount) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry
      return uploadWithRetry(file, onProgress, retryCount + 1, maxRetries);
    }
    
    throw error;
  }
}

/**
 * Internal upload function with progress tracking
 */
async function uploadToTmpFilesInternal(
  file: File,
  onProgress?: ProgressCallback
): Promise<string> {
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
    // Simulate progress for better UX (since tmpfiles.org doesn't support real progress)
    let progressInterval: NodeJS.Timeout | null = null;
    if (onProgress) {
      let currentProgress = 0;
      progressInterval = setInterval(() => {
        if (currentProgress < 90) {
          currentProgress += Math.random() * 10;
          onProgress(Math.min(currentProgress, 90));
        }
      }, 300);
    }

    // Make API request to tmpfiles.org
    const response = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    // Clear progress interval
    if (progressInterval) {
      clearInterval(progressInterval);
      if (onProgress) onProgress(95);
    }

    // Clear timeout on successful response
    clearTimeout(timeoutId);

    // Handle non-OK HTTP responses
    if (!response.ok) {
      // Check for file size limit error
      if (response.status === 413) {
        throw new UploadError(
          'file_too_large',
          'Your file is too large. The maximum file size is 100 MB. Please choose a smaller file.',
          `HTTP ${response.status}: Payload Too Large`
        );
      }

      // Check for service unavailable
      if (response.status >= 500) {
        throw new UploadError(
          'api_unavailable',
          'The file sharing service is temporarily unavailable. Please try again in a few minutes.',
          `HTTP ${response.status}: Server Error`
        );
      }

      // Generic HTTP error
      throw new UploadError(
        'unknown_error',
        'Something went wrong while uploading your file. Please try again.',
        `HTTP ${response.status}: ${response.statusText}`
      );
    }

    // Parse API response
    const data: TmpFilesResponse = await response.json();

    // Validate response structure
    if (!data.data || !data.data.url) {
      throw new UploadError(
        'unknown_error',
        'Something went wrong while processing your file. Please try again.',
        'Invalid API response structure'
      );
    }

    // Convert to direct download link by adding /dl/ and ensure HTTPS
    const url = data.data.url;
    let directDownloadUrl = url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
    
    // Ensure HTTPS protocol
    if (directDownloadUrl.startsWith('http://')) {
      directDownloadUrl = directDownloadUrl.replace('http://', 'https://');
    } else if (!directDownloadUrl.startsWith('https://')) {
      directDownloadUrl = 'https://' + directDownloadUrl.replace(/^\/+/, '');
    }

    // Complete progress
    if (onProgress) onProgress(100);

    // Return the direct download URL
    return directDownloadUrl;
  } catch (error) {
    // Clear timeout on error
    clearTimeout(timeoutId);

    // Handle UploadError (already formatted)
    if (error instanceof UploadError) {
      throw error;
    }

    // Handle timeout error
    if (error instanceof Error && error.name === 'AbortError') {
      throw new UploadError(
        'timeout_error',
        'The upload is taking too long. Please check your internet connection and try again with a smaller file or better connection.',
        'Request timeout'
      );
    }

    // Handle network errors
    if (error instanceof TypeError) {
      throw new UploadError(
        'network_error',
        'Unable to connect to the internet. Please check your connection and try again.',
        error.message
      );
    }

    // Handle unknown errors
    throw new UploadError(
      'unknown_error',
      'Something unexpected happened. Please try again.',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

/**
 * Main upload function with all reliability features
 * 
 * @param file - The file to upload
 * @param onProgress - Optional callback for progress updates (0-100)
 * @returns Promise resolving to the download URL
 * @throws UploadError with user-friendly message
 */
export async function uploadToTmpFiles(
  file: File,
  onProgress?: ProgressCallback
): Promise<string> {
  // Check if online
  if (!isOnline()) {
    throw new UploadError(
      'network_error',
      'No internet connection. Please check your connection and try again.',
      'Navigator offline'
    );
  }

  // Validate file size
  if (!validateFileSize(file)) {
    throw new UploadError(
      'file_too_large',
      `Your file is too large (${(file.size / (1024 * 1024)).toFixed(2)} MB). The maximum file size is 100 MB.`,
      'File size exceeds limit'
    );
  }

  // Upload with retry logic
  return uploadWithRetry(file, onProgress);
}

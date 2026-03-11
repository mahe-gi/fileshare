'use client';

import { useState, useEffect } from 'react';
import ResultsDisplay from './ResultsDisplay';

interface FileData {
  fileName: string;
  downloadUrl: string;
  fileSize: number;
}

interface MultipleFilesShareProps {
  files: FileData[];
}

export default function MultipleFilesShare({ files }: MultipleFilesShareProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function createShare() {
      try {
        setLoading(true);
        
        // Create gist via API
        const response = await fetch('/api/share', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ files }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('API error:', data);
          throw new Error(data.details || 'Failed to create share link');
        }

        const url = `${window.location.origin}/share/${data.id}`;
        setShareUrl(url);
        setLoading(false);
      } catch (err) {
        console.error('Share creation error:', err);
        setError(err instanceof Error ? err.message : 'Failed to create share link');
        setLoading(false);
      }
    }

    createShare();
  }, [files]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Creating share link...</p>
      </div>
    );
  }

  if (error || !shareUrl) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-600 mb-4">{error || 'Failed to create share link'}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Files preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Files included ({files.length})
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="flex-1 truncate text-sm text-gray-700">{file.fileName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Single QR code for all files */}
      <ResultsDisplay
        downloadUrl={shareUrl}
        fileName={`${files.length} Files Package`}
        isMultiple={false}
      />
    </div>
  );
}

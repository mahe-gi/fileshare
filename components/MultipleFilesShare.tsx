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

        if (!response.ok) {
          throw new Error('Failed to create share link');
        }

        const data = await response.json();
        const url = `${window.location.origin}/share/${data.id}`;
        setShareUrl(url);
        setLoading(false);
      } catch (err) {
        setError('Failed to create share link');
        setLoading(false);
      }
    }

    createShare();
  }, [files]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-gray-300 mx-auto mb-4"></div>
        <p className="text-gray-400">Creating share link...</p>
      </div>
    );
  }

  if (error || !shareUrl) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-gray-400 mb-4">{error || 'Failed to create share link'}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Files preview */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 mb-6 animate-fade-in">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Files included ({files.length}):</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-gray-400 bg-gray-900 p-2 rounded">
              <span>📄</span>
              <span className="flex-1 truncate">{file.fileName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Single QR code for all files */}
      <ResultsDisplay
        downloadUrl={shareUrl}
        fileName={`${files.length} Files - Scan to View All`}
        isMultiple={false}
      />
    </div>
  );
}

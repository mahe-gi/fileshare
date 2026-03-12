'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  brandImage?: string; // Optional brand logo URL
}

/**
 * Initial loading screen
 * Displays for 2 seconds before showing main application
 */
export default function LoadingScreen({ onLoadingComplete, brandImage }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 30);

    // Complete loading after 2 seconds
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Content */}
      <div className="text-center px-6 max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        </div>

        {/* Brand name */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          QRFlowX
        </h1>
        
        <p className="text-gray-600 mb-8">
          Loading...
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

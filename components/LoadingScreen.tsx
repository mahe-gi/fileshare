'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

/**
 * Initial loading screen with thank you message for Manoj sir
 * Displays for 3 seconds before showing main application
 */
export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Complete loading after 3 seconds
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Icon */}
        <div className="mb-8 animate-bounce">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/30 shadow-2xl">
            <span className="text-5xl">🎓</span>
          </div>
        </div>

        {/* Main message */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
          Thank You
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/90 mb-6 animate-fade-in delay-200">
          Manoj Sir
        </h2>
        
        <p className="text-xl sm:text-2xl text-white/80 mb-8 animate-fade-in delay-300">
          For Your Invaluable Mentorship & Guidance
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in delay-400">
          <div className="h-px w-16 bg-white/40"></div>
          <span className="text-white/60 text-2xl">✨</span>
          <div className="h-px w-16 bg-white/40"></div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto animate-fade-in delay-500">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-white to-yellow-200 transition-all duration-300 ease-out rounded-full shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white/70 text-sm mt-3">Loading your file sharing platform...</p>
        </div>
      </div>
    </div>
  );
}

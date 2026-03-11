'use client';

import { useState, useEffect } from 'react';

/**
 * Footer component with dedication message
 */
export default function Footer() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <footer 
      className={`fixed bottom-0 left-0 right-0 py-4 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-sm z-40 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="text-center px-4">
        <p className="text-sm text-gray-300">
          Built with 💜 and gratitude by{' '}
          <span className="font-semibold text-gray-200">Mahesh</span>
          {' '}for{' '}
          <span className="font-semibold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            Manoj Sir
          </span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Thank you for your guidance and mentorship
        </p>
      </div>
    </footer>
  );
}

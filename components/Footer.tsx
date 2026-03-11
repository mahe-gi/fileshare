'use client';

/**
 * Footer component with dedication message
 */
export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm">
      <div className="text-center px-4">
        <p className="text-sm text-gray-600">
          Built with 💜 and gratitude for{' '}
          <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Manoj Sir
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Thank you for your guidance and mentorship
        </p>
      </div>
    </footer>
  );
}

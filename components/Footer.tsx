/**
 * Footer component
 */
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16 py-8">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} FileShare. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Files are automatically deleted after 60 minutes
        </p>
      </div>
    </footer>
  );
}

'use client';

/**
 * Warning banner component to inform users about 60-minute QR code validity
 * Displays prominently to ensure users are aware of the time limitation
 */
export default function QRWarningBanner() {
  return (
    <div className="w-full max-w-2xl mx-auto mb-6 animate-fade-in">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-start gap-3">
          {/* Warning icon */}
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-md animate-pulse">
              <span className="text-2xl sm:text-3xl">⏰</span>
            </div>
          </div>
          
          {/* Warning content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-amber-900 text-base sm:text-lg mb-1.5 flex items-center gap-2">
              <span>Important: Time-Limited Access</span>
            </h3>
            <p className="text-amber-800 text-sm sm:text-base leading-relaxed mb-2">
              This QR code and download link are <span className="font-semibold">valid for 60 minutes only</span>. 
              Please share and download within this time frame.
            </p>
            <div className="flex items-center gap-2 text-amber-700 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5 bg-amber-100 px-2.5 py-1 rounded-full font-medium">
                <span>⚡</span>
                <span>Quick Action Required</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

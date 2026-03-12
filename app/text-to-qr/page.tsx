'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QRCode from 'qrcode';

export default function TextToQRPage() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    try {
      const url = await QRCode.toDataURL(text, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeUrl;
    link.click();
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Text to QR Code
            </h1>
            <p className="text-xl text-gray-600">
              Convert any text, URL, or message into a QR code
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Enter your text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text, URL, phone number, or any message..."
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
            />
            <button
              onClick={generateQRCode}
              disabled={!text.trim() || isGenerating}
              className="mt-4 w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate QR Code'}
            </button>
          </div>

          {qrCodeUrl && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Your QR Code</h3>
              <div className="inline-block p-6 bg-white rounded-xl border-2 border-gray-200 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrCodeUrl} alt="Generated QR Code" className="w-64 h-64" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={downloadQRCode}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download QR Code
                </button>
                <button
                  onClick={() => {
                    setText('');
                    setQrCodeUrl('');
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Create Another
                </button>
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-2">URLs & Links</h3>
              <p className="text-sm text-gray-600">Convert website URLs into scannable QR codes for easy sharing</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <h3 className="font-semibold text-gray-900 mb-2">Contact Info</h3>
              <p className="text-sm text-gray-600">Share phone numbers, emails, or addresses via QR code</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-2">Messages</h3>
              <p className="text-sm text-gray-600">Encode any text message into a QR code format</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

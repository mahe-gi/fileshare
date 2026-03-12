'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    window.location.href = '/app';
  };

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FileShare',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Share files instantly with QR codes. Free, secure, and fast file sharing. No sign-up required.',
    url: 'https://fileshare.vercel.app',
    screenshot: 'https://fileshare.vercel.app/og-image.png',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    featureList: [
      'Instant file upload',
      'QR code generation',
      'Secure file sharing',
      'No registration required',
      'Auto-delete after 60 minutes',
      'Support for PDF, DOCX, and images',
    ],
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FileShare',
    url: 'https://fileshare.vercel.app',
    logo: 'https://fileshare.vercel.app/logo.png',
    description: 'Free and secure file sharing platform with QR code generation',
    sameAs: [
      'https://twitter.com/fileshare',
      'https://github.com/mahe-gi/fileshare',
    ],
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://fileshare.vercel.app',
      },
    ],
  };

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is FileShare really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, FileShare is completely free to use. There are no hidden fees, no subscription plans, and no limits on the number of files you can share.',
        },
      },
      {
        '@type': 'Question',
        name: 'How secure is my file?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your files are encrypted during upload and automatically deleted after 60 minutes. We don\'t store files permanently, track your activity, or share your data with third parties.',
        },
      },
      {
        '@type': 'Question',
        name: 'What file types are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FileShare supports PDF, DOCX (Word documents), PNG, JPG, JPEG, and GIF files. Each file can be up to 100MB in size.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long are files available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Files are available for 60 minutes after upload. After this time, they are automatically and permanently deleted from our servers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No account required! Simply visit FileShare, upload your files, and get your QR code instantly. No registration, no email verification, no passwords to remember.',
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">FileShare</span>
            </div>
            <button
              onClick={handleGetStarted}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              aria-label="Get started with file sharing"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Free File Sharing with QR Codes - Instant & Secure
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Upload and share files instantly with QR codes. No sign-up, no fees, no limits. Share PDF, DOCX, images up to 100MB. Files automatically delete after 60 minutes for your privacy.
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
              aria-label="Start sharing files now"
            >
              Start Sharing Files Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Best Free File Sharing Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fast, secure, and easy file sharing for everyone. No registration required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <article className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure File Sharing</h3>
              <p className="text-gray-600 leading-relaxed">
                Your files are encrypted and automatically deleted after 60 minutes. No permanent storage, no tracking, complete privacy.
              </p>
            </article>

            {/* Feature 2 */}
            <article className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant File Upload</h3>
              <p className="text-gray-600 leading-relaxed">
                Lightning fast upload and QR code generation. Share files in seconds, not minutes. Optimized for speed and reliability.
              </p>
            </article>

            {/* Feature 3 */}
            <article className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">QR Code File Transfer</h3>
              <p className="text-gray-600 leading-relaxed">
                Scan and download on any device. Perfect for quick transfers between phone and computer. Works on iOS and Android.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How to Share Files with QR Codes
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to share your files securely
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <article className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Files</h3>
              <p className="text-gray-600">
                Drag and drop or click to select files. Supports PDF, DOCX, PNG, JPG, and GIF formats up to 100MB per file.
              </p>
            </article>

            {/* Step 2 */}
            <article className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate QR Code</h3>
              <p className="text-gray-600">
                Instantly receive a unique QR code and shareable link for your uploaded files. No waiting, no delays.
              </p>
            </article>

            {/* Step 3 */}
            <article className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Share & Download</h3>
              <p className="text-gray-600">
                Share the QR code or link via email, messaging, or social media. Recipients can download files instantly on any device.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Start Sharing Files for Free Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            No registration, no fees, no limits. Upload and share files instantly with QR codes.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg shadow-lg"
            aria-label="Get started with free file sharing"
          >
            Get Started Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about FileShare
            </p>
          </div>

          <div className="space-y-8">
            <article className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is FileShare really free?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, FileShare is completely free to use. There are no hidden fees, no subscription plans, and no limits on the number of files you can share. We believe file sharing should be accessible to everyone.
              </p>
            </article>

            <article className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How secure is my file?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your files are encrypted during upload and automatically deleted after 60 minutes. We don't store files permanently, track your activity, or share your data with third parties. Your privacy is our priority.
              </p>
            </article>

            <article className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What file types are supported?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                FileShare supports PDF, DOCX (Word documents), PNG, JPG, JPEG, and GIF files. Each file can be up to 100MB in size. You can upload multiple files at once.
              </p>
            </article>

            <article className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How long are files available?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Files are available for 60 minutes after upload. After this time, they are automatically and permanently deleted from our servers. This ensures your privacy and keeps our service fast and efficient.
              </p>
            </article>

            <article className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do I need to create an account?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No account required! Simply visit FileShare, upload your files, and get your QR code instantly. No registration, no email verification, no passwords to remember.
              </p>
            </article>

            <article className="pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I share files with people who don't have smartphones?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! While QR codes are convenient for mobile devices, every upload also generates a regular web link that can be shared via email, messaging apps, or copied and pasted anywhere. Recipients can access files from any device with a web browser.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
    </>
  );
}

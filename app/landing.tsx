'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function LandingPage() {
  const handleGetStarted = () => {
    window.location.href = '/app';
  };

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'QRFlowX',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Share files instantly with QR codes. Free, secure, and fast file sharing. No sign-up required.',
    url: 'https://qrflowx.vercel.app',
    screenshot: 'https://qrflowx.vercel.app/og-image.png',
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
    name: 'QRFlowX',
    url: 'https://qrflowx.vercel.app',
    logo: 'https://qrflowx.vercel.app/logo.png',
    description: 'Free and secure file sharing platform with QR code generation',
    sameAs: [
      'https://twitter.com/qrflowx',
      'https://github.com/qrflowx',
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
        item: 'https://qrflowx.vercel.app',
      },
    ],
  };

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is QRFlowX really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, QRFlowX is completely free to use. There are no hidden fees, no subscription plans, and no limits on the number of files you can share.',
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
          text: 'QRFlowX supports PDF, DOCX (Word documents), PNG, JPG, JPEG, and GIF files. Each file can be up to 100MB in size.',
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
          text: 'No account required! Simply visit QRFlowX, upload your files, and get your QR code instantly. No registration, no email verification, no passwords to remember.',
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

      {/* Navbar */}
      <Navbar />

      <main className="min-h-screen bg-white pt-16">

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Trusted by thousands of users worldwide
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Share Files Instantly.<br />
              <span className="text-blue-600">No Hassle.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 leading-relaxed">
              The fastest way to share files with anyone, anywhere. Upload, generate QR code, and share in seconds. No sign-up, no waiting, no complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                aria-label="Start sharing files now"
              >
                Start Sharing Free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg border-2 border-gray-200"
              >
                See How It Works
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ✓ No credit card required  ✓ No sign-up  ✓ 100% Free forever
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
                About QRFlowX
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                What is QRFlowX?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                QRFlowX is a free, secure file sharing platform that makes it incredibly easy to share files with anyone, anywhere. Upload your file, get an instant QR code, and share it in seconds.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                No registration required. No email verification. No complex settings. Just upload, scan, and download. It&apos;s that simple.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Privacy First</h3>
                    <p className="text-gray-600">Files automatically delete after 60 minutes. No permanent storage, no tracking.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Universal Access</h3>
                    <p className="text-gray-600">Works on any device with a camera or web browser. iOS, Android, Windows, Mac.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Always Free</h3>
                    <p className="text-gray-600">No hidden costs, no premium tiers. Full features available to everyone, forever.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-2">100MB</div>
                    <div className="text-sm text-gray-600">Max file size</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-3xl font-bold text-green-600 mb-2">60min</div>
                    <div className="text-sm text-gray-600">File lifetime</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-3xl font-bold text-purple-600 mb-2">0$</div>
                    <div className="text-sm text-gray-600">Always free</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-3xl font-bold text-orange-600 mb-2">6</div>
                    <div className="text-sm text-gray-600">File types</div>
                  </div>
                </div>
                <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h3 className="font-semibold text-gray-900">Secure & Encrypted</h3>
                  </div>
                  <p className="text-sm text-gray-600">All uploads use HTTPS encryption. Your files are protected during transfer and storage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose QRFlowX */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Customers Choose QRFlowX
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for speed, security, and simplicity. QRFlowX solves real problems for real people.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Problem/Solution Card 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">The Problem</h3>
                  <p className="text-gray-600">Email attachments are slow, have size limits, and require knowing someone&apos;s email address. Cloud storage requires accounts and complex sharing settings.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pt-4 border-t-2 border-blue-200">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Our Solution</h3>
                  <p className="text-gray-600">Upload any file up to 100MB, get an instant QR code, and share with anyone in seconds. No email, no account, no complexity.</p>
                </div>
              </div>
            </div>

            {/* Problem/Solution Card 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">The Problem</h3>
                  <p className="text-gray-600">Privacy concerns with permanent cloud storage. Files stay online forever, accessible to anyone with the link, creating security risks.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pt-4 border-t-2 border-purple-200">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Our Solution</h3>
                  <p className="text-gray-600">Files automatically delete after 60 minutes. No permanent storage, no tracking, complete privacy. Your data, your control.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features, Zero Complexity
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for fast, secure file sharing. Nothing you don&apos;t.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <article className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast Upload</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Optimized upload speeds with automatic retry logic. Most files upload in under 5 seconds. No waiting, no frustration.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Instant QR code generation
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real-time progress tracking
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Automatic error recovery
                </li>
              </ul>
            </article>

            {/* Feature 2 */}
            <article className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bank-Level Security</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your files are encrypted during transfer and storage. We use industry-standard security protocols to protect your data.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  HTTPS encryption
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Auto-delete after 60 minutes
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No permanent storage
                </li>
              </ul>
            </article>

            {/* Feature 3 */}
            <article className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">QR Code Magic</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Share files between devices instantly. Scan the QR code with any smartphone and download immediately. No typing, no hassle.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Works on iOS & Android
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Download QR as image
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Share via link or QR
                </li>
              </ul>
            </article>

            {/* Feature 4 */}
            <article className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multiple File Types</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Support for all common file formats. Share documents, images, and more without conversion or compatibility issues.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  PDF & DOCX documents
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  PNG, JPG, GIF images
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Up to 100MB per file
                </li>
              </ul>
            </article>

            {/* Feature 5 */}
            <article className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Account Required</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Start sharing immediately. No registration, no email verification, no passwords. Just upload and share.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Zero friction onboarding
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No personal data collected
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Anonymous file sharing
                </li>
              </ul>
            </article>

            {/* Feature 6 */}
            <article className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">99.9% Reliability</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Built on enterprise-grade infrastructure. Automatic failover, redundancy, and monitoring ensure your files are always accessible.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Global CDN delivery
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24/7 uptime monitoring
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Automatic error recovery
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Perfect For Every Situation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From personal use to professional workflows, QRFlowX adapts to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Business Professionals</h3>
                  <p className="text-gray-600 text-sm">Share presentations, contracts, and documents with clients instantly. No email size limits, no waiting for uploads.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Students & Educators</h3>
                  <p className="text-gray-600 text-sm">Share assignments, study materials, and resources. Perfect for group projects and classroom collaboration.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Photographers & Designers</h3>
                  <p className="text-gray-600 text-sm">Send high-resolution images and design files to clients. No compression, no quality loss, instant delivery.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl border border-orange-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Event Organizers</h3>
                  <p className="text-gray-600 text-sm">Share event materials, schedules, and resources with attendees. Generate QR codes for easy access at venues.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl border border-pink-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Personal Use</h3>
                  <p className="text-gray-600 text-sm">Transfer files between your devices, share photos with family, or send documents to friends. Simple and secure.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Developers & IT</h3>
                  <p className="text-gray-600 text-sm">Share configuration files, logs, and documentation. Quick file transfers during troubleshooting and collaboration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Three Steps to Share Anything
            </h2>
            <p className="text-xl text-gray-600">
              So simple, anyone can do it. No technical knowledge required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <article className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto shadow-lg">
                  1
                </div>
                <div className="absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent hidden md:block"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Upload Your File</h3>
              <p className="text-gray-600 leading-relaxed">
                Drag and drop or click to select. Supports PDF, DOCX, PNG, JPG, and GIF up to 100MB. Upload starts instantly.
              </p>
            </article>

            {/* Step 2 */}
            <article className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto shadow-lg">
                  2
                </div>
                <div className="absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent hidden md:block"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get QR Code</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive your unique QR code and shareable link immediately. Download the QR code or copy the link to share.
              </p>
            </article>

            {/* Step 3 */}
            <article className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Share Anywhere</h3>
              <p className="text-gray-600 leading-relaxed">
                Share via QR code, link, email, or messaging. Recipients download instantly on any device. Files expire in 60 minutes.
              </p>
            </article>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Try It Now - It&apos;s Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* All Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              All Our Free Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A complete suite of QR code and file sharing tools, all free to use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* File to QR */}
            <a
              href="/app"
              className="group bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">File to QR Code</h3>
              <p className="text-gray-600 mb-4">Upload files and generate QR codes for instant sharing. Supports PDF, DOCX, images up to 100MB.</p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                Try it now
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>

            {/* QR Scanner */}
            <a
              href="/scanner"
              className="group bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">QR Code Scanner</h3>
              <p className="text-gray-600 mb-4">Upload an image containing a QR code to decode and read its contents instantly.</p>
              <div className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
                Scan QR code
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>

            {/* Text to QR */}
            <a
              href="/text-to-qr"
              className="group bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Text to QR Code</h3>
              <p className="text-gray-600 mb-4">Convert any text, URL, phone number, or message into a scannable QR code.</p>
              <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                Generate QR
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>

            {/* URL Shortener */}
            <a
              href="/url-shortener"
              className="group bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border-2 border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">URL Shortener</h3>
              <p className="text-gray-600 mb-4">Create short, memorable links that are easy to share on social media and messaging apps.</p>
              <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                Shorten URL
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>

            {/* vCard Generator */}
            <a
              href="/vcard-generator"
              className="group bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">vCard Generator</h3>
              <p className="text-gray-600 mb-4">Create digital business cards with QR codes. Share contact info that saves directly to phones.</p>
              <div className="flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
                Create vCard
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>

            {/* Coming Soon Placeholder */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-200">
              <div className="w-14 h-14 bg-gray-300 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">More Coming Soon</h3>
              <p className="text-gray-600 mb-4">We&apos;re constantly adding new tools and features. Stay tuned for updates!</p>
              <div className="flex items-center text-gray-500 font-semibold">
                Coming soon
              </div>
            </div>
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
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about QRFlowX
            </p>
          </div>

          <div className="space-y-8">
            <article className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is QRFlowX really free?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, QRFlowX is completely free to use. There are no hidden fees, no subscription plans, and no limits on the number of files you can share. We believe file sharing should be accessible to everyone.
              </p>
            </article>

            <article className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How secure is my file?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your files are encrypted during upload and automatically deleted after 60 minutes. We don&apos;t store files permanently, track your activity, or share your data with third parties. Your privacy is our priority.
              </p>
            </article>

            <article className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What file types are supported?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                QRFlowX supports PDF, DOCX (Word documents), PNG, JPG, JPEG, and GIF files. Each file can be up to 100MB in size. You can upload multiple files at once.
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
                No account required! Simply visit QRFlowX, upload your files, and get your QR code instantly. No registration, no email verification, no passwords to remember.
              </p>
            </article>

            <article className="pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I share files with people who don&apos;t have smartphones?
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

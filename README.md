# QRFlowX - Flow Your Files Through QR

A comprehensive, professional web application suite featuring file sharing, QR code generation, URL shortening, and digital business cards. Simple, secure, and completely free.

## 🚀 All Features

### Core Services
- 📤 **File to QR Code** - Upload files and generate QR codes for instant sharing
- 📱 **QR Code Scanner** - Decode QR codes from uploaded images
- 📝 **Text to QR Code** - Convert any text, URL, or message into a QR code
- 🔗 **URL Shortener** - Create short, memorable links for easy sharing
- 👤 **vCard Generator** - Create digital business cards with QR codes

### Key Features
- 🎯 **Professional Landing Page** - Complete marketing site with all sections
- 💾 **Multiple File Upload** - Upload and share multiple files at once
- 🔒 **Secure & Private** - Files auto-delete after 60 minutes, no tracking
- ⚡ **Fast & Reliable** - Optimized with retry logic and error handling
- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🔍 **SEO Optimized** - Complete meta tags, structured data, sitemap

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **QR Codes**: qrcode, qrcode.react
- **File Upload**: react-dropzone
- **Storage**: tmpfiles.org API
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/qrflowx.git
cd qrflowx

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/qrflowx)

## Project Structure

```
qrflowx/
├── app/
│   ├── page.tsx                 # Landing page route
│   ├── landing.tsx              # Landing page component
│   ├── layout.tsx               # Root layout with SEO
│   ├── app/
│   │   └── page.tsx             # File upload application
│   ├── scanner/
│   │   └── page.tsx             # QR code scanner
│   ├── text-to-qr/
│   │   └── page.tsx             # Text to QR converter
│   ├── url-shortener/
│   │   └── page.tsx             # URL shortening tool
│   ├── vcard-generator/
│   │   └── page.tsx             # vCard generator
│   ├── share/
│   │   └── [id]/
│   │       └── page.tsx         # Shared files view
│   └── api/
│       └── share/
│           └── route.ts         # Share link API
├── components/
│   ├── Navbar.tsx               # Navigation with dropdown
│   ├── Footer.tsx               # Comprehensive footer
│   ├── UploadZone.tsx           # File upload interface
│   ├── QRCodeDisplay.tsx        # QR code generator
│   ├── ResultsDisplay.tsx       # Upload results
│   ├── ShareActions.tsx         # Share actions
│   ├── MultipleFilesShare.tsx   # Multiple files handler
│   └── LoadingScreen.tsx        # Loading animation
├── lib/
│   └── api.ts                   # API utilities
├── public/
│   ├── logo.svg                 # QRFlowX logo
│   └── site.webmanifest         # PWA manifest
├── FEATURES.md                  # Complete feature documentation
└── package.json
```

## All Routes

- `/` - Landing page with all sections
- `/app` - File upload application
- `/scanner` - QR code scanner
- `/text-to-qr` - Text to QR code converter
- `/url-shortener` - URL shortening tool
- `/vcard-generator` - Digital business card creator
- `/share/[id]` - View and download shared files

## Supported File Types

- PDF (.pdf)
- Word Documents (.docx)
- Images (.png, .jpg, .jpeg, .gif)

Maximum file size: 100MB per file

## Landing Page Sections

1. **Hero** - Clear value proposition with dual CTAs
2. **About** - What is QRFlowX with key stats
3. **Why Choose** - Problem/solution cards
4. **Features** - 6 detailed feature cards
5. **Use Cases** - 6 real-world scenarios
6. **How It Works** - 3-step process
7. **All Services** - Interactive service showcase
8. **FAQ** - 6 common questions with answers

## SEO Features

- Complete meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card support
- Structured data (JSON-LD):
  - WebApplication schema
  - Organization schema
  - FAQ schema
  - Breadcrumb schema
- Dynamic sitemap.xml
- Robots.txt configuration
- Canonical URLs
- PWA manifest

## Security & Privacy

- HTTPS encryption for all transfers
- Temporary file storage (60-minute expiration)
- No user tracking or analytics
- No permanent data storage
- Privacy-first architecture
- No registration required

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome, Samsung Internet)

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For detailed feature documentation, see [FEATURES.md](FEATURES.md)

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

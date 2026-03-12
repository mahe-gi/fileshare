# FileShare - Instant File Sharing with QR Codes

A professional, modern web application that enables users to quickly share files via QR codes. Simple, secure, and no sign-up required.

## Features

- 🎯 **Landing Page** - Professional marketing page showcasing the application
- 📤 **File Upload** - Drag-and-drop or click-to-browse interface
- 📱 **QR Code Generation** - Instant QR codes for easy mobile sharing
- 🔗 **Shareable Links** - Copy and share download links
- 💾 **Download QR Codes** - Save QR codes as PNG images
- 🔒 **Secure & Private** - Files auto-delete after 60 minutes
- ⚡ **Fast & Reliable** - Optimized upload with retry logic
- 🎨 **Professional UI** - Clean, modern design with consistent branding

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **File Upload**: react-dropzone
- **QR Generation**: qrcode.react
- **Storage**: tmpfiles.org API
- **Share Links**: dpaste.com API

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Deployment

This application is designed to be deployed on Vercel's free tier without any configuration changes.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mahe-gi/fileshare)

## Project Structure

```
.
├── app/
│   ├── page.tsx              # Landing page (marketing)
│   ├── landing.tsx           # Landing page component
│   ├── app/
│   │   └── page.tsx          # Upload application
│   ├── share/
│   │   └── [id]/
│   │       └── page.tsx      # Shared files view
│   ├── api/
│   │   └── share/
│   │       └── route.ts      # Share link API
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── UploadZone.tsx       # File upload interface
│   ├── QRCodeDisplay.tsx    # QR code generator
│   ├── ResultsDisplay.tsx   # Upload results
│   ├── ShareActions.tsx     # Share actions
│   ├── MultipleFilesShare.tsx # Multiple files handler
│   ├── LoadingScreen.tsx    # Loading animation
│   └── Footer.tsx           # Footer component
├── lib/
│   └── api.ts               # API utilities
├── public/                  # Static assets
└── package.json             # Dependencies
```

## Routes

- `/` - Landing page
- `/app` - File upload application
- `/share/[id]` - View and download shared files

## Supported File Types

- PDF (.pdf)
- Word Documents (.docx)
- Images (.png, .jpg, .jpeg, .gif)

Maximum file size: 100MB

## Features in Detail

### Landing Page
- Professional hero section
- Feature highlights
- How it works section
- Call-to-action sections

### Upload Application
- Drag-and-drop file upload
- Multiple file support
- Real-time upload progress
- Error handling with retry logic
- QR code generation
- Shareable links

### Shared Files Page
- Professional file listing
- File type icons
- Download buttons
- Expiration warnings
- Error handling

## License

MIT

# QuickShare QR

A minimal, single-page web application that enables users to quickly share files via QR codes.

## Features

- Upload files via drag-and-drop or click-to-browse
- Generate QR codes for instant file sharing
- Copy download links to clipboard
- Download QR codes as PNG images
- No authentication or backend required

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **File Upload**: react-dropzone
- **QR Generation**: qrcode.react
- **Storage**: tmpfiles.org API

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

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/quickshare-qr)

## Project Structure

```
.
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
├── public/              # Static assets
└── package.json         # Dependencies
```

## License

MIT

# Implementation Plan: QuickShare QR

## Overview

This plan implements a client-side Next.js application for instant file sharing via QR codes. The implementation follows a progressive approach: project setup, core components, API integration, error handling, and UI polish. All code will be TypeScript with minimal dependencies (Next.js, react-dropzone, qrcode.react).

## Tasks

- [x] 1. Initialize Next.js project and install dependencies
  - Create Next.js 14+ project with App Router and TypeScript
  - Install react-dropzone and qrcode.react libraries
  - Configure Tailwind CSS for styling
  - Set up project structure (components directory)
  - _Requirements: 8.1, 8.3, 8.4, 8.5_

- [ ] 2. Implement UploadZone component
  - [x] 2.1 Create UploadZone component with react-dropzone integration
    - Implement drag-and-drop file acceptance
    - Implement click-to-browse file selection
    - Add file type validation for supported types (PDF, DOCX, PNG, JPG, JPEG, GIF)
    - Display selected filename and file size
    - Add visual feedback for drag-over state
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 2.2 Write unit tests for UploadZone component
    - Test file type validation
    - Test drag-and-drop interactions
    - Test disabled state
    - _Requirements: 1.1, 1.2, 1.5_

- [ ] 3. Implement tmpfiles.org API integration
  - [x] 3.1 Create API utility function for file upload
    - Implement uploadToTmpFiles function with FormData
    - Handle API response parsing
    - Add timeout handling (10 seconds for files under 10MB)
    - Implement error response handling
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 3.2 Write unit tests for API utility
    - Test successful upload flow
    - Test error handling scenarios
    - Test timeout behavior
    - _Requirements: 2.1, 2.2, 2.4_

- [x] 4. Checkpoint - Verify upload functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement QRCodeDisplay component
  - [x] 5.1 Create QRCodeDisplay component with qrcode.react
    - Render QR code from download URL
    - Configure QR code size (256x256px)
    - Set error correction level to Medium
    - Add canvas ref for download functionality
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 5.2 Write unit tests for QRCodeDisplay component
    - Test QR code rendering
    - Test URL encoding
    - _Requirements: 3.1, 3.2, 3.3_

- [ ] 6. Implement ShareActions component
  - [x] 6.1 Create ShareActions component with copy and download buttons
    - Implement copy-to-clipboard functionality using Clipboard API
    - Display confirmation message after successful copy
    - Implement QR code download as PNG
    - Handle clipboard permissions gracefully
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6_
  
  - [x] 6.2 Write unit tests for ShareActions component
    - Test copy-to-clipboard functionality
    - Test download QR functionality
    - Test confirmation message display
    - _Requirements: 4.2, 4.3, 4.4, 4.6_

- [ ] 7. Implement ResultsDisplay component
  - [x] 7.1 Create ResultsDisplay container component
    - Display download URL as clickable link
    - Integrate QRCodeDisplay component
    - Integrate ShareActions component
    - Add visual hierarchy and spacing
    - _Requirements: 4.1, 5.3_
  
  - [x] 7.2 Write unit tests for ResultsDisplay component
    - Test component rendering with props
    - Test clickable URL link
    - _Requirements: 4.1, 5.3_

- [ ] 8. Implement main Page component with state management
  - [x] 8.1 Create app/page.tsx with application state
    - Define AppState interface (uploadStatus, downloadUrl, fileName, fileSize, errorMessage)
    - Implement handleFileSelected function with file validation
    - Implement uploadToTmpFiles integration
    - Implement handleUploadSuccess and handleUploadError
    - Conditionally render UploadZone or ResultsDisplay based on state
    - _Requirements: 2.1, 2.2, 2.4, 5.2, 5.3, 5.4_
  
  - [x] 8.2 Write integration tests for Page component
    - Test complete upload flow
    - Test state transitions
    - Test error handling
    - _Requirements: 2.1, 2.2, 2.4_

- [ ] 9. Implement error handling and user feedback
  - [x] 9.1 Add error handling for all failure scenarios
    - Unsupported file type error with supported types list
    - File size exceeded error with size limit
    - Network connection error message
    - API unavailable error message
    - Display all errors in plain, non-technical language
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [x] 9.2 Write unit tests for error handling
    - Test each error type display
    - Test error message formatting
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 10. Checkpoint - Verify error handling
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Add UI styling and polish
  - [x] 11.1 Style application with Tailwind CSS
    - Add header with "Upload File → Get QR → Share" text
    - Center UploadZone on page before upload
    - Style upload zone with clear visual states (idle, drag-over, disabled)
    - Style results display with clear visual hierarchy
    - Add responsive design for mobile devices
    - Ensure minimal, clean design aesthetic
    - _Requirements: 5.1, 5.2, 5.3, 5.5, 6.5_
  
  - [x] 11.2 Add loading states and transitions
    - Display loading indicator during file upload
    - Add smooth transitions between upload and results views
    - Add button hover and active states
    - _Requirements: 1.3, 2.3_

- [ ] 12. Final verification and deployment preparation
  - [x] 12.1 Verify all requirements are met
    - Test complete user flow from upload to share
    - Verify no authentication or registration required
    - Verify single-page layout with no navigation
    - Test on standard broadband connection for 3-second load time
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 5.4_
  
  - [x] 12.2 Prepare for Vercel deployment
    - Verify Next.js configuration for Vercel
    - Ensure no backend server dependencies
    - Ensure no database dependencies
    - Test build process locally
    - _Requirements: 8.5, 8.6, 8.7_

- [x] 13. Final checkpoint - Complete testing
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation is entirely client-side with no backend infrastructure
- tmpfiles.org API is the only external dependency for file storage
- Focus on minimal, working implementation before adding polish

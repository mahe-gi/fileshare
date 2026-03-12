#!/bin/bash

# QRFlowX - Verification Script
# This script verifies that everything is set up correctly

echo "🔍 QRFlowX - Verification Script"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check if node_modules exists
echo ""
echo "📁 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules directory exists"
else
    echo -e "${YELLOW}⚠${NC} node_modules not found. Run: npm install"
fi

# Check package.json
echo ""
echo "📄 Checking package.json..."
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json exists"
    
    # Check for qrcode dependency
    if grep -q '"qrcode"' package.json; then
        echo -e "${GREEN}✓${NC} qrcode dependency found"
    else
        echo -e "${RED}✗${NC} qrcode dependency missing"
    fi
    
    # Check for @types/qrcode
    if grep -q '"@types/qrcode"' package.json; then
        echo -e "${GREEN}✓${NC} @types/qrcode dependency found"
    else
        echo -e "${RED}✗${NC} @types/qrcode dependency missing"
    fi
else
    echo -e "${RED}✗${NC} package.json not found"
    exit 1
fi

# Check key files
echo ""
echo "📂 Checking project structure..."

FILES=(
    "app/page.tsx"
    "app/landing.tsx"
    "app/layout.tsx"
    "app/app/page.tsx"
    "app/scanner/page.tsx"
    "app/text-to-qr/page.tsx"
    "app/url-shortener/page.tsx"
    "app/vcard-generator/page.tsx"
    "components/Navbar.tsx"
    "components/Footer.tsx"
    "public/logo.svg"
    "public/favicon.svg"
    "public/site.webmanifest"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file missing"
    fi
done

# Check documentation
echo ""
echo "📚 Checking documentation..."

DOCS=(
    "README.md"
    "FEATURES.md"
    "INSTALLATION.md"
    "DEPLOYMENT.md"
    "CHECKLIST.md"
    "FINAL_SUMMARY.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓${NC} $doc"
    else
        echo -e "${YELLOW}⚠${NC} $doc missing"
    fi
done

# Check for TypeScript errors
echo ""
echo "🔧 Checking TypeScript..."
if command -v npx &> /dev/null; then
    if npx tsc --noEmit 2>&1 | grep -q "error TS"; then
        echo -e "${RED}✗${NC} TypeScript errors found"
        echo "Run: npx tsc --noEmit"
    else
        echo -e "${GREEN}✓${NC} No TypeScript errors"
    fi
else
    echo -e "${YELLOW}⚠${NC} Cannot check TypeScript (npx not available)"
fi

# Summary
echo ""
echo "=================================="
echo "✨ Verification Complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm install (if not done)"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "For deployment, see: DEPLOYMENT.md"
echo "=================================="

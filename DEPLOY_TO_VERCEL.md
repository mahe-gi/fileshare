# Deploy QuickShare QR to Vercel

## Quick Start (5 minutes)

### Prerequisites
- GitHub account
- Vercel account (free tier) - Sign up at [vercel.com](https://vercel.com)

### Deployment Steps

#### 1. Push to GitHub (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - QuickShare QR"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### 2. Deploy to Vercel

**Option A: Using Vercel Dashboard (Recommended)**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will automatically detect Next.js
5. Click "Deploy" (no configuration needed!)
6. Wait 1-2 minutes for deployment
7. Your app is live! 🎉

**Option B: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts (all defaults are correct)
```

#### 3. Verify Deployment
- Visit your deployment URL (e.g., `quickshare-qr.vercel.app`)
- Test file upload
- Verify QR code generation
- Test on mobile device

### Configuration

**No configuration needed!** ✅

The application is designed to work on Vercel free tier with zero configuration:
- No environment variables required
- No build settings to change
- No custom domains needed (optional)

### What Vercel Does Automatically

1. **Detects Next.js:** Automatically configures build settings
2. **Installs dependencies:** Runs `npm install`
3. **Builds project:** Runs `npm run build`
4. **Deploys:** Serves the static/SSG pages
5. **Provides URL:** Gives you a `.vercel.app` domain
6. **SSL/HTTPS:** Automatic SSL certificate
7. **CDN:** Global edge network for fast loading

### Free Tier Limits (More than enough!)

- ✅ 100 GB bandwidth/month
- ✅ 100 deployments/day
- ✅ Unlimited static sites
- ✅ Automatic SSL
- ✅ Global CDN

QuickShare QR uses:
- ~113 KB per page load
- No serverless functions
- No database
- Static pages only

**You can handle ~900,000 page loads per month on free tier!**

### Continuous Deployment

Once connected to GitHub, Vercel automatically:
- Deploys on every push to `main` branch
- Creates preview deployments for pull requests
- Runs build checks before deploying

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Vercel handles SSL automatically

### Troubleshooting

**Build fails?**
- Check build logs in Vercel dashboard
- Verify `npm run build` works locally
- Ensure all dependencies are in `package.json`

**App not working?**
- Check browser console for errors
- Verify tmpfiles.org API is accessible
- Test locally with `npm run build && npm start`

**Need help?**
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

### Monitoring

Vercel provides:
- Real-time logs
- Analytics (page views, performance)
- Error tracking
- Build history

Access these in your Vercel dashboard.

---

## That's it! 🚀

Your QuickShare QR app is now live and accessible worldwide.

Share your deployment URL and start sharing files via QR codes!

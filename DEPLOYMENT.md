# 🚀 Deployment Guide

## Yes, deploying will fix the MongoDB connection issue!

When you deploy to Vercel (or similar platforms), the server runs from their IP addresses which are easier to whitelist. Plus, you can use `0.0.0.0/0` to allow all IPs for development/testing.

---

## 📦 Deploy to Vercel (Recommended)

### Step 1: Prepare Your Code

1. **Make sure your code is committed:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Click "Add New Project"**

3. **Import your GitHub repository**

4. **Configure the project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Add Environment Variables:**
   
   Click "Environment Variables" and add all variables from your `.env.local`:
   
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tiny-legal?retryWrites=true&w=majority
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-secret-here
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   NODE_ENV=production
   
   # Optional - Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Stripe (if using)
   STRIPE_SECRET_KEY=sk_live_your_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   STRIPE_PRICE_ID_MONTHLY=price_your_monthly_price_id
   ```

6. **Click "Deploy"**

---

## 🔐 Fix MongoDB Atlas IP Whitelisting

### Option 1: Allow All IPs (Easiest for Development/Testing)

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click **"Network Access"** (or **"Security"** → **"Network Access"**)
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (this adds `0.0.0.0/0`)
5. Click **"Confirm"**
6. Wait 1-2 minutes for changes to propagate

⚠️ **Note:** `0.0.0.0/0` allows all IPs. For production, consider whitelisting specific IPs.

### Option 2: Whitelist Vercel IP Ranges (More Secure)

Vercel uses specific IP ranges. You can find them in Vercel's documentation, but for simplicity, Option 1 works fine for most cases.

---

## 🌱 Seed Production Database

After deployment, seed your production database:

```bash
# On your local machine, temporarily set production DB URL
MONGODB_URI=your_production_mongodb_uri npm run seed
```

Or create a simple API route to seed from the deployed app (remove after seeding for security).

---

## ✅ Verify Deployment

1. **Visit your deployed URL:** `https://your-app.vercel.app`

2. **Test the connection:**
   - The app should connect to MongoDB automatically
   - Try signing up/logging in
   - Generate a document

3. **Check Vercel logs:**
   - Go to your project in Vercel
   - Click "Deployments" → Select latest deployment → "Functions" tab
   - Check for any MongoDB connection errors

---

## 🔄 Update Environment Variables

To update environment variables after deployment:

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Environment Variables"**
3. Add/Edit variables
4. **Redeploy** (Vercel will auto-redeploy or click "Redeploy")

---

## 🐛 Troubleshooting

### MongoDB Still Not Connecting After Deployment

1. **Check MongoDB Atlas Network Access:**
   - Make sure `0.0.0.0/0` is whitelisted
   - Wait 2-3 minutes after adding IP

2. **Verify Environment Variables:**
   - Check Vercel dashboard → Settings → Environment Variables
   - Make sure `MONGODB_URI` is correct
   - Make sure `NEXTAUTH_URL` matches your Vercel domain

3. **Check Vercel Logs:**
   - Go to your deployment → Functions tab
   - Look for MongoDB connection errors

4. **Test Connection String:**
   - Try connecting from MongoDB Compass or MongoDB Shell
   - Verify username/password are correct

### Build Errors

#### Dependency Conflicts (ERESOLVE)

If you see errors like `ERESOLVE could not resolve` or peer dependency conflicts:

1. **The fix is already applied:** The project uses `mongodb@^6.3.0` (compatible with `@auth/mongodb-adapter`)
2. **If you still see issues:**
   - Delete `package-lock.json` locally
   - Run `npm install` to regenerate it
   - Commit and push the updated `package-lock.json`
   - The `.npmrc` file with `legacy-peer-deps=true` will handle any remaining conflicts

#### PDFKit/FontKit Build Error (Turbopack)

If you see errors like:
```
Export applyDecoratedDescriptor doesn't exist in target module
Error: Call retries were exceeded
```

This is a known compatibility issue between `pdfkit`/`fontkit` and Next.js 16's Turbopack.

**Solution:** The `next.config.ts` is already configured with `experimental.turbo: {}` to disable Turbopack. 

**If you still see this error on Vercel:**

1. **Add Environment Variable in Vercel:**
   - Go to your Vercel project → Settings → Environment Variables
   - Add a new variable:
     - **Name:** `NEXT_PRIVATE_SKIP_TURBO`
     - **Value:** `1`
   - Make sure it's set for **Production**, **Preview**, and **Development**
   - Click **Save**
   - **Redeploy** your project

2. **Verify the config:**
   - Make sure `next.config.ts` has:
     - `experimental.turbo: {}` (disables Turbopack)
     - `serverExternalPackages: ['pdfkit', 'fontkit']` (marks them as external)
   - Both are already configured in the project

3. **Clear Vercel Build Cache:**
   - Go to your deployment → Settings → Clear Build Cache
   - Redeploy

The combination of the config changes + environment variable should force webpack to be used instead of Turbopack.

#### Other Build Errors

- Make sure all dependencies are in `package.json`
- Check that TypeScript compiles: `npm run build`
- Review Vercel build logs for specific errors
- Ensure Node.js version is compatible (project uses Node 20+)

---

## 📝 Production Checklist

- [ ] MongoDB Atlas IP whitelist configured (`0.0.0.0/0` or specific IPs)
- [ ] All environment variables set in Vercel
- [ ] `NEXTAUTH_URL` matches your production domain
- [ ] Database seeded with templates and checklists
- [ ] Stripe webhook configured (if using payments)
- [ ] Google OAuth redirect URI updated (if using OAuth)
- [ ] Test signup/login flow
- [ ] Test document generation
- [ ] Test payment flow (if applicable)

---

## 🎉 You're Done!

Once deployed, your app will:
- ✅ Connect to MongoDB from Vercel's servers
- ✅ Work from anywhere (no local IP whitelisting needed)
- ✅ Be accessible to users worldwide

The MongoDB connection issue will be resolved because Vercel's servers can connect to MongoDB Atlas without IP restrictions (when using `0.0.0.0/0`).

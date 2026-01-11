# 🚀 Quick Setup Guide

## Step 1: Create `.env.local` file

Create a file named `.env.local` in the project root with this content:

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database (REQUIRED)
# For development, use MongoDB Atlas free tier OR local MongoDB
MONGODB_URI=mongodb://localhost:27017/tiny-legal

# Authentication (REQUIRED)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-this-with-openssl-rand-base64-32

# Google OAuth (OPTIONAL - comment out if not using)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe (REQUIRED for payments)
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_ID_MONTHLY=price_your_monthly_price_id
```

## Step 2: Generate NEXTAUTH_SECRET

Run this command:
```bash
openssl rand -base64 32
```

Copy the output and replace `generate-this-with-openssl-rand-base64-32` in your `.env.local`

## Step 3: Set Up MongoDB

### Option A: MongoDB Atlas (Free, Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free M0 cluster
3. Create database user
4. Add your IP (use `0.0.0.0/0` for development)
5. Get connection string
6. Update `MONGODB_URI` in `.env.local`

### Option B: Local MongoDB
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB: `mongod`
3. Use: `MONGODB_URI=mongodb://localhost:27017/tiny-legal`

## Step 4: Set Up Stripe

1. Go to https://dashboard.stripe.com/register
2. Get test API keys from Dashboard → Developers → API keys
3. Create a product and monthly price
4. Update Stripe variables in `.env.local`

**For webhook secret (do this later):**
- Use Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Or leave as placeholder for now

## Step 5: Install Dependencies

```bash
npm install
```

## Step 6: Seed Database

```bash
npm run seed
```

This creates:
- ✅ 4 document templates (contracts, NDAs, invoices)
- ✅ 2 compliance checklists (US & India)

## Step 7: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## 🎯 Quick Start (Without External Services)

Want to test quickly without MongoDB Atlas or Stripe?

### Minimal `.env.local`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/tiny-legal
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=test-secret-key-for-development-only-min-32-chars
STRIPE_SECRET_KEY=sk_test_placeholder
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder
STRIPE_PRICE_ID_MONTHLY=price_placeholder
```

**Requirements:**
- Local MongoDB running on port 27017
- Stripe features won't work (but app will run)

---

## ✅ Verify Setup

After setup, you should be able to:

1. **Visit Landing Page** → http://localhost:3000 ✓
2. **Sign Up** → http://localhost:3000/signup ✓
3. **Generate Document** → http://localhost:3000/generate ✓
4. **View Checklist** → http://localhost:3000/checklist ✓

---

## 🐛 Troubleshooting

### Error: "MONGODB_URI environment variable not defined"
- Make sure `.env.local` exists in project root
- Restart dev server after creating `.env.local`

### Error: "MongooseError: Operation failed"
- Check MongoDB is running
- Verify connection string in `MONGODB_URI`
- Check IP whitelist if using Atlas

### Error: "Stripe error"
- Verify Stripe API keys are correct
- Use test keys (start with `sk_test_`)
- Payment features require valid Stripe setup

---

## 📞 Need Help?

Check the main README.md for detailed documentation.

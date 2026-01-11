# Environment Variables Setup

Create a `.env.local` file in the project root with the following variables:

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=DocMint
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tiny-legal?retryWrites=true&w=majority

# Authentication (NextAuth.js)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-32-character-secret-key-here-generate-with-openssl

# Google OAuth (Get from: https://console.cloud.google.com/)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe (Get from: https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_ID_MONTHLY=price_your_monthly_price_id
```

## How to Generate NEXTAUTH_SECRET

Run this command:
```bash
openssl rand -base64 32
```

## MongoDB Atlas Setup (Free Tier)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up and create a free M0 cluster
3. Create a database user
4. Whitelist your IP (0.0.0.0/0 for development)
5. Get connection string and update MONGODB_URI

## Google OAuth Setup

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret

## Stripe Setup

1. Go to https://dashboard.stripe.com/
2. Get API keys from Developers > API keys
3. Create a product and price (Monthly subscription)
4. Copy the price ID
5. Set up webhook endpoint later for production

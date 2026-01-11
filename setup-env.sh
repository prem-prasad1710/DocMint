#!/bin/bash

# Setup script for creating .env.local

echo "🚀 Tiny Legal - Environment Setup"
echo "=================================="
echo ""

# Generate NEXTAUTH_SECRET
echo "Generating NEXTAUTH_SECRET..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Create .env.local file
cat > .env.local << EOF
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database (MongoDB)
# Replace with your MongoDB Atlas connection string OR use local MongoDB
MONGODB_URI=mongodb://localhost:27017/tiny-legal

# Authentication (NextAuth.js)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# Google OAuth (Optional - uncomment if using)
# GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
# GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe (Required for payments)
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_replace_with_your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_replace_with_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_replace_with_webhook_secret
STRIPE_PRICE_ID_MONTHLY=price_replace_with_your_price_id
EOF

echo "✅ .env.local file created!"
echo ""
echo "⚠️  IMPORTANT: Update these values in .env.local:"
echo "   1. MONGODB_URI - Get from MongoDB Atlas (free tier)"
echo "   2. STRIPE_SECRET_KEY - Get from Stripe Dashboard"
echo "   3. STRIPE_PUBLISHABLE_KEY - Get from Stripe Dashboard"
echo "   4. STRIPE_PRICE_ID_MONTHLY - Create product in Stripe"
echo ""
echo "📚 See SETUP.md for detailed instructions"
echo ""
echo "Next steps:"
echo "  1. Update .env.local with your keys"
echo "  2. Run: npm install"
echo "  3. Run: npm run seed"
echo "  4. Run: npm run dev"

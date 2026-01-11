#!/bin/bash

# DocMint Setup Script
# This script helps you set up your DocMint environment

set -e

echo "🎉 Welcome to DocMint Setup!"
echo "============================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local already exists!${NC}"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}Using existing .env.local${NC}"
    else
        rm .env.local
        echo -e "${GREEN}✅ Removed old .env.local${NC}"
    fi
fi

# Copy template if doesn't exist
if [ ! -f .env.local ]; then
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo -e "${GREEN}✅ Created .env.local from template${NC}"
    else
        echo -e "${RED}❌ Error: .env.example not found${NC}"
        exit 1
    fi
fi

echo ""
echo -e "${BLUE}📝 Let's configure your environment variables...${NC}"
echo ""

# Function to update env variable
update_env() {
    local key=$1
    local value=$2
    local file=".env.local"
    
    if grep -q "^${key}=" "$file"; then
        # Update existing key
        sed -i.bak "s|^${key}=.*|${key}=${value}|" "$file"
    else
        # Add new key
        echo "${key}=${value}" >> "$file"
    fi
    rm -f "${file}.bak"
}

# MongoDB Setup
echo -e "${BLUE}1. MongoDB Configuration${NC}"
echo "   Get your MongoDB URI from: https://www.mongodb.com/cloud/atlas"
read -p "   Enter MongoDB URI (or press Enter to skip): " mongodb_uri
if [ ! -z "$mongodb_uri" ]; then
    update_env "MONGODB_URI" "$mongodb_uri"
    echo -e "${GREEN}   ✅ MongoDB URI configured${NC}"
fi
echo ""

# NextAuth Setup
echo -e "${BLUE}2. NextAuth Configuration${NC}"
echo "   Generating random secret..."
nextauth_secret=$(openssl rand -base64 32)
update_env "NEXTAUTH_SECRET" "$nextauth_secret"
echo -e "${GREEN}   ✅ NextAuth secret generated${NC}"

read -p "   Enter your app URL (default: http://localhost:3000): " app_url
app_url=${app_url:-http://localhost:3000}
update_env "NEXTAUTH_URL" "$app_url"
update_env "NEXT_PUBLIC_APP_URL" "$app_url"
echo -e "${GREEN}   ✅ App URL configured${NC}"
echo ""

# Google OAuth
echo -e "${BLUE}3. Google OAuth (Optional)${NC}"
read -p "   Do you want to configure Google OAuth? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "   Get credentials from: https://console.cloud.google.com/"
    read -p "   Enter Google Client ID: " google_client_id
    read -p "   Enter Google Client Secret: " google_client_secret
    
    if [ ! -z "$google_client_id" ] && [ ! -z "$google_client_secret" ]; then
        update_env "GOOGLE_CLIENT_ID" "$google_client_id"
        update_env "GOOGLE_CLIENT_SECRET" "$google_client_secret"
        echo -e "${GREEN}   ✅ Google OAuth configured${NC}"
    fi
else
    echo -e "${YELLOW}   ⏭️  Skipped Google OAuth${NC}"
fi
echo ""

# Stripe Setup
echo -e "${BLUE}4. Stripe Payment Configuration${NC}"
read -p "   Do you want to configure Stripe? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "   Get keys from: https://dashboard.stripe.com/apikeys"
    read -p "   Enter Stripe Secret Key (sk_test_...): " stripe_secret
    read -p "   Enter Stripe Publishable Key (pk_test_...): " stripe_public
    read -p "   Enter Stripe Price ID (price_...): " stripe_price
    read -p "   Enter Stripe Webhook Secret (whsec_...): " stripe_webhook
    
    if [ ! -z "$stripe_secret" ]; then
        update_env "STRIPE_SECRET_KEY" "$stripe_secret"
        echo -e "${GREEN}   ✅ Stripe Secret Key configured${NC}"
    fi
    if [ ! -z "$stripe_public" ]; then
        update_env "STRIPE_PUBLISHABLE_KEY" "$stripe_public"
        echo -e "${GREEN}   ✅ Stripe Publishable Key configured${NC}"
    fi
    if [ ! -z "$stripe_price" ]; then
        update_env "STRIPE_PRICE_ID_MONTHLY" "$stripe_price"
        echo -e "${GREEN}   ✅ Stripe Price ID configured${NC}"
    fi
    if [ ! -z "$stripe_webhook" ]; then
        update_env "STRIPE_WEBHOOK_SECRET" "$stripe_webhook"
        echo -e "${GREEN}   ✅ Stripe Webhook Secret configured${NC}"
    fi
else
    echo -e "${YELLOW}   ⏭️  Skipped Stripe configuration${NC}"
fi
echo ""

echo -e "${GREEN}✅ Environment configuration complete!${NC}"
echo ""

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
if command -v npm &> /dev/null; then
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${RED}❌ npm not found. Please install Node.js${NC}"
    exit 1
fi
echo ""

# Ask to seed database
echo -e "${BLUE}🌱 Database Seeding${NC}"
read -p "   Do you want to seed the database with templates? (Y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    echo "   Seeding database..."
    npm run seed
    echo -e "${GREEN}   ✅ Database seeded with templates${NC}"
else
    echo -e "${YELLOW}   ⏭️  Skipped database seeding${NC}"
    echo "   You can run 'npm run seed' later to seed the database"
fi
echo ""

echo "================================"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Review your .env.local file"
echo "2. Start the development server: ${BLUE}npm run dev${NC}"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For Stripe webhooks in development:"
echo "   ${BLUE}stripe listen --forward-to localhost:3000/api/stripe/webhook${NC}"
echo ""
echo "Documentation:"
echo "   - COMPLETE_IMPLEMENTATION_GUIDE.md"
echo "   - FRONTEND_SAAS_TRANSFORMATION_COMPLETE.md"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"

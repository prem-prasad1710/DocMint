# ⚖️ DocMint - AI-Powered Legal Document Generation Platform

**Production-ready micro-SaaS for freelancers** - Auto-generate country-specific legal documents and compliance checklists.

🎉 **Complete Full-Stack Application Built!**

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local` in the project root:

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database (MongoDB Atlas - Free Tier)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tiny-legal

# Authentication (NextAuth.js)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_ID_MONTHLY=price_your_monthly_price_id
```

### 3. Set Up MongoDB Atlas (Free Tier)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free M0 cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (for development)
5. Get connection string → Update `MONGODB_URI`

### 4. Seed Database

```bash
npm run seed
```

This will populate:
- ✅ 4 document templates (US/India contracts, NDAs, invoices)
- ✅ 2 compliance checklists (US & India tech freelancers)

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📦 What's Included

### ✅ **Frontend (Complete)**

**Landing Page:**
- Hero section with clear value proposition
- "How It Works" (3 steps)
- Features showcase
- Country support (US & India)
- Pricing comparison (Free vs Pro)
- Responsive design

**Authentication:**
- Email/password signup & login
- Google OAuth integration
- Protected routes with middleware
- Disclaimer acceptance flow

**Document Generator:**
- Multi-step wizard (country → type → industry → form)
- Dynamic forms based on templates
- Real-time document preview
- PDF download
- Save functionality (Pro users: unlimited, Free: 5 docs)

**Dashboard:**
- Saved documents list
- Download PDFs
- Usage stats
- Quick actions

**Compliance Checklist:**
- Country & industry-specific checklists
- Tax deadlines with penalties
- Checklist items by category
- Official resource links

**Billing:**
- Upgrade to Pro
- Stripe Customer Portal integration
- Subscription management

**Legal Pages:**
- Terms of Service
- Privacy Policy
- Footer disclaimers

### ✅ **Backend (Complete)**

**API Routes:**
- `/api/auth/*` - NextAuth.js authentication
- `/api/templates` - Get document templates
- `/api/documents/generate` - Generate documents
- `/api/documents/pdf` - Download PDF
- `/api/documents/list` - Get saved documents
- `/api/documents/save` - Save document
- `/api/checklist/[country]` - Get compliance checklist
- `/api/stripe/checkout` - Create Stripe checkout
- `/api/stripe/webhook` - Handle Stripe events
- `/api/stripe/portal` - Customer portal

**Database (MongoDB + Mongoose):**
- User management with subscriptions
- Document templates with versioning
- Generated documents with metadata
- Subscription tracking
- Compliance checklists

**PDF Generation:**
- Professional layout with pdfkit
- Headers & footers
- Watermarks for free users
- Downloadable format

**Stripe Integration:**
- Checkout sessions
- Webhook handling (subscription updates)
- Customer portal
- Usage enforcement

---

## 🎨 Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- NextAuth.js v5

**Backend:**
- Next.js API Routes
- MongoDB (Mongoose)
- bcryptjs (password hashing)
- pdfkit (PDF generation)
- Zod (validation)

**Payment:**
- Stripe (checkout + webhooks)

**Deployment:**
- Vercel (recommended)

---

## 🗂️ Project Structure

```
crat/
├── app/
│   ├── (auth)/                    # Auth pages (login, signup)
│   ├── (protected)/               # Protected pages (dashboard, generate, etc.)
│   ├── (legal)/                   # Legal pages (terms, privacy)
│   ├── api/                       # API routes
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── components/
│   ├── auth/                      # Auth components
│   ├── dashboard/                 # Dashboard components
│   ├── generator/                 # Document generator flow
│   ├── landing/                   # Landing page sections
│   ├── layout/                    # Header, Footer
│   └── ui/                        # Reusable UI (Button, Input, Card)
├── lib/
│   ├── auth/                      # NextAuth config
│   ├── db/                        # MongoDB models & queries
│   ├── pdf/                       # PDF generator
│   ├── stripe/                    # Stripe client
│   ├── utils/                     # Helpers & constants
│   └── validation/                # Zod schemas
└── types/                         # TypeScript types
```

---

## 🔐 Security Features

✅ Password hashing with bcrypt (cost: 12)
✅ HTTP-only cookies (XSS protection)
✅ CSRF protection (NextAuth.js)
✅ Protected routes with Edge middleware
✅ Input validation (Zod)
✅ SQL injection safe (MongoDB + Mongoose)
✅ Environment variables for secrets
✅ Stripe webhook signature verification

---

## 💰 Features by Tier

### Free Tier
- Generate unlimited documents (preview)
- Save up to 5 documents
- Watermarked PDFs
- Basic compliance checklists

### Pro Tier ($9/month)
- Save unlimited documents
- No PDF watermarks
- Export compliance checklists
- Priority support
- Early access to new features

---

## 🚢 Deployment (Vercel)

**📖 For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Quick Steps:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Add environment variables (same as `.env.local`)
   - **Important:** Update `NEXTAUTH_URL` to your Vercel domain
   - Deploy!

3. **Fix MongoDB IP Whitelisting:**
   - Go to MongoDB Atlas → Network Access
   - Add `0.0.0.0/0` to allow all IPs (or whitelist Vercel IPs)
   - Wait 1-2 minutes for changes to propagate

4. **Seed Production Database:**
   ```bash
   MONGODB_URI=your_production_uri npm run seed
   ```

**💡 Tip:** Deploying fixes the MongoDB connection issue because Vercel's servers can connect without IP restrictions!

---

## 📊 Database Schemas

**User:**
- Authentication (email, password, Google OAuth)
- Subscription (tier, status, Stripe IDs)
- Usage tracking (documents generated/saved)
- Disclaimer acceptance

**DocumentTemplate:**
- Country-specific templates
- Dynamic field definitions
- Versioning

**GeneratedDocument:**
- User-generated documents
- Field values
- Watermark status
- Save status

**Subscription:**
- Stripe integration
- Billing periods
- Status tracking

**ComplianceChecklist:**
- Tax deadlines
- Checklist items
- Official resources

---

## 🧪 Testing

### Test User Flow

1. **Signup** → `/signup`
2. **Accept Disclaimer** → Dashboard shows modal
3. **Generate Document** → `/generate`
   - Select country, type, industry
   - Fill form
   - Preview & download PDF
4. **View Checklist** → `/checklist`
5. **Upgrade to Pro** → `/billing`
6. **Manage Subscription** → Stripe Customer Portal

---

## 🐛 Troubleshooting

### npm install fails
- Try: `npm install --legacy-peer-deps`
- Or: Delete `node_modules` and `package-lock.json`, then reinstall

### MongoDB connection fails
- Check `MONGODB_URI` format
- Ensure IP is whitelisted (0.0.0.0/0)
- Verify database user has permissions

### Stripe webhook not working
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Check Stripe Dashboard → Webhooks → Event logs
- Ensure endpoint URL is correct

### Edge middleware errors
- Mongoose/bcrypt can't run in Edge runtime
- Solution: Already implemented (providers in auth.ts, not auth.config.ts)

---

## 📝 Next Steps (Future Enhancements)

🔮 **More Countries:**
- UK, Canada, Australia, Singapore, Germany

🔮 **More Document Types:**
- Proposals, SOWs, Terms of Service

🔮 **AI Features:**
- AI-powered clause suggestions
- Smart field auto-fill

🔮 **Integrations:**
- E-signature (DocuSign, HelloSign)
- Accounting software (QuickBooks)

🔮 **Team Features:**
- Agency/team plans
- White-label version
- API access

---

## 📞 Support

For issues or questions:
- Check this README
- Review `PHASE_X_COMPLETE.md` files
- See `PROJECT_STATUS.md` for detailed progress

---

## 📄 License

This is a proprietary SaaS application.

---

## 🙏 Acknowledgments

Built with:
- Next.js by Vercel
- MongoDB Atlas
- Stripe
- Tailwind CSS
- NextAuth.js
- pdfkit

---

**Built by: Cursor AI**
**For: Freelancers & Creators Worldwide** 🌍

🎉 **The complete application is ready to run!**

# Troubleshooting Guide

## MongoDB Connection Issues

### Error: `MongoNetworkError: read ECONNRESET`

This error means the application cannot connect to MongoDB. Here's how to fix it:

### 1. Test Your Database Connection

Run the test script:
```bash
npm run test:db
```

This will tell you if your MongoDB connection is working.

### 2. Check Your `.env.local` File

Make sure you have `MONGODB_URI` set correctly:

**For MongoDB Atlas (Cloud):**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

**For Local MongoDB:**
```bash
MONGODB_URI=mongodb://localhost:27017/tiny-legal
```

### 3. Common Issues & Solutions

#### Issue: MongoDB Atlas Connection
- ✅ **Check IP Whitelist**: Go to MongoDB Atlas → Network Access → Add your IP (or `0.0.0.0/0` for development)
- ✅ **Verify Username/Password**: Make sure your database user credentials are correct
- ✅ **Check Connection String**: Ensure the connection string includes your actual username and password

#### Issue: Local MongoDB
- ✅ **Start MongoDB**: 
  - macOS: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`
  - Windows: Start MongoDB service from Services
- ✅ **Check if Running**: `mongosh` or `mongo` should connect

#### Issue: Connection Timeout
- ✅ **Check Internet**: MongoDB Atlas requires internet connection
- ✅ **Firewall**: Make sure port 27017 (local) or 27017+ (Atlas) is not blocked
- ✅ **VPN**: Some VPNs block MongoDB connections

### 4. Quick Fixes

1. **Restart your development server**:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

2. **Clear MongoDB connection cache**:
   - The app will automatically retry connections
   - If issues persist, restart the Next.js dev server

3. **Verify Environment Variables**:
   ```bash
   # Check if MONGODB_URI is loaded
   node -e "require('dotenv').config({ path: '.env.local' }); console.log(process.env.MONGODB_URI ? '✅ Set' : '❌ Missing')"
   ```

### 5. Still Having Issues?

1. **Check MongoDB Logs**:
   - Local: Check MongoDB logs in `/var/log/mongodb/` or system logs
   - Atlas: Check MongoDB Atlas dashboard for connection issues

2. **Test Connection Manually**:
   ```bash
   # For local MongoDB
   mongosh mongodb://localhost:27017/tiny-legal
   
   # For Atlas (replace with your connection string)
   mongosh "mongodb+srv://username:password@cluster.mongodb.net/database-name"
   ```

3. **Verify Database Name**:
   - Make sure the database name in your connection string exists
   - MongoDB will create it automatically on first write, but verify the name is correct

### 6. Development vs Production

- **Development**: Use `mongodb://localhost:27017/tiny-legal` for local MongoDB
- **Production**: Use MongoDB Atlas connection string with proper credentials

---

## Other Common Issues

### NextAuth Errors
- Make sure `NEXTAUTH_SECRET` is set (32+ characters)
- Verify `NEXTAUTH_URL` matches your app URL

### Stripe Errors
- Use test keys for development
- Verify webhook secret is set correctly

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next` then rebuild

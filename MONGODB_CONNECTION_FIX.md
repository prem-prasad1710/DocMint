# MongoDB Connection Troubleshooting Guide

## Current Status
- **Your IP**: `136.226.231.105`
- **Connection String**: ✅ Correctly formatted
- **Error**: `ECONNRESET` (connection reset during handshake)

## Step-by-Step Fix

### 1. Check if Cluster is Running
1. Go to https://cloud.mongodb.com/
2. Click on your cluster (Cluster0)
3. **VERIFY**: The cluster status should show "Running" (green)
4. If it shows "Paused" or "Stopped", click "Resume" or "Start"

### 2. Verify Database User Credentials
1. In MongoDB Atlas, go to **Database Access** (left sidebar)
2. Find the user: `pr20090066870_db_user`
3. Click **Edit** on that user
4. **VERIFY**: The password matches `Prem12345`
5. If unsure, click **Edit Password** and set a new password
6. **IMPORTANT**: Update `.env.local` with the new password if you change it

### 3. Double-Check IP Whitelist
Even though you have `0.0.0.0/0` whitelisted, try this:
1. Go to **Network Access** in MongoDB Atlas
2. Click **Add IP Address**
3. Enter your current IP: `136.226.231.105/32`
4. Add a comment: "Current development IP"
5. Click **Confirm**
6. Wait 2-3 minutes for changes to propagate

### 4. Test Connection from MongoDB Atlas
1. In MongoDB Atlas, click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string shown
4. Compare it with your `.env.local` connection string
5. Make sure they match (except for password masking)

### 5. Check for VPN/Firewall Issues
- If you're using a VPN, try disabling it
- Check if your corporate firewall is blocking MongoDB connections
- Try connecting from a different network (mobile hotspot)

### 6. Verify Connection String Format
Your connection string should look exactly like this:
```
mongodb+srv://pr20090066870_db_user:Prem12345@cluster0.opjy1jn.mongodb.net/appwrite?retryWrites=true&w=majority
```

**Check:**
- ✅ No extra spaces
- ✅ No `DocMint` parameter
- ✅ Database name is `appwrite` (or your preferred name)
- ✅ Password is correct (no special characters that need URL encoding)

### 7. Test with MongoDB Compass (Optional)
1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Use your connection string to connect
3. If Compass connects but your app doesn't, it's likely a code issue
4. If Compass also fails, it's a MongoDB Atlas configuration issue

## Quick Test Commands

After making changes, test the connection:
```bash
npm run test:db
```

## Common Issues & Solutions

### Issue: "read ECONNRESET"
**Solution**: Usually means IP not whitelisted OR cluster is paused

### Issue: "Authentication failed"
**Solution**: Wrong username/password - verify in Database Access

### Issue: "DNS resolution failed"
**Solution**: Network issue - check internet connection, try different network

### Issue: "Connection timeout"
**Solution**: Increase timeout in connection options (already done in code)

## Still Not Working?

If none of the above works:
1. Create a **new database user** in MongoDB Atlas
2. Use a **new password** (no special characters)
3. Update `.env.local` with the new credentials
4. Test again

## Contact Support

If the issue persists:
- MongoDB Atlas Support: https://www.mongodb.com/support
- Check MongoDB Status: https://status.mongodb.com/

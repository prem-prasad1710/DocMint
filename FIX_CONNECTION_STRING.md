# Fix MongoDB Connection String

## Current Issue

Your connection string has invalid parameters:
```
mongodb+srv://pr20090066870_db_user:****@cluster0.opjy1jn.mongodb.net/?DocMint=Cluster0
```

## Problems Found

1. ❌ Invalid parameter: `DocMint=Cluster0` (not a valid MongoDB parameter)
2. ❌ Missing database name (should be `/tiny-legal` or similar)
3. ❌ Missing recommended query parameters

## How to Fix

### Step 1: Open your `.env.local` file

```bash
# In your project root
nano .env.local
# or
code .env.local
```

### Step 2: Update MONGODB_URI

**Replace your current MONGODB_URI with:**

```bash
MONGODB_URI=mongodb+srv://pr20090066870_db_user:YOUR_PASSWORD@cluster0.opjy1jn.mongodb.net/tiny-legal?retryWrites=true&w=majority
```

**Important:**
- Replace `YOUR_PASSWORD` with your actual MongoDB password
- The database name `tiny-legal` will be created automatically if it doesn't exist
- You can use any database name you prefer (e.g., `crat`, `documents`, etc.)

### Step 3: Test the Connection

```bash
npm run test:db
```

You should see:
```
✅ MongoDB connection successful!
🎉 Your database is ready to use.
```

## Connection String Format

**For MongoDB Atlas:**
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

**For Local MongoDB:**
```
mongodb://localhost:27017/database-name
```

## What Changed?

- ✅ Removed invalid `DocMint=Cluster0` parameter
- ✅ Added database name (`tiny-legal`)
- ✅ Added proper query parameters (`retryWrites=true&w=majority`)

## Still Having Issues?

1. **Verify your password** - Make sure you're using the correct MongoDB user password
2. **Check IP Whitelist** - In MongoDB Atlas, go to Network Access and add your IP (or `0.0.0.0/0` for development)
3. **Test connection** - Run `npm run test:db` to see detailed error messages

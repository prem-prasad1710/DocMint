/**
 * Test MongoDB Connection Script
 * Run with: npx tsx scripts/test-db-connection.ts
 */

import 'dotenv/config';
import { networkInterfaces } from 'os';
import connectDB from '../lib/db/mongodb';

function validateConnectionString(uri: string): { valid: boolean; issues: string[]; suggested?: string } {
  const issues: string[] = [];
  let suggested = uri;

  // Check for invalid parameters (case-insensitive, but check exact matches)
  const invalidParamPatterns = [
    { pattern: /[?&]DocMint=[^&]*/gi, name: 'DocMint' },
    { pattern: /[?&]docmint=[^&]*/gi, name: 'docmint' },
    { pattern: /[?&]appName=[^&]*/gi, name: 'appName' },
  ];
  
  for (const { pattern, name } of invalidParamPatterns) {
    if (pattern.test(uri)) {
      issues.push(`Invalid parameter "${name}" found. This should be removed.`);
      suggested = suggested.replace(pattern, '');
    }
  }

  // Check if database name is missing (for Atlas connections)
  if (uri.includes('mongodb+srv://') || uri.includes('mongodb://')) {
    const match = uri.match(/(mongodb\+?srv?:\/\/[^/]+)\/([^?]*)/);
    if (match) {
      const dbName = match[2];
      if (!dbName || dbName.trim() === '') {
        issues.push('Database name is missing. Add a database name after the cluster URL.');
        // Suggest adding a database name
        const baseUri = match[1];
        // Clean up any trailing ? or & from suggested
        suggested = suggested.replace(/[?&]$/, '');
        const hasQuery = suggested.includes('?');
        suggested = `${baseUri}/tiny-legal${hasQuery ? '' : '?'}${hasQuery && !suggested.includes('retryWrites') ? '&' : ''}retryWrites=true&w=majority`;
      }
    } else {
      // No database name found at all
      const baseMatch = uri.match(/(mongodb\+?srv?:\/\/[^?]+)/);
      if (baseMatch) {
        issues.push('Database name is missing. Add a database name after the cluster URL.');
        const baseUri = baseMatch[1];
        const queryPart = uri.includes('?') ? uri.substring(uri.indexOf('?')) : '';
        // Remove invalid params from query part
        let cleanQuery = queryPart.replace(/[?&](DocMint|docmint|appName)=[^&]*/gi, '');
        // Ensure retryWrites is present
        if (!cleanQuery.includes('retryWrites')) {
          cleanQuery = cleanQuery ? `${cleanQuery}&retryWrites=true&w=majority` : '?retryWrites=true&w=majority';
        }
        suggested = `${baseUri}/tiny-legal${cleanQuery}`;
      }
    }
  }

  // Check for proper query parameters
  if (uri.includes('mongodb+srv://') && !uri.includes('retryWrites=true')) {
    issues.push('Missing recommended query parameters. Add "?retryWrites=true&w=majority"');
    if (!suggested.includes('?')) {
      suggested += '?retryWrites=true&w=majority';
    } else if (!suggested.includes('retryWrites')) {
      suggested += '&retryWrites=true&w=majority';
    }
  }

  // Clean up suggested string (remove double ? or &)
  suggested = suggested.replace(/\?&/g, '?').replace(/&&+/g, '&').replace(/\?$/, '');

  return {
    valid: issues.length === 0,
    issues,
    suggested: issues.length > 0 ? suggested : undefined,
  };
}

function getLocalIP(): string | null {
  try {
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
      const net = nets[name];
      if (net) {
        for (const addr of net) {
          // Skip internal (i.e. 127.0.0.1) and non-IPv4 addresses
          if (addr.family === 'IPv4' && !addr.internal) {
            return addr.address;
          }
        }
      }
    }
  } catch (error) {
    // Ignore errors
  }
  return null;
}

async function getCurrentIP(): Promise<string> {
  // First try to get local network IP (won't be your public IP, but useful for debugging)
  const localIP = getLocalIP();
  
  // Try multiple IP detection services
  const services = [
    'https://api.ipify.org?format=json',
    'https://api64.ipify.org?format=json',
    'https://ifconfig.me/ip',
    'https://icanhazip.com',
    'https://checkip.amazonaws.com',
  ];
  
  for (const service of services) {
    let timeoutId: NodeJS.Timeout | null = null;
    try {
      // Create timeout controller for compatibility
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), 3000); // Reduced to 3 seconds
      
      const response = await fetch(service, { 
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      });
      if (timeoutId) clearTimeout(timeoutId);
      
      if (!response.ok) continue;
      
      const text = await response.text();
      
      // Try to parse as JSON first
      try {
        const json = JSON.parse(text);
        if (json.ip) return json.ip;
      } catch {
        // If not JSON, return the text (should be IP)
        const ip = text.trim();
        // Match IPv4 or IPv6
        if (ip && (/^\d+\.\d+\.\d+\.\d+$/.test(ip) || /^[0-9a-f:]+$/i.test(ip))) {
          return ip;
        }
      }
    } catch (err) {
      // Try next service
      if (timeoutId) clearTimeout(timeoutId);
      continue;
    }
  }
  
  // If we couldn't detect public IP, show local IP if available
  if (localIP) {
    return `unknown (local: ${localIP})`;
  }
  
  return 'unknown (could not detect - try whitelisting 0.0.0.0/0 in MongoDB Atlas)';
}

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...\n');
  
  // Check if MONGODB_URI is set
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in .env.local');
    console.log('\n📝 Please add MONGODB_URI to your .env.local file:');
    console.log('   MONGODB_URI=mongodb://localhost:27017/tiny-legal');
    console.log('   OR for MongoDB Atlas:');
    console.log('   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tiny-legal?retryWrites=true&w=majority');
    process.exit(1);
  }
  
  // Debug: Show what we're reading (masked)
  const maskedUri = process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@');
  console.log(`📡 Reading connection string: ${maskedUri}\n`);
  
  // Validate connection string
  const validation = validateConnectionString(process.env.MONGODB_URI);
  
  if (!validation.valid) {
    console.error('❌ Connection string has issues:\n');
    validation.issues.forEach((issue, i) => {
      console.error(`   ${i + 1}. ${issue}`);
    });
    
    if (validation.suggested) {
      console.log('\n✅ Suggested fix:');
      console.log(`   Update your .env.local file with:`);
      console.log(`   MONGODB_URI=${validation.suggested.replace(/:[^:@]+@/, ':****@')}`);
      console.log('\n   (Replace **** with your actual password)');
    }
    process.exit(1);
  }
  
  try {
    // Get current IP for reference
    console.log('🌐 Detecting your current IP address...');
    const currentIp = await getCurrentIP();
    console.log(`📍 Your current IP: ${currentIp}`);
    console.log('   Make sure this IP (or 0.0.0.0/0) is whitelisted in MongoDB Atlas\n');
    
    await connectDB();
    console.log('✅ MongoDB connection successful!\n');
    console.log('🎉 Your database is ready to use.');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ MongoDB connection failed!\n');
    console.error('Error details:', error.message);
    console.error('Error name:', error.name);
    console.error('Error code:', error.code || 'N/A');
    
    // Provide specific help based on error
    if (error.message.includes('option') && error.message.includes('not supported')) {
      console.error('\n🔧 This error usually means:');
      console.error('   - Invalid query parameters in connection string');
      console.error('   - Remove any custom parameters like "DocMint"');
      console.error('   - Use standard parameters: ?retryWrites=true&w=majority');
    } else if (error.name === 'MongoServerError' && error.code === 8000) {
      console.error('\n🔧 Authentication failed:');
      console.error('   - Check your username and password in the connection string');
      console.error('   - Verify the database user exists in MongoDB Atlas');
      console.error('   - Make sure the user has proper permissions');
    } else if (
      error.name === 'MongoNetworkError' || 
      error.code === 'ECONNRESET' ||
      error.name === 'MongooseServerSelectionError' ||
      error.message.includes('whitelist') ||
      error.message.includes('IP')
    ) {
      console.error('\n🔧 IP Whitelisting Issue Detected:');
      console.error('   This is the most common MongoDB Atlas connection problem.\n');
      console.error('   📋 Steps to fix:');
      console.error('   1. Go to MongoDB Atlas Dashboard: https://cloud.mongodb.com/');
      console.error('   2. Select your cluster → Click "Network Access" (or "Security" → "Network Access")');
      console.error('   3. Click "Add IP Address"');
      console.error('   4. For testing, you can add:');
      console.error('      - Your current IP (shown above)');
      console.error('      - OR 0.0.0.0/0 (allows all IPs - less secure but good for testing)');
      console.error('   5. Click "Confirm" and wait 1-2 minutes for changes to propagate');
      console.error('\n   ⚠️  Note: If you\'re using a VPN, you may need to add the VPN IP instead');
      console.error('   ⚠️  Note: If your IP changes frequently, consider using 0.0.0.0/0 for development');
      console.error('\n   💡 **BETTER SOLUTION: Deploy to Vercel!**');
      console.error('      Deploying your app will fix this issue because:');
      console.error('      - Vercel servers can connect without IP restrictions');
      console.error('      - You can whitelist 0.0.0.0/0 in MongoDB Atlas safely');
      console.error('      - No need to manage local IP whitelisting');
      console.error('      - Your app will work from anywhere');
      console.error('      📖 See DEPLOYMENT.md for step-by-step instructions');
    } else if (error.name === 'MongoNetworkError' || error.code === 'ECONNRESET') {
      console.error('\n🔧 Network connection error:');
      console.error('   - Check Network Access in MongoDB Atlas dashboard');
      console.error('   - Try adding 0.0.0.0/0 (allows all IPs) for testing');
      console.error('   - Check if your cluster is running (not paused)');
      console.error('   - Verify your internet connection');
      console.error('   - Try disabling VPN if you\'re using one');
    }
    
    console.error('\n💡 Troubleshooting checklist:');
    console.error('   ✓ Verify MONGODB_URI in .env.local');
    console.error('   ✓ Check MongoDB Atlas → Network Access → IP Whitelist');
    console.error('   ✓ Verify cluster is running (not paused)');
    console.error('   ✓ Check username/password are correct');
    console.error('   ✓ Try adding your current IP explicitly to whitelist');
    console.error('   ✓ Check firewall/VPN settings');
    console.error('\n🔗 Quick Links:');
    console.error('   - MongoDB Atlas Dashboard: https://cloud.mongodb.com/');
    console.error('   - Network Access Docs: https://www.mongodb.com/docs/atlas/security-whitelist/');
    process.exit(1);
  }
}

testConnection();

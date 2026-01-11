/**
 * Direct MongoDB Connection Test
 * This script tests the connection with more detailed error reporting
 */

import 'dotenv/config';
import mongoose from 'mongoose';

async function testDirectConnection() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI not found in environment');
    process.exit(1);
  }

  // Mask password for display
  const maskedUri = uri.replace(/:[^:@]+@/, ':****@');
  console.log('🔍 Testing MongoDB connection...\n');
  console.log(`📡 Connection string: ${maskedUri}\n`);

  // Parse connection string to verify format
  try {
    const url = new URL(uri.replace('mongodb+srv://', 'https://'));
    console.log('✅ Connection string format is valid');
    console.log(`   Host: ${url.hostname}`);
    console.log(`   Database: ${url.pathname.replace('/', '') || 'default'}`);
    console.log(`   Username: ${url.username}`);
  } catch (e) {
    console.error('❌ Invalid connection string format');
    process.exit(1);
  }

  // Test connection with detailed options
  const connectionOptions = {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    retryReads: true,
    family: 4, // Force IPv4
  };

  console.log('\n🔄 Attempting connection...\n');

  try {
    // Set mongoose to debug mode for more info
    mongoose.set('debug', false);
    
    await mongoose.connect(uri, connectionOptions);
    
    console.log('✅ MongoDB connection successful!\n');
    console.log('📊 Connection details:');
    console.log(`   Ready state: ${mongoose.connection.readyState}`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Port: ${mongoose.connection.port}`);
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log('\n🎉 Your database is ready to use!');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ MongoDB connection failed!\n');
    console.error('Error details:');
    console.error(`   Message: ${error.message}`);
    console.error(`   Name: ${error.name}`);
    console.error(`   Code: ${error.code || 'N/A'}`);
    
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack.split('\n').slice(0, 5).join('\n'));
    }

    // Specific error handling
    if (error.name === 'MongoServerError') {
      if (error.code === 8000 || error.message.includes('authentication')) {
        console.error('\n🔧 Authentication Error:');
        console.error('   - Your username or password is incorrect');
        console.error('   - Go to MongoDB Atlas → Database Access');
        console.error('   - Verify the user exists and password is correct');
        console.error('   - If needed, reset the password and update .env.local');
      }
    } else if (error.name === 'MongoNetworkError' || error.code === 'ECONNRESET') {
      console.error('\n🔧 Network Connection Error:');
      console.error('   This usually means one of the following:');
      console.error('   1. ❌ Your IP is NOT whitelisted (even if you see 0.0.0.0/0)');
      console.error('   2. ❌ Cluster is PAUSED (check MongoDB Atlas dashboard)');
      console.error('   3. ❌ Firewall/VPN is blocking the connection');
      console.error('   4. ❌ MongoDB Atlas service is down');
      console.error('\n   Action items:');
      console.error('   → Go to MongoDB Atlas → Your Cluster');
      console.error('   → Verify cluster status shows "Running" (green)');
      console.error('   → Go to Network Access → Verify 0.0.0.0/0 is Active');
      console.error('   → Try disabling VPN if you\'re using one');
      console.error('   → Try connecting from a different network');
    } else if (error.name === 'MongoParseError') {
      console.error('\n🔧 Connection String Error:');
      console.error('   - Your connection string format is invalid');
      console.error('   - Check for missing @ symbol, wrong format, etc.');
    }

    process.exit(1);
  }
}

testDirectConnection();

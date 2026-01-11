import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof import('mongoose') | null;
    promise: Promise<typeof import('mongoose')> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

let cached: MongooseCache = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(retries = 3): Promise<typeof mongoose> {
  // Check if already connected and ready
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If connection exists but is not ready, reset it
  if (cached.conn && mongoose.connection.readyState !== 1) {
    console.warn('⚠️ MongoDB connection not ready, resetting...');
    cached.conn = null;
    cached.promise = null;
    // Close any stale connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close().catch(() => {});
    }
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 1,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      retryReads: true,
      // Add heartbeat to keep connection alive
      heartbeatFrequencyMS: 10000,
      // Additional options for better connection stability
      family: 4, // Force IPv4
      tls: true, // Explicitly enable TLS for Atlas
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
          console.error('❌ MongoDB connection error:', err.message);
          // Don't reset cache on error, let retry logic handle it
        });
        
        mongoose.connection.on('disconnected', () => {
          console.warn('⚠️ MongoDB disconnected');
          cached.conn = null;
          cached.promise = null;
        });
        
        mongoose.connection.on('reconnected', () => {
          console.log('✅ MongoDB reconnected');
        });
        
        return mongoose;
      })
      .catch((error) => {
        cached.promise = null;
        cached.conn = null;
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    cached.conn = null;
    
    // Retry logic for network errors
    if (retries > 0 && (e.name === 'MongoNetworkError' || e.code === 'ECONNRESET')) {
      console.log(`🔄 Retrying MongoDB connection... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      const result = await connectDB(retries - 1);
      return result;
    }
    
    throw e;
  }
  
  // @ts-expect-error - TypeScript inference issue with mongoose connection caching pattern
  return cached.conn;

  return cached.conn;
}

export default connectDB;

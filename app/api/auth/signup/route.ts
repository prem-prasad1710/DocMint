/**
 * User Registration API Route
 * POST /api/auth/signup
 */

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signupSchema } from '@/lib/validation/schemas';
import { getUserByEmail, createUser } from '@/lib/db/queries';
import connectDB from '@/lib/db/mongodb';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('Database connection error:', dbError);
      
      // Provide helpful error message
      let errorMessage = 'Unable to connect to database. ';
      
      if (dbError.name === 'MongoNetworkError' || dbError.code === 'ECONNRESET') {
        errorMessage += 'Please check if MongoDB is running and your connection string is correct.';
      } else if (dbError.message?.includes('MONGODB_URI')) {
        errorMessage += 'Please set MONGODB_URI in your .env.local file.';
      } else {
        errorMessage += 'Please verify your MongoDB connection settings.';
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
        },
        { status: 503 }
      );
    }
    
    const body = await request.json();
    
    // Validate input
    const validatedFields = signupSchema.safeParse(body);
    
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validatedFields.error.flatten() },
        { status: 400 }
      );
    }
    
    const { email, password, name } = validatedFields.data;
    
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await createUser({
      email,
      name,
      passwordHash,
    });
    
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerError') {
      return NextResponse.json(
        { error: 'Database connection error. Please try again later.' },
        { status: 503 }
      );
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Invalid data provided' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to create account' },
      { status: 500 }
    );
  }
}

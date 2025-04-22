import { db } from '@/lib/db';
import { users, sessions } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

// Session duration in milliseconds (7 days)
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

interface RegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Create a new user
export async function registerUser(userData: RegisterUserData): Promise<boolean> {
  try {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, userData.email)).limit(1);

    if (existingUser.length > 0) {
      return false;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(userData.password, 10);

    // Insert the new user
    await db.insert(users).values({
      email: userData.email,
      passwordHash,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });

    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
}

// Login a user
export async function loginUser(email: string, password: string): Promise<boolean> {
  try {
    // Find the user by email
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
      return false;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return false;
    }

    // Create a new session
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    await db.insert(sessions).values({
      userId: user.id,
      token,
      expiresAt,
    });

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set({
    name: 'session_token',
    value: token,
    expires: expiresAt,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    });

    return true;
  } catch (error) {
    console.error('Error logging in user:', error);
    return false;
  }
}

// Get current user from session
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return null;
    }

    // Find the session
    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.token, sessionToken))
      .limit(1);

      if (!session || new Date(session.expiresAt) < new Date()) {
        cookieStore.delete('session_token');
        return null;
      }

    // Get the user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))
      .limit(1);

    if (!user) {
      return null;
    }

    // Don't expose password hash
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Logout user
export async function logoutUser(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;


    if (sessionToken) {
        await db.delete(sessions).where(eq(sessions.token, sessionToken));
        cookieStore.delete('session_token');
    }

    return true;
  } catch (error) {
    console.error('Error logging out user:', error);
    return false;
  }
}
// app/api/scan-requests/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Import your Drizzle DB instance
import { scanRequests } from '@/lib/schema'; // Import your schema
import { getCurrentUser } from '@/lib/auth-server'; // Import your auth functions

export async function POST(req: Request) {
  try {
    // Get the authenticated user using your custom auth system
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse the request body
    const data = await req.json();
    
    // Validate the required fields
    // if (!data.url) {
    //   return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    // }
    
    // Extract content type, platforms, and purposes from the data
    const contentType = data.contentType || 'image';
    const platforms = Array.isArray(data.platforms) ? data.platforms : JSON.parse(data.platforms || '[]');
    const purposes = Array.isArray(data.purposes) ? data.purposes : JSON.parse(data.purposes || '[]');
    
    // Insert the scan request into the database
    const result = await db.insert(scanRequests).values({
      userId: user.id,
      url: data.url,
      contentType,
      description: data.description || null,
      platforms: JSON.stringify(platforms),
      purposes: JSON.stringify(purposes),
      priority: data.priority || 'standard',
      status: 'pending',
    }).returning({ id: scanRequests.id });
    
    // Return the created scan request ID
    return NextResponse.json({ id: result[0].id, success: true }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating scan request:', error);
    return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500 });
  }
}
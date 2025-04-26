// app/api/scan-results/route.ts
import { db } from '@/lib/db';
import { scanResults } from '@/lib/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all scan results
    const results = await db.select().from(scanResults).orderBy(scanResults.createdAt);
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scan results' },
      { status: 500 }
    );
  }
}
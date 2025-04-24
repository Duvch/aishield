// app/api/user/route.ts (or inside a server action)
import { db } from '@/lib/db';
import { users } from '@/lib/schema'; // your schema
import { getCurrentUser } from '@/lib/auth-server';

export const GET = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
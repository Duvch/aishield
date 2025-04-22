// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which paths should be protected
const protectedPaths = ['/dashboard'];

// Define which paths should remain accessible without auth
const publicPaths = ['/', '/login', '/register'];

// API paths that should bypass middleware
const apiPaths = ['/api/auth/login', '/api/auth/register', '/api/auth/logout'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow API endpoints to bypass middleware
  if (apiPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Check for session token
  const sessionToken = request.cookies.get('session_token')?.value;
  const isAuthenticated = !!sessionToken;
  
  // If trying to access protected route without auth
  if (protectedPaths.some(path => pathname.startsWith(path)) && !isAuthenticated) {
    const url = new URL('/login', request.url);
    url.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(url);
  }
  
  // If trying to access login/register when already authenticated
  if (publicPaths.some(path => pathname === path) && pathname !== '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
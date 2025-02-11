// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of allowed origins (add your own here)
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend-domain.com'
];

// Middleware function
export async function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get('origin') || '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const preflightHeaders = new Headers({
      'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });

    return new NextResponse(null, {
      status: 204,
      headers: preflightHeaders,
    });
  }

  // Handle regular requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
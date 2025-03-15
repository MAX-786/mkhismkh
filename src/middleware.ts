import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';
import { isUserAdmin } from './lib/auth';

// Define protected routes that require admin access
const isAdminRoute = createRouteMatcher([
  '/garden/admin/:path*',
  '/api/garden/:path*'
]);

// Define routes that require authentication
const isAuthRoute = createRouteMatcher([
  '/garden/admin/:path*',
  '/api/garden/:path*'
]);

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId } = auth();
  
  // Check if route requires authentication
  if (isAuthRoute(context.request) && !userId) {
    return auth().redirectToSignIn();
  }
  
  // Check if route requires admin access
  if (isAdminRoute(context.request)) {
    const isAdmin = isUserAdmin(userId);
    if (!isAdmin) {
      return new Response('Unauthorized: Admin access required', { status: 403 });
    }
  }
});
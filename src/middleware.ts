import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";
import { isUserAdmin } from "./lib/auth";

// Define protected routes that require admin access
const isAdminRoute = createRouteMatcher([
  "/garden/admin/:path*",
  "/api/garden/:path*",
]);

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId } = auth();
  const url = new URL(context.request.url);

  // Check if route requires authentication
  if (isAdminRoute(context.request) && !userId) {
    return auth().redirectToSignIn({
      returnBackUrl: url.pathname,
    });
  }

  // Check if route requires admin access
  if (isAdminRoute(context.request)) {
    const isAdmin = isUserAdmin(userId);
    if (!isAdmin) {
      return new Response("Unauthorized: Admin access required", {
        status: 403,
      });
    }
  }
});

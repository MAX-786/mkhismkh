import { createClerkClient } from '@clerk/clerk-sdk-node';

// Initialize Clerk client with your secret key
const clerk = createClerkClient({
  secretKey: import.meta.env.CLERK_SECRET_KEY
});

// List of admin user IDs from Clerk
export const ADMIN_USER_IDS = import.meta.env.ADMIN_USER_IDS.split(',');

// Check if a user is an admin
export async function isUserAdmin(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  // return true; // For testing purposes
  return ADMIN_USER_IDS.includes(userId);
}

// Get current user data
export async function getCurrentUser(userId: string | null) {
  if (!userId) return null;
  try {
    return await clerk.users.getUser(userId);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
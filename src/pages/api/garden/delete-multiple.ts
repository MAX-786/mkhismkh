import type { APIRoute } from "astro";
import { isUserAdmin } from "@/lib/auth";
import { deleteMultipleTrees, deleteMultipleLeaves } from "@/lib/supabase";

export const POST: APIRoute = async ({ request, locals }) => {
  // Check if user is admin
  const { userId } = locals.auth();
  
  // Return 401 if not signed in
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  
  const isAdmin = await isUserAdmin(userId);

  // Return 403 if signed in but not admin
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: "Forbidden: Admin access required" }), {
      status: 403,
    });
  }

  try {
    const body = await request.json();
    const { ids, type } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0 || !type) {
      return new Response(JSON.stringify({ error: "Missing or invalid required fields" }), {
        status: 400,
      });
    }

    let result;
    if (type === "tree") {
      result = await deleteMultipleTrees(ids);
    } else if (type === "leaf") {
      result = await deleteMultipleLeaves(ids);
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), {
        status: 400,
      });
    }

    if (result.error) {
      throw result.error;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting multiple items:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};
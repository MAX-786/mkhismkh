import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const path = url.searchParams.get('path');
  
  // Validate token
  if (token !== import.meta.env.REVALIDATE_TOKEN) {
    return new Response(JSON.stringify({ 
      message: 'Invalid token' 
    }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Validate path
  if (!path) {
    return new Response(JSON.stringify({ 
      message: 'Path is required' 
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // This is Vercel-specific
    await fetch(`https://mkhismkh.com${path}?updated=true`);
    
    return new Response(JSON.stringify({ 
      message: `Revalidated ${path}` 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ 
      message: `Error revalidating: ${error.message}` 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
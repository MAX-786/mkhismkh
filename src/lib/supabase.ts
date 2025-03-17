import { createClient } from "@supabase/supabase-js";

// Create a Supabase client using environment variables
export const createSupabaseClient = () => {
  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.SUPABASE_KEY;
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Garden-specific functions
export const getTree = async (slug: string) => {
  const supabase = createSupabaseClient();
  return await supabase
    .from("trees")
    .select(
      `
      *,
      leaves (
        *,
        leaf_references (*)
      )
    `,
    )
    .eq("slug", slug)
    .single();
};

export const getLeaf = async (treeSlug: string, leafSlug: string) => {
  const supabase = createSupabaseClient();
  const { data: tree } = await getTree(treeSlug);
  
  if (!tree || !tree.leaves) {
    return { data: null, error: new Error("Tree or leaves not found") };
  }
  
  const leaf = tree.leaves.find((l: any) => l.slug === leafSlug);
  return { data: leaf, error: leaf ? null : new Error("Leaf not found") };
};

export const getAllTrees = async () => {
  const supabase = createSupabaseClient();
  return await supabase.from("trees").select(`
      *,
      leaves (
        *,
        leaf_references (*)
      )
    `);
};

export const createTree = async (treeData: any) => {
  const supabase = createSupabaseClient();
  return await supabase.from("trees").insert(treeData).select().single();
};

export const updateTree = async (slug: any, treeData: any) => {
  const supabase = createSupabaseClient();
  return await supabase.from("trees").update(treeData).eq("slug", slug).select().single();
};

export const createLeaf = async (leafData: any) => {
  const supabase = createSupabaseClient();
  return await supabase.from("leaves").insert(leafData).select().single();
};

export const updateLeaf = async (id: any, leafData: any) => {
  const supabase = createSupabaseClient();
  return await supabase.from("leaves").update(leafData).eq("id", id).select().single();
};

// Add a function to invalidate ISR cache (for Vercel)
export const revalidateCache = async (paths: string[]) => {
  if (typeof window !== 'undefined') return; // Only run on server
  
  try {
    const token = import.meta.env.REVALIDATE_TOKEN;
    if (!token) return;
    
    for (const path of paths) {
      await fetch(`/api/revalidate?path=${path}&token=${token}`);
    }
  } catch (error) {
    console.error("Failed to revalidate:", error);
  }
};

export const deleteTree = async (id: number) => {
  const supabase = createSupabaseClient();
  return await supabase.from("trees").delete().eq("id", id);
};

export const deleteLeaf = async (id: number) => {
  const supabase = createSupabaseClient();
  return await supabase.from("leaves").delete().eq("id", id);
};

export const deleteMultipleTrees = async (ids: number[]) => {
  const supabase = createSupabaseClient();
  return await supabase.from("trees").delete().in("id", ids);
};

export const deleteMultipleLeaves = async (ids: number[]) => {
  const supabase = createSupabaseClient();
  return await supabase.from("leaves").delete().in("id", ids);
};

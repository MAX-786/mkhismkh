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

export const getGrowthStages = async () => {
  const supabase = createSupabaseClient();
  return await supabase.from("growth_stages").select("*");
};

export const createTree = async (tree: {
  name: string;
  slug: string;
  description: string;
}) => {
  const supabase = createSupabaseClient();
  return await supabase.from("trees").insert([tree]);
};

export const createLeaf = async (leaf: {
  title: string;
  slug: string;
  content: string;
  growth_stage: string;
  tree_id: number;
  tags: string[];
}) => {
  const supabase = createSupabaseClient();
  return await supabase.from("leaves").insert([leaf]);
};

export const updateTree = async (
  id: number,
  tree: { name: string; slug: string; description: string },
) => {
  const supabase = createSupabaseClient();
  return await supabase.from("trees").update(tree).eq("id", id);
};

export const updateLeaf = async (
  id: number,
  leaf: {
    title: string;
    slug: string;
    content: string;
    growth_stage: string;
    tags: string[];
  },
) => {
  const supabase = createSupabaseClient();
  return await supabase.from("leaves").update(leaf).eq("id", id);
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

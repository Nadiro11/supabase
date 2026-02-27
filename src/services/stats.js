
import { supabase } from "../lib/supabaseClient";

export async function fetchStats() {
  const { data, error } = await supabase.rpc("get_stats");

  if (error) throw error;

  return data?.[0] ?? {
    total_posts: 0,
    avg_comments_per_post: 0,
    avg_posts_per_user: 0,
  };
}
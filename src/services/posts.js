import { supabase } from "../lib/supabaseClient";

export async function fetchPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, content, user_id, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createPost({ title, content, userId }) {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function subscribeToPosts(onChange) {
  const channel = supabase
    .channel("realtime-posts")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "posts" },
      (payload) => onChange(payload)
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function deletePost(postId) {
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) throw error;
}
import { supabase } from "../lib/supabaseClient";

export async function fetchCommentsByPostId(postId) {
  const { data, error } = await supabase
    .from("comments")
    .select("id, post_id, user_id, content, created_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createComment({ postId, content, userId }) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id: postId, content, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function subscribeToComments(onChange) {
  const channel = supabase
    .channel("realtime-comments")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "comments" },
      (payload) => onChange(payload)
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function deleteComment(commentId) {
  const { error } = await supabase.from("comments").delete().eq("id", commentId);
  if (error) throw error;
}
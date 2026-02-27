import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createComment } from "../services/comments";

export default function CommentForm({ postId, onCreated }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const newComment = await createComment({
        postId,
        content,
        userId: user.id,
      });
      setContent("");
      if (onCreated) onCreated(newComment);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, marginTop: 10 }}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Écrire un commentaire..."
        required
        style={{ flex: 1 }}
      />
      <button type="submit">Envoyer</button>
      {msg ? <p style={{ marginLeft: 8 }}>{msg}</p> : null}
    </form>
  );
}
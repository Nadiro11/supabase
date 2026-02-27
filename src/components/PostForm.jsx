import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createPost } from "../services/posts";

export default function PostForm({ onCreated }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const newPost = await createPost({ title, content, userId: user.id });
      setTitle("");
      setContent("");
      if (onCreated) onCreated(newPost);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 6, marginBottom: 16 }}>
      <h3>Nouveau post</h3>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label>
          Titre
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label>
          Contenu
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} required />
        </label>

        <button type="submit">Publier</button>
        {msg ? <p>{msg}</p> : null}
      </form>
    </div>
  );
}
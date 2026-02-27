import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { deleteComment } from "../services/comments";

export default function CommentList({ comments }) {
  const { isAdmin } = useAuth();
  const [msg, setMsg] = useState("");

  if (!comments.length) return <p style={{ margin: "8px 0" }}>Aucun commentaire.</p>;

  const handleDelete = async (commentId) => {
    setMsg("");
    try {
      await deleteComment(commentId);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
      {msg ? <p>{msg}</p> : null}

      {comments.map((c) => (
        <div
          key={c.id}
          style={{
            padding: 10,
            border: "1px solid #eee",
            borderRadius: 6,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{c.content}</p>
            <small>{new Date(c.created_at).toLocaleString()}</small>
          </div>

          {isAdmin ? (
            <button onClick={() => handleDelete(c.id)}>Supprimer</button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
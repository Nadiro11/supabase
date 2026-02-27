import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { fetchCommentsByPostId, subscribeToComments } from "../services/comments";
import { deletePost } from "../services/posts";
import { useAuth } from "../contexts/AuthContext";

export default function PostItem({ post }) {
  const { isAdmin } = useAuth();
  const [comments, setComments] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    fetchCommentsByPostId(post.id)
      .then((data) => {
        if (!mounted) return;
        setComments(data);
      })
      .catch((err) => setErrorMsg(err.message));

    const unsubscribe = subscribeToComments((payload) => {
      if (payload.new?.post_id === post.id || payload.old?.post_id === post.id) {
        fetchCommentsByPostId(post.id)
          .then((data) => setComments(data))
          .catch(() => {});
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [post.id]);

  const handleCreated = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const handleDeletePost = async () => {
    setActionMsg("");
    try {
      await deletePost(post.id);
    } catch (err) {
      setActionMsg(err.message);
    }
  };

  return (
    <article style={{ padding: 16, border: "1px solid #ddd", borderRadius: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h4 style={{ margin: 0 }}>{post.title}</h4>
          <small>{new Date(post.created_at).toLocaleString()}</small>
        </div>

        {isAdmin ? (
          <button onClick={handleDeletePost}>Supprimer</button>
        ) : null}
      </div>

      <p style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{post.content}</p>

      {actionMsg ? <p>{actionMsg}</p> : null}

      <div style={{ marginTop: 12 }}>
        <strong>Commentaires</strong>
        {errorMsg ? <p>{errorMsg}</p> : null}
        <CommentList comments={comments} />
        <CommentForm postId={post.id} onCreated={handleCreated} />
      </div>
    </article>
  );
}
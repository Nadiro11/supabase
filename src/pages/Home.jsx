import { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { fetchPosts, subscribeToPosts } from "../services/posts";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    fetchPosts()
      .then((data) => {
        if (!mounted) return;
        setPosts(data);
      })
      .catch((err) => setErrorMsg(err.message));

    const unsubscribe = subscribeToPosts((payload) => {
      fetchPosts()
        .then((data) => setPosts(data))
        .catch(() => {});
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const handleCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div style={{ padding: 16, maxWidth: 900 }}>
      <h2>Posts</h2>

      <PostForm onCreated={handleCreated} />

      {errorMsg ? <p>{errorMsg}</p> : null}
      <PostList posts={posts} />
    </div>
  );
}
import PostItem from "./PostItem";

export default function PostList({ posts }) {
  if (!posts.length) return <p>Aucun post pour le moment.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {posts.map((p) => (
        <PostItem key={p.id} post={p} />
      ))}
    </div>
  );
}
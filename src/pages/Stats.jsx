
import { useEffect, useState } from "react";
import { fetchStats } from "../services/stats";

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        const result = await fetchStats();
        if (isMounted) setStats(result);
      } catch (err) {
        if (isMounted) setErrorMsg(err.message || "Erreur lors du chargement des statistiques");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Chargement…</div>;
  if (errorMsg) return <div style={{ color: "crimson" }}>{errorMsg}</div>;

  const totalPosts = stats?.total_posts ?? 0;

  const avgComments = Number(stats?.avg_comments_per_post ?? 0);
  const avgPostsUser = Number(stats?.avg_posts_per_user ?? 0);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1>Statistiques</h1>

      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 14, opacity: 0.7 }}>Nombre total de posts</div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{totalPosts}</div>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 14, opacity: 0.7 }}>Nombre moyen de commentaires par post</div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{avgComments.toFixed(2)}</div>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 14, opacity: 0.7 }}>Nombre moyen de posts par utilisateur</div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{avgPostsUser.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
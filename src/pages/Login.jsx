import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate("/");
  }

  const signUp = async (e) => {
    e.preventDefault();
    setMsg("");

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setMsg(error.message);

    setMsg("Compte créé. Vérifie tes emails si confirmation nécessaire, puis connecte-toi.");
  };

  const signIn = async (e) => {
    e.preventDefault();
    setMsg("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);

    navigate("/");
  };

  return (
    <div style={{ padding: 16, maxWidth: 420 }}>
      <h2>Connexion</h2>

      <form onSubmit={signIn} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>

        <label>
          Mot de passe
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit">Se connecter</button>
          <button type="button" onClick={signUp}>Créer un compte</button>
        </div>

        {msg ? <p>{msg}</p> : null}
      </form>
    </div>
  );
}
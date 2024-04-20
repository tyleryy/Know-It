"use client";
import { useState } from "react";
import { useSupabaseAuth, signIn } from "@supabase/ui";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { supabaseUser } = useSupabaseAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await signIn({
      email,
      password,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {supabaseUser ? (
        <div>Logged in as {supabaseUser.email}</div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;

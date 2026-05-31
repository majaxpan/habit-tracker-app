import { useState } from "react";
import { setToken } from "../auth";

function Login({ setToken, setEmail }) {
  const [email, setEmailInput] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      setToken(data.token);

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);

      setEmail(email); // prop → App state
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f6f6f6",
      }}
    >
      <div
        style={{
          width: "320px",
          padding: "20px",
          borderRadius: "10px",
          background: "white",
          border: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h2 style={{ margin: 0 }}>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmailInput(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            background: "#111",
            color: "white",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

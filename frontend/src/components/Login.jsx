import { useState, useEffect } from "react";
import { setToken } from "../auth";

function Login({ setToken, setEmail }) {
  const [email, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

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

  const handleRegister = async () => {
    setError("");

    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    const loginRes = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!loginRes.ok) {
      setError("Registration succeeded but login failed.");
      return;
    }

    const loginData = await loginRes.json();

    if (loginData.token) {
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("email", email);

      setEmail(email);
      setToken(loginData.token);
    }
  };

  useEffect(() => {
    setEmailInput("");
    setPassword("");
    setError("");
  }, [isRegister]);

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
        <h2 style={{ margin: 0 }}>{isRegister ? "Register" : "Login"}</h2>

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
          onClick={isRegister ? handleRegister : handleLogin}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            background: "#111",
            color: "white",
            cursor: "pointer",
          }}
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
          }}
          style={{
            background: "none",
            border: "none",
            color: "#555",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>

        {error && (
          <div
            style={{
              color: "#b00020",
              background: "#ffe8e8",
              padding: "8px",
              borderRadius: "6px",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

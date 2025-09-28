import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css"; // import the CSS file

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccess(location.state.successMessage);
      const timer = setTimeout(() => setSuccess(""), 3000); // hide after 3s
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await await axios.post(`${process.env.VITE_API_URL}/api/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/"); // redirect to home
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <label>
            Username
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="/register">Create one</a>
        </p>
      </div>
    </div>
  );
}

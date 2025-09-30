import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // reuse the same CSS file
import { API } from "../api"; // <-- added import
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // reset error on each submit
    try {
      await axios.post(`${API}/api/auth/register`, { username, password }); // <-- updated URL
      // Redirect to login with a success message
      navigate("/login", { state: { successMessage: "Account successfully created!" } });
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Create Account</h1>
        <form onSubmit={handleRegister} className="login-form">
          {error && <p className="error" style={{ color: "red" }}>{error}</p>}
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
            Register
          </button>
        </form>
        <p className="login-footer">
        Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

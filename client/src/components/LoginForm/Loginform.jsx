import { useState } from "react";
import { FaUserAlt, FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Loginform.css";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook untuk navigasi

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error sebelum login

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Simpan token ke localStorage
        onLogin(); // Set state login di App.js
        navigate("/"); // Navigasi ke /homepage
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="loginbody">
      <div className="loginform">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="inputbox">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUserAlt className="icon" />
          </div>
          <div className="inputbox">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaKey className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
          <div className="register-link">
            <p>
              Don`t have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;

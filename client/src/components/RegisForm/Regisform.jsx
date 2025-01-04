import "./Regisform.css";
import { FaUserAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Regisform = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Tambahkan logika registrasi di sini jika diperlukan
    alert("Registration successful! Redirecting to login...");
    navigate("/login"); // Navigasi ke halaman login
  };
  return (
    <div className="registerform">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className="inputbox">
          <input type="text" placeholder="Username" required />
          <FaUserAlt className="icon" />
        </div>
        <div className="inputbox">
          <input type="email" placeholder="Email" required />
          <FaKey className="icon" />
        </div>
        <div className="inputbox">
          <input type="password" placeholder="Password" required />
          <FaKey className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
        </div>
        <button type="submit">Register</button>
        <div className="register-link">
          <p>
            Have an account? <a href="login">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Regisform;

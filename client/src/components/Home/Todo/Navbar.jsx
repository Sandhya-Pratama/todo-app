import "./home.css";
import { FaSun } from "react-icons/fa";
export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <h1>To Do List</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="username">Hello, Sandhya</span>
          <button className="dark-mode-toggle">
            <FaSun />
          </button>
        </div>
      </div>
    </>
  );
}

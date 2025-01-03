import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loginform from "./components/LoginForm/Loginform";
import Homepage from "./components/Home/Homepage";
import Regisform from "./components/RegisForm/Regisform";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Homepage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<Loginform onLogin={handleLogin} />} />
        <Route path="/register" element={<Regisform />} />
      </Routes>
    </Router>
  );
}

export default App;

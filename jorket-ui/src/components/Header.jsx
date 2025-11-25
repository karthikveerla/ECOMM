import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; 
// REMOVED: import "../styles/Header.css";

// Estimated header height is 64px (p-4 + content) -> h-16
const HEADER_HEIGHT_CLASS = "h-16"; 
const HEADER_BACKGROUND_COLOR = "bg-[#985de5]"; // Using bracket notation for exact color

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Re-run effect whenever route changes
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("userName");

    if (token && name) {
      // ✅ Verify token validity with backend
      axios
        .get("http://localhost:8080/api/v1/user/validate", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setIsLoggedIn(true);
          setUserName(name);
        })
        .catch(() => {
          // ❌ Token invalid → force logout
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
          localStorage.removeItem("userEmail");
          setIsLoggedIn(false);
          setUserName("");
        });
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [location.pathname]);

  // Optional: handle login/logout from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("accessToken");
      const name = localStorage.getItem("userName");
      setIsLoggedIn(!!token);
      setUserName(name || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <header
      className={`
        fixed top-0 w-full z-10 ${HEADER_BACKGROUND_COLOR} shadow-md
        flex justify-between items-center 
        p-4 ${HEADER_HEIGHT_CLASS} 
        text-[#ebedf0]
      `}
    >
      <div className="flex items-center"> {/* Combined .logo styles */}
        <Link to="/" className="text-white text-2xl font-bold no-underline">
          {/* H1 style from .logo h1 */}
          <h1>ET</h1> 
        </Link>

      </div>

      <nav className="flex items-center"> {/* Combined .nav-links styles */}
        {!isLoggedIn ? (
          <>
            <Link
              to="/signin"
              className="ml-4 text-[#cad0d7] no-underline font-medium hover:underline"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="ml-4 text-[#cad0d7] no-underline font-medium hover:underline"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div
            className="flex items-center gap-4"
          >
            <span className="text-[#ebedf0] font-medium">
              Hello, {userName}
            </span>
            <button
              onClick={handleLogout}
              className="
                bg-red-600 hover:bg-red-700 text-white 
                border-none rounded 
                px-3 py-1.5 
                cursor-pointer font-medium text-base
              "
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
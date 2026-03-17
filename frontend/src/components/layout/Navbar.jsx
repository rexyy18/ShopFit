import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = ["HOME", "MEN", "LADIES", "NEW", "FASHION", "CONTACT"];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className="page-container"
      style={{
        backgroundColor: "#fff",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      {/* Logo */}
      <Link to="/">
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              letterSpacing: "3px",
              color: "#222",
            }}
          >
            DRESS STORE
          </div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#888",
            }}
          >
            EST. 2024
          </div>
        </div>
      </Link>

      {/* Nav Links */}
      <ul className="nav-links desktop-only" style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        {navLinks.map((link) => {
          const path = link === "HOME" ? "/" : `/${link.toLowerCase()}`;
          const isActive = location.pathname === path;

          return (
            <li key={link}>
              <Link
                to={path}
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  color: isActive ? "#c8a96e" : "#222",
                  borderBottom: isActive ? "2px solid #c8a96e" : "none",
                  paddingBottom: "3px",
                  transition: "color 0.3s",
                }}
              >
                {link}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Right Side - Search & Hamburger Menu */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "8px 15px",
              border: "1px solid #ddd",
              borderRadius: "20px",
              fontSize: "12px",
              outline: "none",
              width: "100%",
              maxWidth: "180px",
              backgroundColor: "#f9f9f9",
            }}
          />
          <button type="submit" style={{ display: "none" }}>Search</button>
        </form>

        <button
          onClick={() => setIsSidebarOpen(true)}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#222",
            display: "flex",
            alignItems: "center"
          }}
        >
          ☰
        </button>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;

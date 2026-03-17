import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen, onClose, handleLogout }) => {
  const { cartCount } = useCart();
  const { user } = useAuth();
  
  const navLinks = ["HOME", "MEN", "LADIES", "NEW", "FASHION", "CONTACT"];

  const linkStyle = {
    display: "block",
    fontSize: "15px",
    fontWeight: "600",
    color: "#222",
    textDecoration: "none",
    padding: "6px 0",
    transition: "color 0.2s",
  };

  return (
    <>
      {/* Dark Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          zIndex: 999,
        }}
      />

      {/* Sliding Sidebar Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-260px",
          width: "min(260px, 80vw)",
          height: "100vh",
          backgroundColor: "#fff",
          boxShadow: "-5px 0 15px rgba(0,0,0,0.05)",
          transition: "right 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "15px 25px", display: "flex", justifyContent: "flex-end", borderBottom: "1px solid #f0f0f0" }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#333",
              padding: "5px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Content Area */}
        <div style={{ padding: "25px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "25px" }}>

          {/* User Section (Logged In vs Logged Out) */}
          {user ? (
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#222", margin: "0 0 2px 0" }}>
                Hi, {user.name.split(" ")[0]}
              </h3>
              <p style={{ fontSize: "14px", color: "#666", margin: 0, lineHeight: "1.2" }}>
                Welcome back
              </p>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#222", margin: "0 0 15px 0" }}>
                Welcome
              </h3>
              <Link
                to="/login"
                onClick={onClose}
                style={{
                  ...linkStyle,
                  display: "inline-block",
                  backgroundColor: "#222",
                  color: "#fff",
                  padding: "12px 24px",
                  fontSize: "13px",
                  letterSpacing: "1px",
                  textAlign: "center",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                LOGIN / REGISTER
              </Link>
            </div>
          )}

          {/* Menu Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link
              to="/cart"
              onClick={onClose}
              style={{
                ...linkStyle,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>CART</span>
              {cartCount > 0 && (
                <span
                  style={{
                    backgroundColor: "#c8a96e",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "2px 8px",
                    fontSize: "11px",
                    fontWeight: "700",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Navigation Links */}
            <div className="mobile-show" style={{ margin: "10px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee", padding: "10px 0" }}>
              {navLinks.map((link) => {
                const path = link === "HOME" ? "/" : `/${link.toLowerCase()}`;
                return (
                  <Link
                    key={link}
                    to={path}
                    onClick={onClose}
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#666",
                      textDecoration: "none",
                      padding: "8px 0",
                    }}
                  >
                    {link}
                  </Link>
                );
              })}
            </div>

            {user && user.isAdmin && (
              <Link to="/admin" onClick={onClose} style={linkStyle}>
                ADMIN DASHBOARD
              </Link>
            )}

            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  onClose();
                }}
                style={{
                  ...linkStyle,
                  background: "none",
                  border: "none",
                  margin: 0,
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  color: "#e53e3e", 
                }}
              >
                LOGOUT
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        const { data } = await API.post("/api/users/login", {
          email: formData.email,
          password: formData.password,
        });
        login(data);
        navigate("/");
      } else {
        const { data } = await API.post("/api/users/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        login(data);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f9f9f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "50px",
        width: "100%",
        maxWidth: "440px",
        boxShadow: "0 4px 30px rgba(0,0,0,0.08)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "2px", color: "#222" }}>
            {isLogin ? "WELCOME BACK" : "CREATE ACCOUNT"}
          </h1>
          <p style={{ color: "#999", fontSize: "13px", marginTop: "8px" }}>
            {isLogin ? "Login to your account" : "Join us today"}
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: "#fff0f0",
            border: "1px solid #ffcccc",
            color: "#cc0000",
            padding: "12px",
            marginBottom: "20px",
            fontSize: "13px",
            textAlign: "center",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", color: "#444", marginBottom: "8px" }}>
                FULL NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="username"
                style={{ width: "100%", padding: "12px 15px", border: "1px solid #ddd", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", color: "#444", marginBottom: "8px" }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="kofi@gmail.com"
              style={{ width: "100%", padding: "12px 15px", border: "1px solid #ddd", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", color: "#444", marginBottom: "8px" }}>
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="password"
              style={{ width: "100%", padding: "12px 15px", border: "1px solid #ddd", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#222",
              color: "#fff",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "2px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "PLEASE WAIT..." : isLogin ? "LOGIN" : "CREATE ACCOUNT"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "25px", fontSize: "13px", color: "#666" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            style={{ color: "#222", fontWeight: "700", cursor: "pointer", textDecoration: "underline" }}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

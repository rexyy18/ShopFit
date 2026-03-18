import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        marginTop: "80px",
      }}
    >
      {/* Promo Bar */}
      <div
        className="responsive-flex"
        style={{
          backgroundColor: "#222",
          borderBottom: "1px solid #333",
        }}
      >
        {[
          {
            icon: "",
            title: "FREE INTERNATIONAL DELIVERY",
            desc: "On all orders over $150.00",
          },
          {
            icon: "",
            title: "50% OFF DRESSES",
            desc: "Applies only to selected items marked down on site",
          },
          {
            icon: "",
            title: "BUY ONE GET ONE FREE",
            desc: "On almost everything",
          },
        ].map((promo, i) => (
          <div
            key={i}
            style={{
              padding: "25px 30px",
              textAlign: "center",
              borderRight: i < 2 ? "1px solid #333" : "none",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>
              {promo.icon}
            </div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "5px",
              }}
            >
              {promo.title}
            </p>
            <p style={{ fontSize: "12px", color: "#999" }}>{promo.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Footer */}
      <div
        className="footer-grid page-container"
        style={{
          padding: "60px",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "900",
              letterSpacing: "3px",
              marginBottom: "5px",
            }}
          >
            DRESS STORE
          </div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#888",
              marginBottom: "20px",
            }}
          >
            EST. 2024
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "#999",
              lineHeight: "1.8",
              maxWidth: "280px",
              marginBottom: "25px",
            }}
          >
            Your premier destination for elegant and stylish dresses. We curate
            the finest collections for every occasion.
          </p>

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { icon: <FaFacebookF />, color: "#1877f2" },
              { icon: <FaInstagram />, color: "#e4405f" },
              { icon: <FaTwitter />, color: "#1da1f2" },
              { icon: <FaPinterestP />, color: "#e60023" },
            ].map((social, i) => (
              <div
                key={i}
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#333",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: "#fff",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = social.color)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#333")
                }
              >
                {social.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "2px",
              marginBottom: "20px",
              color: "#fff",
            }}
          >
            QUICK LINKS
          </h3>
          <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Home", path: "/" },
              { label: "Shop", path: "/shop" },
              { label: "New Arrivals", path: "/new" },
              { label: "Fashion", path: "/fashion" },
              { label: "Contact Us", path: "/contact" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  style={{
                    fontSize: "13px",
                    color: "#999",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#c8a96e")}
                  onMouseLeave={(e) => (e.target.style.color = "#999")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "2px",
              marginBottom: "20px",
              color: "#fff",
            }}
          >
            CUSTOMER SERVICE
          </h3>
          <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "My Account",
              "Order History",
              "Shipping Policy",
              "Returns & Exchanges",
              "FAQ",
            ].map((item) => (
              <li key={item}>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#999",
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#c8a96e")}
                  onMouseLeave={(e) => (e.target.style.color = "#999")}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "2px",
              marginBottom: "20px",
              color: "#fff",
            }}
          >
            CONTACT US
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {[
              { icon: "", text: "123 Fashion Street, Accra, Ghana" },
              { icon: "", text: "+233 24 123 4567" },
              { icon: "", text: "info@dressstore.com" },
              { icon: "", text: "Mon - Sat: 9AM - 6PM" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "14px" }}>{item.icon}</span>
                <span
                  style={{ fontSize: "13px", color: "#999", lineHeight: "1.5" }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="responsive-flex"
        style={{
          borderTop: "1px solid #333",
          padding: "20px 40px",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px"
        }}
      >
        <p style={{ fontSize: "12px", color: "#666" }}>
          © 2024 Dress Store. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
            <span
              key={item}
              style={{
                fontSize: "12px",
                color: "#666",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#c8a96e")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

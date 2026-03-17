import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      {/* Hero Banner */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "60px 40px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "900",
            letterSpacing: "4px",
            marginBottom: "10px",
          }}
        >
          CONTACT US
        </h1>
        <p style={{ color: "#999", fontSize: "14px", letterSpacing: "1px" }}>
          We'd love to hear from you
        </p>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "70px auto",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "60px",
        }}
      >
        {/* Left - Contact Info */}
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "800",
              letterSpacing: "2px",
              color: "#222",
              marginBottom: "10px",
            }}
          >
            GET IN TOUCH
          </h2>
          <div
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "#c8a96e",
              marginBottom: "25px",
            }}
          />
          <p
            style={{
              fontSize: "14px",
              color: "#666",
              lineHeight: "1.8",
              marginBottom: "40px",
            }}
          >
            Have a question about your order, sizing, or anything else? Our team
            is here to help. Reach out and we'll get back to you as soon as
            possible.
          </p>

          {/* Info Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {[
              {
                icon: <FiMapPin size={20} />,
                title: "OUR STORE",
                text: "123 Fashion Street, Accra, Ghana",
              },
              {
                icon: <FiPhone size={20} />,
                title: "PHONE",
                text: "+233 24 123 4567",
              },
              {
                icon: <FiMail size={20} />,
                title: "EMAIL",
                text: "info@dressstore.com",
              },
              {
                icon: <FiClock size={20} />,
                title: "WORKING HOURS",
                text: "Mon - Sat: 9AM - 6PM",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "flex-start",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                  borderLeft: "3px solid #c8a96e",
                }}
              >
                <div style={{ color: "#c8a96e", marginTop: "2px" }}>
                  {item.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      color: "#222",
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </p>
                  <p style={{ fontSize: "13px", color: "#666" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <h3
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: "#222",
              marginBottom: "15px",
            }}
          >
            FOLLOW US
          </h3>
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { icon: <FaFacebookF />, color: "#1877f2" },
              { icon: <FaInstagram />, color: "#e4405f" },
              { icon: <FaTwitter />, color: "#1da1f2" },
              { icon: <FaPinterestP />, color: "#e60023" },
            ].map((social, i) => (
              <div
                key={i}
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundColor: "#222",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "15px",
                  color: "#fff",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = social.color)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#222")
                }
              >
                {social.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Right - Contact Form */}
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "800",
              letterSpacing: "2px",
              color: "#222",
              marginBottom: "10px",
            }}
          >
            SEND US A MESSAGE
          </h2>
          <div
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "#c8a96e",
              marginBottom: "30px",
            }}
          />

          {/* Success Message */}
          {submitted && (
            <div
              style={{
                backgroundColor: "#f0fff4",
                border: "1px solid #c3e6cb",
                color: "#2d6a4f",
                padding: "15px 20px",
                marginBottom: "25px",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              ✅ Thank you! Your message has been sent. We'll get back to you
              soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name & Email Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    color: "#444",
                    marginBottom: "8px",
                  }}
                >
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "1px solid #ddd",
                    fontSize: "13px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    color: "#444",
                    marginBottom: "8px",
                  }}
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "1px solid #ddd",
                    fontSize: "13px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                />
              </div>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  color: "#444",
                  marginBottom: "8px",
                }}
              >
                SUBJECT *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #ddd",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: "30px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  color: "#444",
                  marginBottom: "8px",
                }}
              >
                MESSAGE *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
                rows={6}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #ddd",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  resize: "vertical",
                  fontFamily: "inherit",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#c8a96e")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                backgroundColor: "#222",
                color: "#fff",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "2px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#c8a96e")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#222")}
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

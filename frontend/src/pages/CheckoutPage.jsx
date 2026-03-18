import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) navigate("/");
  }, [cartItems, orderPlaced]);

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color,
        })),
        shippingAddress: formData,
      };

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data: order } = await API.post("/api/orders", orderData, config);

      setLoading(false);

      // Open Paystack popup
      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: user.email,
        amount: Math.round(cartTotal * 100),
        currency: "GHS",
        ref: `order_${order._id}_${Date.now()}`,
        onSuccess: function (response) {
          API.put(
            `/api/orders/${order._id}/pay`,
            { reference: response.reference },
            config
          ).then(() => {
            setOrderPlaced(true);
            clearCart();
            navigate(`/order/${order._id}`);
          }).catch(() => {
            setOrderPlaced(true);
            clearCart();
            navigate(`/order/${order._id}`);
          });
        },
        onCancel: function () {
          setError("Payment cancelled. Your order was saved but not paid.");
        },
      });

      handler.openIframe();

    } catch (err) {
      console.log("FULL ERROR:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: "1100px", margin: "60px auto", padding: "0 40px" }}>
      <h1 style={{
        fontSize: "26px",
        fontWeight: "800",
        letterSpacing: "2px",
        color: "#222",
        marginBottom: "40px",
        borderBottom: "2px solid #222",
        paddingBottom: "15px",
      }}>
        CHECKOUT
      </h1>

      <div className="checkout-grid">
        {/* Left - Shipping Form */}
        <div>
          <h2 style={{
            fontSize: "16px",
            fontWeight: "800",
            letterSpacing: "2px",
            color: "#222",
            marginBottom: "25px",
          }}>
            SHIPPING INFORMATION
          </h2>

          {error && (
            <div style={{
              backgroundColor: "#fff0f0",
              border: "1px solid #ffcccc",
              color: "#cc0000",
              padding: "12px",
              marginBottom: "20px",
              fontSize: "13px",
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { label: "FULL NAME", name: "fullName", type: "text", placeholder: "John Doe" },
              { label: "STREET ADDRESS", name: "address", type: "text", placeholder: "123 Main Street" },
              { label: "CITY", name: "city", type: "text", placeholder: "Accra" },
              { label: "PHONE NUMBER", name: "phone", type: "tel", placeholder: "0241234567" },
            ].map((field) => (
              <div key={field.name} style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  color: "#444",
                  marginBottom: "8px",
                }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                backgroundColor: "#222",
                color: "#fff",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "2px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                marginTop: "10px",
              }}
            >
              {loading ? "PROCESSING..." : "PROCEED TO PAYMENT"}
            </button>
          </form>
        </div>

        {/* Right - Order Summary */}
        <div style={{
          backgroundColor: "#f9f9f9",
          padding: "30px",
          position: "sticky",
          top: "100px",
        }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "800",
            letterSpacing: "2px",
            color: "#222",
            marginBottom: "25px",
            borderBottom: "2px solid #222",
            paddingBottom: "15px",
          }}>
            YOUR ORDER
          </h3>

          {cartItems.map((item, index) => (
            <div key={index} style={{
              display: "flex",
              gap: "15px",
              marginBottom: "15px",
              paddingBottom: "15px",
              borderBottom: "1px solid #eee",
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "60px",
                  height: "75px",
                  objectFit: "cover",
                  objectPosition: "top",
                  backgroundColor: "#eee",
                }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "13px", fontWeight: "600", color: "#222", marginBottom: "4px" }}>
                  {item.name}
                </p>
                <p style={{ fontSize: "11px", color: "#999", marginBottom: "2px" }}>
                  Size: {item.size} | Color: {item.color}
                </p>
                <p style={{ fontSize: "11px", color: "#999" }}>Qty: {item.quantity}</p>
              </div>
              <p style={{ fontSize: "14px", fontWeight: "700", color: "#222" }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13px", color: "#666" }}>
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "13px", color: "#666" }}>
            <span>Shipping</span>
            <span style={{ color: "#4CAF50" }}>FREE</span>
          </div>

          <div style={{
            borderTop: "1px solid #ddd",
            paddingTop: "15px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
            fontWeight: "800",
            color: "#222",
          }}>
            <span>TOTAL</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <div style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#fff",
            border: "1px solid #eee",
            textAlign: "center",
            fontSize: "12px",
            color: "#999",
          }}>
            Secured by Paystack
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
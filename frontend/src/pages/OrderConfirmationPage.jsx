import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await API.get(`/api/orders/${id}`, config);
        setOrder(data);
        setLoading(false);
      } catch { setLoading(false); }
    };
    if (user) fetchOrder();
  }, [id, user]);

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

  if (loading) return <div style={{ textAlign: "center", padding: "100px", color: "#999" }}>Loading order...</div>;
  if (!order) return <div style={{ textAlign: "center", padding: "100px", color: "#999" }}>Order not found.</div>;

  return (
    <div className="order-confirmation page-container" style={{ maxWidth: "750px", margin: "60px auto", padding: "0 40px" }}>

      {/* Success Banner */}
      <div style={{ backgroundColor: "#f0fff4", border: "1px solid #c3e6cb", padding: "30px", textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontSize: "50px", marginBottom: "15px" }}>✅</div>
        <h1 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "2px", color: "#222", marginBottom: "10px" }}>
          ORDER PLACED SUCCESSFULLY!
        </h1>
        <p style={{ color: "#666", fontSize: "14px" }}>Thank you for your order. We'll process it right away.</p>
        <p style={{ color: "#999", fontSize: "12px", marginTop: "10px", letterSpacing: "1px" }}>ORDER ID: {order._id}</p>
      </div>

      {/* Order Details */}
      <div style={{ backgroundColor: "#f9f9f9", padding: "30px", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: "800", letterSpacing: "2px", color: "#222", marginBottom: "20px", borderBottom: "2px solid #222", paddingBottom: "12px" }}>
          ORDER DETAILS
        </h2>
        {order.items.map((item, index) => (
          <div key={index} style={{ display: "flex", gap: "15px", marginBottom: "15px", paddingBottom: "15px", borderBottom: "1px solid #eee", alignItems: "center" }}>
            <div style={{ width: "55px", height: "70px", backgroundColor: "#eee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>👗</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "#222", marginBottom: "4px" }}>{item.name}</p>
              <p style={{ fontSize: "12px", color: "#999" }}>Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
            </div>
            <p style={{ fontSize: "14px", fontWeight: "700", color: "#222", flexShrink: 0 }}>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "800", color: "#222", paddingTop: "10px" }}>
          <span>TOTAL PAID</span><span>${order.totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Info */}
      <div style={{ backgroundColor: "#f9f9f9", padding: "30px", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: "800", letterSpacing: "2px", color: "#222", marginBottom: "20px", borderBottom: "2px solid #222", paddingBottom: "12px" }}>
          SHIPPING ADDRESS
        </h2>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "6px" }}>{order.shippingAddress.fullName}</p>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "6px" }}>{order.shippingAddress.address}</p>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "6px" }}>{order.shippingAddress.city}</p>
        <p style={{ fontSize: "14px", color: "#555" }}>{order.shippingAddress.phone}</p>
      </div>

      {/* Status Tracker */}
      <div style={{ backgroundColor: "#f9f9f9", padding: "30px", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: "800", letterSpacing: "2px", color: "#222", marginBottom: "20px", borderBottom: "2px solid #222", paddingBottom: "12px" }}>
          ORDER STATUS
        </h2>
        <div className="order-status-tracker" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#4CAF50", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", margin: "0 auto 8px" }}>✓</div>
            <p style={{ fontSize: "11px", fontWeight: "700", color: "#4CAF50" }}>ORDER PLACED</p>
          </div>
          <div style={{ flex: 1, height: "2px", backgroundColor: "#ddd", margin: "0 10px" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: order.isPaid ? "#4CAF50" : "#ddd", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", margin: "0 auto 8px" }}>
              {order.isPaid ? "✓" : "○"}
            </div>
            <p style={{ fontSize: "11px", fontWeight: "700", color: order.isPaid ? "#4CAF50" : "#999" }}>PAYMENT</p>
          </div>
          <div style={{ flex: 1, height: "2px", backgroundColor: "#ddd", margin: "0 10px" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: order.isDelivered ? "#4CAF50" : "#ddd", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", margin: "0 auto 8px" }}>
              {order.isDelivered ? "✓" : "○"}
            </div>
            <p style={{ fontSize: "11px", fontWeight: "700", color: order.isDelivered ? "#4CAF50" : "#999" }}>DELIVERED</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "15px" }}>
        <button onClick={() => navigate("/")} style={{ flex: 1, padding: "16px", backgroundColor: "#222", color: "#fff", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", border: "none", cursor: "pointer" }}>
          CONTINUE SHOPPING
        </button>
        <button onClick={() => navigate("/")} style={{ flex: 1, padding: "16px", backgroundColor: "transparent", color: "#222", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", border: "1px solid #222", cursor: "pointer" }}>
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
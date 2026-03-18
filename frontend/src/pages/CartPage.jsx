import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "100px 40px", minHeight: "60vh" }}>
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>🛒</div>
        <h2 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "2px", color: "#222", marginBottom: "15px" }}>
          YOUR CART IS EMPTY
        </h2>
        <p style={{ color: "#999", marginBottom: "30px" }}>Looks like you haven't added anything yet.</p>
        <button
          onClick={() => navigate("/")}
          style={{ backgroundColor: "#222", color: "#fff", padding: "14px 35px", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", border: "none", cursor: "pointer" }}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: "1100px", margin: "60px auto", padding: "0 40px" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "2px", color: "#222", marginBottom: "40px", borderBottom: "2px solid #222", paddingBottom: "15px" }}>
        SHOPPING CART ({cartItems.length})
      </h1>

      <div className="cart-grid" style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "40px", alignItems: "start" }}>

        {/* Cart Items */}
        <div>
          {/* Column Headers - hide on mobile */}
          <div className="desktop-only" style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr 120px 120px 40px",
            gap: "15px",
            padding: "10px 0",
            borderBottom: "1px solid #eee",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "1px",
            color: "#999",
            marginBottom: "10px",
          }}>
            <span>IMAGE</span>
            <span>PRODUCT</span>
            <span style={{ textAlign: "center" }}>QUANTITY</span>
            <span style={{ textAlign: "right" }}>PRICE</span>
            <span></span>
          </div>

          {/* Items */}
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item-row" style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 120px 120px 40px",
              gap: "15px",
              padding: "20px 0",
              borderBottom: "1px solid #f0f0f0",
              alignItems: "center",
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "80px", height: "100px", objectFit: "cover", objectPosition: "top", backgroundColor: "#f5f5f5", cursor: "pointer" }}
                onClick={() => navigate(`/product/${item._id}`)}
              />
              <div>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#222", marginBottom: "6px" }}>{item.name}</p>
                <p style={{ fontSize: "12px", color: "#999", marginBottom: "3px" }}>Size: {item.size}</p>
                <p style={{ fontSize: "12px", color: "#999", textTransform: "capitalize" }}>Color: {item.color}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <button
                  onClick={() => updateQuantity(item._id, item.size, item.color, item.quantity - 1)}
                  style={{ width: "30px", height: "30px", border: "1px solid #ddd", backgroundColor: "#f5f5f5", cursor: "pointer", fontSize: "16px" }}
                >−</button>
                <span style={{ width: "35px", height: "30px", border: "1px solid #ddd", borderLeft: "none", borderRight: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "600" }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item._id, item.size, item.color, item.quantity + 1)}
                  style={{ width: "30px", height: "30px", border: "1px solid #ddd", backgroundColor: "#f5f5f5", cursor: "pointer", fontSize: "16px" }}
                >+</button>
              </div>
              <p style={{ fontSize: "15px", fontWeight: "700", color: "#222", textAlign: "right" }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item._id, item.size, item.color)}
                style={{ backgroundColor: "transparent", border: "none", color: "#999", fontSize: "18px", cursor: "pointer", padding: "5px" }}
              >✕</button>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={clearCart}
              style={{ backgroundColor: "transparent", border: "1px solid #ddd", color: "#999", padding: "10px 20px", fontSize: "12px", letterSpacing: "1px", cursor: "pointer" }}
            >
              CLEAR CART
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ backgroundColor: "#f9f9f9", padding: "30px", position: "sticky", top: "100px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", letterSpacing: "2px", color: "#222", marginBottom: "25px", borderBottom: "2px solid #222", paddingBottom: "15px" }}>
            ORDER SUMMARY
          </h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "13px", color: "#666" }}>
            <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "13px", color: "#666" }}>
            <span>Shipping</span><span style={{ color: "#4CAF50" }}>FREE</span>
          </div>
          <div style={{ borderTop: "1px solid #ddd", margin: "20px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px", fontSize: "18px", fontWeight: "800", color: "#222" }}>
            <span>TOTAL</span><span>${cartTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            style={{ width: "100%", padding: "16px", backgroundColor: "#222", color: "#fff", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", border: "none", cursor: "pointer", marginBottom: "12px" }}
          >
            PROCEED TO CHECKOUT
          </button>
          <button
            onClick={() => navigate("/")}
            style={{ width: "100%", padding: "16px", backgroundColor: "transparent", color: "#222", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", border: "1px solid #222", cursor: "pointer" }}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
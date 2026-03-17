import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const AnnouncementBar = () => {
  const { cartCount } = useCart();

  return (
    <div
      className="responsive-flex"
      style={{
        backgroundColor: "#222",
        color: "#fff",
        textAlign: "center",
        padding: "8px 20px",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>Free shipping on orders over $150</span>
      <span>Currency: USD | Language: EN</span>
      <div style={{ display: "flex", gap: "15px" }}>
        <span style={{ cursor: "pointer" }}></span>
        <Link to="/cart" style={{ cursor: "pointer" }}>
           SHOPPING CART ({cartCount})
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementBar;

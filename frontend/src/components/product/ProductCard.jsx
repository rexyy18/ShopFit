import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", position: "relative" }}
    >
      {/* Image Container */}
      <div
        style={{
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
          height: "320px",
          position: "relative",
        }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
        {hovered && (
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              backgroundColor: "#222",
              color: "#fff",
              textAlign: "center",
              padding: "12px",
              fontSize: "12px",
              letterSpacing: "2px",
              fontWeight: "600",
            }}
          >
            QUICK VIEW
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: "12px 0" }}>
        <p style={{ fontSize: "13px", color: "#444", marginBottom: "6px" }}>
          {product.name}
        </p>
        <p style={{ fontSize: "15px", fontWeight: "700", color: "#222" }}>
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

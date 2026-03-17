import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return setError("Please select a size");
    if (!selectedColor) return setError("Please select a color");
    setError("");
    addToCart(product, quantity, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "100px", color: "#999" }}>
        Loading...
      </div>
    );

  if (!product)
    return (
      <div style={{ textAlign: "center", padding: "100px", color: "#999" }}>
        Product not found.
      </div>
    );

  return (
    <div style={{ maxWidth: "1100px", margin: "60px auto", padding: "0 40px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
        }}
      >
        {/* Left - Image */}
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            style={{
              width: "100%",
              height: "550px",
              objectFit: "cover",
              objectPosition: "top",
              backgroundColor: "#f5f5f5",
            }}
          />
        </div>

        {/* Right - Details */}
        <div>
          {/* Name */}
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "800",
              letterSpacing: "1px",
              color: "#222",
              marginBottom: "15px",
            }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <p
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#c8a96e",
              marginBottom: "20px",
            }}
          >
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "14px",
              color: "#666",
              lineHeight: "1.8",
              marginBottom: "30px",
              borderBottom: "1px solid #eee",
              paddingBottom: "30px",
            }}
          >
            {product.description}
          </p>

          {/* Size Selector */}
          <div style={{ marginBottom: "25px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1px",
                color: "#444",
                marginBottom: "12px",
              }}
            >
              SIZE: <span style={{ color: "#c8a96e" }}>{selectedSize}</span>
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: "45px",
                    height: "45px",
                    border:
                      selectedSize === size
                        ? "2px solid #222"
                        : "1px solid #ddd",
                    backgroundColor: selectedSize === size ? "#222" : "#fff",
                    color: selectedSize === size ? "#fff" : "#222",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div style={{ marginBottom: "25px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1px",
                color: "#444",
                marginBottom: "12px",
              }}
            >
              COLOR:{" "}
              <span style={{ color: "#c8a96e", textTransform: "capitalize" }}>
                {selectedColor}
              </span>
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    border:
                      selectedColor === color
                        ? "3px solid #222"
                        : "2px solid #ddd",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: "25px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1px",
                color: "#444",
                marginBottom: "12px",
              }}
            >
              QUANTITY
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #ddd",
                  backgroundColor: "#f5f5f5",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                −
              </button>
              <span
                style={{
                  width: "50px",
                  height: "40px",
                  border: "1px solid #ddd",
                  borderLeft: "none",
                  borderRight: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #ddd",
                  backgroundColor: "#f5f5f5",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p style={{ color: "red", fontSize: "13px", marginBottom: "15px" }}>
              {error}
            </p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: added ? "#4CAF50" : "#222",
              color: "#fff",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "2px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
              marginBottom: "15px",
            }}
          >
            {added ? "✓ ADDED TO CART" : "ADD TO CART"}
          </button>

          {/* Stock Info */}
          <p style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
            {product.countInStock > 0
              ? `${product.countInStock} items in stock`
              : "Out of stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

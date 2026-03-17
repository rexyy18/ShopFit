import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const tabs = ["ALL", "SPECIAL", "BEST SELLER", "FEATURED"];

const ProductGrid = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = () => {
    if (activeTab === "ALL") return products;
    if (activeTab === "SPECIAL")
      return products.filter((p) => p.tag === "special");
    if (activeTab === "BEST SELLER")
      return products.filter((p) => p.tag === "bestseller");
    if (activeTab === "FEATURED")
      return products.filter((p) => p.tag === "featured");
    return products;
  };

  return (
    <div className="page-container" style={{ padding: "60px 40px" }}>
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginBottom: "40px",
          borderBottom: "1px solid #eee",
          paddingBottom: "15px",
          overflowX: "auto",
          whiteSpace: "nowrap"
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none",
              border: "none",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "1px",
              color: activeTab === tab ? "#222" : "#999",
              borderBottom: activeTab === tab ? "2px solid #222" : "none",
              paddingBottom: "5px",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
          Loading products...
        </div>
      )}

      {/* Empty */}
      {!loading && filteredProducts().length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
          No products in this category yet.
        </div>
      )}

      {/* Product Grid */}
      {!loading && filteredProducts().length > 0 && (
        <div className="product-grid">
          {filteredProducts().map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

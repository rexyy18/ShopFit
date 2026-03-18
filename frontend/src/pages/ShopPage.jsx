import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "../api";
import ProductCard from "../components/product/ProductCard";

const ShopPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState('newest');

  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("q");

  const getPageInfo = () => {
    const path = location.pathname;
    if (path === "/men") return { title: "MEN", category: "men" };
    if (path === "/ladies") return { title: "LADIES", category: "ladies" };
    if (path === "/new") return { title: "NEW ARRIVALS", category: "new" };
    if (path === "/fashion") return { title: "FASHION", category: "fashion" };
    return { title: "ALL PRODUCTS", category: "all" };
  };

  const { title, category } = getPageInfo();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = keyword ? `/api/products/search?q=${keyword}` : "/api/products";
        const { data } = await API.get(url);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);

  const filtered = (() => {
    let result = [...products];
    if (category !== "all") result = result.filter((p) => p.category === category);
    if (selectedSizes.length > 0) result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    result = result.filter((p) => p.price <= priceRange);
    if (sortBy === "newest") result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === "price-low") result = result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result = result.sort((a, b) => b.price - a.price);
    return result;
  })();

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const clearFilters = () => {
    setSelectedSizes([]);
    setPriceRange(500);
    setSortBy("newest");
  };

  return (
    <div>
      {!keyword && (
        <div style={{
          backgroundColor: "#1a1a1a",
          padding: "50px 40px",
          textAlign: "center",
          color: "#fff",
        }}>
          <h1 style={{
            fontSize: "36px",
            fontWeight: "900",
            letterSpacing: "4px",
            marginBottom: "10px",
          }}>
            {title}
          </h1>
        </div>
      )}

      {/* Main Layout - shop-layout class handles mobile stacking */}
      <div className="shop-layout page-container" style={{
        maxWidth: "1200px",
        margin: "50px auto",
        padding: "0 40px",
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        gap: "40px",
        alignItems: "start",
      }}>

        {/* Left - Filters Sidebar */}
        <div className="filter-sidebar" style={{ position: "sticky", top: "100px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}>
            <h2 style={{
              fontSize: "14px",
              fontWeight: "800",
              letterSpacing: "2px",
              color: "#222",
            }}>
              FILTERS
            </h2>
            <button onClick={clearFilters} style={{
              fontSize: "11px",
              color: "#c8a96e",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}>
              CLEAR ALL
            </button>
          </div>

          {/* Price Range */}
          <div style={{
            marginBottom: "30px",
            paddingBottom: "30px",
            borderBottom: "1px solid #eee",
          }}>
            <h3 style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1px",
              color: "#222",
              marginBottom: "15px",
            }}>
              PRICE RANGE
            </h3>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#222" }}
            />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              color: "#666",
              marginTop: "8px",
            }}>
              <span>$0</span>
              <span style={{ fontWeight: "700", color: "#222" }}>${priceRange}</span>
            </div>
          </div>

          {/* Size Filter */}
          <div style={{
            marginBottom: "30px",
            paddingBottom: "30px",
            borderBottom: "1px solid #eee",
          }}>
            <h3 style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1px",
              color: "#222",
              marginBottom: "15px",
            }}>
              SIZE
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  style={{
                    width: "40px",
                    height: "40px",
                    border: selectedSizes.includes(size) ? "2px solid #222" : "1px solid #ddd",
                    backgroundColor: selectedSizes.includes(size) ? "#222" : "#fff",
                    color: selectedSizes.includes(size) ? "#fff" : "#444",
                    fontSize: "11px",
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

          {/* Results Count */}
          <div style={{
            padding: "15px",
            backgroundColor: "#f9f9f9",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "13px", color: "#666" }}>
              Showing <strong>{filtered.length}</strong> products
            </p>
          </div>
        </div>

        {/* Right - Products */}
        <div>
          <div className="responsive-flex" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            paddingBottom: "15px",
            borderBottom: "1px solid #eee",
          }}>
            <p style={{ fontSize: "13px", color: "#999" }}>
              {filtered.length} Products Found
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>
                SORT BY:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  fontSize: "12px",
                  outline: "none",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                }}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading && (
            <div style={{ textAlign: "center", padding: "60px", color: "#999" }}>
              Loading products...
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px", color: "#999" }}>
              <div style={{ fontSize: "40px", marginBottom: "15px" }}>🔍</div>
              <p style={{ fontSize: "16px", fontWeight: "600", marginBottom: "10px" }}>
                No products found
              </p>
              <p style={{ fontSize: "13px" }}>Try adjusting your filters</p>
              <button
                onClick={clearFilters}
                style={{
                  marginTop: "20px",
                  padding: "12px 25px",
                  backgroundColor: "#222",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                }}
              >
                CLEAR FILTERS
              </button>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
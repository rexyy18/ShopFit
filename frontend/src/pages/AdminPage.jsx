import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiX,
  FiCheck,
} from "react-icons/fi";

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    images: "",
    sizes: "",
    colors: "",
    countInStock: "",
    category: "general",
    tag: "",
  });

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
      return;
    }
    fetchData();
  }, [user]);

  const config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        API.get("/api/products"),
        API.get("/api/orders", config),
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await API.post("/api/upload", formData, config);
      setProductForm((prev) => ({
        ...prev,
        images: prev.images ? `${prev.images}, ${data.imageUrl}` : data.imageUrl,
      }));
      setUploading(false);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Image upload failed");
      setUploading(false);
    }
  };

  const handleProductFormChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: Number(productForm.price),
        images: productForm.images.split(",").map((i) => i.trim()),
        sizes: productForm.sizes.split(",").map((s) => s.trim()),
        colors: productForm.colors.split(",").map((c) => c.trim()),
        countInStock: Number(productForm.countInStock),
        category: productForm.category,
        tag: productForm.tag,
      };

      if (editingProduct) {
        await API.put(`/api/products/${editingProduct._id}`, productData, config);
      } else {
        await API.post("/api/products", productData, config);
      }

      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: "", description: "", price: "",
        images: "", sizes: "", colors: "",
        countInStock: "", category: "general", tag: "",
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images.join(", "),
      sizes: product.sizes.join(", "),
      colors: product.colors.join(", "),
      countInStock: product.countInStock,
      category: product.category || "general",
      tag: product.tag || "",
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/api/products/${id}`, config);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMarkDelivered = async (orderId) => {
    try {
      await API.put(`/api/orders/${orderId}/deliver`, {}, config);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const totalRevenue = orders.filter((o) => o.isPaid).reduce((acc, o) => acc + o.totalPrice, 0);
  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.isPaid).length;
  const pendingOrders = orders.filter((o) => !o.isDelivered).length;

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    color: "#444",
    marginBottom: "6px",
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "100px", color: "#999" }}>
        Loading dashboard...
      </div>
    );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>

      {/* Sidebar */}
      <div style={{
        width: "240px",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: "30px 0",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
      }}>
        <div style={{
          padding: "0 25px 30px",
          borderBottom: "1px solid #333",
          marginBottom: "20px",
        }}>
          <p style={{ fontSize: "11px", letterSpacing: "2px", color: "#c8a96e", marginBottom: "5px" }}>
            ADMIN PANEL
          </p>
          <p style={{ fontSize: "14px", fontWeight: "700" }}>{user?.name}</p>
        </div>

        {[
          { id: "dashboard", label: "Dashboard", icon: <FiGrid size={16} /> },
          { id: "products", label: "Products", icon: <FiPackage size={16} /> },
          { id: "orders", label: "All Orders", icon: <FiShoppingBag size={16} /> },
          { id: "myorders", label: "My Orders", icon: <FiShoppingBag size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              width: "100%",
              padding: "14px 25px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: activeTab === tab.id ? "#c8a96e" : "transparent",
              color: activeTab === tab.id ? "#fff" : "#999",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "1px",
              textAlign: "left",
              transition: "all 0.2s",
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px", overflowY: "auto" }}>

        {/* ---- DASHBOARD TAB ---- */}
        {activeTab === "dashboard" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "2px", color: "#222", marginBottom: "30px" }}>
              DASHBOARD OVERVIEW
            </h1>

            <div className="admin-stats-grid" style={{ marginBottom: "40px" }}>
              {[
                { label: "TOTAL REVENUE", value: `$${totalRevenue.toFixed(2)}` },
                { label: "TOTAL ORDERS", value: totalOrders },
                { label: "PAID ORDERS", value: paidOrders },
                { label: "PENDING DELIVERY", value: pendingOrders },
              ].map((stat, i) => (
                <div key={i} style={{
                  backgroundColor: "#fff",
                  padding: "25px",
                  border: "1px solid #f0f0f0",
                  borderLeft: i === 0 ? "3px solid #c8a96e" : "1px solid #f0f0f0",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                }}>
                  <p style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", color: "#999", marginBottom: "10px" }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: "28px", fontWeight: "800", color: "#222", lineHeight: "1" }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: "#fff", padding: "25px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <h2 style={{ fontSize: "14px", fontWeight: "800", letterSpacing: "2px", color: "#222", marginBottom: "20px" }}>
                RECENT ORDERS
              </h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #eee" }}>
                    {["Order ID", "Customer", "Total", "Paid", "Delivered"].map((h) => (
                      <th key={h} style={{ padding: "10px", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#999", textAlign: "left" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order._id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                      <td style={{ padding: "12px 10px", fontSize: "12px", color: "#666" }}>#{order._id.slice(-8).toUpperCase()}</td>
                      <td style={{ padding: "12px 10px", fontSize: "12px", color: "#666" }}>{order.user?.name || "N/A"}</td>
                      <td style={{ padding: "12px 10px", fontSize: "13px", fontWeight: "700", color: "#222" }}>${order.totalPrice.toFixed(2)}</td>
                      <td style={{ padding: "12px 10px" }}>
                        <span style={{ padding: "3px 10px", fontSize: "10px", fontWeight: "700", backgroundColor: order.isPaid ? "#e8f5e9" : "#fff3e0", color: order.isPaid ? "#2e7d32" : "#e65100", borderRadius: "20px" }}>
                          {order.isPaid ? "PAID" : "UNPAID"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 10px" }}>
                        <span style={{ padding: "3px 10px", fontSize: "10px", fontWeight: "700", backgroundColor: order.isDelivered ? "#e8f5e9" : "#f3f3f3", color: order.isDelivered ? "#2e7d32" : "#999", borderRadius: "20px" }}>
                          {order.isDelivered ? "DELIVERED" : "PENDING"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---- PRODUCTS TAB ---- */}
        {activeTab === "products" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <h1 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "2px", color: "#222" }}>
                PRODUCTS ({products.length})
              </h1>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({ name: "", description: "", price: "", images: "", sizes: "", colors: "", countInStock: "", category: "general", tag: "" });
                  setShowProductForm(true);
                }}
                style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#222", color: "#fff", padding: "12px 20px", fontSize: "12px", fontWeight: "700", letterSpacing: "1px", border: "none", cursor: "pointer" }}
              >
                <FiPlus size={16} /> ADD PRODUCT
              </button>
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ backgroundColor: "#fff", padding: "35px", width: "580px", maxHeight: "90vh", overflowY: "auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
                    <h2 style={{ fontSize: "16px", fontWeight: "800", letterSpacing: "2px", color: "#222" }}>
                      {editingProduct ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
                    </h2>
                    <button onClick={() => setShowProductForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#999" }}>
                      <FiX size={22} />
                    </button>
                  </div>

                  <form onSubmit={handleProductSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>PRODUCT NAME</label>
                        <input name="name" value={productForm.name} onChange={handleProductFormChange} required placeholder="Floral Summer Dress" style={inputStyle} />
                      </div>

                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>DESCRIPTION</label>
                        <textarea name="description" value={productForm.description} onChange={handleProductFormChange} required rows={3} placeholder="Product description..." style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
                      </div>

                      <div>
                        <label style={labelStyle}>PRICE ($)</label>
                        <input name="price" type="number" value={productForm.price} onChange={handleProductFormChange} required placeholder="89.99" style={inputStyle} />
                      </div>

                      <div>
                        <label style={labelStyle}>COUNT IN STOCK</label>
                        <input name="countInStock" type="number" value={productForm.countInStock} onChange={handleProductFormChange} required placeholder="25" style={inputStyle} />
                      </div>

                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>IMAGE URLS (comma separated) OR UPLOAD IMAGE</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <input name="images" value={productForm.images} onChange={handleProductFormChange} required placeholder="https://image1.jpg, https://image2.jpg" style={inputStyle} />
                          <input type="file" accept="image/jpeg, image/png, image/jpg, image/webp" onChange={uploadFileHandler} style={inputStyle} />
                          {uploading && <span style={{ fontSize: "12px", color: "#666" }}>Uploading image...</span>}
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>SIZES (comma separated)</label>
                        <input name="sizes" value={productForm.sizes} onChange={handleProductFormChange} required placeholder="S, M, L, XL" style={inputStyle} />
                      </div>

                      <div>
                        <label style={labelStyle}>COLORS (comma separated)</label>
                        <input name="colors" value={productForm.colors} onChange={handleProductFormChange} required placeholder="red, black, white" style={inputStyle} />
                      </div>

                      <div>
                        <label style={labelStyle}>CATEGORY</label>
                        <select name="category" value={productForm.category} onChange={handleProductFormChange} style={inputStyle}>
                          <option value="general">General</option>
                          <option value="ladies">Ladies</option>
                          <option value="men">Men</option>
                          <option value="kids">Kids</option>
                          <option value="new">New</option>
                          <option value="fashion">Fashion</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle}>TAG</label>
                        <select name="tag" value={productForm.tag} onChange={handleProductFormChange} style={inputStyle}>
                          <option value="">None</option>
                          <option value="special">Special</option>
                          <option value="bestseller">Best Seller</option>
                          <option value="featured">Featured</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" style={{ width: "100%", padding: "14px", backgroundColor: "#222", color: "#fff", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", border: "none", cursor: "pointer", marginTop: "20px" }}>
                      {editingProduct ? "UPDATE PRODUCT" : "ADD PRODUCT"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div style={{ backgroundColor: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9f9f9", borderBottom: "2px solid #eee" }}>
                    {["Image", "Name", "Price", "Stock", "Category", "Tag", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "15px", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#999", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                      <td style={{ padding: "12px 15px" }}>
                        <img src={product.images[0]} alt={product.name} style={{ width: "50px", height: "60px", objectFit: "cover", objectPosition: "top", backgroundColor: "#f5f5f5" }} />
                      </td>
                      <td style={{ padding: "12px 15px" }}>
                        <p style={{ fontSize: "13px", fontWeight: "600", color: "#222" }}>{product.name}</p>
                        <p style={{ fontSize: "11px", color: "#999", marginTop: "3px" }}>{product.sizes.join(", ")}</p>
                      </td>
                      <td style={{ padding: "12px 15px", fontSize: "14px", fontWeight: "700", color: "#222" }}>${product.price.toFixed(2)}</td>
                      <td style={{ padding: "12px 15px" }}>
                        <span style={{ padding: "3px 10px", fontSize: "11px", fontWeight: "700", backgroundColor: product.countInStock > 0 ? "#e8f5e9" : "#ffebee", color: product.countInStock > 0 ? "#2e7d32" : "#c62828", borderRadius: "20px" }}>
                          {product.countInStock}
                        </span>
                      </td>
                      <td style={{ padding: "12px 15px" }}>
                        <span style={{ padding: "3px 10px", fontSize: "11px", fontWeight: "700", backgroundColor: "#e3f2fd", color: "#1565c0", borderRadius: "20px", textTransform: "capitalize" }}>
                          {product.category || "general"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 15px" }}>
                        <span style={{ padding: "3px 10px", fontSize: "11px", fontWeight: "700", backgroundColor: "#f5f5f5", color: "#666", borderRadius: "20px", textTransform: "capitalize" }}>
                          {product.tag || "none"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 15px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => handleEditProduct(product)} style={{ padding: "7px 12px", backgroundColor: "#f0f0f0", border: "none", cursor: "pointer", color: "#444", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
                            <FiEdit size={13} /> Edit
                          </button>
                          <button onClick={() => handleDeleteProduct(product._id)} style={{ padding: "7px 12px", backgroundColor: "#ffebee", border: "none", cursor: "pointer", color: "#c62828", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}>
                            <FiTrash2 size={13} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---- ALL ORDERS TAB ---- */}
        {activeTab === "orders" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "2px", color: "#222", marginBottom: "30px" }}>
              ALL ORDERS ({orders.length})
            </h1>
            <div style={{ backgroundColor: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9f9f9", borderBottom: "2px solid #eee" }}>
                    {["Order ID", "Customer", "Date", "Total", "Paid", "Delivered", "Action"].map((h) => (
                      <th key={h} style={{ padding: "15px", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: "#999", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                      <td style={{ padding: "12px 15px", fontSize: "12px", color: "#666" }}>#{order._id.slice(-8).toUpperCase()}</td>
                      <td style={{ padding: "12px 15px", fontSize: "13px", color: "#222" }}>{order.user?.name || "N/A"}</td>
                      <td style={{ padding: "12px 15px", fontSize: "12px", color: "#666" }}>
                        {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td style={{ padding: "12px 15px", fontSize: "14px", fontWeight: "700", color: "#222" }}>${order.totalPrice.toFixed(2)}</td>
                      <td style={{ padding: "12px 15px" }}>
                        <span style={{ padding: "3px 10px", fontSize: "10px", fontWeight: "700", backgroundColor: order.isPaid ? "#e8f5e9" : "#fff3e0", color: order.isPaid ? "#2e7d32" : "#e65100", borderRadius: "20px" }}>
                          {order.isPaid ? "PAID" : "UNPAID"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 15px" }}>
                        <span style={{ padding: "3px 10px", fontSize: "10px", fontWeight: "700", backgroundColor: order.isDelivered ? "#e8f5e9" : "#f3f3f3", color: order.isDelivered ? "#2e7d32" : "#999", borderRadius: "20px" }}>
                          {order.isDelivered ? "DELIVERED" : "PENDING"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 15px" }}>
                        {!order.isDelivered && order.isPaid && (
                          <button onClick={() => handleMarkDelivered(order._id)} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "7px 12px", backgroundColor: "#e8f5e9", color: "#2e7d32", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: "700" }}>
                            <FiCheck size={13} /> Mark Delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---- MY ORDERS TAB ---- */}
        {activeTab === "myorders" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "2px", color: "#222", marginBottom: "30px" }}>
              MY ORDERS
            </h1>
            {orders.filter((o) => o.user?._id === user?._id || o.user === user?._id).length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px", backgroundColor: "#fff" }}>
                <p style={{ color: "#999" }}>No personal orders found.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {orders
                  .filter((o) => o.user?._id === user?._id || o.user === user?._id)
                  .map((order) => (
                    <div key={order._id} style={{ backgroundColor: "#fff", padding: "20px 25px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: "700", color: "#222", marginBottom: "5px" }}>#{order._id.slice(-8).toUpperCase()}</p>
                        <p style={{ fontSize: "12px", color: "#999" }}>
                          {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <p style={{ fontSize: "16px", fontWeight: "800", color: "#222" }}>${order.totalPrice.toFixed(2)}</p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <span style={{ padding: "4px 12px", fontSize: "10px", fontWeight: "700", backgroundColor: order.isPaid ? "#e8f5e9" : "#fff3e0", color: order.isPaid ? "#2e7d32" : "#e65100", borderRadius: "20px" }}>
                          {order.isPaid ? "PAID" : "UNPAID"}
                        </span>
                        <span style={{ padding: "4px 12px", fontSize: "10px", fontWeight: "700", backgroundColor: order.isDelivered ? "#e8f5e9" : "#f3f3f3", color: order.isDelivered ? "#2e7d32" : "#999", borderRadius: "20px" }}>
                          {order.isDelivered ? "DELIVERED" : "PENDING"}
                        </span>
                      </div>
                      <button onClick={() => navigate(`/order/${order._id}`)} style={{ padding: "8px 18px", backgroundColor: "#222", color: "#fff", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: "700", letterSpacing: "1px" }}>
                        VIEW
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
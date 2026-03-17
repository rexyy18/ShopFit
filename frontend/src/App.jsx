import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import ShopPage from "./pages/ShopPage";

function App() {
  return (
    <Router>
      <AnnouncementBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:id" element={<OrderConfirmationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/men" element={<ShopPage />} />
        <Route path="/ladies" element={<ShopPage />} />
        <Route path="/new" element={<ShopPage />} />
        <Route path="/fashion" element={<ShopPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

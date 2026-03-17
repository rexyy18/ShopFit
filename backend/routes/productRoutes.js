const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes (anyone can view products)
router.get("/search", searchProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin only routes (must be logged in + admin)
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;

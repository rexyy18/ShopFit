const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
  getAllOrders,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin routes - MUST be before /:id routes
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/deliver", protect, adminOnly, markOrderAsDelivered);

// Customer routes
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, markOrderAsPaid);

module.exports = router;

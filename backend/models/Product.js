const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: {
    type: String,
    default: "general",
  },
  tag: {
    type: String,
    default: "",
  },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  countInStock: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);

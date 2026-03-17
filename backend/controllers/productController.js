const Product = require("../models/Product");

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search products
// @route   GET /api/products/search
const searchProducts = async (req, res) => {
  const keyword = req.query.q
    ? {
        $or: [
          { name: { $regex: req.query.q, $options: "i" } },
          { description: { $regex: req.query.q, $options: "i" } },
        ],
      }
    : {};

  try {
    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product (admin only)
// @route   POST /api/products
const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    images,
    sizes,
    colors,
    countInStock,
    category,
    tag,
  } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      price,
      images,
      sizes,
      colors,
      countInStock,
      category: category || "general",
      tag: tag || "",
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product (admin only)
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    images,
    sizes,
    colors,
    countInStock,
    category,
    tag,
  } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.images = images || product.images;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.countInStock = countInStock ?? product.countInStock;
    product.category = category || product.category;
    product.tag = tag !== undefined ? tag : product.tag;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product (admin only)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};

const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ imageUrl: req.file.path });
});

module.exports = router;
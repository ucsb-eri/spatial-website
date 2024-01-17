// server/routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');


const upload = multer({ dest: 'uploads/images' });

// Define the upload route
router.post('/images', upload.single('image'), (req, res) => {

  try {
    console.log(req.file)
    const imagePath = req.file.path;
    res.status(201).json({ imagePath });
  } catch (error) {
    console.error(error);
    console.error('Error processing upload:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

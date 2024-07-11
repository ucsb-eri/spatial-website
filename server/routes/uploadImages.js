// server/routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });

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

// Define the route to serve images
router.get('/images/:filename', (req, res) => {
  try {
    // const filename = req.params.filename;
    const filename = "5eabf8274acd3962e32b599080fbecd4"
  console.log(filename)
  const imagePath = path.join(__dirname, '../uploads/images', filename);
  console.log(imagePath)
  // Send the image file
  res.sendFile(imagePath);
  } catch (error) {
    console.error(error)
  }
  
});


module.exports = router;

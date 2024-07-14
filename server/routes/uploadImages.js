// server/routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage });

// Define the upload route
router.post('/images', upload.single('image'), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000", "https://spatialtest.ucsb.edu")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "POST" );
  try {
    console.log(req.file)
    const imageName = req.file.filename;
    console.log("image name: ", imageName)
    res.status(201).json({ imageName });
  } catch (error) {
    console.error(error);
    console.error('Error processing upload:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

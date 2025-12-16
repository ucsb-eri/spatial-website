// server/routes/uploadImages.js
const express = require('express');
const router = express.Router();
const { upload, uploadFile, deleteFile, isUsingAzure } = require('../utils/storageService');
const { authMiddleware } = require('../utils/auth');

// Middleware to verify authentication
const verifyAuth = (req, res, next) => {
  const authReq = authMiddleware({ req });
  if (!authReq.user) {
    return res.status(401).json({ message: 'Unauthorized: You must be logged in to upload files' });
  }
  req.user = authReq.user;
  next();
};

// Upload image route
router.post('/images', verifyAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log(`Uploading file: ${req.file.originalname}`);
    console.log(`Storage type: ${isUsingAzure ? 'Azure Blob Storage' : 'Local Storage'}`);

    // Upload the file (to Azure or local)
    const fileIdentifier = await uploadFile(req.file);
    
    console.log(`Upload successful: ${fileIdentifier}`);
    
    res.status(201).json({ 
      imageName: fileIdentifier,
      isAzure: isUsingAzure,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({ 
      message: 'Failed to upload file',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete image route (optional - for cleanup)
router.delete('/images/:identifier', verifyAuth, async (req, res) => {
  try {
    const { identifier } = req.params;
    const success = await deleteFile(identifier);
    
    if (success) {
      res.status(200).json({ message: 'File deleted successfully' });
    } else {
      res.status(404).json({ message: 'File not found or already deleted' });
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ 
      message: 'Failed to delete file',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;

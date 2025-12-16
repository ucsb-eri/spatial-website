require('dotenv').config();
const { BlobServiceClient } = require('@azure/storage-blob');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Storage configuration based on environment
const USE_AZURE = process.env.USE_AZURE_STORAGE === 'true';
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME || 'spatial-images';

// Initialize Azure Blob Service if configured
let blobServiceClient = null;
let containerClient = null;

if (USE_AZURE && AZURE_STORAGE_CONNECTION_STRING) {
  try {
    blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);
    console.log('✓ Azure Blob Storage configured');
  } catch (error) {
    console.error('Azure Blob Storage initialization failed:', error.message);
    console.log('Falling back to local storage');
  }
}

// Local storage configuration
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../public/images');
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Configure multer based on storage type
const upload = USE_AZURE && containerClient 
  ? multer({ storage: multer.memoryStorage() }) // Store in memory for Azure upload
  : multer({ storage: localStorage }); // Store directly to disk for local

/**
 * Upload file to Azure Blob Storage or local storage
 * @param {Object} file - The file object from multer
 * @returns {Promise<string>} - The URL or filename of the uploaded file
 */
async function uploadFile(file) {
  if (!file) {
    throw new Error('No file provided');
  }

  // Use Azure Blob Storage if configured
  if (USE_AZURE && containerClient) {
    try {
      // Ensure container exists
      await containerClient.createIfNotExists({
        access: 'blob' // Public read access for blobs
      });

      // Generate unique blob name
      const blobName = `${uuidv4()}-${file.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload the file
      const uploadResponse = await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype
        }
      });

      console.log(`Upload to Azure successful: ${blobName}`);
      
      // Return the URL
      return blockBlobClient.url;
    } catch (error) {
      console.error('Azure upload failed:', error);
      throw new Error(`Failed to upload to Azure: ${error.message}`);
    }
  }

  // For local storage, file is already saved by multer
  // Return just the filename (not full path)
  return file.filename;
}

/**
 * Delete file from Azure Blob Storage or local storage
 * @param {string} fileIdentifier - The blob URL or filename
 * @returns {Promise<boolean>} - Success status
 */
async function deleteFile(fileIdentifier) {
  if (!fileIdentifier) {
    return false;
  }

  try {
    if (USE_AZURE && containerClient) {
      // Extract blob name from URL if full URL is provided
      let blobName = fileIdentifier;
      if (fileIdentifier.startsWith('http')) {
        const url = new URL(fileIdentifier);
        blobName = path.basename(url.pathname);
      }

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.deleteIfExists();
      console.log(`Deleted from Azure: ${blobName}`);
      return true;
    } else {
      // Delete from local storage
      const filePath = path.join(__dirname, '../public/images', fileIdentifier);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted from local storage: ${fileIdentifier}`);
        return true;
      }
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }

  return false;
}

/**
 * Get public URL for a file
 * @param {string} fileIdentifier - The blob URL or filename
 * @returns {string} - Public URL
 */
function getFileUrl(fileIdentifier) {
  if (!fileIdentifier) {
    return null;
  }

  // If already a full URL (Azure), return as-is
  if (fileIdentifier.startsWith('http')) {
    return fileIdentifier;
  }

  // For local storage, return relative path
  return `/images/${fileIdentifier}`;
}

module.exports = {
  upload,
  uploadFile,
  deleteFile,
  getFileUrl,
  isUsingAzure: USE_AZURE && !!containerClient
};



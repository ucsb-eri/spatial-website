#!/usr/bin/env node
/**
 * Upload Local Images to Azure Blob Storage
 * 
 * This script uploads all images from server/public/images/ to Azure Blob Storage
 * and generates a mapping file to update your seed data.
 * 
 * Usage:
 *   cd server && node ../azure/uploadLocalImagesToAzure.js
 *   OR from root: node azure/uploadLocalImagesToAzure.js
 * 
 * Prerequisites:
 *   - Azure Blob Storage configured in server/.env
 *   - USE_AZURE_STORAGE=true
 *   - AZURE_STORAGE_CONNECTION_STRING set
 */

const path = require('path');
const fs = require('fs');

// Load .env from server directory (relative to project root)
require('dotenv').config({ path: path.join(__dirname, '../server/.env') });

// Try to require from server's node_modules first
let BlobServiceClient;
try {
  const azurePath = path.join(__dirname, '../server/node_modules/@azure/storage-blob');
  BlobServiceClient = require(azurePath).BlobServiceClient;
  console.log('✓ Loaded @azure/storage-blob from server/node_modules');
} catch (err) {
  try {
    BlobServiceClient = require('@azure/storage-blob').BlobServiceClient;
    console.log('✓ Loaded @azure/storage-blob from global node_modules');
  } catch (err2) {
    console.error('❌ @azure/storage-blob not found!');
    console.log('💡 Install it with: cd server && npm install');
    process.exit(1);
  }
}

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME || 'spatial-images';
const LOCAL_IMAGES_DIR = path.join(__dirname, '../server/public/images');

console.log('🔍 Checking environment variables...');
console.log(`   .env path: ${path.join(__dirname, '../server/.env')}`);
console.log(`   USE_AZURE_STORAGE: ${process.env.USE_AZURE_STORAGE}`);
console.log(`   AZURE_CONTAINER_NAME: ${AZURE_CONTAINER_NAME}`);
console.log(`   Connection string found: ${!!AZURE_STORAGE_CONNECTION_STRING}`);
console.log('');

async function uploadLocalImages() {
  if (!AZURE_STORAGE_CONNECTION_STRING) {
    console.error('❌ Azure Storage connection string not found!');
    console.log('💡 Run: node azure/azureBlobSetup.js to set up Azure first');
    process.exit(1);
  }

  try {
    console.log('📦 Initializing Azure Blob Service...');
    
    // Initialize Azure Blob Service
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    console.log('  ✓ BlobServiceClient created');
    
    const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);
    console.log('  ✓ ContainerClient created');

    // Ensure container exists
    await containerClient.createIfNotExists({
      access: 'blob' // Public read access
    });
    console.log(`✓ Container "${AZURE_CONTAINER_NAME}" is ready\n`);

    // Check if local images directory exists
    if (!fs.existsSync(LOCAL_IMAGES_DIR)) {
      console.error(`❌ Local images directory not found: ${LOCAL_IMAGES_DIR}`);
      process.exit(1);
    }

    // Get all image files recursively
    const imageFiles = [];
    function findImages(dir, relativePath = '') {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relPath = path.join(relativePath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          findImages(fullPath, relPath);
        } else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item)) {
          imageFiles.push({
            localPath: fullPath,
            relativePath: relPath,
            filename: item
          });
        }
      });
    }

    findImages(LOCAL_IMAGES_DIR);
    console.log(`📊 Found ${imageFiles.length} images to upload\n`);

    if (imageFiles.length === 0) {
      console.log('No images to upload!');
      return;
    }

    // Upload images and track mapping
    const mapping = {};
    let successCount = 0;
    let errorCount = 0;

    for (const file of imageFiles) {
      try {
        // Read file
        const fileContent = fs.readFileSync(file.localPath);
        
        // Use the relative path as blob name to maintain structure
        const blobName = file.relativePath.replace(/\\/g, '/');
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Get content type
        const ext = path.extname(file.filename).toLowerCase();
        const contentType = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif',
          '.webp': 'image/webp',
          '.svg': 'image/svg+xml'
        }[ext] || 'application/octet-stream';

        // Upload
        await blockBlobClient.uploadData(fileContent, {
          blobHTTPHeaders: {
            blobContentType: contentType
          }
        });

        const azureUrl = blockBlobClient.url;
        mapping[file.relativePath] = azureUrl;
        
        successCount++;
        console.log(`✓ Uploaded: ${file.relativePath}`);
        console.log(`  → ${azureUrl}`);

      } catch (error) {
        errorCount++;
        console.error(`✗ Failed: ${file.relativePath}`, error.message);
      }
    }

    console.log(`\n📊 Upload Summary:`);
    console.log(`   Success: ${successCount}`);
    console.log(`   Errors: ${errorCount}`);
    console.log(`   Total: ${imageFiles.length}`);

    // Save mapping to file
    const mappingFile = path.join(__dirname, 'image-mapping.json');
    fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
    console.log(`\n💾 Image mapping saved to: ${mappingFile}`);

    console.log(`\n✨ Upload complete!`);
    console.log(`\n📝 Next Steps:`);
    console.log(`   1. Review image-mapping.json to see local → Azure URL mappings`);
    console.log(`   2. Run: node azure/updateSeedsWithAzureUrls.js`);
    console.log(`   3. This will update your seed files with Azure URLs`);
    console.log(`   4. Then deploy and seed your production database!`);

  } catch (error) {
    console.error('\n❌ Upload failed:', error.message);
    process.exit(1);
  }
}

uploadLocalImages();


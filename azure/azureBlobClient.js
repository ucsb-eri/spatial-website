/**
 * Azure Blob Client - Simplified helper for blob operations
 * 
 * This is a cleaner interface to the Azure Blob Storage service
 * for use in your application code.
 */

const { BlobServiceClient } = require('@azure/storage-blob');

class AzureBlobClient {
  constructor(connectionString, containerName) {
    if (!connectionString) {
      throw new Error('Azure Storage connection string is required');
    }

    this.connectionString = connectionString;
    this.containerName = containerName || 'spatial-images';
    this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
  }

  /**
   * Initialize container (create if doesn't exist)
   */
  async initializeContainer() {
    try {
      await this.containerClient.createIfNotExists({
        access: 'blob' // Public read access
      });
      console.log(`✓ Container "${this.containerName}" is ready`);
      return true;
    } catch (error) {
      console.error('Failed to initialize container:', error.message);
      throw error;
    }
  }

  /**
   * Upload a file to blob storage
   * @param {Buffer} fileBuffer - File data as buffer
   * @param {string} fileName - Name for the blob
   * @param {string} contentType - MIME type
   * @returns {Promise<string>} - URL of uploaded blob
   */
  async uploadFile(fileBuffer, fileName, contentType) {
    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
      
      await blockBlobClient.uploadData(fileBuffer, {
        blobHTTPHeaders: {
          blobContentType: contentType
        }
      });

      console.log(`✓ Uploaded: ${fileName}`);
      return blockBlobClient.url;
    } catch (error) {
      console.error(`Failed to upload ${fileName}:`, error.message);
      throw error;
    }
  }

  /**
   * Delete a blob
   * @param {string} blobName - Name of blob to delete
   * @returns {Promise<boolean>} - Success status
   */
  async deleteFile(blobName) {
    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      const deleted = await blockBlobClient.deleteIfExists();
      
      if (deleted) {
        console.log(`✓ Deleted: ${blobName}`);
      }
      
      return deleted;
    } catch (error) {
      console.error(`Failed to delete ${blobName}:`, error.message);
      return false;
    }
  }

  /**
   * List all blobs in container
   * @returns {Promise<Array>} - List of blob names
   */
  async listFiles() {
    try {
      const blobs = [];
      for await (const blob of this.containerClient.listBlobsFlat()) {
        blobs.push({
          name: blob.name,
          url: `${this.containerClient.url}/${blob.name}`,
          size: blob.properties.contentLength,
          lastModified: blob.properties.lastModified
        });
      }
      return blobs;
    } catch (error) {
      console.error('Failed to list files:', error.message);
      throw error;
    }
  }

  /**
   * Get blob URL
   * @param {string} blobName - Name of the blob
   * @returns {string} - Public URL
   */
  getBlobUrl(blobName) {
    return `${this.containerClient.url}/${blobName}`;
  }

  /**
   * Check if blob exists
   * @param {string} blobName - Name of the blob
   * @returns {Promise<boolean>}
   */
  async fileExists(blobName) {
    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      return await blockBlobClient.exists();
    } catch (error) {
      return false;
    }
  }
}

module.exports = AzureBlobClient;



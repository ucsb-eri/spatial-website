/**
 * Tests for Storage Service
 * Tests both Azure and local storage functionality
 */

const path = require('path');
const fs = require('fs');

// Mock Azure Storage SDK before requiring the service
jest.mock('@azure/storage-blob');

describe('Storage Service', () => {
  let storageService;
  let mockFile;

  beforeEach(() => {
    // Reset modules to get fresh instance
    jest.resetModules();
    
    // Set environment variables for testing
    process.env.USE_AZURE_STORAGE = 'false';
    
    // Mock file object
    mockFile = {
      fieldname: 'image',
      originalname: 'test-image.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer: Buffer.from('fake-image-data'),
      size: 1024
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Local Storage Mode', () => {
    beforeEach(() => {
      process.env.USE_AZURE_STORAGE = 'false';
      storageService = require('../utils/storageService');
    });

    test('should indicate not using Azure', () => {
      expect(storageService.isUsingAzure).toBe(false);
    });

    test('should generate local file URL', () => {
      const filename = 'test-image.jpg';
      const url = storageService.getFileUrl(filename);
      expect(url).toBe('/images/test-image.jpg');
    });

    test('should return Azure URLs unchanged', () => {
      const azureUrl = 'https://storage.azure.com/container/blob.jpg';
      const url = storageService.getFileUrl(azureUrl);
      expect(url).toBe(azureUrl);
    });
  });

  describe('Azure Storage Mode', () => {
    beforeEach(() => {
      process.env.USE_AZURE_STORAGE = 'true';
      process.env.AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=test;AccountKey=test;EndpointSuffix=core.windows.net';
      process.env.AZURE_CONTAINER_NAME = 'test-container';
    });

    test('should handle missing Azure credentials gracefully', () => {
      delete process.env.AZURE_STORAGE_CONNECTION_STRING;
      jest.resetModules();
      storageService = require('../utils/storageService');
      // Should fall back to local storage
      expect(storageService.isUsingAzure).toBe(false);
    });
  });

  describe('File URL Generation', () => {
    test('should return null for null input', () => {
      storageService = require('../utils/storageService');
      expect(storageService.getFileUrl(null)).toBeNull();
    });

    test('should return null for undefined input', () => {
      storageService = require('../utils/storageService');
      expect(storageService.getFileUrl(undefined)).toBeNull();
    });
  });
});



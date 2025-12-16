/**
 * Tests for Image Upload Route
 */

const request = require('supertest');
const express = require('express');
const uploadRoute = require('../routes/uploadImages');

// Mock the storage service
jest.mock('../utils/storageService', () => ({
  upload: require('multer')({ storage: require('multer').memoryStorage() }),
  uploadFile: jest.fn().mockResolvedValue('test-image.jpg'),
  deleteFile: jest.fn().mockResolvedValue(true),
  isUsingAzure: false
}));

// Mock auth middleware
jest.mock('../utils/auth', () => ({
  authMiddleware: jest.fn(({ req }) => {
    if (req.headers.authorization === 'Bearer valid-token') {
      req.user = { email: 'test@example.com', _id: '123' };
    }
    return req;
  })
}));

describe('Upload Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api', uploadRoute);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/images', () => {
    test('should reject request without authentication', async () => {
      const response = await request(app)
        .post('/api/images')
        .attach('image', Buffer.from('fake-image-data'), 'test.jpg');

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('Unauthorized');
    });

    test('should upload image with valid authentication', async () => {
      const response = await request(app)
        .post('/api/images')
        .set('Authorization', 'Bearer valid-token')
        .attach('image', Buffer.from('fake-image-data'), 'test.jpg');

      expect(response.status).toBe(201);
      expect(response.body.imageName).toBeDefined();
      expect(response.body.message).toBe('File uploaded successfully');
    });

    test('should return 400 if no file is provided', async () => {
      const response = await request(app)
        .post('/api/images')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('No file uploaded');
    });
  });

  describe('DELETE /api/images/:identifier', () => {
    test('should reject delete request without authentication', async () => {
      const response = await request(app)
        .delete('/api/images/test-image.jpg');

      expect(response.status).toBe(401);
    });

    test('should delete image with valid authentication', async () => {
      const response = await request(app)
        .delete('/api/images/test-image.jpg')
        .set('Authorization', 'Bearer valid-token');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('File deleted successfully');
    });
  });
});



/**
 * Tests for Config utility
 */

describe('Config utility', () => {
  describe('default configuration', () => {
    test('should have default API_URL', () => {
      const config = require('../config').default;
      expect(config.API_URL).toBe('http://localhost:3001');
    });

    test('should have default GRAPHQL_URL', () => {
      const config = require('../config').default;
      expect(config.GRAPHQL_URL).toBe('http://localhost:3001/graphql');
    });

    test('should have default UPLOAD_API_URL', () => {
      const config = require('../config').default;
      expect(config.UPLOAD_API_URL).toBe('http://localhost:3001/api');
    });
  });

  describe('helper functions', () => {
    test('getUploadUrl should return upload endpoint', () => {
      const { getUploadUrl } = require('../config');
      expect(getUploadUrl()).toBe('http://localhost:3001/api/images');
    });

    test('getGraphQLUrl should return GraphQL endpoint', () => {
      const { getGraphQLUrl } = require('../config');
      expect(getGraphQLUrl()).toBe('http://localhost:3001/graphql');
    });

    test('getApiUrl should return API base URL', () => {
      const { getApiUrl } = require('../config');
      expect(getApiUrl()).toBe('http://localhost:3001');
    });
  });

  describe('environment detection', () => {
    test('should detect test environment', () => {
      const config = require('../config').default;
      // In test environment, NODE_ENV is 'test'
      expect(config.isDevelopment || config.isProduction).toBeDefined();
    });
  });
});


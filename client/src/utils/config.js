/**
 * Application Configuration
 * 
 * Uses relative URLs for same-origin requests (works on any domain)
 * Falls back to localhost for development
 */

const isDevelopment = process.env.NODE_ENV !== 'production';

// API endpoints - use relative URLs in production (works on any domain)
export const API_CONFIG = {
  // GraphQL endpoint
  graphqlUri: isDevelopment 
    ? 'http://localhost:3001/graphql' 
    : '/graphql',
  
  // REST API base
  apiBase: isDevelopment 
    ? 'http://localhost:3001/api' 
    : '/api',
  
  // Image route - for local images only (Azure blob URLs are already absolute)
  imageRoute: isDevelopment 
    ? 'http://localhost:3001/images/' 
    : '/images/',
  
  // Events API
  eventsRoute: isDevelopment 
    ? 'http://localhost:3001/api/spatialevents' 
    : '/api/spatialevents',
  
  // Upload endpoint (POST to /api/images)
  uploadRoute: isDevelopment 
    ? 'http://localhost:3001/api/images' 
    : '/api/images',
};

/**
 * Get the correct image URL
 * - If it's already a full URL (http/https), return as-is (Azure blob, etc.)
 * - Otherwise, prepend the image route for local images
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return '';
  
  // Already a full URL (Azure blob storage, etc.)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Local image - prepend route
  return `${API_CONFIG.imageRoute}${imagePath}`;
}

/**
 * Get upload URL for file uploads
 */
export function getUploadUrl() {
  return API_CONFIG.uploadRoute;
}

export default API_CONFIG;

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * 
 * This utility uses DOMPurify to clean HTML content before rendering.
 * It allows safe HTML tags and attributes while removing potentially
 * dangerous content like script tags, event handlers, etc.
 * 
 * @param {string} html - The HTML string to sanitize
 * @returns {string} - The sanitized HTML string safe for rendering
 */
export const sanitizeHtml = (html) => {
  if (!html) return '';
  
  // Configure DOMPurify to allow common HTML elements used in rich text editors
  const config = {
    ALLOWED_TAGS: [
      // Text formatting
      'p', 'br', 'span', 'div',
      'strong', 'b', 'em', 'i', 'u', 's', 'del',
      // Headings
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      // Lists
      'ul', 'ol', 'li',
      // Links
      'a',
      // Tables
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      // Quotes
      'blockquote', 'cite',
      // Code
      'code', 'pre',
      // Media (images are handled separately via image upload)
      'img',
      // Other
      'hr', 'sub', 'sup'
    ],
    ALLOWED_ATTR: [
      // Link attributes
      'href', 'target', 'rel',
      // Image attributes
      'src', 'alt', 'width', 'height',
      // Style attributes (limited)
      'class', 'id',
      // Table attributes
      'colspan', 'rowspan'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    // Don't allow data URIs to prevent XSS
    FORBID_ATTR: ['style', 'onerror', 'onload'],
    // Keep only safe protocol URLs
    ALLOW_DATA_ATTR: false,
    // Add target="_blank" to all links and add rel="noopener noreferrer" for security
    ADD_ATTR: ['target'],
    FORCE_BODY: false,
    RETURN_TRUSTED_TYPE: false
  };

  // Sanitize the HTML
  const clean = DOMPurify.sanitize(html, config);
  
  // Additional post-processing: ensure external links have proper rel attribute
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = clean;
  
  // Add rel="noopener noreferrer" to external links for security
  const links = tempDiv.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
  
  return tempDiv.innerHTML;
};

/**
 * Check if HTML content is safe (doesn't contain potentially dangerous content)
 * This is useful for validation before saving to database
 * 
 * @param {string} html - The HTML string to check
 * @returns {boolean} - True if the HTML is safe
 */
export const isHtmlSafe = (html) => {
  if (!html) return true;
  
  const sanitized = sanitizeHtml(html);
  // If sanitization significantly changed the content, it contained dangerous elements
  return sanitized.length > 0;
};

export default sanitizeHtml;



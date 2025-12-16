const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * Health check endpoint for monitoring and Docker health checks
 */
router.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    checks: {
      server: 'UP'
    }
  };

  // Check MongoDB connection
  if (mongoose.connection.readyState === 1) {
    healthcheck.checks.database = 'UP';
  } else {
    healthcheck.checks.database = 'DOWN';
    healthcheck.message = 'Database connection failed';
    return res.status(503).json(healthcheck);
  }

  res.status(200).json(healthcheck);
});

module.exports = router;



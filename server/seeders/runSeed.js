#!/usr/bin/env node
/**
 * Run this script to seed the database
 * 
 * Usage:
 *   MONGODB_URI="mongodb+srv://..." node seeders/runSeed.js
 *   
 * Or for local development:
 *   npm run seed
 */

require('dotenv').config();
const mongoose = require('mongoose');
const seedWebsite = require('./seed');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spatial-website';

async function run() {
  console.log('');
  console.log('==========================================');
  console.log('  Spatial Website Database Seeder');
  console.log('==========================================');
  console.log('');
  console.log(`Connecting to: ${MONGODB_URI.substring(0, 40)}...`);
  
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ Connected to MongoDB');
    console.log('');
    
    // Run the seed function
    console.log('Starting seed process...');
    console.log('');
    await seedWebsite();
    
    console.log('');
    console.log('==========================================');
    console.log('✅ Seeding completed successfully!');
    console.log('==========================================');
    
  } catch (error) {
    console.error('');
    console.error('❌ Seeding failed:', error.message);
    console.error('');
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('');
    console.log('Database connection closed.');
    process.exit(0);
  }
}

run();



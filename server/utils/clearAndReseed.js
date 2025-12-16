/**
 * Clear and Reseed Database Script
 * 
 * This script clears all InfoPanels, InfoContent, and AccordionItem data
 * and then reseeds with the updated schema format.
 * 
 * Usage:
 *   node server/utils/clearAndReseed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { InfoPanels, InfoContent, AccordionItem } = require('../models/InfoPanels');
const seedWebsite = require('../seeders/seed');

async function clearAndReseed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spatial-website', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB');

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    
    try {
      await InfoPanels.collection.drop();
      console.log('  ✓ Cleared InfoPanels');
    } catch (err) {
      if (err.code === 26) {
        console.log('  ℹ️  InfoPanels collection does not exist (this is fine)');
      } else {
        throw err;
      }
    }

    try {
      await InfoContent.collection.drop();
      console.log('  ✓ Cleared InfoContent');
    } catch (err) {
      if (err.code === 26) {
        console.log('  ℹ️  InfoContent collection does not exist (this is fine)');
      } else {
        throw err;
      }
    }

    try {
      await AccordionItem.collection.drop();
      console.log('  ✓ Cleared AccordionItems');
    } catch (err) {
      if (err.code === 26) {
        console.log('  ℹ️  AccordionItems collection does not exist (this is fine)');
      } else {
        throw err;
      }
    }

    // Reseed
    console.log('\n🌱 Reseeding database with new schema...');
    await seedWebsite();

    console.log('\n✨ Clear and reseed complete!');
    console.log('🎉 Your database now uses the new image schema with url and label fields.');

    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');

  } catch (error) {
    console.error('❌ Clear and reseed failed:', error);
    process.exit(1);
  }
}

// Run clear and reseed
if (require.main === module) {
  clearAndReseed();
}

module.exports = clearAndReseed;



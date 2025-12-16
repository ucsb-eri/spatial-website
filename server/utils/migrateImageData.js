/**
 * Migration script to convert old image format (strings) to new format (objects with url and label)
 * 
 * Run this once to migrate existing data:
 * node server/utils/migrateImageData.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { InfoPanels, InfoContent } = require('../models/InfoPanels');

async function migrateImageData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spatial-website', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB');

    // Find all InfoContent documents
    const allContent = await InfoContent.find({});
    console.log(`Found ${allContent.length} InfoContent documents to check`);

    let migratedCount = 0;
    let alreadyMigratedCount = 0;

    for (const content of allContent) {
      let needsUpdate = false;

      // Check if image field needs migration
      if (content.image && content.image.length > 0) {
        const firstImage = content.image[0];
        
        // Check if it's in old format (string) or new format (object)
        if (typeof firstImage === 'string') {
          needsUpdate = true;
          
          // Convert all string images to objects
          content.image = content.image.map(img => ({
            url: img,
            label: ''
          }));
          
          await content.save();
          migratedCount++;
          console.log(`✓ Migrated content ${content._id}`);
        } else if (firstImage && typeof firstImage === 'object' && firstImage.url) {
          alreadyMigratedCount++;
        }
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   Total documents checked: ${allContent.length}`);
    console.log(`   Migrated: ${migratedCount}`);
    console.log(`   Already migrated: ${alreadyMigratedCount}`);
    console.log(`   No images: ${allContent.length - migratedCount - alreadyMigratedCount}`);
    console.log('\n✨ Migration complete!');

    await mongoose.connection.close();
    console.log('✓ Database connection closed');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
if (require.main === module) {
  migrateImageData();
}

module.exports = migrateImageData;



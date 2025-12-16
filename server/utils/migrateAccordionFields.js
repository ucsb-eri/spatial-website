/**
 * Migration Script: Add accordionOrder and taborder to existing AccordionItems
 * 
 * This script safely adds the new fields to existing accordion items.
 * It's idempotent - safe to run multiple times.
 * 
 * Usage:
 *   MONGODB_URI="your-connection-string" node server/utils/migrateAccordionFields.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { InfoPanels, AccordionItem } = require('../models');

const MONGODB_URI = process.env.MONGODB_URI_PROD
console.log('MONGODB_URI:', MONGODB_URI);
async function migrateAccordionFields() {
  console.log('\n==========================================');
  console.log('  Accordion Fields Migration');
  console.log('==========================================\n');
  
  try {
    // Connect to MongoDB
    console.log(`Connecting to: ${MONGODB_URI.substring(0, 40)}...`);
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ Connected to MongoDB\n');

    // Get all InfoPanels with their accordions populated
    const panels = await InfoPanels.find().populate('accordion');
    console.log(`Found ${panels.length} InfoPanels to check\n`);

    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Process each panel
    for (const panel of panels) {
      if (!panel.accordion || panel.accordion.length === 0) {
        continue;
      }

      console.log(`\nProcessing panel: "${panel.name}" (${panel.accordion.length} accordions)`);

      // Process each accordion in the panel
      for (let i = 0; i < panel.accordion.length; i++) {
        const accordion = panel.accordion[i];
        
        try {
          // Check if fields already exist
          const needsUpdate = 
            accordion.accordionOrder === undefined || 
            accordion.accordionOrder === null ||
            accordion.taborder === undefined ||
            accordion.taborder === null;

          if (!needsUpdate) {
            console.log(`  ✓ Accordion "${accordion.title}" already has order fields`);
            skippedCount++;
            continue;
          }

          // Update the accordion with new fields
          await AccordionItem.findByIdAndUpdate(
            accordion._id,
            {
              $set: {
                accordionOrder: accordion.accordionOrder !== undefined ? accordion.accordionOrder : i,
                taborder: accordion.taborder !== undefined ? accordion.taborder : panel.taborder
              }
            }
          );

          console.log(`  ✓ Updated "${accordion.title}" - accordionOrder: ${i}, taborder: ${panel.taborder}`);
          updatedCount++;

        } catch (error) {
          console.error(`  ✗ Error updating accordion "${accordion.title}":`, error.message);
          errorCount++;
        }
      }
    }

    console.log('\n==========================================');
    console.log('  Migration Summary');
    console.log('==========================================');
    console.log(`✓ Updated:  ${updatedCount} accordion items`);
    console.log(`○ Skipped:  ${skippedCount} accordion items (already migrated)`);
    if (errorCount > 0) {
      console.log(`✗ Errors:   ${errorCount} accordion items`);
    }
    console.log('==========================================\n');

    if (updatedCount > 0) {
      console.log('✅ Migration completed successfully!\n');
    } else {
      console.log('ℹ️  No updates needed - all accordion items already have the new fields.\n');
    }

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.\n');
  }
}

// Run the migration
migrateAccordionFields()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });


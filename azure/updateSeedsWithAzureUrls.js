#!/usr/bin/env node
/**
 * Update Seed Files with Azure Blob URLs
 * 
 * This script reads the image-mapping.json file and updates all seed files
 * to use Azure Blob URLs instead of local paths.
 * 
 * Usage:
 *   node azure/updateSeedsWithAzureUrls.js
 * 
 * Prerequisites:
 *   - Run uploadLocalImagesToAzure.js first to generate image-mapping.json
 */

const fs = require('fs');
const path = require('path');

const MAPPING_FILE = path.join(__dirname, 'image-mapping.json');
const SEEDS_DIR = path.join(__dirname, '../server/seeders');

function updateSeedFile(seedFile, mapping) {
  console.log(`\n📝 Updating ${path.basename(seedFile)}...`);
  
  let content = fs.readFileSync(seedFile, 'utf-8');
  let updateCount = 0;
  
  // Replace each local path with Azure URL
  Object.entries(mapping).forEach(([localPath, azureUrl]) => {
    // Try different quote styles and variations
    const patterns = [
      new RegExp(`"${localPath.replace(/\\/g, '\\\\')}"`, 'g'),
      new RegExp(`'${localPath.replace(/\\/g, '\\\\')}'`, 'g'),
      new RegExp(`"${localPath.replace(/\\\\/g, '/')}"`, 'g'),
      new RegExp(`'${localPath.replace(/\\\\/g, '/')}'`, 'g'),
    ];
    
    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, `"${azureUrl}"`);
        updateCount += matches.length;
      }
    });
  });
  
  // Write updated content back
  fs.writeFileSync(seedFile, content, 'utf-8');
  console.log(`  ✓ Updated ${updateCount} image references`);
  
  return updateCount;
}

async function main() {
  try {
    // Check if mapping file exists
    if (!fs.existsSync(MAPPING_FILE)) {
      console.error('❌ image-mapping.json not found!');
      console.log('💡 Run: node azure/uploadLocalImagesToAzure.js first');
      process.exit(1);
    }

    // Load mapping
    const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));
    console.log(`✓ Loaded mapping for ${Object.keys(mapping).length} images\n`);

    // Find all seed files
    const seedFiles = [
      path.join(SEEDS_DIR, 'peopleSeeds.json'),
      path.join(SEEDS_DIR, 'projectSeeds.json'),
      path.join(SEEDS_DIR, 'infoSeeds.json'),
      path.join(SEEDS_DIR, 'giveSeeds.json')
    ].filter(file => fs.existsSync(file));

    let totalUpdates = 0;
    
    // Update each seed file
    for (const seedFile of seedFiles) {
      const updates = updateSeedFile(seedFile, mapping);
      totalUpdates += updates;
    }

    console.log(`\n✨ Update complete!`);
    console.log(`📊 Total image references updated: ${totalUpdates}`);
    console.log(`\n🎉 Your seed files now use Azure Blob URLs!`);
    console.log(`\n📝 Next Steps:`);
    console.log(`   1. Commit the updated seed files`);
    console.log(`   2. Deploy your app to Azure`);
    console.log(`   3. Set environment variables on Azure:`);
    console.log(`      - USE_AZURE_STORAGE=true`);
    console.log(`      - AZURE_STORAGE_CONNECTION_STRING=<your-connection-string>`);
    console.log(`      - AZURE_CONTAINER_NAME=${process.env.AZURE_CONTAINER_NAME || 'spatial-images'}`);
    console.log(`   4. Run seed script on first deployment: npm run seed`);

  } catch (error) {
    console.error('\n❌ Update failed:', error.message);
    process.exit(1);
  }
}

main();



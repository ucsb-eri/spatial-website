/**
 * Migration script to convert projects from HTML lists to arrays
 * 
 * Run this once to migrate existing data:
 * node server/utils/migrateProjectsData.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { People } = require('../models');

// Parse HTML list items to array
function parseProjectsHtml(html) {
  if (!html || typeof html !== 'string') return [];
  
  // If it doesn't contain HTML tags, return as single item array
  if (!html.includes('<')) {
    return [html.trim()];
  }
  
  // Parse HTML and extract <li> items
  const regex = /<li>(.*?)<\/li>/g;
  const projects = [];
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    // Remove any nested HTML tags (like <a>, <u>, etc.) and decode entities
    const text = match[1]
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&amp;/g, '&')   // Decode &
      .replace(/&lt;/g, '<')    // Decode <
      .replace(/&gt;/g, '>')    // Decode >
      .trim();
    
    if (text) {
      projects.push(text);
    }
  }
  
  return projects;
}

async function migrateProjectsData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spatial-website', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB');

    // Find all People documents
    const allPeople = await People.find({});
    console.log(`Found ${allPeople.length} People documents to check`);

    let migratedCount = 0;
    let alreadyMigratedCount = 0;
    let noProjectsCount = 0;

    for (const person of allPeople) {
      if (!person.projects || person.projects.length === 0) {
        noProjectsCount++;
        continue;
      }

      let needsUpdate = false;
      let newProjects = [];

      // Check each project entry
      for (const project of person.projects) {
        if (typeof project === 'string' && project.includes('<li>')) {
          // Contains HTML - needs migration
          needsUpdate = true;
          const parsedProjects = parseProjectsHtml(project);
          newProjects.push(...parsedProjects);
        } else if (typeof project === 'string') {
          // Already plain text
          newProjects.push(project);
        }
      }

      if (needsUpdate) {
        person.projects = newProjects;
        await person.save();
        migratedCount++;
        console.log(`✓ Migrated ${person.firstName} ${person.lastName}: ${newProjects.length} projects`);
      } else {
        alreadyMigratedCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   Total people: ${allPeople.length}`);
    console.log(`   Migrated: ${migratedCount}`);
    console.log(`   Already correct: ${alreadyMigratedCount}`);
    console.log(`   No projects: ${noProjectsCount}`);
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
  migrateProjectsData();
}

module.exports = migrateProjectsData;



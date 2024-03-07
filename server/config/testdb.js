const mongoose = require('mongoose');
const db = require('./connection'); // Adjust the path as necessary to your connection.js file

// Define a simple schema and model for testing purposes
// Ensure there's a 'people' collection as per your database snippets
const personSchema = new mongoose.Schema({}, { collection: 'people' }); // An empty schema definition
const Person = mongoose.model('Person', personSchema);

// Function to test database connection and query
async function testDatabaseConnection() {
  try {
    await db; // This waits for the database connection to be established
    console.log('Database connection successful');

    // Perform a simple query: find one document in the 'people' collection
    const somePerson = await Person.findOne();
    if (somePerson) {
      console.log('Successfully fetched a document:', somePerson);
    } else {
      console.log('No documents found in the collection');
    }
  } catch (error) {
    console.error('Database connection or query failed:', error);
  } finally {
    // Close the connection when done
    mongoose.disconnect();
  }
}

// Run the test
testDatabaseConnection();

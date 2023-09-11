const mongoose = require('mongoose');
const bookData = require('./bookData'); // Replace with the correct path

// Import your Book model (make sure it matches your actual schema)
const Book = require('../models/Book'); // Replace with the correct path

// Define your MongoDB connection URI
const mongoURI = 'mongodb://localhost/my-bookshelf'; // Replace with your MongoDB URI

// Connect to your MongoDB database without useCreateIndex and useFindAndModify
mongoose.connect(process.env.MONGODB_URI || mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    // Clear existing data (optional)
    await Book.deleteMany({});

    // Insert book data from bookData.js
    await Book.insertMany(bookData);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding the database:', err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Execute the seeding process
seedDatabase();

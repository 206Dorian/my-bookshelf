const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    const uri = process.env.YOUR_CONNECTION_STRING;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};


module.exports =  { connectToMongoDB };
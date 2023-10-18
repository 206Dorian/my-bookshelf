const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const isFirebaseEnvironment = process.env.GCLOUD_PROJECT !== undefined;  // Firebase Functions set GCLOUD_PROJECT environment variable

const getMongoDBConnectionString = () => {
  if (isFirebaseEnvironment) {
    const functions = require('firebase-functions');
    return functions.config().mongodb.connectionstring;
  } else {
    return process.env.YOUR_CONNECTION_STRING;
  }
}

const connectToMongoDB = async () => {
  try {
    const uri = getMongoDBConnectionString();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

module.exports = { connectToMongoDB };

const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect('mongodb://localhost/my-bookshelf', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usernameToUpdate = 'tim'; // Replace with the username of the user you want to update

// Find the specific user by their username
User.findOne({ username: usernameToUpdate })
  .then(user => {
    if (!user) {
      console.error('User not found');
      mongoose.connection.close();
      return;
    }

    // Save the changes back to the database
    return user.save();
  })
  .then(() => {
    console.log('User updated successfully');
    // Close the database connection
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error updating user:', err);
    mongoose.connection.close();
  });

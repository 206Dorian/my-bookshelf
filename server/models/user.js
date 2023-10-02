const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const dogEarSchema = new Schema({
  ISBN: {
    type: String,
    ref: 'Book',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  text: String,
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // Add a field for the user's bookshelf
    bookshelf: [
      {
        ISBN: {
          type: String,
          ref: 'Book',
        },
        placement: {
          type: Number,
          min: 1,
          max: 100,
          required: true,
        },
        dogEars: [dogEarSchema],
      },
    ],
    friendRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    username: String,
 
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;







const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
require('dotenv').config();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).select('-__v -password');
        return user;
      }
      // Instead of returning null, you can throw an error if the user is not logged in
      throw new AuthenticationError('Not logged in');
    },
    Users: async () => {
      return await User.find().populate('bookshelf.bookId');
    },
    getUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).select('-__v -password').populate('bookshelf.bookId');
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },

    getBooks: async () => {
      try {
        const books = await Book.find();
        return books;
      } catch (error) {
        throw new Error('Error fetching books', error);
      }
    },

    getBookDetails: async (_, { bookId }) => {
      try {
        console.log('Searching for book with bookId:', bookId);

        // Retrieve the book details based on the bookId
        const book = await Book.findOne({ bookId });
        console.log('Found book:', book);

        if (!book) {
          throw new Error('Book not found');
        }

        return book;
      } catch (error) {
        console.error('Error fetching book details', error);
        throw new Error('Error fetching book details');
      }
    },

  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    deleteUser: async (parent, { username }) => {
      const user = await User.findOneAndDelete({ username });
      return `We will miss you ${user.username}`;
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user: { ...user.toObject(), email: user.email } };
    },
    adminLogin: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      if (!user.isAdmin) {
        throw new AuthenticationError('Unauthorized');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUserBook: async (_, { userId, bookId, placement }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const book = await Book.findById(bookId);
      if (!book) {
        throw new Error('Book not found');
      }

      // Check if the book is already in the user's bookshelf
      const existingEntry = user.bookshelf.find((entry) => entry.bookId.toString() === bookId);
      if (existingEntry) {
        throw new Error('Book already in the user\'s bookshelf');
      }

      // Push a new bookshelf entry
      user.bookshelf.push({ bookId, placement });
      await user.save();

      return user;
    },

    updateUserBookshelf: async (_, { userId, bookshelf }, context) => {
      // Check if the user is authorized to perform this action (e.g., they are the owner of the bookshelf)
      if (context.user && context.user._id === userId) {
        try {
          // Update the user's bookshelf with the provided bookshelf data
          const user = await User.findByIdAndUpdate(
            userId,
            { $set: { bookshelf } },
            { new: true }
          ).populate('bookshelf.bookId');

          return user;
        } catch (error) {
          throw new Error('Error updating user bookshelf');
        }
      } else {
        throw new AuthenticationError('Unauthorized');
      }
    },

    addBatchBooks: async (_, { userId, books }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Generate an array of BookshelfEntry objects with ObjectIds and random positions
      const bookshelfEntries = books.map((book, index) => ({
        bookId: new ObjectId(),
        placement: Math.floor(Math.random() * 100) + 1,
      }));

      // Push the generated bookshelf entries to the user's bookshelf
      user.bookshelf.push(...bookshelfEntries);
      await user.save();

      return bookshelfEntries;
    },
  },
};

module.exports = resolvers; 
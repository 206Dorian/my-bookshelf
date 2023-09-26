const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
require('dotenv').config();
const mongoose = require('mongoose');



const resolvers = {
  Query: {
    Users: async () => {
      return await User.find().populate('bookshelf.ISBN');
    },
    getUser: async (_, args, context) => {
      return User.findById(context.user._id)
        .populate('bookshelf')
        .exec();
    },

    getBooks: async () => {
      try {
        const books = await Book.find();
        return books;
      } catch (error) {
        throw new Error('Error fetching books', error);
      }
    },

    getBookDetails: async (_, { ISBN }) => {
      try {
        console.log('Searching for book with ISBN:', ISBN);

        // Retrieve the book details based on the ISBN
        const book = await Book.findOne({ ISBN: ISBN });
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
    addToBookshelf: async (_, { ISBN, bookDetails }, context) => {
      if (context.user) {
        let book = await Book.findOne({ ISBN });
    
        if (!book && bookDetails) {
          book = await Book.create(bookDetails);
        }
    
        if (!book) {
          throw new Error('Book details must be provided for new books');
        }
    
        const user = await User.findById(context.user._id);
    
        const alreadyExists = user.bookshelf.some(bookEntry => bookEntry.ISBN === ISBN);
        if (alreadyExists) {
          throw new Error('Book already exists in the bookshelf');
        }
    
        const placements = user.bookshelf.map(bookEntry => bookEntry.placement);
        let newPlacement = 1;
        while (placements.includes(newPlacement) && newPlacement <= 100) {
          newPlacement++;
        }
    
        if (newPlacement > 100) {
          throw new Error('Bookshelf is full');
        }
    
        user.bookshelf.push({ ISBN: book.ISBN, placement: newPlacement });
        await user.save();
    
        // Return the BookshelfEntry.
        return {
          ISBN: ISBN,
          placement: newPlacement,
          book: book // assuming the book object contains the necessary details
        };
      } else {
        throw new AuthenticationError('Not logged in');
      }
    },
    




  },
};

module.exports = resolvers; 
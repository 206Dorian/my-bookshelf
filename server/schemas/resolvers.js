const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
require('dotenv').config();
const mongoose = require('mongoose');



const resolvers = {
  Query: {
    getUser: async (_, __, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate('friends')
          .populate('friendRequests');
    
        if (user) {
          // Fetch all books in one query
          const booksISBN = user.bookshelf.map(entry => entry.ISBN);
          console.log('Searching for books with ISBNs:', booksISBN); 
          const books = await Book.find({ ISBN: { $in: booksISBN } });
          console.log('Found Books:', books); 
    
          // Explicitly iterate over the bookshelf and update the book field
          for(let entry of user.bookshelf) {
            const bookDetail = books.find(book => book.ISBN === entry.ISBN);
            if (bookDetail) {
              entry.book = bookDetail;
            }
          }
    
          console.log('Final Bookshelf:', user.bookshelf);
    
          return user;
        }
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
    recentBooks: async (_parent, args, context) => {
      try {
        // Use the Book Mongoose model to query the most recent books.
        const recentBooks = await Book.find()
          .sort({ addedDate: -1 }) // sort by addedDate in descending order
          .limit(args.limit) // limit the number of results
          .exec(); // execute the query
        return recentBooks;
      } catch (error) {
        throw new Error('Error fetching recent books', error);
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
        console.log('Found book:', book);
        if (!book && bookDetails) {
          book = await Book.create(bookDetails);
          console.log('Created book:', book);
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
    sendFriendRequest: async (_, { friendUsername }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const friend = await User.findOne({ username: friendUsername });
    
        if (!friend) {
          throw new Error('User not found!');
        }
    
        // Add the friend to the user's friendRequests list
        user.friendRequests.push(friend._id);
        await user.save();
    
        // Return the friend object with both user ID and username
        return {
          _id: friend._id,
          username: friend.username,
        };
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    acceptFriendRequest: async (_, { friendUsername }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const friend = await User.findOne({ username: friendUsername });
    
        if (!friend || !user.friendRequests.includes(friend._id)) {
          throw new Error('User not found or no friend request from this user!');
        }
    
        // Move the friend from the friendRequests list to the friends list
        user.friendRequests = user.friendRequests.filter(
          (request) => request.toString() !== friend._id.toString()
        );
        user.friends.push(friend._id);
        
        await user.save();
    
        // Return the friend object with both user ID and username
        return {
          _id: friend._id,
          username: friend.username,
        };
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
  
    declineFriendRequest: async (_, { friendUsername }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const friend = await User.findOne({ username: friendUsername });
    
        if (!friend) {
          throw new Error('User not found!');
        }
    
        // Remove the friend from the user's friendRequests list
        user.friendRequests = user.friendRequests.filter(
          (request) => request.toString() !== friend._id.toString()
        );
    
        await user.save();
    
        // Return a response object indicating success and the friend details
        return {
          success: true,
          message: 'Friend request declined successfully.',
          friend: {
            userId: friend._id,
            username: friend.username,
          },
        };
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    addDogEar: async (parent, { createdBy, friendId, ISBN, text }, context) => {
      if (context.user && context.user._id === friendId) {
        const owner = await User.findById(createdBy);

        // Find the specific book in owner's bookshelf.
        const bookEntry = owner.bookshelf.find(entry => entry.ISBN === ISBN);

        if (bookEntry) {
          bookEntry.dogEars.push({ ISBN, createdBy: friendId, text });
          await owner.save();
        } else {
          throw new Error('Book not found in user\'s bookshelf');
        }

        const book = await Book.findOne({ ISBN });
        const friend = await User.findById(friendId);

        return {
          book: book,
          user: owner,
          friend: friend,
          text: text
        };
      }
      throw new AuthenticationError('You need to be logged in as the correct friend!');
    },
  },
};

module.exports = resolvers; 
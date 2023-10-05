const { User, Book, Notification } = require('../models');
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
          .populate('friendRequests')
          .populate('notifications');
    
        if (user) {
          // Fetch all books in one query
          const booksISBN = user.bookshelf.map(entry => entry.ISBN);
          const books = await Book.find({ ISBN: { $in: booksISBN } });
 
    
          // Explicitly iterate over the bookshelf and update the book field
          for(let entry of user.bookshelf) {
            const bookDetail = books.find(book => book.ISBN === entry.ISBN);
            if (bookDetail) {
              entry.book = bookDetail;
            }
          }
    
     
    
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
   
        // Retrieve the book details based on the ISBN
        const book = await Book.findOne({ ISBN: ISBN });

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
    getUserNotifications: async (_, __, context) => {
      if (!context.user) {
          throw new AuthenticationError('Not logged in');
      }
      const notifications = await Notification.find({ recipient: context.user._id });
      return notifications;
  },
  getFriend: async (_, { username }, context) => {
    if (context.user) {
      console.log("Context user:", context.user);

      const friend = await User.findOne({ username })
        .populate('friends')
        .populate('friendRequests')
      
      console.log("Fetched friend:", friend);
  
      if (!friend) {
        throw new Error('User not found');
      }
  
      let isFriend = friend.friends.some(f => f._id.toString() === context.user._id);
      console.log("Is friend:", isFriend);
  console.log(friend._id)
      const booksISBN = friend.bookshelf.map(entry => entry.ISBN);
      const books = await Book.find({ ISBN: { $in: booksISBN } });
  
      // Creating a new array for bookshelf with attached book details
      const newBookshelf = friend.bookshelf.map(entry => {
        const bookDetail = books.find(book => book.ISBN === entry.ISBN);
        return {
          ...entry.toObject(),  // Convert mongoose doc to a regular object
          book: bookDetail ? bookDetail.toObject() : null  // Same here for bookDetail
        };
      });
  
      return {
        ...friend.toObject(),
        bookshelf: newBookshelf,  // Overwrite the bookshelf with the new one
        isFriend: isFriend
      };
    }
    throw new AuthenticationError('Not logged in');
  },

  
    searchUsers: async (_, { username }, context) => {
      if (!context.user) {
          throw new AuthenticationError('Not logged in');
      }
      try {
          const users = await User.find({ username: { $regex: username, $options: 'i' } });
          return users;
      } catch (error) {
          throw new Error('Error fetching users');
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
    sendFriendRequest: async (_, { friendUsername }, context) => {
      if (context.user) {
          const user = await User.findById(context.user._id);
          const friend = await User.findOne({ username: friendUsername });
      
          if (!friend) {
              throw new Error('User not found!');
          }
      
          friend.friendRequests.push(user._id);
          await friend.save();
          
      
          // Create a notification for the friend request
          await Notification.create({
              recipient: friend._id,
              sender: user._id,
              type: 'FRIEND_REQUEST',
              content: `${user.username} sent you a friend request.`,
          });
      
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
    
        // Move the friend from the friendRequests list to the friends list for the user
        user.friendRequests = user.friendRequests.filter(
          (request) => request.toString() !== friend._id.toString()
        );
        user.friends.push(friend._id);
    
        // Add the user to the friend's friend list
        friend.friends.push(user._id);
    
        await user.save();
        await friend.save();
    
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
    
    addDogEar: async (parent, { userId, friendId, ISBN, text }, context) => {
      console.log("addDogEar resolver called");
      console.log("Received Args:", { userId, friendId, ISBN, text });

      if (!friendId) {
        throw new Error('Friend ID is missing.');
    }
      // Verify the logged-in user is the one trying to add the dog ear
      if (context.user && context.user._id === userId) {
          const friend = await User.findById(friendId);
  
          // Check if the book exists in the friend's bookshelf
          const bookEntry = friend.bookshelf.find(entry => entry.ISBN === ISBN);
          if (!bookEntry) {
              throw new Error('Book not found in friend\'s bookshelf');
          }
  
          // Add the dog ear
          if (!friend.dogEars) {
              friend.dogEars = [];
          }
          friend.dogEars.push({ ISBN, createdBy: userId, text });
  
          await friend.save();
  
          const book = await Book.findOne({ ISBN });
  
          return {
              book: book,
              user: await User.findById(userId),  // User A (one who added the dog ear)
              friend: friend,  // User B (one whose bookshelf the dog ear was added to)
              text: text
          };
      }
      throw new AuthenticationError('You need to be logged in!');
  },
  },  
};

module.exports = resolvers; 
const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
require('dotenv').config();

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
        Users: async (parent, args, context) => {
            return await User.find();
        },
        getUser: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).select('-__v -password');
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
        },
  
}
module.exports = resolvers; 
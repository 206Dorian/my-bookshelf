const User = require('./models/User');
const Notification = require('./models/Notification');
const Book = require('./models/Book');
const { AuthenticationError, signToken } = require('./utils/auth');
const { typeDefs } = require('./schemas/typeDefs');
const { resolvers } = require('./schemas/resolvers');
const { connectToMongoDB } = require('./server/config/connection.js');  
const functions = require('firebase-functions');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');

const mongoConnectionString = process.env.NODE_ENV === 'production' ? 
    functions.config().mongodb.connectionstring : process.env.YOUR_CONNECTION_STRING;

connectToMongoDB(mongoConnectionString);

// Your GraphQL type definitions and resolvers:

// Create an Apollo Server instance:
const server = new ApolloServer({typeDefs, resolvers});

// Connect Apollo Server with Express:
const app = express();
server.applyMiddleware({app, path: '/', cors: true});

// Export your function:
exports.graphql = functions.https.onRequest(app);

const { gql } = require('apollo-server-express');

const typeDefs = gql`
 type User {
    _id: ID
    username: String
    email: String
    password: String
    isAdmin: Boolean
  }

  type Auth {
    token: ID
    user: User
  }

  type Book {
  _id: ID
  count: String
  title: String
  author: String
  }

  type Query {
    user: User
    Users: [User]
    getUser: User
    getBooks: [Book]
  
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, isAdmin: Boolean!): Auth
    deleteUser(username: String!): User
    login(username: String!, password: String!): Auth
    adminLogin(username: String!, password: String!): Auth
    }
`;


module.exports = typeDefs;

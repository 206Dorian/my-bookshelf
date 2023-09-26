const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    isAdmin: Boolean
    bookshelf: [Book]
  }

  type Auth {
    token: ID
    user: User
  }

  type Book {
    _id: ID
    title: String!
    author: String!
    ISBN: String
    firstSentence: String
  }

  input BookInput {
    title: String
    author: String
    ISBN: String
    firstSentence: String
  }


  type BookshelfEntry {
    ISBN: String
    placement: Int
    book: Book 
  }

  type Query {
    user: User
    Users: [User]
    getUser: User
    getBooks: [Book]
    getBookDetails(ISBN: String!): Book
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, isAdmin: Boolean!): Auth
    deleteUser(username: String!): User
    login(username: String!, password: String!): Auth
    adminLogin(username: String!, password: String!): Auth
    addToBookshelf(ISBN: String!, bookDetails: BookInput): BookshelfEntry!

  }
`;

module.exports = typeDefs;

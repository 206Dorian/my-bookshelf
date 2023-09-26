const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    isAdmin: Boolean
    bookshelf: [BookshelfEntry]
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
  input BatchBookInput {
  title: String!
  author: String!
}

  input BookshelfEntryInput {
    bookId:  ID
    placement: Int!
  }

  type BookshelfEntry {
    bookId:  ID
    placement: Int!
    book: Book 
  }

  type Query {
    user: User
    Users: [User]
    getUser: User
    getBooks: [Book]
    getBookDetails(bookId: ID!): Book 
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, isAdmin: Boolean!): Auth
    deleteUser(username: String!): User
    login(username: String!, password: String!): Auth
    adminLogin(username: String!, password: String!): Auth
    addUserBook(userId: ID!, bookId: ID!, placement: Int!): User
    updateUserBookshelf(userId: ID!, bookshelf: [BookshelfEntryInput]!): User
    addBatchBooks(userId: ID!, books: [BatchBookInput]!): [BookshelfEntry]!
  }
`;

module.exports = typeDefs;

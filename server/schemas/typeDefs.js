const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    isAdmin: Boolean
    bookshelf: [BookshelfEntry]
    friendRequests: [User]
    friends: [User]
    notifications: [Notification]
    isFriend: Boolean
  }

  type Friend {
  id: ID!
  name: String!
  # other fields
}

  type DogEar {
  ISBN: String
  createdBy: ID
  text: String
}


type DogEarAction {
  book: Book
  user: User
  friend: User
  text: String
}


type FriendRequestResponse {
  success: Boolean!
  message: String
  friend: User
}

  type Auth {
    token: ID
    user: User
  }

  type Book {
    title: String!
    author: String!
    ISBN: String
    firstSentence: String
    addedDate: String
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
    addedDate: String
    book: Book 
    dogEars: [DogEar] 
  }
  type Notification {
    _id: ID!
    sender: User!
    type: String!
    content: String!
    isRead: Boolean!
    createdAt: String!
}
  

  type Query {
    getUser: User
    getFriend(username: String!): User
    getBooks: [Book]
    getBookDetails(ISBN: String!): Book
    recentBooks(limit: Int): [Book]
    getUserNotifications: [Notification]
    searchUsers(username: String!): [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, isAdmin: Boolean!): Auth
    deleteUser(username: String!): User
    login(username: String!, password: String!): Auth
    adminLogin(username: String!, password: String!): Auth
    addToBookshelf(ISBN: String!, bookDetails: BookInput): BookshelfEntry!
    addDogEar(userId: ID!, friendId: ID!, ISBN: String!, text: String!): DogEarAction
    sendFriendRequest(friendUsername: String!): User
    acceptFriendRequest(friendUsername: String!): User
   declineFriendRequest(friendUsername: String!): FriendRequestResponse
    }
`;

module.exports = typeDefs;

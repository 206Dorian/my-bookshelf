import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser(
    $username: String!
    $email: String!
    $password: String!
    $isAdmin: Boolean!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      isAdmin: $isAdmin
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($username: String!) {
    deleteUser(username: $username) {
      _id
    }
  }
`;

export const ADD_TO_BOOKSHELF = gql`
  mutation AddToBookshelf($ISBN: String!, $bookDetails: BookInput) {
    addToBookshelf(ISBN: $ISBN, bookDetails: $bookDetails) {
      ISBN
      placement
      addedDate
      book {
        title
        author
        firstSentence
      }
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($friendUsername: String!) {
    sendFriendRequest(friendUsername: $friendUsername) {
      _id
      username
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($friendUsername: String!) {
    acceptFriendRequest(friendUsername: $friendUsername) {
      _id
      username
    }
  }
`;

export const DECLINE_FRIEND_REQUEST = gql`
  mutation DeclineFriendRequest($friendUsername: String!) {
    declineFriendRequest(friendUsername: $friendUsername) {
      _id
      username
    }
  }
`;

export const ADD_DOG_EAR = gql`
  mutation AddDogEar(
    $userId: ID!
    $friendId: ID!
    $ISBN: String!
    $text: String!
  ) {
    addDogEar(userId: $userId, friendId: $friendId, ISBN: $ISBN, text: $text) {
      book {
        title
      }
      user {
        username
      }
      friend {
        username
      }
      text
    }
  }
`;

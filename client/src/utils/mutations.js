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
  mutation AddUser($username: String!, $email: String!, $password: String!, $isAdmin: Boolean!) {
    addUser(username: $username, email: $email, password: $password, isAdmin: $isAdmin) {
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
    deleteUser(username: $username)
  }
`;

export const ADD_TO_BOOKSHELF = gql`
  mutation AddToBookshelf($ISBN: String!, $bookDetails: BookInput) {
    addToBookshelf(ISBN: $ISBN, bookDetails: $bookDetails) {
      ISBN
      placement
      book {
        title
        author
        firstSentence
      }
    }
  }
`;


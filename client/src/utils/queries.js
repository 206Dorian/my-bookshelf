import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      username
      email
      isAdmin
    }
  }
`;


export const GET_BOOKS = gql`
  query GetBooks {
    books {
      _id
      count
      title
      author

    }
  }
`;

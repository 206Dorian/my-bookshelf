import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      username
      email
      bookshelf {
        _id
        title
        author
        ISBN
        firstSentence
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      _id
      title
      author
      ISBN
      firstSentence
    }
  }
`;

export const GET_BOOK_DETAILS = gql`
  query GetBookDetails($ISBN: String!) {
    getBookDetails(ISBN: $ISBN) {
      _id
      title
      author
      ISBN
      firstSentence
    }
  }
`;

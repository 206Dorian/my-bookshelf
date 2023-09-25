import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      username
      email
      isAdmin
      bookshelf {
        bookId
        placement
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
    }
  }
`;

export const GET_BOOK_DETAILS = gql`
  query GetBookDetails($bookId: ID!) {
    getBookDetails(bookId: $bookId) {
      _id
      title
      author
    }
  }
`;
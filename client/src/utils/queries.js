import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      username
      email
      bookshelf {
        ISBN
        placement
        book {
          title
          author
          firstSentence
        }
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
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
      title
      author
      ISBN
      firstSentence
    }
  }
`;


export const RECENT_BOOKS_QUERY = gql`
query GetRecentBooks($limit: Int) {
  recentBooks(limit: $limit) {
    title
    author
  }
}
`;
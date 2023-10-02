import { gql } from '@apollo/client';

export const GET_USER = gql`
 query GetUser {
    getUser {
      username
      email
      friends {
        _id
        username
      }
      friendRequests {
        _id
        username
      }
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

export const SEARCH_USER = gql`
  query SearchUser($username: String!) {
    searchUser(username: $username) {
      _id
      username
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks($offset: Int, $limit: Int, $filter: String) {
    getBooks(offset: $offset, limit: $limit, filter: $filter) {
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
    addedDate
  }
}
`;

import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      username
      email
      isAdmin
      bookshelf {
        ISBN
        placement
        addedDate
        dogEars {
          ISBN
          createdBy
          text
        }
        book {
          title
          author
        }
      }
      friendRequests {
        _id
        username
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const SEARCH_USER = gql`
  query getFriend($username: String!) {
    getFriend(username: $username) {
      _id
      username
      isFriend 
    }
  }
`;
export const GET_FRIEND = gql`
  query getFriend($username: String!) {
    getFriend(username: $username) {
      _id
      username
      isFriend 
      bookshelf {
        ISBN
        placement
        addedDate
        dogEars {
          ISBN
          createdBy
          text
        }
        book {
          title
          author
          ISBN
          firstSentence
        }
      }
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



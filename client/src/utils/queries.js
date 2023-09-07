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

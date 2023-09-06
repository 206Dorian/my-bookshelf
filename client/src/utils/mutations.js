import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
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
  mutation deleteUser($username: String!){ 
    deleteUser(username:$username)
}
`


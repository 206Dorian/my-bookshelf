import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_BOOK_DETAILS } from '../utils/queries'; // Import the GET_BOOKS query
import Bookshelf from '../components/Bookshelf';

const Profile = () => {
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);
  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(GET_BOOK_DETAILS); // Execute the GET_BOOKS query

  if (userLoading || booksLoading) return <p>Loading...</p>;
  if (userError) return <p>User Error: {userError.message}</p>;
  if (booksError) return <p>Books Error: {booksError.message}</p>;

  const user = userData.getUser;
  const books = booksData.getBooks; // Extract the books data
  console.log(user)
  console.log(books)

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <Bookshelf books={books} /> {/* Pass the fetched books data to the Bookshelf component */}
    </div>
  );
};

export default Profile;

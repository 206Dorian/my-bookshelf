// Profile.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import Bookshelf from '../components/Bookshelf';
const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data)

  const user = data.getUser;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <Bookshelf />
    </div>
  );
};

export default Profile;

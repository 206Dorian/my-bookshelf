import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER} from '../utils/queries'; // 
import Bookshelf from '../components/Bookshelf';


const Profile = () => {

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>User Error: {userError.message}</p>;

  const user = userData?.getUser;
  console.log(user);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>friends:{user.friends[0].username}</p>
      <Bookshelf books={user.bookshelf} /> 
    </div>
  );
};

export default Profile;

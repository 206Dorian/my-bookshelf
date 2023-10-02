import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_USER} from '../utils/queries'; 
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
      <p>Friends:</p>
      <ul>
        {/* Map through the friends array and create a link for each friend */}
        {user.friends.map((friend, index) => (
          <li key={index}>
            <Link to={`/friend/${friend.username}`}>
              {friend.username}
            </Link>
          </li>
        ))}
      </ul>
      <Bookshelf books={user.bookshelf} /> 
    </div>
  );
};


export default Profile;

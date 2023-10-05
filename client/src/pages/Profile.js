import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_USER} from '../utils/queries'; 
import Bookshelf from '../components/Bookshelf';
import SearchFriend from '../components/SearchFriend';  
import Notifications from '../components/Notifications';
import LogoutButton from '../components/Logout.js';

const Profile = () => {

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER);

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>User Error: {userError.message}</p>;

  const user = userData?.getUser;

  const handleUserSelected = (user) => {
    console.log('Selected user:', user);
    // You can navigate to the user's profile or do whatever is needed
  };
  
  return (
    <div>
      <LogoutButton />
       <SearchFriend onUserSelected={handleUserSelected} />
      <h1>User Profile</h1>
      <Notifications />
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
      <Bookshelf books={user.bookshelf} ownerId={user._id} />
    </div>
  );
};


export default Profile;

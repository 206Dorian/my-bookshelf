import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_USER } from '../utils/queries';
import Bookshelf from '../components/Bookshelf';
import SearchFriend from '../components/SearchFriend';
import Notifications from '../components/Notifications';
import LogoutButton from '../components/Logout.js';
import './Profile.css';

const Profile = () => {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER);

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>User Error: {userError.message}</p>;

  const user = userData?.getUser;

  const handleUserSelected = user => {
    console.log('Selected user:', user);
  };

  return (
    <div>
      <LogoutButton />
      <div className='row'>
        <div className='MyZone col-4' >
          <h1>User Profile</h1>
          <p>Username: {user.username}</p>
        </div>
        <div className='FriendZone col-4 m-5' >
          <Notifications />
          <h3>Friends:</h3>
          <SearchFriend onUserSelected={handleUserSelected} />
          <ul>
            {/* Map through the friends array and create a link for each friend */}
            {user.friends.map((friend, index) => (
              <li key={index}>
                <Link to={`/friend/${friend.username}`}>{friend.username}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Bookshelf books={user.bookshelf} ownerId={user._id} />
    </div>
  );
};

export default Profile;

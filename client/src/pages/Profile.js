import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_USER } from '../utils/queries';
import Bookshelf from '../components/Bookshelf';
import SearchFriend from '../components/SearchFriend';
import Notifications from '../components/Notifications';
import SearchBar from '../components/SearchBar';
import './Profile.css';
import BookSuggestion from '../components/BookSuggestion';

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
      <div className='row'>
        <div className='search'>
          <SearchBar/>
          </div>
        <div className='MyZone col-4 offset-1' >
          <h1>User Profile</h1>
          <p>Username: {user.username}</p>
        </div>
        <div className='FriendZone col-5 offset-1' >
          <Notifications />
          <h3>Friends:</h3>
          <SearchFriend onUserSelected={handleUserSelected} />
          <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
            {/* Map through the friends array and create a link for each friend */}
            {user.friends.map((friend, index) => (
              <li key={index}>
                <Link to={`/friend/${friend.username}`} className="friend-name">
                  {friend.username}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Bookshelf books={user.bookshelf} ownerId={user._id} />

      <BookSuggestion />
    </div>
  );
};

export default Profile;

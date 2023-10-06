import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_FRIEND } from '../utils/queries'; 
import Bookshelf from '../components/Bookshelf';

function FriendProfile() {
  const { username } = useParams();

  // Use the getFriend query to fetch the friend's bookshelf data using the username
  const { loading, error, data } = useQuery(GET_FRIEND, {
    variables: { username }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const friend = data?.getFriend;
console.log(friend)
  return (
    <div>
      <h1>{friend.username}'s Bookshelf</h1>
      {/* Render the friend's bookshelf */}
      <Bookshelf books={friend.bookshelf} ownerId={friend._id} />
    </div>
  );
}

export default FriendProfile;

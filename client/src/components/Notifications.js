import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import {
  ACCEPT_FRIEND_REQUEST,
  DECLINE_FRIEND_REQUEST,
} from '../utils/mutations';
import './FriendList.css';

const Notifications = () => {
  const { loading, error, data } = useQuery(GET_USER);
  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
  const [declineFriendRequest] = useMutation(DECLINE_FRIEND_REQUEST);

  const handleAccept = async username => {
    try {
      await acceptFriendRequest({ variables: { friendUsername: username } });
      // Optionally, you can refetch the GET_USER query to update the UI.
      // or manage the state to remove the accepted request from the list
      alert('Friend request accepted!');
    } catch (err) {
      console.error('Error accepting friend request:', err);
    }
  };

  const handleDecline = async username => {
    try {
      await declineFriendRequest({ variables: { friendUsername: username } });
      // Optionally, you can refetch the GET_USER query to update the UI.
      // or manage the state to remove the declined request from the list
      alert('Friend request declined.');
    } catch (err) {
      console.error('Error declining friend request:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h4>Friend Requests</h4>
      {data?.getUser?.friendRequests.length ? (
        data.getUser.friendRequests.map(request => (
          <div key={request._id}>
            <span>{request.username}</span>
            <button onClick={() => handleAccept(request.username)} className='request-btn'>
              Accept
            </button>
            <button onClick={() => handleDecline(request.username)}className='request-btn'>
              Decline
            </button>
          </div>
        ))
      ) : (
        <p>No friend requests at the moment.</p>
      )}
    </div>
  );
};

export default Notifications;

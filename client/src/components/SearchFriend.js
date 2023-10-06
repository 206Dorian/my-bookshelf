import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_USER } from '../utils/queries';
import { SEND_FRIEND_REQUEST } from '../utils/mutations';

const SearchFriend = ({ onUserSelected }) => {
  const [username, setUsername] = useState('');
  const { loading, error, data } = useQuery(SEARCH_USER, {
    variables: { username },
    skip: !username,
    fetchPolicy: 'network-only', // <-- Bypass cache and fetch from the network
  });

  const [sendFriendRequest, { data: mutationData, error: mutationError }] =
    useMutation(SEND_FRIEND_REQUEST);

  const handleSearch = e => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleSelect = user => {
    if (onUserSelected) {
      onUserSelected(user);
    }
  };

  const handleSendFriendRequest = async () => {
    if (!username) {
      alert('Username is required!');
      return;
    }
    try {
      const response = await sendFriendRequest({
        variables: { friendUsername: username },
      });
      if (response.data?.sendFriendRequest.success) {
        alert('Friend request sent successfully!');
      } else {
        alert(response.data?.sendFriendRequest.message);
      }
    } catch (err) {
      console.error('Error sending friend request:', err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search username..."
        value={username}
        onChange={handleSearch}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {mutationError && (
        <p>Error sending friend request: {mutationError.message}</p>
      )}
      {mutationData && <p>{mutationData.sendFriendRequest.message}</p>}
      {data && data.getFriend && (
        <div>
          <div
            onClick={() => handleSelect(data.getFriend)}
            role="button"
            tabIndex={0}
          >
            {data.getFriend.username}
          </div>
          {!data.getFriend.isFriend && (
            <button onClick={handleSendFriendRequest}>
              Send Friend Request
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFriend;

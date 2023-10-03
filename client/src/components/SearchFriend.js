import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_USER } from '../utils/queries';  // Adjust the path based on your project structure

const SearchFriend = ({ onUserSelected }) => {
  const [username, setUsername] = useState('');
  const { loading, error, data } = useQuery(SEARCH_USER, {
    variables: { username },
    skip: !username,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleSelect = (user) => {
    if (onUserSelected) {
      onUserSelected(user);
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
      {data && data.getFriend && (
        <div onClick={() => handleSelect(data.getFriend)}>
          {data.getFriend.username}
        </div>
      )}
    </div>
  );
};

export default SearchFriend;

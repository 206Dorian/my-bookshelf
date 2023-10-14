import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_SCRIBBLES } from '../utils/mutations'; // adjust the import path
import { GET_USER } from '../utils/queries';
const UpdateScribbles = ({ userId, ISBN }) => {
  const [scribbles, setScribbles] = useState('');
  const [updateScribblesMutation] = useMutation(UPDATE_SCRIBBLES, {
    refetchQueries: [{ query: GET_USER }], // refetch to update the UI after mutation
    onError: (error) => {
      console.error('Failed to update scribbles', error);
    },
    onCompleted: () => {
      setScribbles(''); // clear the scribbles input field
    }
  });

  const handleUpdateScribbles = () => {
    updateScribblesMutation({
      variables: {
        userId: userId,
        ISBN: ISBN,
        scribbles: scribbles
      }
    });
  };

  return (
    <div>
      <textarea
        value={scribbles}
        onChange={(e) => setScribbles(e.target.value)}
        placeholder="Update your scribbles here..."
      />
      <button onClick={handleUpdateScribbles}>Update Scribbles</button>
    </div>
  );
};

export default UpdateScribbles;

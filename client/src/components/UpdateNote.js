import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_BOOKSHELF_NOTE } from '../utils/mutations';

const UpdateNote = ({ userId, ISBN }) => {
  const [noteContent, setNoteContent] = useState('');
  const [updateNote] = useMutation(UPDATE_USER_BOOKSHELF_NOTE);

  const handleUpdateNote = async () => {
    try {
      await updateNote({ variables: { userId, ISBN, noteContent } });
      alert('Note added successfully');
      setNoteContent(''); // Clear the textarea after successful addition
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  return (
    <div>
      <textarea 
        placeholder="Add your note..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <button onClick={handleUpdateNote}>
        Add Note
      </button>
    </div>
  );
};

export default UpdateNote;

// BookDetailCard.js
import React, { useState } from 'react';
import { useMutation} from '@apollo/client';
import { ADD_TO_BOOKSHELF } from '../utils/mutations';
import './BookDetailCard.css'

const BookDetailCard = ({ bookDetails, onClose }) => {
  const [addToBookshelf] = useMutation(ADD_TO_BOOKSHELF);
  const [message, setMessage] = useState(""); // to hold feedback messages

  const handleAddToBookshelf = async () => {
   
    try {
      if (!bookDetails.ISBN) {
        throw new Error('ISBN not available for the selected book.');
      }

      await addToBookshelf({ variables: { ISBN: bookDetails.ISBN, bookDetails } });
      window.location.reload();
      setMessage("Book added to bookshelf successfully!"); // set success message
      onClose();
    } catch (error) {
      console.error(error);
      setMessage(error.message); // set error message
    }

  };

  return (
    <div id="bookDetailCard">
      <h1>{bookDetails.title}</h1>
      <h1>{bookDetails.author}</h1>
      <h1>ISBN: {bookDetails.ISBN}</h1>
      <h1>{bookDetails.firstSentence}</h1>
      {message && <p>{message}</p>} {/* display message if it exists */}
      <button onClick={handleAddToBookshelf}>Add to Bookshelf</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BookDetailCard;
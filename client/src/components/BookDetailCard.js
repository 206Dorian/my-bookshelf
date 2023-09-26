// BookDetailCard.js
import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_BOOKSHELF } from '../utils/mutations';

const BookDetailCard = ({ bookDetails, onClose }) => {
  const [addToBookshelf] = useMutation(ADD_TO_BOOKSHELF);

  const handleAddToBookshelf = async () => {
    try {
      // Ensure ISBN is available.
      if (!bookDetails.ISBN) {
        throw new Error('ISBN not available for the selected book.');
      }
      // Include the ISBN in the bookDetails object
      const completeBookDetails = { ...bookDetails, ISBN: bookDetails.ISBN };
  
      // Call the mutation with complete bookDetails as a variable.
      await addToBookshelf({ variables: { ISBN: bookDetails.ISBN, bookDetails: completeBookDetails } });
      onClose(); // close the modal after adding the book
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <div>
      <h1>{bookDetails.title}</h1>
      <button onClick={handleAddToBookshelf}>Add to Bookshelf</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BookDetailCard;

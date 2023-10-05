// BookDetailCard.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_BOOKSHELF, ADD_DOG_EAR } from '../utils/mutations';
import './BookDetailCard.css'
import DogEarForm from '../components/DogEarForm';
import Auth from '../utils/auth';


const BookDetailCard = ({ bookDetails, onClose }) => {
  const [addToBookshelf] = useMutation(ADD_TO_BOOKSHELF);
  const [message, setMessage] = useState(""); // to hold feedback messages
  const [addDogEar] = useMutation(ADD_DOG_EAR); // Initialize the ADD_DOG_EAR mutation

  const loggedInUserId = Auth.getProfile()._id;
  const handleAddToBookshelf = async () => {

    try {
      console.log(loggedInUserId);
      console.log(Auth.loggedIn());

      console.log(this.getToken());
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
      <DogEarForm
        friendId={loggedInUserId}
        ISBN={bookDetails.ISBN}
        addDogEarMutation={addDogEar}
      />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BookDetailCard;
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_BOOKSHELF, ADD_DOG_EAR } from '../utils/mutations';
import './BookDetailCard.css'
import Auth from '../utils/auth';

const BookDetailCard = ({ bookDetails, onClose, ownerId, showDogEar = true }) => {
  const [addToBookshelf] = useMutation(ADD_TO_BOOKSHELF);
  const [addDogEar] = useMutation(ADD_DOG_EAR);
  const [text, setText] = useState('');
  const [message, setMessage] = useState("");

  const loggedInUserId = Auth.getProfile()._id;

  const hasExistingDogEar = bookDetails.dogEars.some(dogEar => dogEar.createdBy === loggedInUserId);

  const handleAddToBookshelf = async (e) => {
    e.stopPropagation();

    try {
      if (!bookDetails.ISBN) {
        throw new Error('ISBN not available for the selected book.');
      }

      const cleanBookDetails = {
        title: bookDetails.book.title,
        author: bookDetails.book.author,
        ISBN: bookDetails.ISBN,
        firstSentence: bookDetails.book.firstSentence
      };

      await addToBookshelf({ variables: { ISBN: bookDetails.ISBN, bookDetails: cleanBookDetails } });

      window.location.reload();
      setMessage("Book added to bookshelf successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const handleDogEarSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await addDogEar({
        variables: {
          userId: loggedInUserId,
          friendId: ownerId,
          ISBN: bookDetails.ISBN,
          text
        }
      });
      setText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="bookDetailCard">
      <h1>{bookDetails.title}</h1>
      <h1>{bookDetails.author}</h1>
      <h1>ISBN: {bookDetails.ISBN}</h1>
      <h1>{bookDetails.firstSentence}</h1>
      {message && <p>{message}</p>}
      <button onClick={handleAddToBookshelf}>Add to Bookshelf</button>
      
      {bookDetails.dogEars && bookDetails.dogEars.length > 0 && (
        <div>
          <h3>Dog Ear Notes:</h3>
          <ul>
            {bookDetails.dogEars.map((dogEar, index) => (
              <li key={index}>{dogEar.text}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Conditionally render the DogEar form based on hasExistingDogEar */}
      {!hasExistingDogEar && (
        <div className={`dogear-form ${showDogEar ? '' : 'hidden'}`}>
          <form onSubmit={handleDogEarSubmit}>
            <div>
              <label>
                Add Dog Ear Note:
                <textarea value={text} onChange={e => setText(e.target.value)} required />
              </label>
            </div>
            <div>
              <button type="submit">Add Dog Ear</button>
            </div>
          </form>
        </div>
      )}

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BookDetailCard;

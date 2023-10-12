import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_BOOKSHELF, ADD_DOG_EAR } from '../utils/mutations';
import './BookDetailCard.css';
import Auth from '../utils/auth';

const BookDetailCard = ({
  bookDetails,
  onClose,
  ownerId,
  showDogEar = true,
}) => {

  // If `bookDetails.firstSentence` is an array, choose the first sentence. Otherwise, use it as-is.
  const firstSentence = Array.isArray(bookDetails.firstSentence)
      ? bookDetails.firstSentence[0]
      : bookDetails.firstSentence;

  const [addToBookshelf] = useMutation(ADD_TO_BOOKSHELF);
  const [addDogEar] = useMutation(ADD_DOG_EAR);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const loggedInUserId = Auth.getProfile()._id;

  const hasExistingDogEar = bookDetails.dogEars 
  ? bookDetails.dogEars.some(dogEar => dogEar.createdBy === loggedInUserId)
  : false;

  const handleAddToBookshelf = async e => {
    e.stopPropagation();

    try {
      if (!bookDetails.ISBN) {
        throw new Error('ISBN not available for the selected book.');
      }

      const cleanBookDetails = {
        title: bookDetails?.title || 'Unknown Title',
        author: bookDetails?.author || 'Unknown Author',
        ISBN: bookDetails?.ISBN || 'Unknown ISBN',
        firstSentence: bookDetails?.firstSentence || 'First sentence not available',
      };
      
      console.log(cleanBookDetails)

      await addToBookshelf({
        variables: { ISBN: bookDetails.ISBN, bookDetails: cleanBookDetails },
      });

      window.location.reload();
      setMessage('Book added to bookshelf successfully!');
      onClose();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const handleDogEarSubmit = async e => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await addDogEar({
        variables: {
          userId: loggedInUserId,
          friendId: ownerId,
          ISBN: bookDetails.ISBN,
          text,
        },
      });
      setText('');
    } catch (err) {
      console.error(err);
    }
  };
  console.log('bookDetails:', bookDetails);
  return (
    <div className='d-flex flex-column align-items-center justify-content-center'  id="bookDetailCard">
      <p>{bookDetails.title}</p>
      <p>{bookDetails.author}</p>
      <p>ISBN: {bookDetails.ISBN}</p>
      <p>{firstSentence}</p>
      {message && <p>{message}</p>}
      <button onClick={handleAddToBookshelf}>Add to Bookshelf</button>

      {bookDetails.dogEars && bookDetails.dogEars.length > 0 && (
        <div>
          <p>Dog Ear Notes:</p>
          <ul>
            {bookDetails.dogEars.map((dogEar, index) => (
              <li key={index}>{dogEar.text}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Conditionally render the DogEar form based on hasExistingDogEar */}
      {!hasExistingDogEar && (
        <div className={`dogear-form
        m-4
        p-4
        col-3
        ${showDogEar ? '' : 'hidden'}`}>
          <form onSubmit={handleDogEarSubmit}>
            <div>
              <label>
                Add Dog Ear Note:
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  required
                />
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

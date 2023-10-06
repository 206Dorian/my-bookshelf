// BookDetailCard.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_BOOKSHELF, ADD_DOG_EAR } from '../utils/mutations';
import './BookDetailCard.css'
import Auth from '../utils/auth';


const BookDetailCard = ({ bookDetails, onClose, ownerId, showDogEar = true }) => {
  const [addToBookshelf] = useMutation(ADD_TO_BOOKSHELF);
  const [addDogEar] = useMutation(ADD_DOG_EAR); // Initialize the ADD_DOG_EAR mutation
  const [text, setText] = useState('');
  const [message, setMessage] = useState("");

  const loggedInUserId = Auth.getProfile()._id;

  const handleAddToBookshelf = async (e) => {
    e.stopPropagation();



    try {
      console.log(loggedInUserId);
      console.log(Auth.loggedIn());
      console.log(Auth.getToken());

      if (!bookDetails.ISBN) {
        throw new Error('ISBN not available for the selected book.');
      }

      // Create a cleaned up version of the bookDetails
      const cleanBookDetails = {
        title: bookDetails.book.title,
        author: bookDetails.book.author,
        ISBN: bookDetails.ISBN,
        firstSentence: bookDetails.book.firstSentence
      };

      console.log(cleanBookDetails)

      // Use cleanBookDetails in the mutation
      await addToBookshelf({ variables: { ISBN: bookDetails.ISBN, bookDetails: cleanBookDetails } });

      window.location.reload();
      setMessage("Book added to bookshelf successfully!"); // set success message
      onClose();
    } catch (error) {
      console.error(error);
      setMessage(error.message); // set error message
    }
  };
  const handleDogEarSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const result = await addDogEar({
        variables: {
          userId: Auth.getProfile()._id,
          friendId: ownerId,
          ISBN: bookDetails.ISBN,
          text
        }
      });
      console.log("Mutation result:", result);
      setText(''); // Clear the textarea after submission

    } catch (err) {
      console.error("Error executing mutation:", err);
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
      <div>
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

      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BookDetailCard;
import React, { useState } from 'react';
import './Bookshelf.css';

const Bookshelf = ({ books }) => {
  const [activeBook, setActiveBook] = useState(null);

  const handleBookClick = (book) => {
    if (activeBook === book) {
      setActiveBook(null); // Close the active book view
    } else {
      setActiveBook(book); // Show the clicked book in full screen
    }
  };

  return (
    <div className="container mt-5" id="bookshelfContainer">
      <h2 className="mb-4">Bookshelf</h2>
      <div className="row">
        {books.map((entry, index) => (
          <div 
            className={`col-2 m-1 BookEntry ${activeBook === entry.book ? 'active' : ''}`} 
            key={index} 
            onClick={() => handleBookClick(entry.book)}
          >
            <div className="spine">{entry.book?.title}</div>
          </div>
        ))}
      </div>
      {activeBook && (
        <div className="activeBookOverlay">
          <h3>{activeBook.title}</h3>
          <p>Author: {activeBook.author}</p>
          <p>First Sentence: {activeBook.firstSentence}</p>
          <button onClick={() => setActiveBook(null)}>Close</button>
        </div>
      )}
    </div>
);

};

export default Bookshelf;

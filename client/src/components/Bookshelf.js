import React, { useState } from 'react';
import './Bookshelf.css';
import BookDetailCard from './BookDetailCard';

const Bookshelf = ({ books, ownerId }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (entry) => {
    if (selectedBook === entry) {
      setSelectedBook(null); // Close the active book view
    } else {
      setSelectedBook(entry); // Show the clicked book in full screen
    }
  };

  return (
    <div className="container mt-5" id="bookshelfContainer">
      <h2 className="mb-4">Bookshelf</h2>
      <div className="row">
        {books.map((entry, index) => (
          <div 
            className={`col-2 m-1 BookEntry ${selectedBook === entry.book ? 'active' : ''}`} 
            key={index} 
            onClick={() => {
              console.log("Book clicked!");
              handleBookClick(entry);
            }}
          >
            <div className="spine">{entry.book?.title}</div>
          </div>
        ))}
      </div>
      {selectedBook && (
        <BookDetailCard 
          bookDetails={selectedBook} 
          onClose={() => setSelectedBook(null)} 
          ownerId={ownerId} 
        />
      )}
    </div>
  );
};

export default Bookshelf;

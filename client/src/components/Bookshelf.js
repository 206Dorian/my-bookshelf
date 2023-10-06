import React, { useState } from 'react';
import './Bookshelf.css';
import BookDetailCard from './BookDetailCard';

const Bookshelf = ({ books, ownerId }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = entry => {
    if (selectedBook === entry) {
      setSelectedBook(null);
    } else {
      setSelectedBook(entry);
    }
  };

  return (
    <div className="container mt-5" id="bookshelfContainer">
      <h2 className="mb-4">Bookshelf</h2>
      <div className="row">
        {books.map((entry, index) => (
          <div
            className={`col-2 m-1 BookEntry ${
              selectedBook === entry ? 'active' : ''
            }`}
            key={index}
            onClick={() => handleBookClick(entry)}
          >
            <div className="spine">
              {entry.dogEars && entry.dogEars.length > 0 && (
                <i className="fas fa-star"></i>
              )}
              {entry.book?.title}
            </div>
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

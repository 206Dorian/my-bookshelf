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
      <h3 className="mb-4 shelf-title">Your Bookshelf</h3>
      <div className="row shelf-cont">
        {books.map((entry, index) => (
          <div
            className={`col-1 m-2 BookEntry ${
              selectedBook === entry ? 'active' : ''
            }`}
            key={index}
            onClick={() => handleBookClick(entry)}
           
          >
             {entry.dogEars && entry.dogEars.length > 0 && (
              <i className="fas fa-star"></i>
            )}
            <img
              src="https://res.cloudinary.com/dlxjksvbc/image/upload/v1697234029/book-spines_ck6olr.png"
              alt="Book Spine"
              className="book-spine"
            />
            <div className="spine">

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
          showDogEar={true}
        />
      )}
    </div>
  );
};

export default Bookshelf;
// Bookshelf.js
import React, { useState } from 'react';
import './Bookshelf.css';
import BookDetailCard from './BookDetailCard';

const Bookshelf = ({ books, ownerId }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (entry) => {
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
            className={`col-2 m-1 BookEntry ${selectedBook === entry ? 'active' : ''}`}
            key={index}
            onClick={() => handleBookClick(entry)}
          >
            <div className="spine">{entry.book?.title}</div>
            {entry.dogEars && entry.dogEars.length > 0 && (
              <div className="dogEars">
                <h4>Dog Ears:</h4>
                <ul>
                  {entry.dogEars.map(dogEar => (
                    <li key={dogEar._id}>
                      <p>{dogEar.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

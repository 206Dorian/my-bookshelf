import React from 'react';
import './TopShelf.css';
import Book from './Book';
const TopShelf = ({ books }) => {
  return (
    <div className="container">
      <div className="row">
        {books.map(book => (
          <div key={book.id} className="col-md-3">
            <Book data={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopShelf;

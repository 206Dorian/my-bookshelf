import React from 'react';

const Bookshelf = ({ books }) => {
  return (
    <div>
      <h2>Bookshelf</h2>
      <div>
        {books.map((entry, index) => (
          <div key={index}>
            <h3>{entry.book?.title}</h3>
            <p>Author: {entry.book?.author}</p>
            <p>First Sentence: {entry.book?.firstSentence}</p>
            <p>ISBN: {entry.ISBN}</p>
            <p>Placement: {entry.placement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;

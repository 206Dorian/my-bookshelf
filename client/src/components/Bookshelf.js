import React from 'react';

const Bookshelf = ({ bookshelf }) => {
  return (
    <div>
      <h2>Your Bookshelf</h2>
      <ul>
        {bookshelf.map((entry) => (
          <li key={entry.bookId}>
            <div>
              <strong>Title:</strong> {entry.bookId.title}
            </div>
            <div>
              <strong>Author:</strong> {entry.bookId.author}
            </div>
            <div>
              <strong>Placement:</strong> {entry.placement}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookshelf;

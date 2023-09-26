import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';

const Bookshelf = () => {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
console.log(data)
  return (
    <div>
      <h2>{data.user.username}'s Bookshelf</h2>
      <div>
        {data.user.bookshelf.map((entry, index) => (
          <div key={index}>
            <h3>{entry.title}</h3>
            <p>Author: {entry.book.author}</p>
            <p>First Sentence: {entry.book.firstSentence}</p>
            <p>ISBN: {entry.ISBN}</p>
            <p>Placement: {entry.placement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;

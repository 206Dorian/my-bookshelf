import React from 'react';

function Book({ data }) {
  return (
    <div className="card">
      <img src={data.coverImage} className="card-img-top" alt={data.title} />
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">{data.author}</p>
      </div>
    </div>
  );
}

export default Book;

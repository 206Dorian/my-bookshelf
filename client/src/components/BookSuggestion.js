/* BookSuggestion.js */

import { useQuery } from '@apollo/client';
import { RECENT_BOOKS_QUERY } from '../utils/queries';
import './BookSuggestion.css';

const BookSuggestion = () => {
  const { loading, error, data } = useQuery(RECENT_BOOKS_QUERY, {
    variables: { limit: 3 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="suggestionBox">
       {data.recentBooks.map((book, index) => (
        <div key={index} id="suggestions" className="card m-1">
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">{book.author}</p>
            {/* Other book information */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookSuggestion;


import { useQuery } from '@apollo/client';
import { RECENT_BOOKS_QUERY } from '../utils/queries';
import './BookSuggestion.css';

const BookSuggestion = () => {
  const { loading, error, data } = useQuery(RECENT_BOOKS_QUERY, {
    variables: { limit: 5 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="suggestionBox" className="d-flex flex-wrap  flex-column p-2 col-2">
      <h3 id="suggestionBannerText" className="m-2">
        Take a peak at what others are reading
      </h3>
      {data.recentBooks.map((book, index) => (
        <div key={index} className="col">
          <div id="suggestions" className="card m-2">
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">{book.author}</p>
              {/* Other book information */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookSuggestion;

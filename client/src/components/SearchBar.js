import React, { useState } from 'react';
import axios from 'axios';
import BookDetailCard from './BookDetailCard';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const searchBooks = async () => {
    try {
      const [titleResponse, authorResponse] = await Promise.all([
        axios.get(`http://openlibrary.org/search.json?title=${query}`),
        axios.get(`http://openlibrary.org/search.json?author=${query}`),
      ]);
      const titleDocs = titleResponse.data.docs.map(doc => ({
        ...doc,
        type: 'title',
      }));
      const authorDocs = authorResponse.data.docs.map(doc => ({
        ...doc,
        type: 'author',
      }));

      const combinedResults = [...titleDocs, ...authorDocs];
      setSearchResults(combinedResults);
    } catch (error) {
      console.error('An error occurred while fetching data: ', error);
    }
  };

  const userSelection = (result, index) => {
    setSelectedBookIndex(index);
  };

  const handleSubmit = event => {
    event.preventDefault();
    searchBooks();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-2">
          Search
        </button>
      </form>
      <div className="row">
        <div className="col-md-12">
          {currentItems.map((result, index) => (
            <div key={index} className="mb-2">
              <button
                className="btn btn-block btn-light"
                onClick={() => userSelection(result, index)}
              >
                <h3>{result.title}</h3>
              </button>
              {selectedBookIndex === index && (
                <BookDetailCard
                  bookDetails={{
                    title: result.title,
                    author: result.author_name
                      ? result.author_name.join(', ')
                      : 'Unknown Author',
                    ISBN: result.isbn ? result.isbn[0] : 'Unknown ISBN',
                    firstSentence: result.first_sentence
                      ? result.first_sentence[0]
                      : 'First sentence not available',
                  }}
                  showDogEar={false}
                  onClose={() => setSelectedBookIndex(null)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[
            ...Array(Math.ceil(searchResults.length / itemsPerPage)).keys(),
          ].map(page => (
            <li className="page-item" key={page + 1}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(searchResults.length / itemsPerPage)
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SearchBar;

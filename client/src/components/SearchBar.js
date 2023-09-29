import React, { useState } from 'react';
import axios from 'axios';
import BookDetailCard from './BookDetailCard';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);

  const searchBooks = async () => {
    try {
      const [titleResponse, authorResponse] = await Promise.all([
        axios.get(`http://openlibrary.org/search.json?title=${query}`),
        axios.get(`http://openlibrary.org/search.json?author=${query}`)
      ]);

      const titleDocs = titleResponse.data.docs.map(doc => ({ ...doc, type: 'title' }));
      const authorDocs = authorResponse.data.docs.map(doc => ({ ...doc, type: 'author' }));

      const combinedResults = [...titleDocs, ...authorDocs];
      setSearchResults(combinedResults);
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  };

  const userSelection = (result, index) => {
    setSelectedBookIndex(index);
  };

  const handleSubmit = (event) => {
    event.preventDefault();  
    searchBooks();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mb-3">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          className="form-control" 
        />
        <button type="submit" className="btn btn-primary mt-2">
          Search
        </button>
      </form>
      <div className="row">
        <div className="col-md-12">
          {searchResults.map((result, index) => (
            <div key={index} className="mb-2">
              <div onClick={() => userSelection(result, index)}>
                <h3>{result.title}</h3>
              </div>
              {selectedBookIndex === index && (
                <div className="mb-2">
                  <BookDetailCard
                    bookDetails={{
                      title: result.title,
                      author: result.author_name ? result.author_name.join(', ') : "Unknown Author",
                      ISBN: result.isbn ? result.isbn[0] : "Unknown ISBN",
                      firstSentence: result.first_sentence ? result.first_sentence[0] : "First sentence not available",
                    }}
                    onClose={() => setSelectedBookIndex(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

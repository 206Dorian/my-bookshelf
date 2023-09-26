import React, { useState } from 'react';
import axios from 'axios';
import BookDetailCard from './BookDetailCard';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);


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

  const userSelection = (result) => {
    const bookDetails = {
      title: result.title,
      author: result.author_name ? result.author_name.join(', ') : "Unknown Author",
      ISBN: result.isbn ? result.isbn[0] : "Unknown ISBN",
      firstSentence: result.first_sentence ? result.first_sentence[0] : "First sentence not available",
    };

    setSelectedBook(bookDetails);
    console.log('Selected Book Set:', selectedBook);
  };
  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={searchBooks}>Search</button>
      <div>
        {searchResults.map((result, index) => (
          <div key={index} onClick={() => userSelection(result)}>
            <h3>{result.title}</h3>
          </div>
        ))}
      </div>
      {selectedBook && (
        <BookDetailCard
          bookDetails={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};

export default SearchBar;
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState(''); // for book or author search
  const [searchResults, setSearchResults] = useState([]); // to store search results
  const [bookshelf, setBookshelf] = useState([]); // your existing bookshelf

  // This function searches for books by title or author
  const searchBooks = async () => {
    try {
      const [titleResponse, authorResponse] = await Promise.all([
        axios.get(`http://openlibrary.org/search.json?title=${query}`),
        axios.get(`http://openlibrary.org/search.json?author=${query}`)
      ]);

      // Add a type property to differentiate the results
      const titleDocs = titleResponse.data.docs.map(doc => ({ ...doc, type: 'title' }));
      const authorDocs = authorResponse.data.docs.map(doc => ({ ...doc, type: 'author' }));

      const combinedResults = [...titleDocs, ...authorDocs];
      setSearchResults(combinedResults);
      console.log("Search Response:", combinedResults);
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  };

  const userSelection = (result) => {
    console.log("Selected Book Data:", result);
    setBookshelf([...bookshelf, result]);

    // Accessing and logging the title to the console
    const title = result.title;

    // Handle multiple authors
    let author = "Unknown Author";
    if (result.author_name && result.author_name.length > 0) {
      author = result.author_name.join(', '); // joining author names with comm
    }

    // Handle first_sentence
    let firstSentence = "First sentence not available";
    if (result.first_sentence && result.first_sentence.length > 0) {
      firstSentence = result.first_sentence[0];
    }
    let ISBN = "Unknown ISBN";
    if (result.isbn && result.isbn.length > 0) {
      ISBN = result.isbn[0];
    }
    console.log('Title: ', title);
    console.log('Author: ', author);
    console.log('ISBN: ', ISBN);
    console.log('First Sentence: ', firstSentence);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchBooks}>Search</button>
      <div>
        <h2>Search Results</h2>
        {searchResults.map((result, index) => (
          <div
            key={index}
            onClick={() => userSelection(result)}
            style={{ backgroundColor: result.type === 'title' ? 'lightblue' : 'lightgreen' }}
          >
            <h3>{result.title}</h3>
            {/* Add more book details if desired */}
          </div>
        ))}
      </div>
      <div>
        <h2>My Bookshelf</h2>
        {bookshelf.map((book, index) => (
          <div key={index}>
            <h3>{book.title}</h3>
            <p>{book.subtitle}</p>
            {/* Display other book details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

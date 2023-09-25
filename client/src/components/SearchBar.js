import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [title, setTitle] = useState(''); // for book title search
  const [searchResults, setSearchResults] = useState([]); // to store search results
  const [bookshelf, setBookshelf] = useState([]); // your existing bookshelf

  // This function searches for books by title
  const searchByTitle = async () => {
    try {
      const response = await axios.get(`http://openlibrary.org/search.json?title=${title}`);
      console.log("Search by Title Response:", response.data);
      const { docs } = response.data;
      setSearchResults(docs);
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  };

  // This function is called when the user selects a book from the search results.
  // It adds the selected book to the user's bookshelf.
  const userSelection = (result) => {
    console.log("Selected Book Data:", result);
    setBookshelf([...bookshelf, result]);
  
    // Accessing and logging the title to the console
    const title = result.title;
  
    // Handle multiple authors
    let author = "Unknown Author";
    if (result.author_name && result.author_name.length > 0) {
      author = result.author_name.join(', '); // joining author names with comma
    }
  
    // Check if first_sentence exists before accessing its elements
    let firstSentence = "First sentence not available";
    if (result.first_sentence && result.first_sentence.length > 0) {
      firstSentence = result.first_sentence[0];
    }
  
    console.log('Title: ', title);
    console.log('Author: ', author);
    console.log('First Sentence: ', firstSentence);
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={searchByTitle}>Search</button>
      <div>
        <h2>Search Results</h2>
        {searchResults.map((result, index) => (
          <div key={index} onClick={() => userSelection(result)}>
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

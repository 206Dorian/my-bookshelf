import React, {useState} from 'react'
import axios from 'axios'

const SearchBar = () => {
    const [title, setTitle] = useState(''); // for book title search
    const [searchResults, setSearchResults] = useState([]); // to store search results
    const [bookshelf, setBookshelf] = useState([]); // your existing bookshelf
  
    const searchBookByTitle = async () => {
      try {
        const response = await axios.get(`http://openlibrary.org/search.json?title=${title}`);
        const { docs } = response.data;
        setSearchResults(docs);
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
      }
    };
  
    const fetchBookByIsbn = async (isbn) => {
      try {
        const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`);
        const bookData = response.data[`ISBN:${isbn}`];
        if (bookData) {
          setBookshelf([...bookshelf, bookData]);
        } else {
          console.error("Book not found");
        }
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={searchBookByTitle}>Search</button>
        <div>
          <h2>Search Results</h2>
          {searchResults.map((result, index) => (
            <div key={index} onClick={() => fetchBookByIsbn(result.isbn[0])}>
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
  

export default SearchBar
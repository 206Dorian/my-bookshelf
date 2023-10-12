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

  // New state for language selection
  const [selectedLanguage, setSelectedLanguage] = useState('eng');

  const supportedLanguages = [
    { code: 'eng', label: 'English' },
    { code: 'spa', label: 'Spanish' },
    { code: 'fre', label: 'French' },
    // Add more as needed
  ];


  const userSelection = (result, index) => {
    setSelectedBookIndex(index);
  };

  const handleSubmit = event => {
    event.preventDefault();
    searchBooks();
  };


  const searchBooks = async () => {
    try {
      const [titleResponse, authorResponse] = await Promise.all([
        axios.get(`http://openlibrary.org/search.json?title=${query}&has_fulltext=true&lang=${selectedLanguage}`),
        axios.get(`http://openlibrary.org/search.json?author=${query}&has_fulltext=true&lang=${selectedLanguage}`),
      ]);
  
      // Log the entire responses
      console.log("Title Response:", titleResponse.data);
      console.log("Author Response:", authorResponse.data);
  
      const titleDocs = titleResponse.data.docs
      .filter(doc => doc.language && doc.language.includes(selectedLanguage))  // dynamically filter by selected language
      .map(doc => ({
        ...doc,
        type: 'title',
      }));
    
    const authorDocs = authorResponse.data.docs
      .filter(doc => doc.language && doc.language.includes(selectedLanguage))  // dynamically filter by selected language
      .map(doc => ({
        ...doc,
        type: 'author',
      }));
    
  
      // Log the filtered results
      console.log("Filtered Title Docs:", titleDocs);
      console.log("Filtered Author Docs:", authorDocs);
  
      const combinedResults = [...titleDocs, ...authorDocs];
      setSearchResults(combinedResults);
    } catch (error) {
      console.error('An error occurred while fetching data: ', error);
    }
  };
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="form-control"
              placeholder="Search books here"
            />
          </div>
          <div className="col-md-2 mx-auto">
            <select
              className="form-control"
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
            >
              {supportedLanguages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2 mx-auto">
            <button type="submit" className="btn btn-primary col-12">Search</button>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-md-12">
          {currentItems.map((result, index) => (
            <div key={index} className="mb-3">
              <button
                className="btn btn-block btn-light"
                onClick={() => userSelection(result, index)}
              >
                <h3>Title: {result.title}</h3>
                <h3>Author: {result.author_name
                  ? result.author_name.join(', ')
                  : 'Unknown Author'}</h3>
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
      {/* Conditionally render pagination if there are search results */}
      {searchResults.length > 0 && (
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
      )}
    </div>
  );
};

export default SearchBar;

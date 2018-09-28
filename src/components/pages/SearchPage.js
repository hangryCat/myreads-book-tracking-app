import React from 'react';
// This component provides declarative, accessible navigation around the app
// The TO property within the LINK tag will be the path we want to link to
import { Link } from 'react-router-dom';

class SearchPage extends React.Component {
  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;

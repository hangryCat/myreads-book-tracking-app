import React from 'react';
// This component provides declarative, accessible navigation around the app
// The TO property within the LINK tag will be the path we want to link to
import { Link } from 'react-router-dom';
// Imports everything from BooksAPI
import * as BooksAPI from '../../BooksAPI'
// Shelf is one level up the directory so use ../
import Shelf from '../Shelf';

class MainPage extends React.Component {
  // This method will help load all currently reading books
  componentDidMount() {
    BooksAPI.getAll()
      .then(resp => {
        console.log(resp);
      });
  }

  render () {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            <Shelf />

          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MainPage;

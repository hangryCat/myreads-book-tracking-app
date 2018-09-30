import React from 'react';
import * as BooksAPI from '../../BooksAPI'
// This component provides declarative, accessible navigation around the app
// The TO property within the LINK tag will be the path we want to link to
import { Link } from 'react-router-dom';

class SearchPage extends React.Component {
  // To have some starting books state (read, want to read, etc.)
  constructor(props) {
    // The super keyword is used to access and call functions on an object's parent
    // When used in a constructor,
      // the super keyword appears alone
      // and must be used before the this keyword is used
    super(props);
    this.state = {
      books: [],
      results: []
    }
  }
  // This method will help load all currently reading books
  componentDidMount() {
    BooksAPI.getAll()
      .then(resp => {
        console.log(resp);
        // Add the resp(onse) to component state which is an array of bookshelf
        // When setState is called, it'll force a rerender; render() runs again
        this.setState({ books: resp });
      });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(bk => bk.id !== book.id).concat([book])
      }));
    });
  }

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

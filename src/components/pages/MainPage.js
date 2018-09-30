import React from 'react';
// This component provides declarative, accessible navigation around the app
// The TO property within the LINK tag will be the path we want to link to
import { Link } from 'react-router-dom';
// Imports everything from BooksAPI
import * as BooksAPI from '../../BooksAPI'
// Shelf is one level up the directory so use ../
import Shelf from '../Shelf';

class MainPage extends React.Component {
  // To have some starting books state (read, want to read, etc.)
  constructor(props) {
    // The super keyword is used to access and call functions on an object's parent
    // When used in a constructor,
      // the super keyword appears alone
      // and must be used before the this keyword is used
    super(props);
    this.state = {
      books: []
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
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            <Shelf updateBook={this.updateBook} name="Currently Reading" books={this.state.books.filter(bk => bk.shelf === "currentlyReading")} />
            <Shelf updateBook={this.updateBook} name="Want To Read" books={this.state.books.filter(bk => bk.shelf === "wantToRead")} />
            <Shelf updateBook={this.updateBook} name="Read" books={this.state.books.filter(bk => bk.shelf === "read")} />

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

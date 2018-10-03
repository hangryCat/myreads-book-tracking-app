import React from 'react';
import * as BooksAPI from '../../BooksAPI'
// This component provides declarative, accessible navigation around the app
// The TO property within the LINK tag will be the path we want to link to
import { Link } from 'react-router-dom';
import Book from '../Book';

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
      results: [],
      query: ""
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
  // updateQuery is used in the render() onChange method
  // Any changes will update the state with the inputted values
  // Then submitSearch is called
  updateQuery = (query) => {
    this.setState({query: query}, this.submitSearch);
  }

  submitSearch() {
    // If the query is empty or undefined, the results list is emptied
    // Otherwise, the query will be searched using BooksAPI.search method below
    if(this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(res => {
      console.log(res);
      // If there is an error, the results list will be cleared
      if(res.error) {
        return this.setState({ results: [] });
      }
      else {
        res.forEach(bk => {
          let find = this.state.books.filter(BK => BK.id === bk.id);
            if(find[0]) {
              bk.shelf = find[0].shelf;
            }
        });
        return this.setState({ results: res });
      }
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
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e) => this.updateQuery(e.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.results.map((book, key) => <Book updateBook={this.updateBook} book={book} key={key} />)
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;

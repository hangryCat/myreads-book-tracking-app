import React from 'react';
// Book is in the same directory so use ./
import Book from './Book';

class Shelf extends React.Component {
  // Before, the shelf was hard coded
  // Here the curly braces sign uses JS expressions to access the corresponding values
  render () {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map((book, key) => <Book updateBook={this.props.updateBook} book={book} key={key} />)
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;

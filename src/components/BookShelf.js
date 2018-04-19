/**
* @description The bookshelf react component
* @prop {Book} books - The array of book objects
* @prop {function} onShelfChange - Function to move a book from one shelf to another
*/

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookClass from '../classes/BookClass';
import Book from './Book';

class BookShelf extends PureComponent {

  /*
    In a future release, this variable could became a state, so that
    the user could add and remove shelves.
  */
  shelves = [
    {
      key: 'currentlyReading',
      name: 'Currently Reading'
    },
    {
      key: 'wantToRead',
      name: 'Want to Read'
    },
    {
      key: 'read',
      name: 'Read'
    }
  ];

  render() {
    const { onShelfChange, books } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.shelves.map(shelf => (
              <div key={shelf.key} className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      books
                      .filter((book) => book.shelf === shelf.key)
                      .map((book) => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          onShelfChange={(book, shelf) => onShelfChange(book, shelf)}
                        />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.instanceOf(BookClass).isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default BookShelf;

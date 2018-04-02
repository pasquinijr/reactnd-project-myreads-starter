import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class MainPage extends Component {

  render() {
    let currentlyReading = [];
    let wantToRead = [];
    let read = [];
    let none = [];
    for (let book of this.props.books) {
      if (book.shelf === 'currentlyReading') {
        currentlyReading.push(book);
      } else if (book.shelf === 'wantToRead') {
        wantToRead.push(book);
      } else if (book.shelf === 'read') {
        read.push(book);
      } else {
        none.push(book);
      }
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map((book) => (
                    <li key={book.id}>
                      <Book
                        title={book.title}
                        authors={book.authors[0]}
                        thumbnail={book.imageLinks.thumbnail}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {wantToRead.map((book) => (
                  <li key={book.id}>
                    <Book
                      title={book.title}
                      authors={book.authors[0]}
                      thumbnail={book.imageLinks.thumbnail}
                    />
                  </li>
                ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {read.map((book) => (
                  <li key={book.id}>
                    <Book
                      title={book.title}
                      authors={book.authors[0]}
                      thumbnail={book.imageLinks.thumbnail}
                    />
                  </li>
                ))}
                </ol>
              </div>
            </div>
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

export default MainPage;

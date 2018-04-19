/**
* @description The main component
*/

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './components/BookShelf';
import SearchPage from './components/SearchPage';
import BookClass from './classes/BookClass';

class App extends Component {
  state = {
    books: [],           // the array of books in the bookshelf
    waiting: true        // boolean used to display a spinner on screen ...
                         // ... during API calls
  }

  componentDidMount() {
    // get all books that should appear in the bookshelf as soon as the
    // component mounts on screen
    BooksAPI.getAll().then((books) => {
      this.setState(
        {
          books: books.map(book => new BookClass(
            book.id,
            book.title,
            book.authors,
            book.imageLinks,
            book.shelf)),
          waiting: false
        }
      );
    })
  }

  /*
    Credits to @fOntana for part of the logic below!
  */
  handleShelfChange = (book, shelf) => {
    // turn on spinner
    this.setState({ waiting: true });

    // variable newBooks to receive the latest list of books to be in the bookshelf
    let newBooks = [...this.state.books];

    // check if book is already in the bookshelf
    const bookInShelf = this.state.books.find(item => item.id === book.id);

    // if not, the book is coming from the search page and should be added to the
    // newBooks array
    if (!bookInShelf) {
      newBooks = [...newBooks, book]
    }

    // calls the update API to set the book's shelf attribute
    BooksAPI.update(book, shelf).then( response => {
      newBooks = newBooks.map(item => {
        if (item.id === book.id) {
          item.shelf = shelf;
        }
        return item;
      })

      // remove book from the books state if shelf is 'none'
    }).then(() => {
      this.setState(
        {
          books: newBooks.filter(item => item.shelf !== 'none'),
          waiting: false
        }
      );
    })
  };

  render() {
    return (
      <div className="app">
      {this.state.waiting && <div className="spinner"/>}
        <Route
          exact
          path="/"
          render={() => (
            <BookShelf
              books={this.state.books}
              onShelfChange={(book, shelf) => this.handleShelfChange(book, shelf)}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              books={this.state.books}
              onShelfChange={(book, shelf) => this.handleShelfChange(book, shelf)}
            />
          )}
        />
      </div>
    )
  }
}

export default App;

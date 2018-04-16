import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import SearchPage from './SearchPage';

class App extends Component {
  state = {
    books: [],
    waiting: true
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(
        {
          books,
          waiting: false
        }
      );
    })
  }

  /*
    Credits to @fOntana for logic of my handle method below
  */
  handleShelfChange = (book, shelf) => {
    this.setState({ waiting: true });
    let newBooks = [...this.state.books];
    // add new book to state
    const bookInShelf = this.state.books.find(item => item.id === book.id);
    if (!bookInShelf) {
      newBooks = [...newBooks, book]
    }
    // update local storage
    BooksAPI.update(book, shelf).then( response => {
      newBooks = newBooks.map(item => {
        if (item.id === book.id) {
          item.shelf = shelf;
        }
        return item;
      })
      // remove from state if shelf is none
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

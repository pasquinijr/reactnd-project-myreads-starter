import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import MainPage from './MainPage';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  /*
    Credits to @fOntana for logic of my handle method below
  */
  handleShelfChange = (book, shelf) => {
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
      this.setState({ books: newBooks.filter(item => item.shelf !== 'none') });
    })
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage
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

export default BooksApp

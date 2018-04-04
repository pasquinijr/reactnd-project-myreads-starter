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
    }).then(() => {
      console.log(this.state.books);
    })
  }

  /*
    Credits to @fOntana for logic of my handle method below
  */
  handleShelfChange = (book, shelf) => {
    const bookInShelf = this.state.books.find(item => item.id === book.id);
    if (!bookInShelf) {
      this.setState((prevState) => ({
        books: [...prevState.books, book]
      }))
    }
    BooksAPI.update(book, shelf).then( response => {
      const newBooks = this.state.books.map(item => {
        if (item.id === book.id) {
          item.shelf = shelf;
        }
        return item;
      });
      this.setState({ books: newBooks });
      // TODO: remove from state if shelf is none
    });
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

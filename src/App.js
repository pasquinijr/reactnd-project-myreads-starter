import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
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

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage
              books={this.state.books}
            />
          )}
        />
        <Route
          path="/search"
          component={SearchPage}
        />
      </div>
    )
  }
}

export default BooksApp

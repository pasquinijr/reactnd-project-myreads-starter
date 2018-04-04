import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class SearchPage extends Component {
  state = {
    query: '',
    results: []
  }

  handleQueryChange = (query) => {
    this.setState({ query: query.trim() });
    if (query) {
      BooksAPI.search(query)
        .then(results => {
          this.setState({ results })
        })
        .then(() => {
          console.log(this.state.results);
        })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            {/*
              Credits to @Nicélio Jr. for the Debounce code below!
            */}
            <DebounceInput
              minLength={3}
              debounceTimeout={300}
              value={this.state.query}
              placeholder="Search by title or author (at least 3 characters)"
              onChange={event => this.handleQueryChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results && this.state.results
              .map((result) => (
                <li key={result.id}>
                  <Book
                    books={this.props.books}
                    book={result}
                    onShelfChange={(result, shelf) => this.props.onShelfChange(result, shelf)}
                  />
                </li>
              )
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;

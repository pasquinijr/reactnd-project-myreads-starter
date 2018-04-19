/**
* @description The SearchPage react component
* @prop {Book} books - The array of book objects already in the bookshelf
* @prop {function} onShelfChange - Function to move a book from one shelf to another
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI'
import Book from './Book';
import BookClass from '../classes/BookClass';

class SearchPage extends Component {
  state = {
    query: '',      // the query string
    results: []     // the query results
  }

  handleQueryChange = (query) => {
    // remove any trailing spaces from the query string
    this.setState({ query: query.trim()});

    // if query string is not empty calls the search API
    if (query) {
      BooksAPI.search(query)
      .then(results => {
        // if there are no errors from the search call, set new results state
        if (!results.error) {
          this.setState({
            results: results.map(book => new BookClass(
              book.id,
              book.title,
              book.authors,
              book.imageLinks,
              book.shelf))
          })
        } else {
          // reset state to empty array if the search returns nothing
          this.setState({ results: [] });
        }
      })
    } else {
      // reset state to empty array if the query string is empty
      this.setState({ results: [] });
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
              The goal is to reduce the calls to the search API.
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
            {/*
              Check if results state is not empty
            */}
            {this.state.results.length > 0 && this.state.results
              .map((result) => {

                // if a book from the search results is already in the bookshelf,
                // set its shelf attritube to the correct one
                const isInBookShelf = this.props.books.find((item => item.id === result.id));
                if (isInBookShelf) {
                  result.shelf = isInBookShelf.shelf;
                } else {
                  result.shelf = 'none';
                }

                return (
                  <li key={result.id}>
                    <Book
                      book={result}
                      onShelfChange={(result, shelf) => this.props.onShelfChange(result, shelf)}
                    />
                  </li>
              )}
            )}
          </ol>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.instanceOf(BookClass).isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default SearchPage;

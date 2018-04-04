import React from 'react';

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{ width: 128, height: 192, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}
      >
      </div>
      <div className="book-shelf-changer">
        <select
          value={props.books ? props.books.find(item => item.id === props.book.id) ? props.book.shelf : "none" : props.book.shelf}
          onChange={(event) => props.onShelfChange(props.book, event.target.value)}
        >
          <option value="disabled" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{props.book.title}</div>
    {props.book.authors.map((author) => (
      <div key={author} className="book-authors">{author}</div>
    ))}
  </div>
)



export default Book;

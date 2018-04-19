/**
* @description Represents a book
* @constructor
* @param {string} id - The book ID
* @param {string} title - The title of the book
* @param {array} authors - The author(s) of the book
* @param {object} imageLinks - May contain the attribute to the path to the book thumbnail
* @param {string} shelf - The shelf the book is located.
*/

class BookClass {
  constructor(id, title, authors = [], imageLinks, shelf = 'none') {
    this.id = id;
    this.title = title;
    this.authors = authors;
    this.thumbnail = imageLinks ? imageLinks.thumbnail : '';
    this.shelf = shelf;
  }
}

export default BookClass;

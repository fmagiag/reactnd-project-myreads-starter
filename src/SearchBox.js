import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBox extends Component{

  state = {
    books: [],
    exit: false,
    newBook:'',
    shelf:''
  }

  clearBooks = () => {
    this.setState({ books: []})
  }

  searchBooks = (query, booksInShelf) => BooksAPI.search(query).then((books) => {
    this.setState({books: books.filter(b =>
      !booksInShelf.find(bs =>
        b.id === bs.id
      )
    )})
  })

  updateBook = (book, shelf) => BooksAPI.update(book, shelf).then((result) =>
  this.setState({ exit: true, newBook: book, shelf }))


  render() {
    const {updateBook, booksInShelf} = this.props
    const {books, exit} = this.state

    let book = this.state.newBook

    if(exit){
      book.shelf = this.state.shelf
      updateBook(book)
    }

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => {
                this.clearBooks()
                event.target.value.length >0 && (this.searchBooks(event.target.value, booksInShelf))
              }}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id} >
                <Book
                  book={book}
                  onMoved={this.updateBook}
                />
              </li>
            ))}
          </ol>
        </div>
    </div>)
  }
}

export default SearchBox

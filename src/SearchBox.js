import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBox extends Component{

  state = {
    books: [],
  }

  clearBooks = () => {
    this.setState({ books: []})
  }

  searchBooks = (query, booksInShelf) => BooksAPI.search(query).then((books) => {
    books.map(b =>
      booksInShelf.filter((bs) => bs.id === b.id)
      .map(bs => b.shelf = bs.shelf)
    )
    this.setState({books})
  }).catch((e)=>{
    this.setState({books:[]})
  })

  render() {
    const {updateBook, booksInShelf} = this.props
    const {books} = this.state

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
                  onMoved={updateBook}
                />
              </li>
            ))}
          </ol>
        </div>
    </div>)
  }
}

export default SearchBox

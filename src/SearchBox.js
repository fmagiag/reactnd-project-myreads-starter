import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBox extends Component{

  state = {
    books: []
  }

  clearBooks = () => {
    this.setState({ books: []})
  }

  searchBooks = (query) => BooksAPI.search(query).then((books) => {
    this.setState({books})
  })

  render() {
    const {onOpenSearch} = this.props
    const {books} = this.state

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => onOpenSearch(false)}>Close</a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => {
                this.clearBooks()
                event.target.value.length >0 && (this.searchBooks(event.target.value))
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
                />
              </li>
            ))}
          </ol>
        </div>
    </div>)
  }
}

export default SearchBox

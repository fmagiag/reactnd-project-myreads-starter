import React, {Component} from 'react'
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

  searchBooks = (query) => BooksAPI.search(query).then((books) => {
    this.setState({books})
  })

  updateBook = (book, shelf) => BooksAPI.update(book, shelf).then((result) =>
  this.setState({ exit: true, newBook: book, shelf }))


  render() {
    const {onOpenSearch} = this.props
    const {books, exit} = this.state

    let book = this.state.newBook

    if(exit){
      book.shelf = this.state.shelf
      onOpenSearch(false,true, book)
    }

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => onOpenSearch(false,false)}>Close</a>
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

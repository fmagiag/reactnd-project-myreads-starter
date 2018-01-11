import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class ListBooks extends Component{

  state = {
    book: ''
  }

  updateShelf = (book, shelf) => BooksAPI.update(book, shelf).then((result) => {
    book.shelf = shelf
    this.setState(state => ({
        book: book
      }))
  })

  render(){
    const {books, title} = this.props

    let showingBooks

    if(this.state.book){
      showingBooks = books.filter((b) => b.id !== this.state.book.id)
      .concat(this.state.book)
    }else{
      showingBooks = books
    }
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>{title}</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              name="Currently Reading"
              books={showingBooks.filter(book => book.shelf === 'currentlyReading')}
              onChangeBook={this.updateShelf}
            />
            <Shelf
              name="Want to Read"
              books={showingBooks.filter(book => book.shelf === 'wantToRead')}
              onChangeBook={this.updateShelf}
            />
            <Shelf
              name="Read"
              books={showingBooks.filter(book => book.shelf === 'read')}
              onChangeBook={this.updateShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks

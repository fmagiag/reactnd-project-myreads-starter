import React, {Component} from 'react'
import Shelf from './Shelf'

class ListBooks extends Component{
  render(){
    const {books, onOpenSearch, title} = this.props
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>{title}</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              name="Currently Reading"
              books={books.filter(book => book.shelf === 'currentlyReading')}
            />
            <Shelf
              name="Want to Read"
              books={books.filter(book => book.shelf === 'wantToRead')}
            />
            <Shelf
              name="Read"
              books={books.filter(book => book.shelf === 'read')}
            />
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => onOpenSearch(true)}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks

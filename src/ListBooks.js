import React, {Component} from 'react'
import Shelf from './Shelf'

class ListBooks extends Component{
  render(){
    const {books} = this.props
    return(
        <div className="list-books-content">
          <div>
            <Shelf
              name = "Currently Reading"
              books = {books.filter(book => book.shelf === 'currentlyReading')}
            />
            <Shelf
              name = "Want to Read"
              books = {books.filter(book => book.shelf === 'wantToRead')}
            />
            <Shelf
              name = "Read"
              books = {books.filter(book => book.shelf === 'read')}
            />
          </div>
        </div>
    )
  }
}

export default ListBooks

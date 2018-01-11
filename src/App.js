import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBox from './SearchBox'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount = this.getBooks

  getBooks = BooksAPI.getAll().then((books) => {
    this.setState({books})
  })

  updateBook(book){
    this.setState({
      books: this.state.books.concat(book)
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            title="MyReads"
          />
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchBox
            booksInShelf={this.state.books}
            updateBook={(newBook) => {
                this.updateBook(newBook)
                history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

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

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books})
    })
    .catch((e)=>{
      this.setState({books:[]})
    })
  }

  updateBook = (book, shelf) => BooksAPI.update(book, shelf)
    .then(() => {
      book.shelf = shelf
      this.setState({ books:
        this.state.books.filter((b) => b.id!==book.id)
        .concat(book) })
    })

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
            updateBook={this.updateBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

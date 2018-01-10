import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBox from './SearchBox'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }

  componentDidMount = this.getBooks

  getBooks = BooksAPI.getAll().then((books) => {
    this.setState({books})
  })

  openSearch = (ative, refresh, newBook) => {
    if(refresh){
      this.setState({
        showSearchPage: ative,
        books: this.state.books.concat(newBook)})
    }else{
      this.setState({ showSearchPage: ative})
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ?
          (<SearchBox
            onOpenSearch={this.openSearch}
          />)
          :
          (<ListBooks
            books={this.state.books}
            onOpenSearch={this.openSearch}
            title="MyReads"
          />)}
      </div>
    )
  }
}

export default BooksApp

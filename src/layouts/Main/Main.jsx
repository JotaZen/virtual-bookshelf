import React from 'react'
import './Main.css'
import path from 'path-browserify'

class BooksGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      booksData: null,
      imgPath: null,
      maxItemsPage: 20,
      maxTitleLength: 40,
      searchTerm: ''
    }
  }

  render() {
    return (
    )
  }
}

export default BooksGrid

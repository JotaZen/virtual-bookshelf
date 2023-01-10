import React from 'react'
import ReactDOM from 'react-dom/client'
import './Main.css'
import path from 'path-browserify'

import Header from '../Header/Header'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <>
        <Header />
      </>
    )
  }
}

export default Main

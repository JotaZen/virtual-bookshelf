import React from 'react'
import ReactDOM from 'react-dom/client'
import './Main.css'
import path from 'path-browserify'

import BooksGrid from '../BookGrid/GridBook'
import Header from '../Header/Header'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  reload = () => {}
    
  render() {
    return (
      <>  
        <Header/>
        <div className='margin_body'></div>
        <BooksGrid/>
        <button style={{color:"blue", display: "flex"}}> ACA
        </button>
      </>
    )
  }
}

export default Main

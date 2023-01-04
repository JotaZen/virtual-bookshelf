import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './components/default/App'

import BooksGrid from './layouts/BookGrid/GridBook'
import Header from './layouts/Header/Header'

const xd = (f) => {console.log(f)}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <Header/>
    <div className='margin_body'></div>
    <BooksGrid xd={xd}/>
    <div style={{color:"white", dislay: "flex"}}>
    </div>
  </>
)

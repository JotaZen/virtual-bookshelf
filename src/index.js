import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './components/default/App'

import BooksGrid from './layouts/BookGrid/GridBook'
import Header from './layouts/Header/Header'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Header/>
    <div className='margin_body'></div>
    <BooksGrid/>
    <div style={{color:"white", dislay: "flex"}}>
    </div>
  </React.StrictMode>
)

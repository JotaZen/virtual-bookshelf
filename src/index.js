import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/default/App'

import GridBook from './components/BookGrid/BookGrid'
import AddBook from './components/AddBook/AddBook'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <div class='book_grid'>
      <AddBook />
      <GridBook />
    </div>
  </React.StrictMode>
)

import React, { Fragment, Component } from 'react'

class GridBook extends Component {
    render() {
      // Ordena tus libros según su fecha de publicación
      const sortedBooks = books.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
  
      return (
        <Fragment>
          {sortedBooks.map(book => (
            <div className="book">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.date}</p>
            </div>
          ))}
        </Fragment>
      );
    }
  }

const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    date: '1925-04-10'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    date: '1960-07-11'
  },
  // Más libros aquí...
]

export default GridBook
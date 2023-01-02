import React from 'react'
import './GridBook.css'
import path from 'path-browserify'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import CardGroup from 'react-bootstrap/CardGroup'
import Form from 'react-bootstrap/Form'

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
  reversa = () => {
    this.setState({ booksData: this.state.booksData.reverse() })
  }
  componentDidMount() {
    window.electron.CRUD.retrieveBooks(null).then(booksData => {
      window.electron.main.getImgPath().then(imgPath => {
        this.setState({ imgPath, booksData: booksData.reverse() })
      })
    })
  }
  handleFormChange = (event) => {
    this.setState({ searchTerm: event.target.value, currentPage: 1 })
  }
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber })
  }
  removeSearchTerm = () => {
    this.setState({ searchTerm: '' })
  }
  reload = () => {
    window.electron.CRUD.retrieveBooks(null).then(booksData => {
      window.electron.main.getImgPath().then(imgPath => {
        this.setState({ imgPath, booksData: booksData.reverse() })
      })
    })
  }

  render() {
    const { currentPage, maxTitleLength, imgPath, searchTerm } = this.state
    const handleFormChange = this.handleFormChange
    let { booksData } = this.state
    if (booksData === null) {
      return <p>Cargando libros...</p>
    } else if (searchTerm !== '') {
      booksData = booksData.filter(function(book){
        return (
          (book.titulo && book.titulo.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g,"").includes(searchTerm.toLowerCase())) ||
          (book.editorial && book.editorial.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g,"").includes(searchTerm.toLowerCase())) ||  
          (book.autor && book.autor.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g,"").includes(searchTerm.toLowerCase())) ||
          (book.ano_edicion && book.ano_edicion == searchTerm) 
        ) 
        })
    }
    const startIndex = (currentPage - 1) * this.state.maxItemsPage
    const endIndex = startIndex + this.state.maxItemsPage
    const currentPageBooks = Object.values(booksData).slice(startIndex, endIndex)

    const pageCount = Math.ceil(booksData.length / this.state.maxItemsPage)
    const range = (start, end) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i)
    
    let buttonPages
    if (currentPage > 3 && !(currentPage+2 > pageCount)) {
      buttonPages = range(currentPage - 2, currentPage + 2)
    } else if (pageCount >= 6 && currentPage+2 > pageCount) {
      buttonPages = range(pageCount-4, pageCount)
    } else {
      buttonPages = range(1, 5)
    }
    if (buttonPages.length > pageCount) { buttonPages = range(1,pageCount) }

    return (
      <div className='book_grid_menu'>
        <div className='top_container'>
          <div className='search_input'>
              <img src={path.join(imgPath, 'misc', 'lupa.png')} className='image_small'/>
              <Form.Control type="text" placeholder="Buscar" 
              id='search_box' value={searchTerm} onChange={handleFormChange}>
              </Form.Control>
          </div>         
          <div className='navigation_buttons'>
            {buttonPages.map((_, i) => (
              <Button variant="primary" onClick={() => this.handlePageChange(_)} 
              key={i} id={ (_===currentPage) ? 'current_page_btn': 'page_btn' }>
              {_}
              </Button>
            ))}
          </div>
          <div className='navigation_buttons_fix'>
            <Button variant="primary" onClick={() => {
              this.handlePageChange(1)
              this.removeSearchTerm()
              this.reload()}} id='page_btn'>
              Recargar
            </Button>
            <Button variant="primary" onClick={() => this.handlePageChange(1)} id='page_btn'>
              Inicio
            </Button>
            <Button variant="primary" onClick={() => this.handlePageChange(pageCount)} id='page_btn'>
              {pageCount}
            </Button>
          </div>
        </div>

        <div className='book_grid_container'>
          {currentPageBooks.map(book => (
            <Card className='book_grid_item' key={book.id} onClick={()=>{window.electron.notificationApi.ping()}}
            border='secondary'>
              <Card.Img variant="top" src={path.join(imgPath, 'books', book.image_src || 'default.png')} 
              className='card_images'/>                 
              <Card.Body className='card_body'>
                {
                (book.autor && book.ano_edicion) && 
                <Card.Header className='card_header'>
                  {book.autor.slice(0,Math.ceil(maxTitleLength/2))}, {book.ano_edicion}
                </Card.Header> ||

                (!book.autor && book.ano_edicion) && 
                <Card.Header className='card_header'>
                  {book.ano_edicion}
                </Card.Header> ||

                (book.autor && !book.ano_edicion) && 
                <Card.Header className='card_header'>
                  {book.autor.slice(0,Math.ceil(maxTitleLength/2))}
                </Card.Header>                   
                }
                <Card.Title className='card_title'>
                  { book.titulo ? book.titulo.slice(0,maxTitleLength) : 'Sin Título'}
                  { book.titulo && book.titulo.length > maxTitleLength ? '...' : '' }
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
        
        <div className='navigation_buttons'>
          {buttonPages.map((_, i) => (
            <Button variant="primary" onClick={() => this.handlePageChange(_)} 
            key={i} id={ (_===currentPage) ? 'current_page_btn': 'page_btn' }>
            {_}
            </Button>
          ))}
        </div>
      </div>
    )
  }
}

export default BooksGrid

{/* <div className='book_grid_container'>
{currentPageBooks.map(book => (
  <div className='book_grid_item' key={book.id} onClick={()=>{console.log(`Presionaste: ${book.titulo}`)}}>
    <h2>{book.titulo}</h2>
    <p>{book.ano_edicion}</p>
  </div>
))}
</div> */}
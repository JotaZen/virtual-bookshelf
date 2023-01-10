import React from 'react'
import './GridBook.css'
import path from 'path-browserify'

import { Button, Card, Form, Alert } from 'react-bootstrap'

import ShowBook from '../../components/ShowBook/ShowBook'

class BooksGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      booksData: null,
      imgPath: null,
      maxItemsPage: 25,
      maxTitleLength: 50,
      searchTerm: '',
      showBook: false,
      selectedBookId: null
    }
  }
  reversa = () => {
    this.setState({ booksData: this.state.booksData.reverse() })
  }
  componentDidMount() {
    window.electron.CRUD.retrieveBooks().then(booksData => {
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
    window.electron.CRUD.retrieveBooks().then(booksData => {
      window.electron.main.getImgPath().then(imgPath => {
        this.setState({ imgPath, booksData: booksData.reverse() })
      })
    })
  }
  loadData = (id) => {
    this.setState({ showBook: true, selectedBookId: id})
  }
  unloadData = () => {
    this.setState({ showBook: false, selectedBookId: null })
  }

  render() {
    const { currentPage, maxTitleLength, imgPath, searchTerm } = this.state
    let { booksData } = this.state
  
    if (booksData === null) {
      return <Alert>Cargando libros...</Alert>
    } else if (searchTerm !== '') {
      booksData = booksData.filter(function(book){
        return (
          (book.titulo && book.titulo.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g,"").includes(searchTerm.toLowerCase())) ||
          (book.editorial && book.editorial.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g,"").includes(searchTerm.toLowerCase())) ||  
          (book.autor && book.autor.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g,"").includes(searchTerm.toLowerCase())) ||
          // eslint-disable-next-line
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
              {/* <img src={path.join(imgPath, 'misc', 'lupa.png')} className='image_small' alt='lupa'/> */}
              <Form.Control type="text" placeholder="&#x1F50D;Buscar" 
              id='search_box' value={searchTerm} onChange={this.handleFormChange}>
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
            <Button variant="primary" onClick={() => this.handlePageChange(1)} id='page_btn'>
              Inicio
            </Button>
            <Button variant="primary" onClick={() => this.handlePageChange(pageCount)} id='page_btn'>
              {pageCount}
            </Button>
          </div>
        </div>

        {this.state.showBook ? <ShowBook 
          show={this.state.showBook}
          onClose={this.unloadData}
          id={this.state.selectedBookId}
          /> : null}

        <div className='book_grid_container'>
          {currentPageBooks.map((book, index) => ( 
            <Card 
              className='book_grid_item' 
              key={index} 
              onClick={ () => {
                this.loadData(book.id)
              }}
              border='secondary'
            >
            
              <Card.Img variant="top" src={ book.image_src ? path.join(imgPath, 'books', book.image_src) : ''}
              className={ book.image_src ? 'card_images' : ''} 
              // onError= {(e)=>{
              //   e.onerror=null
              //   e.target.src=path.join(imgPath, 'books', 'default.png')}}
              />
              <Card.Body className='card_body'>
                {
                  (book.autor && 
                  <Card.Header className='card_header'>
                    {book.autor.slice(0,Math.ceil(maxTitleLength/2))}
                  </Card.Header>)                   
                }
                <Card.Title className='card_title'>

                  { book.titulo ? book.titulo.slice(0,!book.image_src ? maxTitleLength : 30) : 'Sin Título'}
                  { book.titulo && book.titulo.length > (!book.image_src ? maxTitleLength : 30) ? '...' : '' }
                 
                  { (!book.image_src && book.descripcion) &&
                  <Card.Text className='card_text'>
                    <br/>
                    {book.descripcion.slice(0, maxTitleLength)} 
                    {(book.descripcion && book.descripcion.length > maxTitleLength) ? '...' : '' } 
                  </Card.Text>
                  }
                </Card.Title>

                {
                  ((book.editorial && book.ano_edicion) && 
                  <Card.Footer className='card_footer'>
                    {book.editorial}, {book.ano_edicion}
                  </Card.Footer>) 
                  ||
                  ((!book.editorial && book.ano_edicion) && 
                  <Card.Footer className='card_footer'>
                    {book.ano_edicion}
                  </Card.Footer>) 
                  ||
                  ((book.editorial && !book.ano_edicion) && 
                  <Card.Footer className='card_footer'>
                    {book.editorial.slice(0,Math.ceil(maxTitleLength/2))}
                </Card.Footer>)                   
                }
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

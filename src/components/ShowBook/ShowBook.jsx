import React, { Component } from 'react'
import { Modal, Alert, Card, Row, Col, Button } from 'react-bootstrap'
import './ShowBook.css'
import path from 'path-browserify'
import { format } from 'path-browserify'

class ShowBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: this.props.show,
      bookId: this.props.id,
      close: this.props.onClose,
      imgPath: null,
      bookData: null,
      zoomImage: false
    }
  }
  handleClose = () => {
    this.state.close()
  }
 
  handleImgShow = () => {
    this.setState({ zoomImage: true})
  } 

  handleImgClose = () => {
    this.setState({ zoomImage: false})
  }
  componentDidMount = () => {
    window.electron.CRUD.retrieveBooks().then(booksData => {
      window.electron.main.getImgPath().then(imgPath => {
        this.setState({ imgPath, bookData: booksData.find(book => book.id == this.state.bookId) })
      })
    })
  }
  render() {
    if (!this.state.show || this.state.bookData == null) {
      return null;
    } 
    let { bookData } = this.state

    return (
      <Modal show={this.state.show} 
        onHide={this.handleClose} 
        dialogClassName="modal-lg"
      >
        <Modal.Header className='showbook_header' closeButton>
          N°: {bookData.id}
        </Modal.Header>
        <Modal.Body className='show_book_body'>
          <h1>"{bookData.titulo}"</h1>
          <p className='show_autor'>
            {
              bookData.autor && 
              `${bookData.autor}`
            }
          </p>
          <hr />
            <Row>      
              { bookData.image_src &&
              <Col className='show_col_1'>
                <Card.Img 
                  variant="top" 
                  src={path.join(this.state.imgPath, 'books', bookData.image_src)} 
                  className='show_image' 
                  alt='portada'
                  onClick={this.handleImgShow} 
                /> 
              </Col> }
              { 
                (bookData.estado || bookData.editorial || bookData.ano_edicion || bookData.descripcion) &&
                <Col className='show_col_2' xs={12} md={8}>

                  <h4 className='show_edicion'>
                    {(
                    (bookData.editorial && bookData.ano_edicion) && 
                    `Edición: ${bookData.editorial}, ${bookData.ano_edicion}`
                    ) ||
                    ((!bookData.editorial && bookData.ano_edicion) && 
                    `${bookData.ano_edicion}`
                    ) ||
                    ((bookData.editorial && !bookData.ano_edicion) && 
                    `Edición: ${bookData.editorial}`
                    )}
                  </h4>
                  { bookData.estado &&
                    <h5>{bookData.estado}</h5>
                  }
                  { bookData.descripcion &&         
                    <p className='show_descripcion'>
                      {bookData.descripcion}
                    </p>
                  }
                </Col>
              }
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={this.handleClose}
            className="show_close_button"
          >
              Cerrar
          </Button>

        </Modal.Footer>
        {       
          bookData.image_src && 
          <Modal 
            show={this.state.zoomImage} 
            onHide={this.handleImgClose} 
            onClick={this.handleImgClose} 
            dialogClassName="modal-xl"
            className='show_image_z'
          >
            <img src={path.join(this.state.imgPath, 'books', bookData.image_src)} 
            className='show_image_zoom' alt='portada_zoom'/>
          </Modal>
        }
      </Modal>
    )
  } 
}

export default ShowBook
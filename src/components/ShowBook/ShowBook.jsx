import React from 'react'
import { Modal, Card, Row, Col, Button } from 'react-bootstrap'
import './ShowBook.css'
import path from 'path-browserify'

import UpdateBook from '../UpdateBook/UpdateBook'

class ShowBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: this.props.show,
      bookId: this.props.id,
      close: this.props.onClose,
      imgPath: null,
      bookData: null,
      zoomImage: false,
      editMode: false
    }
  }
  handleClose = () => {
    this.state.close()
  }
  handleImgShow = () => {
    this.setState({ zoomImage: true })
  }
  handleImgClose = () => {
    this.setState({ zoomImage: false })
  }
  handleEditModeShow = () => {
    this.setState({ editMode: true })
  }
  handleEditModeClose = () => {
    this.setState({ editMode: false })
  }
  componentDidMount = () => {
    window.electron.CRUD.retrieveBooks().then(booksData => {
      window.electron.main.getImgPath().then(imgPath => {
        this.setState({
          bookData: booksData.find(book => book.id === this.state.bookId),
          imgPath: imgPath
        })
      })
    })
  }
  render() {
    if (this.state.bookData == null) {
      return null;
    }
    let { bookData, editMode } = this.state

    const imgPath = this.state.bookData.image_src ?
      path.join(this.state.imgPath, 'books', this.state.bookData.image_src) : ''

    return (
      <Modal show={this.state.show}
        onHide={this.handleClose}
        dialogClassName='modal-lg'
        className='my-modal'
      >
        {!editMode && <>
          <Modal.Header className='showbook_header' closeButton>
            N°: {bookData.id}
          </Modal.Header>
          <Modal.Body className='show_book_body'>

            <Row>
              {bookData.image_src &&
                <Col className='show_col_1'>
                  <Card.Img
                    variant='top'
                    src={imgPath}
                    className='show_image'
                    alt='portada'
                    onClick={this.handleImgShow}
                  />
                </Col>}  
                <Col className='show_col_2' xs={8} md={8}>
                  <h2>{bookData.titulo}</h2>
                  <p className='show_autor'>
                    {
                      bookData.autor &&
                      `${bookData.autor}`
                    }
                  </p>
                  <hr className='separator-hr' />
                  <h5 className='show_edicion'>
                    {(
                      (bookData.editorial && bookData.ano_edicion) &&
                      `${bookData.editorial}, ${bookData.ano_edicion}.`
                    ) ||
                      ((!bookData.editorial && bookData.ano_edicion) &&
                        `${bookData.ano_edicion}.`
                      ) ||
                      ((bookData.editorial && !bookData.ano_edicion) &&
                        `${bookData.editorial}.`
                      )}
                  </h5>
                  <br />
                  {bookData.descripcion &&
                    <p className='show_descripcion'>
                      {bookData.descripcion}
                    </p>
                  }
                  {bookData.fecha_ingreso &&
                    <p className='show_descripcion'>
                      Añadido el {bookData.fecha_ingreso}
                    </p>
                  }
                </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={this.handleEditModeShow}
            >
              Editar
            </Button>
            <Button
              variant="secondary"
              onClick={this.handleClose}
              className="show_close_button"
            >
              Cerrar
            </Button>
            {
              // Image Zoom 
              bookData.image_src &&
              <Modal
                show={this.state.zoomImage}
                onHide={this.handleImgClose}
                onClick={this.handleImgClose}
                dialogClassName="modal-xl"
                className='show_image_z'
              >
                <img src={imgPath}
                  className='show_image_zoom' alt='portada_zoom' />
              </Modal>
            }
          </Modal.Footer>
        </>
        }
        {
          editMode &&
          <UpdateBook formData={bookData} onClose={this.handleEditModeClose} image={imgPath} />
        }
      </Modal>

    )
  }
}

export default ShowBook
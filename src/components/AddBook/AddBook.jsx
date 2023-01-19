import React from 'react'
import {
  Button,
  Form,
  Modal,
  Nav,
  Row,
  Col,
  Alert,
  Card
} from 'react-bootstrap'

import path from 'path-browserify'
import './AddBook.css'

class AddBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      id: 0,
      formData: {
        titulo: ""
      },
      imagePath: "",
      formIsValid: false
    }
  }
  componentDidMount = async () => {
    let idB
    window.electron.CRUD.retrieveBooks().then(booksData => {
      const ids = booksData.map(book => book.id)
      
      if (ids.length > 2) {
        idB = parseInt(ids.reduce((max, val) => max > val ? max : val)) + 1
      } else {
        idB = parseInt(ids.sort().slice(-1)) + 1
      }
      this.setState({ id: idB })
    })
    
    
  }
  handleShow = () => {
    this.setState({ show: true })
  }
  handleClose = () => {
    this.setState({ show: false, imagePath: "" })
  }

  handleChange = (event) => {
    const formKey = event.target.name
    const formValue = event.target.value
    this.setState({
      formData: {
        ...this.state.formData,
        [formKey]: formValue
      },
      formIsValid:
        !((formKey === 'titulo' && formValue === '') ||
          (formKey !== 'titulo' && this.state.formData.titulo === ''))
    })
  }

  handleImgChange = (event) => {
    this.setState({ imagePath: event.target.files[0].path })
  }

  addBook = async () => {
    if (!this.state.formIsValid) { return }
    const { formData } = this.state
    const dateNow = new Date(Date.now())
    const date = dateNow.toLocaleDateString()
    const time = dateNow.toLocaleTimeString('en-US', {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: 'numeric'
    })
    formData.fecha_ingreso = date
    formData.hora_ingreso = time

    window.electron.CRUD.retrieveBooks().then(booksData => {
      const ids = booksData.map(book => book.id)
      if (ids.length > 2) {
        formData.id = parseInt(ids.reduce((max, val) => max > val ? max : val)) + 1
      } else {
        formData.id = parseInt(ids.sort().slice(-1)) + 1
      }
    })
    const newImagePath = path.join(
      await window.electron.main.getImgPath(),
      'books',
      `${formData.id}.png`
    )
    if (this.state.imagePath !== '') {
      formData.image_src = newImagePath.split('/').slice(-1)[0]
    }

    console.log(formData)
    if (formData.titulo === 'NO GUARDAR') { return }
    window.electron.CRUD.saveBook(formData)
    if (this.state.imagePath !== '') {
      window.electron.CRUD.saveBookImg(this.state.imagePath, newImagePath)
    }

    window.electron.main.reload()
  }

  render() {
    const { formData, formIsValid } = this.state
    return (
      <>
        <Nav.Link onClick={this.handleShow} className='add_book'>Ingresar</Nav.Link>

        <Modal
          show={this.state.show}
          dialogClassName="modal-lg"
          className='add_book_menu'
        >
          <Modal.Header closeButton onHide={this.handleClose}>
            <Modal.Title>Ingresar Libro n° { this.state.id }</Modal.Title>
          </Modal.Header>
          <Modal.Body className='add_book_body'>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Ingrese un título"
                  autoFocus
                  required
                  name='titulo'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese un Autor"
                      name='autor'
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Editorial</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese una Editorial"
                      name='editorial'
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Año de edición</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el año de edición"
                      name='ano_edicion'
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Portada (png/jpg/gif)</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="asdasd"
                      onChange={this.handleImgChange}
                      accept='.jpg,.jpeg,.png,.jfif,.gif,.webp,.bmp'
                    />
                  </Form.Group>
                </Col>

                {this.state.imagePath &&
                  <Col>
                    <Alert variant='secondary' className='image-preview'>
                      <p>Vista Previa</p>
                      <Card.Img variant="top" src={this.state.imagePath}
                        className='show_image flex-centered' alt='portada' />
                    </Alert>
                  </Col>
                }
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Detalles</Form.Label>
                <Form.Control as="textarea" rows={3}
                  name='descripcion'
                  placeholder='...'
                  value={formData.descripcion}
                  onChange={this.handleChange}
                />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => {
              this.addBook()
            }}
              disabled={!formIsValid}>
              Guardar
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default AddBook
import React from 'react'
import {
  Button,
  Form,
  Modal,
  Row,
  Col,
  Alert,
  Card
} from 'react-bootstrap'

import path from 'path-browserify'
import './UpdateBook.css'

class UpdateBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newData: this.props.formData,
      imagePath: this.props.image,
      formIsValid: false,
      onClose: this.props.onClose,
      imageHasChanged: false,
      confirmDelete: false
    }
  }
  handleClose = () => {
    this.setState({ show: false, imagePath: "" })
    this.state.onClose()
  }
  handleChange = (event) => {
    const formKey = event.target.name
    const formValue = event.target.value
    this.setState({
      newData: {
        ...this.state.newData,
        [formKey]: formValue
      },
      formIsValid:
        !((formKey === 'titulo' && formValue === '') ||
          (formKey !== 'titulo' && this.state.newData.titulo === ''))
    })
  }

  handleImgChange = (event) => {
    this.setState({
      imagePath: event.target.files[0].path,
      imageHasChanged: true,
      formIsValid:
        !!(this.state.newData.titulo)
    })
  }

  handleImgDelete = (event) => {
    document.getElementById('image_input').value = null
    this.setState({
      imagePath: null,
      imageHasChanged: true,
      formIsValid:
        !!(this.state.newData.titulo)
    })
  }

  confirmDelete = () => {
    this.setState({ confirmDelete: true })
  }
  cancelDelete = () => {
    this.setState({ confirmDelete: false })
  }
  deleteBook = async () => {
    window.electron.CRUD.deleteBook(this.state.newData.id)
    window.electron.main.reload()
  }

  updateBook = async () => {
    if (!this.state.formIsValid) { return }
    const { newData, imageHasChanged } = this.state
    newData.estado = document.getElementById('select_estado').value

    if (newData.titulo === 'NO GUARDAR') {
      return
    } else if (newData.image_src && !this.state.imagePath) {
      newData.image_src = ''
    }
    console.log(newData)

    //Imagen
    if (newData.image_src && imageHasChanged) {
      window.electron.CRUD.deleteBookImg(
        path.join(await window.electron.main.getImgPath(), 'books', `${newData.id}.png`)
      )
      if (this.state.imagePath) {
        window.electron.CRUD.saveBookImg(
          this.state.imagePath,
          path.join(await window.electron.main.getImgPath(), 'books', `${newData.id}.png`)
        )
      }
    } else if (!(newData.image_src) && imageHasChanged && this.state.imagePath) {
      newData.image_src = `${newData.id}.png`
      window.electron.CRUD.saveBookImg(
        this.state.imagePath,
        path.join(await window.electron.main.getImgPath(), 'books', `${newData.id}.png`)
      )
    }
    window.electron.CRUD.updateBook(newData)
    window.electron.main.reload()
  }

  render() {
    return (
      <>
        <Modal.Header onHide={this.handleClose} closeButton>
          <Modal.Title>Ingresar Libro</Modal.Title>
        </Modal.Header>
        <Modal.Body className='update_book_body'>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Ingrese un título"
                required
                name='titulo'
                onChange={this.handleChange}
                defaultValue={this.state.newData.titulo}
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
                    defaultValue={this.state.newData.autor ? this.state.newData.autor : ''}
                  />
                </Form.Group>

              </Col>
              <Col>

                <Form.Group className="mb-3">
                  <Form.Label>Editorial</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese una Editorial"
                    name='editorial'
                    onChange={this.handleChange}
                    defaultValue={this.state.newData.editorial ? this.state.newData.editorial : ''}
                  />
                </Form.Group>

              </Col>
            </Row>
            <Row>
              <Col>

                <Form.Group className="mb-3">
                  <Form.Label>Año de edición</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese el año de edición"
                    name='ano_edicion'
                    onChange={this.handleChange}
                    defaultValue={this.state.newData.ano_edicion ? this.state.newData.ano_edicion : ''}
                  />
                </Form.Group>

              </Col>
              <Col>

                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    aria-label='Selección estado'
                    name="estado"
                    id='select_estado'
                    onChange={this.handleChange}
                    defaultValue={this.state.newData.estado}
                  >
                    <option value='Disponible'>Disponible</option>
                    <option value='Prestado'>Prestado</option>
                    <option value='Perdido'>Perdido</option>
                  </Form.Select>
                </Form.Group>

              </Col>
            </Row>
            <Row>
              <Col>

                <Form.Group className="mb-3">
                  <Form.Label>Portada (png/jpg/gif)</Form.Label>
                  <Form.Control
                    id='image_input'
                    type="file"
                    placeholder="asdasd"
                    onChange={this.handleImgChange}
                    accept='.jpg,.jpeg,.png,.jfif,.gif,.webp,.bmp'
                  />
                  <h6 />

                </Form.Group>

              </Col>

              {this.state.imagePath &&
                <Col>
                  <Alert variant='secondary' className='image-preview'>
                    <p>Vista Previa</p>
                    <button variant="secondary" onClick={this.handleImgDelete}>
                      X
                    </button>
                    <Card.Img variant="top" src={this.state.imagePath}
                      className='card_images flex-centered' alt='portada' />
                  </Alert>
                </Col>
              }
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3}
                name='descripcion'
                placeholder='...'
                value={this.state.newData.descripcion}
                onChange={this.handleChange}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.confirmDelete}>
            Eliminar
          </Button>
          <Button variant="primary" onClick={() => {
            this.updateBook()
          }}
            disabled={!this.state.formIsValid}>
            Actualizar
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancelar
          </Button>

          {
            this.state.confirmDelete &&
            <Modal
              onHide={this.cancelDelete}
              show={this.state.confirmDelete}
              dialogClassName="modal-xs"
            >
              <Modal.Header onHide={this.handleClose} closeButton>
                <Modal.Title>
                  ¿Eliminar libro n°{this.state.newData.id}?
                </Modal.Title>
              </Modal.Header>

              <Modal.Body className='confirm_delete'>
                <Button variant="primary" onClick={this.deleteBook}>
                  Confirmar
                </Button>

                <Button variant="secondary" onClick={this.cancelDelete}>
                  Cancelar
                </Button>
              </Modal.Body>
            </Modal>
          }

        </Modal.Footer>
      </>
    )
  }
}

export default UpdateBook
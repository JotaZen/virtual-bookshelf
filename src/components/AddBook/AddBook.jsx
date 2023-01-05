import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import path from 'path-browserify'
import './AddBook.css'

class AddBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      formData: {
        titulo: ""
      },
      imagePath: "",
      formIsValid: false
    }
  }
  handleShow = () => {
    this.setState({ show:true })
  }
  handleClose = () => {
    this.setState({ show:false })
  }

  handleChange = (event) => {
    this.state.formData[event.target.name] = event.target.value
    this.validateForm()
  }

  handleImgChange = (event) => {
    this.state.imagePath = event.target.files[0].path
  }

  validateForm = () => {
    if (this.state.formData.titulo == '') {
      this.setState({ formIsValid: false })
      return
    } else if (this.state.formData.image) {
      console.log('huh')
    }


    this.setState({ formIsValid: true })
  }

  addBook = async () => {
    if (!this.state.formIsValid) {return}
    const dateNow = 1

    
    

    window.electron.CRUD.retrieveBooks().then(booksData => {
      const ids = booksData.map( book => book.id ) 
      this.state.formData.id = ids.reduce((max, val) => max > val ? max : val) + 1
    })  
    const newImagePath = path.join(
      await window.electron.main.getImgPath(), 
      'books',
      `${this.state.formData.id}.png`
    )
    this.state.formData.image_src = newImagePath.split('/').slice(-1)[0]
    
    window.electron.CRUD.saveBook(this.state.formData)
    window.electron.CRUD.saveBookImg(this.state.imagePath, newImagePath)

    window.electron.main.reload()  
  }

  render() {
    const { formIsValid, formData, show } = this.state

    return (
      <>
        <Nav.Link onClick={this.handleChange} className='add_book'>Ingresar Libro</Nav.Link>
  
        <Modal show={show} onHide={this.handleClose} dialogClassName="modal-90w">
          <Modal.Header closeButton>
            <Modal.Title>Ingresar Libro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese un título"
                  autoFocus
                  required
                  name='titulo'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese un Autor"
                  name='autor'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Editorial</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese una Editorial"
                  name='editorial'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Año de edición</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el año de edición"
                  name='ano_edicion'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={3} 
                  name='descipcion'
                  placeholder='...'
                  value={formData.descripcion} 
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Portada</Form.Label>
                <Form.Control
                  type="file"
                  placeholder=""
                  onChange={this.handleImgChange}
                  accept='.jpg,.jpeg,.png,.jfif,.gif,.webp'
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cerrar
            </Button>       
            <Button variant="primary" onClick={()=> {
              this.addBook() 
              handleClose()}} 
              disabled={!formIsValid}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  } 
}

export default AddBook
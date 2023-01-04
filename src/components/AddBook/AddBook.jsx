import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import './AddBook.css'

class AddBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      formData: {
        titulo: ""
      },
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

  validateForm = () => {
    if (this.state.formData.titulo == '') {
      this.setState({ formIsValid: false })
      return
    }
    this.setState({ formIsValid: true })
  }

  addBook = () => {
    if (!this.state.formIsValid) {return}
    const dateNow = 
    
    window.electron.CRUD.retrieveBooks().then(booksData => {
      const ids = booksData.map( book => book.id ) 
      this.state.formData.id = ids.reduce((max, val) => max > val ? max : val) + 1
      window.electron.CRUD.saveBook(this.state.formData)
    })  
  }

  render() {
    const { formIsValid, formData, show } = this.state
    const handleChange = this.handleChange
    const handleShow = this.handleShow
    const handleClose = this.handleClose
    const addBook = this.addBook

    return (
      <>
        <Nav.Link onClick={handleShow} className='add_book'>Ingresar Libro</Nav.Link>
  
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
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
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese un Autor"
                  name='autor'
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Editorial</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese una Editorial"
                  name='editorial'
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Año de edición</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el año de edición"
                  name='ano_edicion'
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={3} 
                  name='descipcion'
                  placeholder='...'
                  value={formData.descripcion} 
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Portada</Form.Label>
                <Form.Control
                  type="file"
                  placeholder=""
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>       
            <Button variant="primary" onClick={()=> {
              addBook() 
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
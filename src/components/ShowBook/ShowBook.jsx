import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import './ShowBook.css'

class ShowBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: this.props.show,
      bookId: this.props.id,
      close: this.props.onClose,
      imgPath: null,
      bookData: null
    }
  }
  handleClose = () => {
    this.state.close()
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
    console.log(bookData)

    return (
      <> 
        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-90w">
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <h1>"{bookData.titulo}"</h1>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

            <h4>Tooltips in a modal</h4>
            <p>

            </p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
          </Modal.Body>
        </Modal>
      </>
    )
  } 
}

export default ShowBook
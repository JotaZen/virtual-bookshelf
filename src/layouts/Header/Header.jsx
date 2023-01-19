import React from 'react'
import './Header.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import AddBook from '../../components/AddBook/AddBook'
import BooksGrid from '../BookGrid/GridBook'
import Help from '../../components/Help/Help'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGrid: true,
      showHelp: false,
      reset: 0
    }
  }
  showGrid = () => {
    this.setState({ 
      showGrid: true, 
      showHelp: false, 
      reset: (this.state.reset + 1) % 2
    })
  }
  showHelp = () => {
    this.setState({ showHelp: true, showGrid: false })
  }

  render() {
    return (
      <>
        <Navbar variant="dark" className='nav_bar'>
          <Container className='header_container'>
            <Navbar.Brand>Raúl Espinoza</Navbar.Brand>
            <Nav className="me-auto nav_container">
              <Nav.Link className='add_book' onClick={this.showGrid}>Biblioteca</Nav.Link>
              <AddBook />
              <Nav.Link className='add_book' onClick={this.showHelp}>Información</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <div className='margin_body'></div>

        {this.state.showGrid && <BooksGrid key={this.state.reset}/>}
        {this.state.showHelp && <Help />}
      </>
    )
  }
}

export default Header
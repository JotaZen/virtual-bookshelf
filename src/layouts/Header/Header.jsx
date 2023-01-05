import React from 'react'
import './Header.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import AddBook from '../../components/AddBook/AddBook'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Navbar variant="dark" className='nav_bar'>
        <Container>
          <Navbar.Brand>Raúl Espinoza</Navbar.Brand>
          <Nav className="me-auto">
            <AddBook/>
            <Nav.Link>Mi Biblioteca</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
  }
}

export default Header
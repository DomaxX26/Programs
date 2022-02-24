import React, { Component} from 'react';
import {Navbar,
    Nav,
    NavDropdown,
   } from 'react-bootstrap/';

class Header extends Component{
render (){
    return (
        <div>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Tenda Ciclista</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                 <Nav className="mr-auto">
                  <Nav.Link href="/"><i className="fa fa-fw fa-home"></i>Home</Nav.Link>
                  <Nav.Link href="/productos">Productos</Nav.Link>
                   <Nav.Link href="/pedidos">Pedidos</Nav.Link>
              <NavDropdown title="Area Personal" id="basic-nav-dropdown">
                <NavDropdown.Item href="/areapersonal">Area Personal</NavDropdown.Item>
                <NavDropdown.Item href="/register">Registarse</NavDropdown.Item>
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </Navbar>  
          </div>
    )
}
}
export default Header;



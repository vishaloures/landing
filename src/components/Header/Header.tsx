import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FiMessageSquare, FiSearch } from 'react-icons/fi';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container fluid>
        <Navbar.Brand href="#home">
          {/* Placeholder for Logo */}
          <span style={{color: "purple", fontWeight: "bold"}}>FINAM</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#connection">Подключение</Nav.Link>
            <Nav.Link href="#services">Сервисы</Nav.Link>
            <Nav.Link href="#api" active>API</Nav.Link>
            <Nav.Link href="#sdk">SDK</Nav.Link>
            <Nav.Link href="#support">Поддержка</Nav.Link>
            <Nav.Link href="#releases">Релизы</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#message"><FiMessageSquare /></Nav.Link>
            <Nav.Link href="#search"><FiSearch /></Nav.Link>
            <NavDropdown title="Trade API" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

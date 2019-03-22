import React, { Component } from 'react';
import { Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import './App.css';
import MapContainer from './components/MapContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#home">Durian maps</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                href="#home"
                onClick={() => alert('pöö')}>
                  Home
                </Nav.Link>
              <Nav.Link
                href="#data"
                onClick={() => alert('pöö')}>
                Data
              </Nav.Link>
              <NavDropdown title="Options" id="basic-nav-dropdown">
                <NavDropdown.Item href="#track/3.1">Track a vessel</NavDropdown.Item>
                <NavDropdown.Item href="#fleet/3.2">Fleet info</NavDropdown.Item>
                <NavDropdown.Item href="#options/3.3">Display more</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#about/3.4">About</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search parking area" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
          <Row>
            <Col>
              <Row>
              <Col md={12} style={{ height: '80vh', width: '100%'}}>
                <MapContainer />
              </Col>
              </Row>
            </Col>
          </Row>
      </div>
    );
  }
}

export default App;

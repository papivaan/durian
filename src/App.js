import React, { Component } from 'react';
import { Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import './App.css';
import MapContainer from './components/MapContainer';
import './durra.PNG';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#home">
            <img src="durra.PNG" alt="durian" height="40" width="40" />
          </Navbar.Brand>
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
                <NavDropdown.Item href="#track/3.1">Parking areas</NavDropdown.Item>
                <NavDropdown.Item href="#fleet/3.2">General fees</NavDropdown.Item>
                <NavDropdown.Item href="#options/3.3">Find more information</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#about/3.4">About</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline className="d-none d-md-block">
              <FormControl type="text" placeholder="Enter destination" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
          <Row>
            <Col>
              <Row>
              <Col md={12} style={{ height: '100vh', width: '100%'}}>
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

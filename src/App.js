import React, { Component } from 'react';
import { Row, Col, Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import './App.css';
import MapContainer from './components/MapContainer';
import './durra.PNG';
import json from './backend/json/durianMapJson.json';

class App extends Component {
  state = {
    showWithFee: true,
    showNoFee: true,
    showData: false,
  };

  handleChangeWithFee = () => {
    this.setState({ showWithFee: !this.state.showWithFee });
  }

  handleChangeNoFee = () => {
    this.setState({ showNoFee: !this.state.showNoFee });
  }

  handleChangeVisibility = value => {
    this.setState({ showData: value });
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#home" onClick={() => this.handleChangeVisibility(false)}>
            <img src="durra.PNG" alt="durian" height="40" width="40" />
            park<span>.</span>jkl
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                href="#home"
                onClick={() => this.handleChangeVisibility(false)}>
                  Home
                </Nav.Link>
              <Nav.Link
                href="#data"
                onClick={() => this.handleChangeVisibility(true)}>
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
            <Form inline>
              <Row>
                <Form.Label style={{ color: '#fff' }}>
                  <strong>Värikoodit:</strong>
                </Form.Label>
                <Col>
                  <Form.Label style={{ color: '#fff500', opacity: '0.5' }}>
                    <strong>Maksulliset</strong>
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label style={{ color: '#1E90FF', opacity: '0.5' }}>
                    <strong>Kiekolliset</strong>
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label style={{ color: '#ADFF2F', opacity: '0.5' }}>
                    <strong>Parkkitalot</strong>
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label style={{ color: '#B0C4DE', opacity: '0.5', marginRight: '20px' }}>
                    <strong>Yksityiset</strong>
                  </Form.Label>
                </Col>
              </Row>
            </Form>
            <Form inline style={{ border: '1px solid #fff', borderRadius: '6px', padding: '5px'}}>
              <Row>
                <Col>
                  <Form.Check
                    checked={this.state.showWithFee}
                    onChange={this.handleChangeWithFee}
                    className="checkBox"
                    sm="2"
                    type="checkbox"
                    label="Maksulliset"
                  />
                </Col>
                <Col>
                  <Form.Check
                    checked={this.state.showNoFee}
                    onChange={this.handleChangeNoFee}
                    className="checkBox"
                    sm="2"
                    type="checkbox"
                    label="Ilmaiset"
                  />
                </Col>
              </Row>
            </Form>
          </Navbar.Collapse>
        </Navbar>
          <Row>
            <Col>
              <Row>
              <Col md={12} style={{ height: '100vh', width: '100%'}}>
              {!this.state.showData && (
              <MapContainer
                showFee={this.state.showWithFee}
                showNoFee={this.state.showNoFee}
              />
              )}
              {this.state.showData && (
                <p style={{ color: 'white', overflow: 'auto' }}>{JSON.stringify(json)}</p>
              )}
              </Col>
              </Row>
            </Col>
          </Row>
      </div>
    );
  }
}

export default App;

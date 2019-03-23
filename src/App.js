import React, { Component } from 'react';
import { Row, Col, Navbar, Nav, NavDropdown, Form, } from 'react-bootstrap';
import './App.css';
import MapContainer from './components/MapContainer';
import './durra.PNG';

class App extends Component {
  state = {
    showWithFee: true,
    showNoFee: true,
  };

  handleChangeWithFee = () => {
    this.setState({ showWithFee: !this.state.showWithFee });
  }

  handleChangeNoFee = () => {
    this.setState({ showNoFee: !this.state.showNoFee });
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#home">
            <img src="durra.PNG" alt="durian" height="40" width="40" />
            park<span>.</span>jkl
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
            <Form inline>
              {/* <FormControl type="text" placeholder="Enter destination" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button> */}
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
                <MapContainer
                  showFee={this.state.showWithFee}
                  showNoFee={this.state.showNoFee}
                />
              </Col>
              </Row>
            </Col>
          </Row>
      </div>
    );
  }
}

export default App;

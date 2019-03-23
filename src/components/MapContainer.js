import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Polygon, InfoWindow } from 'google-maps-react';
import geolib from 'geolib';
import _ from 'lodash';
import mapStyle from '../mapStyle.json';
// import data from '../example.json';
import data from '../backend/myjsonfile.json';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import '../App.css';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activePolygon: {},
    center: {},
    address: ''
  };

  onPolygonClick = (props, marker) => {
    const areaCenter = geolib.getCenter(props.paths);
    this.handleGetAddress(props.lat, props.lng);
    this.setState({
      activePolygon: marker,
      showingInfoWindow: true,
      center: areaCenter,
    });
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activePolygon: null,
        areaCenter: null,
        address: ''
      })
    }
  };

  handleGetAddress = (LAT, LNG) => {
      axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${LAT}+${LNG}&key=4fdd87a7e369405b8b1ccaececf50520`)
      .then(res => {
        var components = res.data.results[0].components;
        var formatted_address = `${components.road} ${components.house_number ? components.house_number : ''}`;
        this.setState({
          address: formatted_address
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleParking = () => {
    console.log('parking');
  }

  render() {
    const LAT = Number(this.state.center.latitude);
    const LNG = Number(this.state.center.longitude);
    const areas = _.compact(data.areas);

    const onInfoWindowOpen = (props, e) => {
      const infoContent = (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong>{this.state.address}</strong>
          <p>Kiekko: 2h</p>
          <p>Tilaa: on</p>
          <a href={`https://www.google.com/maps/dir/?api=1&origin=Alvar+Aallon+katu+9,+40014+Jyväskylä&destination=${LAT},${LNG}&travelmode=driving`}>
            Reittiohjeet (Google Maps)
          </a>
          <Button
            size="sm"
            style={{ marginTop: '4px'}}
            variant="success"
            onClick={this.handleParking}>
              Parkissa
            </Button>
        </div>
      );
      ReactDOM.render(React.Children.only(infoContent), document.getElementById("info"));
    };

    return (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        zoom={16}
        style={{width: '100vw', height: '95vh', position: 'absolute'}}
        styles={mapStyle}
        visible
        mapTypeControl={false}
        fullscreenControl={false}
        initialCenter={{
          lat: 62.238211,
          lng: 25.741593
        }}
      >
        {areas.map(area => (
          <Polygon
            key={area.id}
            paths={area.coords}
            lat={LAT}
            lng={LNG}
            strokeColor="#161c00"
            strokeOpacity={0.5}
            strokeWeight={2}
            fillColor="#fff500"
            fillOpacity={0.2}
            onClick={this.onPolygonClick}
          />
        ))}
        <InfoWindow
          position={{ lat: LAT, lng: LNG }}
          visible={this.state.showingInfoWindow}
          onOpen={e => {
            onInfoWindowOpen(this.props, e);
          }}
        >
            <div id="info">
              {/* <strong>{this.state.address}</strong>
              <p>Kiekko: 2h</p>
              <p>Tilaa: on</p>
              <a href={`https://www.google.com/maps/dir/?api=1&origin=Alvar+Aallon+katu+9,+40014+Jyväskylä&destination=${LAT},${LNG}&travelmode=driving`}>
                Reittiohjeet (Google Maps)
              </a> */}
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDSc1sy-mhjzz4wJSqNlrd0FT9sse6qQ1E"
})(MapContainer)
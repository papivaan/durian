import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Polygon, InfoWindow} from 'google-maps-react';
import mapStyle from '../mapStyle.json';
import data from '../example.json';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activePolygon: {},
    selectedPlace: {},
  };

  onPolygonClick = (props, marker) => {
    this.setState({
      activePolygon: marker,
      showingInfoWindow: true,
      selectedPlace: props.name,
    });
  };
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activePolygon: null,
      })
    }
  };

  render() {
    const areas = data.areas;
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={{width: '100vw', height: '95vh', position: 'absolute'}}
        styles={mapStyle}
        visible
        initialCenter={{
          lat: 62.238211,
          lng: 25.741593
        }}
      >
        {areas.map(area => (
          <Polygon
            key={area.type} // fix this
            paths={area.coords}
            strokeColor="#161c00"
            strokeOpacity={0.5}
            strokeWeight={2}
            fillColor="#fff500"
            fillOpacity={0.2}
            onClick={this.onPolygonClick}
          />
        ))}
        <InfoWindow
          position={{lat: 62.238852, lng: 25.741349}}
          visible={this.state.showingInfoWindow}>
            <div>
              <strong>Gummeruksenkatu</strong>
              <p>Kiekko: 2h</p>
              <p>Tilaa: on</p>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDSc1sy-mhjzz4wJSqNlrd0FT9sse6qQ1E"
})(MapContainer)
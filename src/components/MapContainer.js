import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Polygon, InfoWindow} from 'google-maps-react';

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
    console.log(this.state);
    const exampleCoords = [
      {lat: 62.238805, lng: 25.741274},
      {lat: 62.238852, lng: 25.741349},
      {lat: 62.238452, lng: 25.742290},
      {lat: 62.238415, lng: 25.742207},
    ];

    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={{width: '100%', height: '100%', position: 'relative'}}
        visible
        initialCenter={{
          lat: 62.238211,
          lng: 25.741593
        }}
      >
        <Polygon
          paths={exampleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35}
          onClick={this.onPolygonClick}
        />
        <InfoWindow
          // marker={this.state.activePolygon}
          position={{lat: 62.238852, lng: 25.741349}}
          visible={this.state.showingInfoWindow}>
            <div>
              <h3>Gummeruksenkatu</h3>
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
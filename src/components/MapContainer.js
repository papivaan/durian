import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Polygon, InfoWindow } from 'google-maps-react';
import geolib from 'geolib';
import _ from 'lodash';
import mapStyle from '../mapStyle.json';
// import data from '../example.json';
// import data from '../backend/durianMapJson.json';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import '../App.css';

const COLOR_FEE = { stroke: "#161c00", fill: "#fff500" };
const COLOR_PRIVATE = { stroke: "#708090", fill: "#B0C4DE" };
const COLOR_DISK = { stroke: "#00008B", fill: "#1E90FF" };
const COLOR_PARKING_HALL = { stroke: "#228B22", fill: "#ADFF2F" };
export class MapContainer extends Component {
  state = {
    data: {},
    showingInfoWindow: false,
    center: {},
    area: {},
    address: '',
    isLoading: false
  };

  componentDidMount() {
    axios.get('/parkingAreas')
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => { console.log(error); });
  }

  onPolygonClick = area => {
    const areaCenter = geolib.getCenter(area.coords);
    this.handleGetAddress(
      Number(areaCenter.latitude),
      Number(areaCenter.longitude)
    );
    this.setState({
      showingInfoWindow: true,
      center: areaCenter,
      isLoading: true,
      area: area
    });
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        areaCenter: null,
        address: ''
      })
    }
  };

  handleGetAddress = (LAT, LNG) => {
      axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${LAT}+${LNG}&key=3be17afb99ce42f1940d91c02f5fdeac`)
      .then(res => {
        var components = res.data.results[0].components;
        var formatted_address = `${components.road} ${components.house_number ? components.house_number : ''}`;
        this.setState({
          address: formatted_address,
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClearAddress = () => {
    this.setState({ address: '' });
  }

  handleParking = () => {
    console.log(this.state.area);
    const postInfo = this.state.area.name ? this.state.area.name : this.state.address;
    axios.post('/sendConfirmationSms', { address: postInfo })
      .then(res => {
        console.log(res);
      })
      .catch(error => { console.log(error); });
  }

  render() {
    const LAT = Number(this.state.center.latitude);
    const LNG = Number(this.state.center.longitude);
    const areas = _.compact(this.state.data.areas);
    let filteredAreas = areas;
    if(!this.props.showFee) filteredAreas = areas.filter(area => !area.fee);
    if(!this.props.showNoFee) filteredAreas = areas.filter(area => area.fee === 'yes');
    if(!this.props.showFee && !this.props.showNoFee) filteredAreas = [];

    const onInfoWindowOpen = (props, e) => {
      const infoContent = (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong>{this.state.address === 'undefined' ? '' : this.state.address}</strong>
          <strong>{this.state.area.name ? this.state.area.name : ''}</strong>
          <p>
            {this.state.area.access === 'private' ? 'Yksityisalue' : this.state.area.fee ? 'Pysäköintimaksu' : 'Kiekko'}
          </p>
          <p>{this.state.area.duration ? this.state.area.duration : this.state.area.fee === 'yes' ? '' : this.state.area.fee}</p>
          <a href={`https://www.google.com/maps/dir/?api=1&origin=Alvar+Aallon+katu+9,+40014+Jyväskylä&destination=${LAT},${LNG}&travelmode=driving`}>
            Reittiohjeet (Google Maps)
          </a>
          <Button
            disabled
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
          lat: 62.241680,
          lng: 25.749583
        }}
      >
        {filteredAreas.map(area => {
          let color = COLOR_FEE;
          if (area.access === 'private') color = COLOR_PRIVATE;
          if (area.duration) color = COLOR_DISK;
          if (area.parkingType === 'multi-storey' || area.parkingType === 'underground') color = COLOR_PARKING_HALL;
          return (
            <Polygon
            key={area.id}
            paths={area.coords}
            strokeColor={color.stroke}
            strokeOpacity={0.5}
            strokeWeight={2}
            fillColor={color.fill}
            fillOpacity={0.2}
            onClick={() => this.onPolygonClick(area)}
          />
          )
        })}
        <InfoWindow
          position={{ lat: LAT, lng: LNG }}
          visible={this.state.showingInfoWindow && !this.state.isLoading}
          onOpen={e => {
            onInfoWindowOpen(this.props, e);
          }}
          onClose={this.onMapClicked}
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

import React from 'react';
import { Polygon } from 'google-maps-react';

const ParkingArea = props => (
  <Polygon
    paths={props.coords}
    strokeColor="#0000FF"
    strokeOpacity={0.8}
    strokeWeight={2}
    fillColor="#0000FF"
    fillOpacity={0.35}
  />
);

export default ParkingArea;
import React from 'react';
import { Polygon } from 'google-maps-react';

const ParkingArea = props => (
  <Polygon
    paths={props.coords}
    strokeColor="#161c00"
    strokeOpacity={0.8}
    strokeWeight={2}
    fillColor="#fff95e"
    fillOpacity={0.35}
  />
);

export default ParkingArea;
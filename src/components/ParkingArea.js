import React from 'react';
import { Polygon } from 'google-maps-react';

const ParkingArea = props => {
  const { coords, clicked } = props;
  return (
    <Polygon
      paths={coords}
      strokeColor="#161c00"
      strokeOpacity={0.8}
      strokeWeight={2}
      fillColor="#fff95e"
      fillOpacity={0.35}
      onClick={clicked}
    />
  );
};

export default ParkingArea;
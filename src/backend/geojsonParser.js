var fs = require('fs');

const geoJSON = require('./json/export.geojson.json');
let areas = [];
let entrances = [];
let durianJSON  = {};


geoJSON.features.forEach(feature => {
  if(feature.geometry.type === "Polygon"){
    areas.push(createParkingArea(feature));
  }

  if(feature.geometry.type === "Point"){
    areas.push(createParkingPoint(feature));
  }
});

durianJSON.areas = areas;
durianJSON.entrances = entrances;

let durianStr = JSON.stringify(durianJSON);
fs.writeFile('durianMapJson.json', durianStr, 'utf8', 
() => {console.log("Geojson parsed!")});

function createParkingArea(feature){
  let parkingArea = {};
  initProperties(parkingArea, feature.properties);
  initCoordinates(parkingArea, feature.geometry);
  return parkingArea;
}

function createParkingPoint(feature){
  let parkingPoint = {};
  initProperties(parkingPoint, feature.properties);
  let point = feature.geometry.coordinates;

  parkingPoint.coords = [];
  parkingPoint.coords.push(createCoordinate(point[0], point[1]));
}

function initProperties(target, properties){
  target.id = properties["@id"];
  target.fee = properties.fee;
  target.parkingType = properties.parking;
  target.access = properties.access;
  target.name = properties.name;
  target.capacity = properties.capacity;
  target.duration = properties.maxstay;
  target.openingHours = properties.opening_hours;
  target.address = {};
  target.address.street = properties["addr:street"];
  target.address.number = properties["addr:housenumber"];
}

function initCoordinates(target, geometry){
  target.coords = [];
  geometry.coordinates[0].forEach(
    point => {
     target.coords.push(createCoordinate(point[0], point[1]));
    });

}

function createCoordinate(longitude, latitude){
  let coordinate = {};
  coordinate.lat = latitude;
  coordinate.lng = longitude;
  return coordinate;
}

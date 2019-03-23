'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ParkingArea = new Schema({
  MMSI: {
    type: String
  },
  IMO: {
    type: String
  },
  SHIP_ID: {
    type: String
  },
  LAT: {
    type: String
  },
  LON: {
    type: String
  },
  SPEED: {
    type: String
  },
  HEADING: {
    type: String
  },
  COURSE: {
    type: String
  },
  STATUS: {
    type: String
  },
  TIMESTAMP: {
    type: String
  },
  DSRC: {
    type: String
  },
  UTC_SECONDS: {
    type: String
  }
});

module.exports = mongoose.model('Vessels', VesselSchema);

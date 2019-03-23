'use strict';

exports.getParkingData = function(req, res) {
    const parkingAreaData = require("../models/durianMapJson.json")
    res.json(parkingAreaData);
};

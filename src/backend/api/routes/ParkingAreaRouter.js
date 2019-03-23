'use strict';
module.exports = function(app) {
  var parkingAreas = require('../controllers/ParkingAreaController');

  app.route('/parkingAreas')
    .get(parkingAreas.getParkingData)

  app.route('/sendConfirmationSms')
    .post(parkingAreas.sendConfirmationSms)
};

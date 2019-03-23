'use strict';
const https = require('https')
const querystring = require('querystring')

exports.getParkingData = function(req, res) {
    const parkingAreaData = require("../models/durianMapJson.json")
    res.json(parkingAreaData);
};

exports.sendConfirmationSms = function(req, res) {
    // console.log(req.body.address);
    sendSmsToElksApi(req.body.address);
    res.send('text sent');
}

function sendSmsToElksApi (address) {
    console.log(address);
//  THIS SHIT WURKS
    const username = 'u967f2fe772a5315d1dfd82b16e9a36db'
    const password = '62DA6923CC09FF428404D084ACEF638B'
    const postFields = {
    from:    "parkJKL",
    to:      "+358442536783", 
    message: "Autosi on parkissa kohteessa: " + address + ". Mukavaa päivänjatkoa!",
    }

    const key = new Buffer(username + ':' + password).toString('base64')
    const postData = querystring.stringify(postFields)

    const options = {
    hostname: 'api.46elks.com',
    path:     '/a1/SMS',
    method:   'POST',
    headers:  {
        'Authorization': 'Basic ' + key
    }
    }


    const callback = (response) => {
    var str = ''
    response.on('data', (chunk) => {
        str += chunk
    })

    response.on('end', () => {
        console.log(str)
    })
    }

// Start the web request.
    var request = https.request(options, callback)

    // Send the real data away to the server.
    request.write(postData)

    // Finish sending the request.
    request.end()
}

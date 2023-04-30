var bodyParser = require("body-parser");
//var req = require('request');
var Sighting = require('../models/sighting');
var path = require('path');


exports.create = function (req, res) {
    var userData = req.body;
    var sighting = new Sighting({
        id: 1,
        date: userData.date+userData.time,
        identification: userData.identification,
        location: 'Sheffield',
        user: userData.user,
    });

    sighting.save(function (err, results) {
        if (err)
            res.status(500).send('Invalid data!');
        console.log("Sigting saved!    "+sighting)
        res.json({sighting: sighting});
    });
};







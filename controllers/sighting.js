var bodyParser = require("body-parser");
//var req = require('request');
var Sighting = require('../models/sighting');
var path = require('path');


exports.create = function (req, res) {
    var userData = req.body;
    var sighting = new Sighting({
        id: 1,
        date: userData.date+userData.time,
        identification: 'unknown',
        location: userData.location,
        user: userData.user,
        description: userData.identification,
        img: req.file.path
    });

    sighting.save(function (err, results) {
        if (err)
            res.status(500).send('Invalid data!');
        console.log("Sigting saved!    "+sighting)
        res.json({sighting: sighting});
    });
};

exports.queryAll = function(req, res) {
    Sighting.find({}, function (error, data) {
        if(error){
            res.status(500).send('query data failed!');
        }

        console.log("query data success");
        console.log(data);
        res.render('listPage', { title: 'Express', Data: data});

    });
};





var bodyParser = require("body-parser");
//var req = require('request');
var Sighting = require('../models/sighting');
var path = require('path');


exports.create = function (req, res) {
    var userData = req.body;
    var pwd = genPassword();
    var sighting = new Sighting({
        id: 1,
        date: userData.date+userData.time,
        identification: 'unknown',
        location: userData.location,
        user: userData.user,
        description: userData.identification,
        img: req.file.path,
        password: pwd
    });

    sighting.save(function (err, results) {
        if (err)
            res.status(500).send('Invalid data!');
        console.log("Sigting saved!    "+sighting)
        //res.json({sighting: sighting});
        console.log("Sighting saved successful, your password is " + pwd);
        res.json({password: pwd});
    });
};

exports.queryAll = function(req, res) {
    Sighting.find({}, function (error, data) {
        if(error){
            res.status(500).send('query data failed!');
        }

        console.log("query data success");
        res.render('listPage', { title: 'Express', Data: data});

    });
};

exports.pwdValidation = function (inputID, inputPwd){

}

exports.querySighting = function (req, res) {
    //var sightID = req.id;
    var sightID = 1;
    Sighting.findOne({"id" : sightID}, {"date": 1, "identification": 1, "location": 1,
                                        "description": 1, "img": 1},
                                        function (error, result) {
                                            if(error){
                                                console.log("query sighting error")
                                            }
                                            else{
                                                console.log("query sighting success");
                                                //console.log(result);
                                                res.render("reviewPage", {Data: result})
                                            }


    });
}

function genPassword(){
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0').toString();
}






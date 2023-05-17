var bodyParser = require("body-parser");
//var req = require('request');
var Sighting = require('../models/sighting');
var path = require('path');


exports.create = function (req, res) {
    var userData = req.body;
    var pwd = genPassword();
    var sighting = new Sighting({
        id: 1,
        date: userData.date+" "+userData.time,
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
        console.log("Sighting saved!    "+sighting)
        //res.json({sighting: sighting});
        console.log("Sighting saved successful, your password is " + pwd);
        //res.status(204).json({Password: pwd});
        res.send({Password: pwd});
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

exports.pwdValidation = function (inputID, inputPwd){

}

exports.updateSighting = function (req,res) {
    // var conditions = {"id" : req.body.id}
    var updates = {$set:{
        "identification": req.body.identification,
    }}
    //
    // Sighting.updateOne(conditions,updates,function (error) {
    //     if(error) {
    //         console.log(error)
    //     } else {
    //         console.log("Sighting edited.")
    //     }
    // });

    console.log(req.body.id);
    console.log(req.body.password);
    console.log(req.body.identification);

    Sighting.findOne({"id" : req.body.id}, {"password": 1},
        function (error, result) {
            if(error){
                console.log("can not find sight record")
            }
            else{
                console.log(result.password);
                if(result.password == req.body.password){
                    Sighting.updateOne({"id" : req.body.id}, updates,function (error) {
                        if(error) {
                            console.log(error)
                        } else {
                            console.log("Sighting edited.")
                        }
                    });

                    res.send("update success")
                }
                else{
                    res.send("update failed, please check your password")
                }
            }
        });

}

exports.querySighting = function (req, res) {
    //var sightID = req.id;
    var sightID = Number(req.body.index);
    Sighting.findOne({"id" : sightID}, {"id": 1,"date": 1, "identification": 1, "location": 1,
                                        "description": 1, "img": 1, "password":1},
                                        function (error, result) {
                                            if(error){
                                                console.log("query sighting error")
                                            }
                                            else{
                                                console.log("query sighting success");
                                                console.log(result);
                                                res.render("reviewPage", {Data: result})
                                            }
    });
}

function genPassword(){
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0').toString();
}





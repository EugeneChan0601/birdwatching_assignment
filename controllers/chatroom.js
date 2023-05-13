var bodyParser = require("body-parser");
var Chatroom = require('../models/chatroom');
var path = require('path');


exports.create = function (req, res) {
    var chatroom = new Chatroom({
        id: 1,
        room_num: req.body.room_num,
        user: req.body.user,
        text: req.body.text,
    });

    chatroom.save(function (err, results) {
        if (err)
            res.status(500).send('Invalid data!');
        console.log("Chatroom msg created.")
    });
};

// exports.updateMsg = function (req,res) {
//     var conditions = {"room_num" : req.body.room_num}
//     var updates = {$set:{"text": req.body.text}}
//     Chatroom.updateOne(conditions,updates,function (error) {
//         if(error) {
//             console.log(error)
//         } else {
//             console.log("Chat history updated.")
//         }
//     })
// }

exports.queryChatroom = function (req, res) {
    Chatroom.find({"room_num" : req.room_num}, {"user":1,"text":1},function (error, result) {
        if(error){
            console.log(error)
        }
        else{
            console.log(result.length+" messages have been found.")
            res.send(result)
        }
    });
}




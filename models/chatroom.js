var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatroomSchema = new Schema(
    {
        id: {type: Number},
        room_num: {type: Number,required: true},
        text: {type: String}
    }
);

var Chatroom = mongoose.model('Chatroom', ChatroomSchema);
module.exports = Chatroom;
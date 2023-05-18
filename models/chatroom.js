var mongoose = require('mongoose');
const chat_counter = require("./chat_counter");
var Schema = mongoose.Schema;

var ChatroomSchema = new Schema(
    {
        id: {type: Number},
        user: {type: String},
        room_num: {type: String,required: true},
        text: {type: String}
    }
);

ChatroomSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    chat_counter('activities', this, next);
});

var Chatroom = mongoose.model('Chatroom', ChatroomSchema);
module.exports = Chatroom;
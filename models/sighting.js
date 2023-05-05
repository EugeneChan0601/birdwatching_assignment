var mongoose = require('mongoose');
var Counter  = require('./counter')
var Schema = mongoose.Schema;

var SightingSchema = new Schema(
    {
        id: {type: Number},
        date: {type: String, required: true, max: 100},
        identification: {type: String, required: true, max: 100},
        location: {type: String, required: true, max: 100},
        user: {type: String, required:true, max: 100},
        description: {type: String, required: true, max: 100},
        img: {type: String}
    }
);

SightingSchema.pre('save', function (next) {
        if (!this.isNew) {
                next();
                return;
        }

        Counter('activities', this, next);
});

var Sighting = mongoose.model('Sighting', SightingSchema);
module.exports = Sighting;
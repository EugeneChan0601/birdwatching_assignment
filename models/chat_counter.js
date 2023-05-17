var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const chat_counterSchema = new Schema(
    {
        _id: {type: String, required: true},
        seq: { type: Number, default: 0 }
    }
);

chat_counterSchema.index({ _id: 1, seq: 1 }, { unique: true })

const chat_counterModel = mongoose.model('chat_counter', chat_counterSchema);

const autoIncrementModelID = function (modelName, doc, next) {
    chat_counterModel.findByIdAndUpdate(        // ** Method call begins **
        modelName,                           // The ID to find for in counters model
        { $inc: { seq: 1 } },                // The update
        { new: true, upsert: true },         // The options
        function(error, chat_counter) {           // The callback
            if(error) return next(error);

            doc.id = chat_counter.seq;
            next();
        }
    );                                     // ** Method call ends **
}

module.exports = autoIncrementModelID;
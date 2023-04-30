var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost:27017/sighting'

mongoose.Promise = global.Promise;

mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    // try {
    //     var connection = mongoose.createConnection(mongoDB);
    //     console.log("connection to mongodb worked!");
    // }catch (e) {
    //     console.log('error in db connection: ' +e.message)
    // }
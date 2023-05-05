var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

var sighting = require('../controllers/sighting');


var multer = require('multer');

// storage defines the storage options to be used for file upload with multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    var original = file.originalname;
    var file_extension = original.split(".");
    // Make the file name the date + the file extension
    filename =  Date.now() + '.' + file_extension[file_extension.length-1];
    cb(null, filename);
  }
});
var upload = multer({ storage: storage });


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('listPage', { title: 'Express' });
  sighting.queryAll(req, res);
});

router.get('/addPage', function (req, res) {
  res.render('addPage');
});

router.get('/reviewPage', function (req, res) {
  res.render('reviewPage');
});

router.post('/create', upload.single('myImg'), function (req, res){
  sighting.create(req,res);

})
module.exports = router;

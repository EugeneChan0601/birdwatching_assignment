var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

var sighting = require('../controllers/sighting');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('listPage', { title: 'Express' });
});

router.get('/addPage', function (req, res) {
  res.render('addPage');
});

router.get('/reviewPage', function (req, res) {
  res.render('reviewPage');
});

router.post('/create',function (req, res){
  sighting.create(req,res);
})
module.exports = router;

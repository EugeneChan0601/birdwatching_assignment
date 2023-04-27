var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('listPage', { title: 'Express' });
});

router.get('/addPage', function (req, res) {
  res.render('addPage');
});

module.exports = router;

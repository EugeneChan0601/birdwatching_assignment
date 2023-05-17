var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
const manifest = require('manifest.json');


var sighting = require('../controllers/sighting');
var chatroom = require('../controllers/chatroom');


var multer = require('multer');

// storage defines the storage options to be used for file upload with multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/');
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
  //sighting.querySighting();
  sighting.queryAll(req, res);
});

router.get('/addPage', function (req, res) {
  res.render('addPage', {Password: ''});
});

router.post('/reviewPage', function (req, res) {
  console.log(req.body);
  sighting.querySighting(req, res);
});

router.post('/create', upload.single('myImg'), function (req, res){
  sighting.create(req,res);

})

router.post('/updateSighting', function (req, res){
  console.log("req" + req.body);
  sighting.updateSighting(req, res);
})

router.post('/saveChat', function (req, res){
  chatroom.create(req, res);
})


// This is a module for DBPedia, and get the name from data.identification in reviewPage.ejs
router.get('/dbpedia/:identifier', function(req, res, next) {
  // The DBpedia resource to retrieve data from
  const resource = 'http://dbpedia.org/resource/' + req.params.identifier;

  // The DBpedia SPARQL endpoint URL
  const endpointUrl = 'https://dbpedia.org/sparql';

  // The SPARQL query to retrieve data for the given resource
  const sparqlQuery = 'SELECT ?description WHERE { <' + resource + '> dbo:abstract ?description . FILTER (langMatches(lang(?description), "EN")) }';

  // Encode the query as a URL parameter
  const encodedQuery = encodeURIComponent(sparqlQuery);

  // Build the URL for the SPARQL query
  const url = `${endpointUrl}?query=${encodedQuery}&format=json`;

  // Use fetch to retrieve the data
  fetch(url)
      .then(response => response.json())
      .then(data => {
        // The results are in the 'data' object
        var bindings = data.results.bindings;
        if (bindings.length > 0) {
          res.send(bindings[0].description.value);
        } else {
          res.send('No data returned from SPARQL query');
        }
      });
});




module.exports = router;

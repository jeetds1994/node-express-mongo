var express = require('express');
var router = express.Router();
var mongo = require("mongodb");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req, res, next) {

  var mongoClient = mongodb.mongoClient;

  var url = 'mongodb://localhost:27017/samplesite'

  res.render('index', { title: 'Express' });
});


module.exports = router;

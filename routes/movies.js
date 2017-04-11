var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET home page. */
router.get('/', function(req, res, next) {
  db('movies').select('*').then(movies => {
    var movieStr = JSON.stringify(movies)
    res.render('movies/index', {
      movies: movieStr
    });
  })
});

module.exports = router;

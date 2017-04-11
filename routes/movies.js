var express = require('express')
var router = express.Router()
var db = require('../db')

/* GET home page. */
router.get('/', (req, res, next) => {
  db('movies').select('*').then(movies => {
    res.render('movies/index', { movies })
  })
})

module.exports = router

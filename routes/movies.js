var express = require('express')
var router = express.Router()
var db = require('../db')

/* GET home page. */
router.get('/', (req, res, next) => {
  db('movies').select('*').then(movies => {
    res.render('movies/index', { movies })
  })
})

router.get('/:id', (req, res, next) => {
  var id = req.params.id
  db('movies').select('*').where({ id }).first().then(movie => {
    res.render('movies/show', { movie })
  })
})

module.exports = router

var express = require('express')
var router = express.Router()
var db = require('../db')

/* GET home page. */
router.get('/', (req, res, next) => {
  db('movies').select('*').then(movies => {
    res.render('movies/index', { movies })
  })
})

router.get('/new', (req, res, next) => {
  res.render('movies/new')
})

router.get('/:id', (req, res, next) => {
  var id = req.params.id
  db('movies').select('*').where({ id }).first().then(movie => {
    res.render('movies/show', { movie })
  })
})

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id
  db('movies').select('*').where({ id }).first().then(movie => {
    res.render('movies/edit', { movie })
  })
})

router.post('/', (req, res, next) => {
  var year = parseInt(req.body.year)
  var movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    my_rating: req.body['my-rating'],
    poster_url: req.body['poster-url']
  }
  if (Number.isNaN(year) || year < 1990) {
    res.render('movies/new', { error: 'Only movies made after 1990.', movie })
  } else {
    db('movies').insert(movie, '*').then(newMovie => {
      var id = newMovie[0].id
      res.redirect(`/movies/${id}`)
    })
  }
})

router.put('/:id', (req, res, next) => {
  var id = req.params.id
  var movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    my_rating: req.body['my-rating'],
    poster_url: req.body['poster-url']
  }
  db('movies').update(movie, '*').where({ id }).then(updatedMovie => {
    var id = updatedMovie[0].id
    res.redirect(`/movies/${id}`)
  })
})

router.delete('/:id', (req, res, next) => {
  var id = req.params.id
  db('movies').del().where({ id }).then(() => {
    res.redirect(`/movies`)
  })
})

module.exports = router

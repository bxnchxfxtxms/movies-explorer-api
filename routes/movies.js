const router = require('express').Router();
const {
  validateMovieRemoval,
  validateMovieCreation,
} = require('../utils/validators');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validateMovieCreation, createMovie);

router.delete('/:id', validateMovieRemoval, deleteMovie);

module.exports = router;

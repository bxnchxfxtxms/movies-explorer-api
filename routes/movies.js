const router = require('express').Router();
const {
  celebrate,
  Joi,
} = require('celebrate');

const httpRegex = require('../utils/http-regex');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(httpRegex),
    trailerLink: Joi.string().required().pattern(httpRegex),
    thumbnail: Joi.string().required().pattern(httpRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    // movieId: Joi.string().alphanum().hex().length(24),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;

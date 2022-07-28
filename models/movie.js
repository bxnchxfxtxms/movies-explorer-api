const mongoose = require('mongoose');
const dataValidator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return dataValidator.isURL(v);
      },
      message: 'Необходимо ввести ссылку на постер',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return dataValidator.isURL(v);
      },
      message: 'Необходимо ввести ссылку на трейлер',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return dataValidator.isURL(v);
      },
      message: 'Необходимо ввести ссылку на превью постера',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {

  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

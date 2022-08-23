const mongoose = require('mongoose');
const dataValidator = require('validator');
const {
  posterUrlIsRequiredMessage,
  trailerUrlIsRequiredMessage,
  posterThumbnailUrlIsRequiredMessage,
} = require('../utils/messages');

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
      message: posterUrlIsRequiredMessage,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return dataValidator.isURL(v);
      },
      message: trailerUrlIsRequiredMessage,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return dataValidator.isURL(v);
      },
      message: posterThumbnailUrlIsRequiredMessage,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
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

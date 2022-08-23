const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const inputDataValidator = require('validator');
const UnauthorizedError = require('../errors/unauthorized-error');
const {
  emailIsRequiredMessage,
  authorizationFailureMessage,
} = require('../utils/messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return inputDataValidator.isEmail(v);
      },
      message: emailIsRequiredMessage,
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function validate(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(authorizationFailureMessage);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(authorizationFailureMessage);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

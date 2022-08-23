const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const ValidationError = require('../errors/validation-error');
const {
  userCreationValidationFailureMessage,
  userNotFoundMessage,
  profileUpdatingValidationFailureMessage,
  emailIsTakenMessage,
  authorizationSuccessMessage,
} = require('../utils/messages');

const {
  CREATED_CODE,
} = require('../utils/response-codes');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(CREATED_CODE).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailIsTakenMessage));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(userCreationValidationFailureMessage));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundMessage);
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundMessage);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailIsTakenMessage));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(profileUpdatingValidationFailureMessage));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : '6456eb203d4ddb636040688d09da8229',
      );
      res.cookie('jwt', token, { secure: true, httpOnly: true, maxAge: 3600000 * 24 * 7 }).send({ message: authorizationSuccessMessage });
    })
    .catch(next);
};

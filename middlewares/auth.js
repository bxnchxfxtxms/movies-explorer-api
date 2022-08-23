const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorized-error');
const {
  authorizationRequiredMessage,
} = require('../utils/messages');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError(authorizationRequiredMessage);
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : '6456eb203d4ddb636040688d09da8229');
  } catch (err) {
    throw new UnauthorizedError(authorizationRequiredMessage);
  }

  req.user = payload;

  return next();
};

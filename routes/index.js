const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const {
  validateUserCreation,
  validateAuthentification,
} = require('../utils/validators');
const {
  pageNotFoundMessage,
} = require('../utils/messages');

const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signup', validateUserCreation, createUser);

router.post('/signin', validateAuthentification, login);

router.use(auth);

router.use('/users', userRouter);

router.use('/movies', movieRouter);

router.use('/signout', (req, res, next) => {
  res.clearCookie('jwt').end();
  return next();
});

router.use((req, res, next) => {
  next(new NotFoundError(pageNotFoundMessage));
});

module.exports = router;

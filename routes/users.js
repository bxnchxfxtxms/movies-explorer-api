const router = require('express').Router();

const {
  celebrate,
  Joi,
} = require('celebrate');

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
}), updateProfile);

module.exports = router;

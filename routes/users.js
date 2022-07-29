const router = require('express').Router();
const { validateProfileUpdating } = require('../utils/validators');

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', validateProfileUpdating, updateProfile);

module.exports = router;

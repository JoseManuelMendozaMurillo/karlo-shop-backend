const router = require('express').Router();
const { signUp } = require('../services/authService')

// auth routes
router.route('/sign-up').post(signUp);

module.exports = router;
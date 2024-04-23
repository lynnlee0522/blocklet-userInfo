const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const { findUser, saveUser } = require('../controller/user.controller');

router.post('/user', middleware.user(), findUser);
router.post('/saveUser', middleware.user(), saveUser);

module.exports = router;

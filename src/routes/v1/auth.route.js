const express = require('express');

const jwtMiddleware = require('../../middlewares/jwt.middleware.js');

const {
  changePassword,
  loginUser,
  exchangeSession,
  logout,
} = require('../../controllers/v1/auth.controller.js');

const router = express.Router();

router.post('/login', [], loginUser);
router.post('/changePassword', [jwtMiddleware], changePassword);
router.post('/exchange', [], exchangeSession);
router.post('/logout', [], logout);

module.exports = router;

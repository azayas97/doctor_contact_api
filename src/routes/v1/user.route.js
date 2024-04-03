const express = require('express');

const jwtMiddleware = require('../../middlewares/jwt.middleware.js');

const {
  editUser,
  registerUser,
} = require('../../controllers/v1/user.controller.js');

const router = express.Router();

router.post('/register', [], registerUser);
router.put('/edit', [jwtMiddleware], editUser);

module.exports = router;

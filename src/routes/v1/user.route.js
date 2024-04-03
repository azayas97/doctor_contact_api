const express = require('express');

const jwtCheck = require('../../middlewares/jwt.middleware.js');

const {
  editUser,
  registerUser,
} = require('../../controllers/v1/user.controller.js');

const router = express.Router();

router.post('/register', [], registerUser);
router.put('/edit', [jwtCheck], editUser);

module.exports = router;

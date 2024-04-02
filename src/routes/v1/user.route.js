import express from 'express';

import jwtMiddleware from '../../middlewares/jwt.middleware.js';

import {
  editUser,
  registerUser,
} from '../../controllers/v1/user.controller.js';

const router = express.Router();

router.post('/register', [], registerUser);
router.put('/edit', [jwtMiddleware], editUser);

export default router;

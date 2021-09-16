import express from 'express';

import * as jwtMiddleware from '../../middlewares/jwt.middleware.js';

import { editUser, registerUser } from '../../controllers/v1/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.put('/edit', [jwtMiddleware.verifyToken], editUser);

export default router;

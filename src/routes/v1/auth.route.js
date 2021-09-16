import express from 'express';
import * as jwtMiddleware from '../../middlewares/jwt.middleware.js';

import { changePassword, loginUser } from '../../controllers/v1/auth.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/changePassword', [[jwtMiddleware.verifyToken]], changePassword);

export default router;

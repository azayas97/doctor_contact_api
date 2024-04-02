import express from 'express';

import jwtMiddleware from '../../middlewares/jwt.middleware.js';

import doctorRouter from './doctor.route.js';
import userRoute from './user.route.js';
import authRoute from './auth.route.js';

const router = express.Router();

router.use('/doctors', [jwtMiddleware], doctorRouter);
router.use('/users', userRoute);
router.use('/auth', authRoute);

export default router;

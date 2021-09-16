import express from 'express';
import * as jwtMiddleware from '../../middlewares/jwt.middleware.js';

import doctorRouter from './doctor.route.js';
import userRoute from './user.route.js';
import authRoute from './auth.route.js';

const router = express.Router();

router.use('/doctors', [jwtMiddleware.verifyToken], doctorRouter);
router.use('/users', userRoute);
router.use('/auth', authRoute);
// router.use('/user', userController);
// router.use('/doctors', [jwtMiddleware.verifyToken], doctorRoutes);
// router.use('/user', [jwtMiddleware.verifyToken], userController);

export default router;

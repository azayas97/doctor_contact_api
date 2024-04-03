const express = require('express');

const jwtMiddleware = require('../../middlewares/jwt.middleware.js');

const doctorRouter = require('./doctor.route.js');
const userRoute = require('./user.route.js');
const authRoute = require('./auth.route.js');

const router = express.Router();

router.use('/doctors', [jwtMiddleware], doctorRouter);
router.use('/users', userRoute);
router.use('/auth', authRoute);

module.exports = router;

const express = require('express');

const {
  getAllDoctorsByUserID,
  getDoctorByID,
  createDoctor,
  updateDoctor,
  deleteDoctorByID,
} = require('../../controllers/v1/doctor.controller.js');

const {
  userIdCheck,
  isUserAllowedCheck,
  isUserActionAllowedCheck,
} = require('../../middlewares/auth.middleware.js');
const jwtCheck = require('../../middlewares/jwt.middleware.js');

const router = express.Router();

router.get('/:userId', [
  jwtCheck,
  userIdCheck,
], getAllDoctorsByUserID);
router.get('/get/:id', [
  jwtCheck,
  isUserAllowedCheck,
], getDoctorByID);
router.post('/add', [
  jwtCheck,
], createDoctor);
router.put('/edit', [
  jwtCheck,
  isUserActionAllowedCheck,
], updateDoctor);
router.delete('/delete', [
  jwtCheck,
  isUserActionAllowedCheck,
], deleteDoctorByID);

module.exports = router;

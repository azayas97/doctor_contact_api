import express from 'express';

import {
  getAllDoctorsByUserID,
  getDoctorByID,
  createDoctor,
  updateDoctor,
  deleteDoctorByID,
} from '../../controllers/v1/doctor.controller.js';

const router = express.Router();

router.get('/:userId', [], getAllDoctorsByUserID);
router.get('/get/:id', [], getDoctorByID);
router.post('/add', [], createDoctor);
router.put('/edit', [], updateDoctor);
router.delete('/delete', [], deleteDoctorByID);

export default router;

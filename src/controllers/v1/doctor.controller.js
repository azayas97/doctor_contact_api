import Constants from '../../utils/constants.util.js';

import {
  createDoctorService,
  deleteDoctorByIDService,
  getAllDoctorsByUserIDService,
  getDoctorByIDService,
  updateDoctorService,
} from '../../services/doctor.service.js';

import Response from '../../models/response.model.js';
import Doctor from '../../models/doctor.model.js';

import { getUserIDFromToken } from '../../helpers/getToken.js';

import messages from '../../resources/messages.json';

const getAllDoctorsByUserID = async (req, res) => {
  const { userId } = req.params;

  const result = await getAllDoctorsByUserIDService(userId);

  return res.status(result.code).json(result);
};

const getDoctorByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    const response = new Response(
      false,
      Constants.BAD_REQUEST,
      messages.controllers.doctor.idMissing,
    );

    return res.status(response.code).json(response);
  }

  try {
    const result = await getDoctorByIDService(id);

    return res.status(result.code).json(result);
  } catch (err) {
    return res.status(Constants.INTERNAL).json({
      message: err.message,
    });
  }
};

const createDoctor = async (req, res) => {
  const {
    name,
    dpt,
    clinic,
    phone,
  } = req.body;

  const errorsList = [];

  if (!name) errorsList.push(messages.controllers.doctor.nameMissing);
  if (!dpt) errorsList.push(messages.controllers.doctor.dptMissing);
  if (!clinic) errorsList.push(messages.controllers.doctor.clinicMissing);
  if (!phone) errorsList.push(messages.controllers.doctor.phoneMissing);

  if (errorsList.length > 0) {
    const response = new Response(
      true,
      Constants.BAD_REQUEST,
      null,
      errorsList,
    );

    return res.status(response.code).json(response);
  }

  const userId = getUserIDFromToken(req);

  const data = new Doctor({
    id: 0,
    name,
    department: dpt,
    clinic,
    phone,
    user_id: userId,
  });

  try {
    const result = await createDoctorService(data);

    return res.status(result.code).json(result);
  } catch (err) {
    return res.status(Constants.INTERNAL).json({
      message: err.message,
    });
  }
};

const updateDoctor = async (req, res) => {
  const {
    id,
    name,
    dpt,
    clinic,
    phone,
  } = req.body;

  if (!id) {
    const response = new Response(
      false,
      Constants.BAD_REQUEST,
      messages.controllers.doctor.idMissing,
      null,
    );

    return res.status(response.code).json(response);
  }

  const data = {
    id,
    name,
    department: dpt,
    clinic,
    phone,
  };

  try {
    const result = await updateDoctorService(data);

    return res.status(result.code).json(result);
  } catch (err) {
    return res.status(Constants.INTERNAL).json({
      message: err.message,
    });
  }
};

const deleteDoctorByID = async (req, res) => {
  const { id } = req.body;

  try {
    const result = await deleteDoctorByIDService(id);

    return res.status(result.code).json(result);
  } catch (err) {
    return res.status(Constants.INTERNAL).json({
      message: err.message,
    });
  }
};

export {
  getAllDoctorsByUserID,
  getDoctorByID,
  createDoctor,
  updateDoctor,
  deleteDoctorByID,
};

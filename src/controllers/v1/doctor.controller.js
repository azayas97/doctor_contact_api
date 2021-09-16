import Constants from '../../utils/constants.util.js';
import Strings from '../../utils/strings.utils.js';

import {
  createDoctorService,
  deleteDoctorByIDService,
  getAllDoctorsByUserIDService,
  getDoctorByIDService,
  updateDoctorService,
} from '../../services/doctor.service.js';

import { Response } from '../../models/response.model.js';
import { Doctor } from '../../models/doctor.model.js';

import { getUserIDFromToken } from '../../helpers/getToken.js';

const getAllDoctorsByUserID = async (req, res) => {
  const { userId } = req.params;

  const result = await getAllDoctorsByUserIDService(userId);

  return res.status(result.code).json(result);
};

const getDoctorByID = async (req, res) => {
  const { id } = req.params;

  if (id === undefined || id === null) {
    const response = new Response(false, Constants.BAD_REQUEST,
      Strings.NO_DOCTOR_SELECTED, null);
    return res.status(response.code).json(response);
  }

  const result = await getDoctorByIDService(id);

  return res.status(result.code).json(result);
};

const createDoctor = async (req, res) => {
  const {
    name, dpt, clinic, phone,
  } = req.body;

  const errorsList = [];

  if (!name) errorsList.push('Name is required.');

  if (errorsList.length > 0) {
    const response = new Response(true, Constants.BAD_REQUEST, null, errorsList);
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

  const result = await createDoctorService(data);

  return res.status(result.code).json(result);
};

const updateDoctor = async (req, res) => {
  const {
    id, name, dpt, clinic, phone,
  } = req.body;

  if (id === undefined || id === null) {
    const response = new Response(false, Constants.BAD_REQUEST, Strings.NO_DOCTOR_SELECTED, null);
    return res.status(response.code).json(response);
  }

  const data = {
    id,
    name,
    department: dpt,
    clinic,
    phone,
  };

  const result = await updateDoctorService(data);

  return res.status(result.code).json(result);
};

const deleteDoctorByID = async (req, res) => {
  const { id } = req.body;
  const result = await deleteDoctorByIDService(id);

  return res.status(result.code).json(result);
};

export {
  getAllDoctorsByUserID,
  getDoctorByID,
  createDoctor,
  updateDoctor,
  deleteDoctorByID,
};

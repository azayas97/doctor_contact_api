import models from '../database/entities/index.js';

import Constants from '../utils/constants.util.js';

import Doctor from '../models/doctor.model.js';

import messages from '../resources/messages.json';

const getAllDoctorsByUserIDService = async (userId) => {
  try {
    const response = await models.doctor.findAll({
      where: { user_id: userId },
      attributes: { exclude: ['user_id'] },
    });

    return {
      success: true,
      code: Constants.OKAY,
      message: null,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      code: Constants.INTERNAL,
      message: messages.errors.internalError,
      data: error.toString(),
    };
  }
};

const getDoctorByIDService = async (doctorId) => {
  try {
    const response = await models.doctor.findOne({
      where: { id: doctorId },
    });

    return {
      success: true,
      code: Constants.OKAY,
      message: null,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      code: Constants.INTERNAL,
      message: messages.errors.internalError,
      data: error.toString(),
    };
  }
};

const createDoctorService = async (doctor) => {
  const doctorModel = new Doctor(doctor);

  try {
    const result = await models.doctor.create(doctorModel);

    return {
      success: true,
      code: Constants.CREATED,
      message: messages.services.doctor.created,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      code: Constants.INTERNAL,
      message: messages.errors.internalError,
      data: error.toString(),
    };
  }
};

const updateDoctorService = async (doctor) => {
  const doctorModel = new Doctor(doctor);

  try {
    const doctorData = await models.doctor.findOne({
      where: { id: doctorModel.id },
      attributes: { exclude: ['user_id'] },
    });

    if (!doctorData) {
      return {
        success: false,
        code: Constants.NOT_FOUND,
        message: messages.services.doctor.notFound,
        data: null,
      };
    }

    const result = await doctorData.update(doctorModel);

    return {
      success: true,
      code: Constants.CREATED,
      message: messages.services.doctor.updated,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      code: Constants.INTERNAL,
      message: messages.errors.internalError,
      data: error.toString(),
    };
  }
};

const deleteDoctorByIDService = async (doctorId) => {
  try {
    const doctorData = await models.doctor.findOne({
      where: { id: doctorId },
    });

    if (!doctorData) {
      return {
        success: false,
        code: Constants.NOT_FOUND,
        message: messages.services.doctor.notFound,
        data: null,
      };
    }

    const result = await doctorData.destroy(doctorData);

    if (!result) throw new Error('Could not delete doctor.');

    return {
      success: true,
      code: Constants.OKAY,
      message: messages.services.doctor.deleted,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      code: Constants.INTERNAL,
      message: messages.errors.internalError,
      data: error.toString(),
    };
  }
};

export {
  getAllDoctorsByUserIDService,
  getDoctorByIDService,
  createDoctorService,
  updateDoctorService,
  deleteDoctorByIDService,
};

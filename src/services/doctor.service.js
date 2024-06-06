const models = require('../database/entities/index.js');

const Constants = require('../utils/constants.util.js');

const Doctor = require('../models/doctor.model.js');

const messages = require('../resources/messages.json');

const getAllDoctorsByUserIDService = async (userId) => {
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
};

const getDoctorByIDService = async (doctorId) => {
  const response = await models.doctor.findOne({
    where: { id: doctorId },
  });

  if (!response) {
    return {
      success: false,
      code: Constants.BAD_REQUEST,
      message: messages.services.doctor.notFound,
      data: null,
    };
  }

  return {
    success: true,
    code: Constants.OKAY,
    message: null,
    data: response,
  };
};

const createDoctorService = async (doctor) => {
  const doctorModel = new Doctor(doctor);

  const result = await models.doctor.create(doctorModel);

  return {
    success: true,
    code: Constants.CREATED,
    message: messages.services.doctor.created,
    data: result,
  };
};

const updateDoctorService = async (doctor) => {
  const doctorModel = new Doctor(doctor);

  const doctorData = await models.doctor.findOne({
    where: { id: doctorModel.id },
    attributes: { exclude: ['user_id'] },
  });

  if (!doctorData) {
    return {
      success: false,
      code: Constants.BAD_REQUEST,
      message: messages.services.doctor.notFound,
      data: null,
    };
  }

  const result = await doctorData.update({
    id: doctorModel.id,
    name: doctorModel.name ?? doctorData.name,
    department: doctorModel.department ?? doctorData.dpt,
    clinic: doctorModel.clinic ?? doctorData.clinic,
    phone: doctorModel.phone ?? doctorData.phone,
  });

  return {
    success: true,
    code: Constants.OKAY,
    message: messages.services.doctor.updated,
    data: result,
  };
};

const deleteDoctorByIDService = async (doctorId) => {
  const doctorData = await models.doctor.findOne({
    where: { id: doctorId },
  });

  if (!doctorData) {
    return {
      success: false,
      code: Constants.BAD_REQUEST,
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
};

module.exports = {
  getAllDoctorsByUserIDService,
  getDoctorByIDService,
  createDoctorService,
  updateDoctorService,
  deleteDoctorByIDService,
};

const Constants = require('../../utils/constants.util.js');

const Response = require('../../models/response.model.js');

const {
  editUserService,
  registerUserService,
} = require('../../services/user.service.js');

const messages = require('../../resources/messages.json');

const registerUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    city,
    state,
    country,
    phone,
  } = req.body;

  const errorList = [];

  if (!email) errorList.push(messages.controllers.user.emailMissing);

  if (!password) errorList.push(messages.controllers.user.passwordMissing);

  if (!firstName) errorList.push(messages.controllers.user.firstNameMissing);

  if (!lastName) errorList.push(messages.controllers.user.lastNameMissing);

  if (!city) errorList.push(messages.controllers.user.cityMissing);

  if (!state) errorList.push(messages.controllers.user.stateMissing);

  if (!phone) errorList.push(messages.controllers.user.phoneMissing);

  if (!country) errorList.push(messages.controllers.user.countryMissing);

  if (errorList.length > 0) {
    const response = new Response(
      false,
      Constants.BAD_REQUEST,
      messages.controllers.badRequest,
      errorList,
    );

    return res.status(response.code).json(response);
  }

  const data = {
    id: 0,
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    city,
    state,
    country: 'Mexico',
    phone,
  };

  try {
    const response = await registerUserService(data);

    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(
      false,
      Constants.INTERNAL,
      messages.controllers.internal,
      err.message,
    );

    return res.status(Constants.INTERNAL).json(response);
  }
};

const editUser = async (req, res) => {
  const {
    id,
    email,
    firstName,
    lastName,
    city,
    state,
    country,
    phone,
  } = req.body;

  if (!id) {
    const response = new Response(
      false,
      Constants.BAD_REQUEST,
      messages.controllers.user.idMissing,
    );
    return res.status(response.code).json(response);
  }

  const data = {
    id,
    email,
    first_name: firstName,
    last_name: lastName,
    city,
    state,
    country,
    phone,
  };

  try {
    const response = await editUserService(data);

    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(
      false,
      Constants.INTERNAL,
      messages.controllers.internal,
      err.message,
    );

    return res.status(Constants.INTERNAL).json(response);
  }
};

module.exports = {
  registerUser,
  editUser,
};

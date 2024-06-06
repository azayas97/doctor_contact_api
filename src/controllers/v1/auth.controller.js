const Constants = require('../../utils/constants.util.js');
const Response = require('../../models/response.model.js');

const {
  changeUserPasswordService,
  loginUserService,
  exchangeSessionService,
} = require('../../services/auth.service.js');

const messages = require('../../resources/messages.json');

const loginUser = async (req, res) => {
  const {
    email,
    password,
  } = req.body;
  const errorList = [];

  if (!email) errorList.push(messages.controllers.user.emailMissing);

  if (!password) errorList.push(messages.controllers.user.passwordMissing);

  if (errorList.length > 0) {
    const response = new Response(
      false,
      Constants.BAD_REQUEST,
      messages.controllers.badRequest,
      errorList,
    );

    return res.status(response.code).json(response);
  }

  try {
    const response = await loginUserService(email, password);

    return res
      .cookie('session_id', response.data.data.token)
      .status(response.code)
      .json(response);
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

const changePassword = async (req, res) => {
  const {
    email,
    oldPassword,
    newPassword,
  } = req.body;
  const errorList = [];

  if (!email) errorList.push(messages.controllers.user.emailMissing);

  if (!oldPassword || !newPassword) errorList.push(messages.controllers.user.passwordMissing);

  if (errorList.length > 0) {
    const response = new Response(
      false,
      Constants.BAD_REQUEST,
      messages.controllers.badRequest,
      errorList,
    );

    return res.status(response.code).json(response);
  }

  try {
    const response = await changeUserPasswordService(email, oldPassword, newPassword);

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

const exchangeSession = async (req, res) => {
  const { sessionId, userId } = req.body;

  try {
    const response = await exchangeSessionService(sessionId, userId);

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

const logout = (req, res) => {
  const response = {
    success: true,
    code: Constants.OKAY,
    message: messages.services.auth.loggedOut,
    data: null,
  };

  return res
    .cookie('session_id', null, {
      maxAge: -1,
    })
    .status(response.code)
    .json(response);
};

module.exports = {
  loginUser,
  changePassword,
  exchangeSession,
  logout,
};

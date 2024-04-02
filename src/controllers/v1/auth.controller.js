import Constants from '../../utils/constants.util.js';

import Response from '../../models/response.model.js';

import { changeUserPasswordService, loginUserService } from '../../services/auth.service.js';

import messages from '../../resources/messages.json';

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

    return res.status(response.code).json(response);
  } catch (err) {
    return res.status(Constants.INTERNAL).json({
      message: err.message,
    });
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
    return res.status(Constants.INTERNAL).json({
      message: err.message,
    });
  }
};

export {
  loginUser,
  changePassword,
};

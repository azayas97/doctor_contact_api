import Constants from '../../utils/constants.util.js';
import Strings from '../../utils/strings.utils.js';

import { Response } from '../../models/response.model.js';

import { changeUserPasswordService, loginUserService } from '../../services/auth.service.js';

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const errorList = [];

  if (!email) errorList.push(Strings.USER_EMAIL_MISSING);

  if (!password) errorList.push(Strings.USER_PASSWORD_MISSING);

  if (errorList.length > 0) {
    const response = new Response(false, Constants.BAD_REQUEST,
      Strings.USER_BAD_REQUEST, errorList);

    return res.status(response.code).json(response);
  }

  const response = await loginUserService(email, password);

  return res.status(response.code).json(response);
};

const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const errorList = [];

  if (!email) errorList.push(Strings.USER_EMAIL_MISSING);

  if (!oldPassword || !newPassword) errorList.push(Strings.USER_PASSWORD_MISSING);

  if (errorList.length > 0) {
    const response = new Response(false, Constants.BAD_REQUEST,
      Strings.USER_BAD_REQUEST, errorList);

    return res.status(response.code).json(response);
  }

  const response = await changeUserPasswordService(email, oldPassword, newPassword);

  return res.status(response.code).json(response);
};

export {
  loginUser,
  changePassword,
};

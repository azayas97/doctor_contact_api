import Constants from '../../utils/constants.util.js';
import Strings from '../../utils/strings.utils.js';

import { Response } from '../../models/response.model.js';
import { editUserService, registerUserService } from '../../services/user.service.js';
import { User } from '../../models/user.model.js';

const registerUser = async (req, res) => {
  const {
    email, password, firstName, lastName,
    city, state, country, phone,
  } = req.body;
  const errorList = [];

  if (!email) errorList.push(Strings.USER_EMAIL_MISSING);

  if (!password) errorList.push(Strings.USER_PASSWORD_MISSING);

  if (!firstName) errorList.push(Strings.USER_FIRSTNAME_MISSING);

  if (!lastName) errorList.push(Strings.USER_LASTNAME_MISSING);

  if (!city) errorList.push(Strings.USER_CITY_MISSING);

  if (!state) errorList.push(Strings.USER_STATE_MISSING);

  if (!phone) errorList.push(Strings.USER_PHONE_MISSING);

  if (!country) errorList.push(Strings.USER_COUNTRY_MISSING);

  if (errorList.length > 0) {
    const response = new Response(false, Constants.BAD_REQUEST,
      Strings.USER_BAD_REQUEST, errorList);

    return res.status(response.code).json(response);
  }

  const data = new User({
    id: 0,
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    city,
    state,
    country: 'Mexico',
    phone,
  });

  const response = await registerUserService(data);

  return res.status(response.code).json(response);
};

const editUser = async (req, res) => {
  const {
    id, email, firstName, lastName,
    city, state, country, phone,
  } = req.body;

  if (!id) {
    const response = new Response(false,
      Constants.BAD_REQUEST, Strings.USER_ID_MISSING,
      null);
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

  const response = await editUserService(data);

  return res.status(response.code).json(response);
};

export {
  registerUser,
  editUser,
};

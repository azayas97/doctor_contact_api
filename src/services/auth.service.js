import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import models from '../database/entities/index.js';

import Constants from '../utils/constants.util.js';

import Token from '../models/token.model.js';

import messages from '../resources/messages.json';

const loginUserService = async (email, password) => {
  try {
    const result = await models.user.findOne({
      where: { email },
    });

    if (!result) {
      return {
        success: false,
        code: Constants.UNAUTHORIZED,
        message: messages.services.auth.noUser,
        data: null,
      };
    }

    const credentialsCorrect = bcrypt.compareSync(password, result.password);

    if (!credentialsCorrect) {
      return {
        success: false,
        code: Constants.UNAUTHORIZED,
        message: messages.services.auth.wrongPass,
        data: null,
      };
    }

    const token = jwt.sign({
      id: result.id,
      email: result.email,
    }, process.env.JWT_SECRET, {
      expiresIn: Constants.EXPIRE_TIME,
    });

    const data = new Token(
      email,
      token,
      Constants.EXPIRE_TIME,
    );

    return {
      success: true,
      code: Constants.OKAY,
      message: messages.services.auth.successLogin,
      data,
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

const changeUserPasswordService = async (email, oldPassword, newPassword) => {
  try {
    const userData = await models.user.findOne({
      where: { email },
    });

    if (!userData) {
      return {
        success: false,
        code: Constants.UNAUTHORIZED,
        message: messages.services.auth.noUser,
        data: null,
      };
    }

    const credentialsCorrect = bcrypt.compareSync(oldPassword, userData.password);

    if (!credentialsCorrect) {
      return {
        success: false,
        code: Constants.UNAUTHORIZED,
        message: messages.services.auth.wrongPass,
        data: null,
      };
    }

    await userData.update({ password: bcrypt.hashSync(newPassword, 12) });

    return {
      success: true,
      code: Constants.OKAY,
      message: messages.services.auth.passwordChanged,
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
  loginUserService,
  changeUserPasswordService,
};

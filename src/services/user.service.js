import bcrypt from 'bcrypt';

import models from '../database/entities/index.js';

import User from '../models/user.model.js';

import Constants from '../utils/constants.util.js';

import { doesUserExistByEmail } from '../rules/user.rule.js';

import messages from '../resources/messages.json';

const registerUserService = async (user) => {
  const userModel = new User(user);

  try {
    const result = await doesUserExistByEmail(userModel.email);

    if (result) {
      return {
        success: false,
        code: Constants.BAD_REQUEST,
        message: messages.services.user.emailExists,
        data: null,
      };
    }

    const password = bcrypt.hashSync(userModel.password, 12);
    userModel.password = password;

    await models.user.create(userModel);

    return {
      success: true,
      code: Constants.CREATED,
      message: messages.services.user.created,
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

const editUserService = async (user) => {
  const userModel = new User(user);

  try {
    const userData = await models.user.findOne({
      where: { id: userModel.id },
      attributes: {
        exclude: ['password', 'deletedAt', 'updatedAt', 'createdAt'],
      },
    });

    if (!userData) {
      return {
        success: false,
        code: Constants.NOT_FOUND,
        message: messages.services.user.notFound,
        data: null,
      };
    }

    const result = await userData.update(userModel);

    return {
      success: true,
      code: Constants.OKAY,
      message: messages.services.user.updated,
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

export {
  registerUserService,
  editUserService,
};

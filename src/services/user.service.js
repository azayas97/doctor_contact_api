import bcrypt from 'bcrypt';

import { User } from '../models/user.model.js';

import Constants from '../utils/constants.util.js';
import Strings from '../utils/strings.utils.js';

import { doesUserExistByEmail } from '../rules/user.rule.js';
import { models } from '../database/entities/index.js';

const registerUserService = async (user) => {
  const userModel = new User(user);

  try {
    const result = await doesUserExistByEmail(userModel.email);

    if (result) {
      return {
        success: false,
        code: Constants.BAD_REQUEST,
        message: Strings.EMAIL_EXISTS,
        data: null,
      };
    }

    const password = bcrypt.hashSync(userModel.password, 12);
    userModel.password = password;

    await models.user.create(userModel);

    return {
      success: true,
      code: Constants.CREATED,
      message: Strings.CREATED_USER,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      code: Constants.INTERNAL,
      message: Strings.INTERNAL_ERROR,
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
        message: Strings.USER_NO_EXIST,
        data: null,
      };
    }

    const result = await userData.update(userModel);

    return {
      success: true,
      code: Constants.OKAY,
      message: Strings.UPDATED_USER,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      code: Constants.INTERNAL,
      message: Strings.INTERNAL_ERROR,
      data: error.toString(),
    };
  }
};

export {
  registerUserService,
  editUserService,
};

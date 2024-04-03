const bcrypt = require('bcrypt');

const models = require('../database/entities/index.js');

const User = require('../models/user.model.js');

const Constants = require('../utils/constants.util.js');

const { doesUserExistByEmail } = require('../rules/user.rule.js');

const messages = require('../resources/messages.json');

const registerUserService = async (user) => {
  const userModel = new User(user);

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
};

const editUserService = async (user) => {
  const userModel = new User(user);

  const userData = await models.user.findOne({
    where: { id: userModel.id },
    attributes: {
      exclude: ['password', 'deletedAt', 'updatedAt', 'createdAt'],
    },
  });

  if (!userData) {
    return {
      success: false,
      code: Constants.BAD_REQUEST,
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
};

module.exports = {
  registerUserService,
  editUserService,
};

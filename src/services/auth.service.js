const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const models = require('../database/entities/index.js');

const Constants = require('../utils/constants.util.js');

const Token = require('../models/token.model.js');

const messages = require('../resources/messages.json');

const loginUserService = async (email, password) => {
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
};

const changeUserPasswordService = async (email, oldPassword, newPassword) => {
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
};

module.exports = {
  loginUserService,
  changeUserPasswordService,
};

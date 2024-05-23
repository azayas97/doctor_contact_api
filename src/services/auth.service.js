const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

  const length = 18;

  const sessionToken = await models.token.create({
    token,
    session_id: crypto.randomBytes(Math.ceil(length / 2)).toString('hex').substring(0, length),
    user_id: result.id,
    expire_date: new Date(new Date().getTime() + Constants.EXPIRE_TIME).toUTCString(),
  });

  const data = new Token(
    email,
    sessionToken.session_id,
    Constants.EXPIRE_TIME,
  );

  return {
    success: true,
    code: Constants.OKAY,
    message: messages.services.auth.successLogin,
    data: {
      data,
      id: result.id,
    },
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

const exchangeSessionService = async (sessionId, userId) => {
  const result = await models.token.findOne({
    where: {
      session_id: sessionId,
      user_id: userId,
    },
  });

  const expireDate = new Date(result?.expire_date || new Date());
  const today = new Date();

  if (!result || today > expireDate) {
    return {
      success: false,
      code: Constants.UNAUTHORIZED,
      message: messages.services.auth.sessionExpired,
      data: null,
    };
  }

  return {
    success: true,
    code: Constants.OKAY,
    message: null,
    data: result.token,
  };
};

module.exports = {
  loginUserService,
  changeUserPasswordService,
  exchangeSessionService,
};

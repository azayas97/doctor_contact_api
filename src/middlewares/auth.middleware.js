const jwt = require('jsonwebtoken');

const { isUserIdAllowed } = require('../rules/doctor.rule.js');

const Response = require('../models/response.model.js');

const Constants = require('../utils/constants.util.js');

const messages = require('../resources/messages.json');

const userIdCheck = (req, res, next) => {
  const token = req.headers['auth-token'];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id.toString() !== req.params.userId) {
      const response = new Response(
        false,
        Constants.FORBIDDEN,
        messages.errors.forbidden,
        null,
      );

      return res.status(response.code).json(response);
    }

    return next();
  } catch (err) {
    const response = new Response(
      false,
      Constants.UNAUTHORIZED,
      messages.errors.expiredSession,
    );

    return res.status(response.code).json(response);
  }
};

const isUserAllowedCheck = async (req, res, next) => {
  const token = req.headers['auth-token'];
  const { id: resourceId } = req.params;

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (await isUserIdAllowed(id, resourceId)) {
      return next();
    }

    const response = new Response(
      false,
      Constants.FORBIDDEN,
      messages.errors.forbidden,
      null,
    );

    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(
      false,
      Constants.UNAUTHORIZED,
      messages.errors.expiredSession,
    );

    return res.status(response.code).json(response);
  }
};

const isUserActionAllowedCheck = async (req, res, next) => {
  const token = req.headers['auth-token'];
  const { id: resourceId } = req.body;

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (await isUserIdAllowed(id, resourceId)) {
      return next();
    }

    const response = new Response(
      false,
      Constants.FORBIDDEN,
      messages.errors.forbidden,
      null,
    );

    return res.status(response.code).json(response);
  } catch (err) {
    const response = new Response(
      false,
      Constants.UNAUTHORIZED,
      messages.errors.expiredSession,
    );

    return res.status(response.code).json(response);
  }
};

module.exports = {
  userIdCheck,
  isUserAllowedCheck,
  isUserActionAllowedCheck,
};

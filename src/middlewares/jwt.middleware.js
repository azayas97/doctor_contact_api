const jwt = require('jsonwebtoken');

const Response = require('../models/response.model.js');

const Constants = require('../utils/constants.util.js');

const messages = require('../resources/messages.json');

const jwtMiddleware = (req, res, next) => {
  const token = req.headers['auth-token'];

  if (!token || token === '') {
    const response = new Response(
      false,
      Constants.UNAUTHORIZED,
      messages.errors.expiredSession,
    );

    return res.status(response.code).json(response);
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      const response = new Response(
        false,
        Constants.UNAUTHORIZED,
        messages.errors.expiredSession,
      );

      return res.status(response.code).json(response);
    }

    return next();
  });
};

module.exports = jwtMiddleware;

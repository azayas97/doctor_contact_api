import jwt from 'jsonwebtoken';

import Response from '../models/response.model.js';

import Constants from '../utils/constants.util.js';

import messages from '../resources/messages.json';

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

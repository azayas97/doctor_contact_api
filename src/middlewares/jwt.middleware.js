import jwt from 'jsonwebtoken';
import { Response } from '../models/response.model.js';
import Constants from '../utils/constants.util.js';
import Strings from '../utils/strings.utils.js';

export function verifyToken(req, res, next) {
  const token = req.headers['auth-token'];
  if (token === null || token === '' || !token) {
    const response = new Response(false, Constants.UNAUTHORIZED, Strings.EXPIRED_SESSION, null);
    return res.status(response.code).json(response);
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const response = new Response(false, Constants.UNAUTHORIZED, Strings.EXPIRED_SESSION, null);
      return res.status(response.code).json(response);
    }

    return next();
  });
}

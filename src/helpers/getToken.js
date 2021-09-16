import jwt from 'jsonwebtoken';

export function getUserIDFromToken(req) {
  const token = jwt.decode(req.headers['auth-token'], process.env.JWT_SECRET);

  return token.id;
}

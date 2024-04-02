import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export
export const getUserIDFromToken = (req) => {
  const token = jwt.decode(
    req.headers['auth-token'],
    process.env.JWT_SECRET,
  );

  return token.id;
};

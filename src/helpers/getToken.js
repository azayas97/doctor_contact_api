const jwt = require('jsonwebtoken');

const getUserIDFromToken = (req) => {
  const token = jwt.decode(
    req.headers['auth-token'],
    process.env.JWT_SECRET,
  );

  return token.id;
};

module.exports = {
  getUserIDFromToken,
};

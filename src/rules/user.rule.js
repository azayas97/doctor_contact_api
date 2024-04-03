const models = require('../database/entities/index.js');

const doesUserExistByEmail = async (email) => {
  const result = await models.user.findOne({
    where: { email },
  });

  return (result);
};

const doesUserExistByID = async (userId) => {
  const result = await models.user.findOne({
    where: { id: userId },
  });

  return (result);
};

module.exports = {
  doesUserExistByEmail,
  doesUserExistByID,
};

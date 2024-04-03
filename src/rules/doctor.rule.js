const models = require('../database/entities/index.js');

const isUserIdAllowed = async (userId, resourceId) => {
  const result = await models.doctor.findOne({
    where: {
      id: resourceId,
      user_id: userId,
    },
  });

  return (result);
};

module.exports = {
  isUserIdAllowed,
};

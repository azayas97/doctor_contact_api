import models from '../database/entities/index.js';

export async function doesUserExistByEmail(email) {
  try {
    const result = await models.user.findOne({
      where: { email },
    });

    return (result);
  } catch (error) {
    throw error.toString();
  }
}

export async function doesUserExistByID(userId) {
  try {
    const result = await models.user.findOne({
      where: { id: userId },
    });

    return (result);
  } catch (error) {
    throw error.toString();
  }
}

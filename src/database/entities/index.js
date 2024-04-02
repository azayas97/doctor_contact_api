import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

import userEntity from './user.entity.js';
import doctorEntity from './doctor.entity.js';

dotenv.config();

const seq = new Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    logging: false,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  },
);

const models = {
  user: userEntity(seq),
  doctor: doctorEntity(seq),
  seq,
  Sequelize,
};

Object.keys(models).forEach((model) => {
  if ('associate' in models[model]) {
    models[model].associate(models);
  }
});

export default models;

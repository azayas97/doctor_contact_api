const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const userEntity = require('./user.entity.js');
const doctorEntity = require('./doctor.entity.js');

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

module.exports = models;

import { Sequelize } from 'sequelize';

export default (db = new Sequelize()) => {
  const User = db.define('Users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
  }, {
    underscored: true,
    paranoid: true,
    indexes: [{
      unique: true,
      fields: ['email', 'id'],
    }],
  });

  User.associate = (model) => {
    User.hasOne(model.doctor, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
  };

  return User;
};

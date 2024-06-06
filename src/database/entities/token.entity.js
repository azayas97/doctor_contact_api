const { Sequelize } = require('sequelize');

const token = (db = new Sequelize()) => {
  const Token = db.define('Tokens', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    session_id: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    expire_date: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  }, {
    underscored: true,
    paranoid: true,
  });

  Token.associate = (model) => {
    Token.belongsTo(model.user, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
  };

  return Token;
};

module.exports = token;

import { Sequelize } from 'sequelize';

export default function doctor(db = new Sequelize()) {
  const Doctor = db.define('Doctors', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    department: {
      type: Sequelize.STRING(50),
    },
    clinic: {
      type: Sequelize.STRING(50),
    },
    phone: {
      type: Sequelize.STRING(20),
    },
  }, {
    underscored: true,
    paranoid: true,
  });

  Doctor.associate = (model) => {
    Doctor.belongsTo(model.user, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
  };

  return Doctor;
}

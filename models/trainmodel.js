import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Train = sequelize.define('Train', {
  train_name: { type: DataTypes.STRING, allowNull: false },
  source: { type: DataTypes.STRING, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  total_seats: { type: DataTypes.INTEGER, allowNull: false },
  available_seats: { type: DataTypes.INTEGER, allowNull: false },
});

export default Train;

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false }, // User's name
  email: { type: DataTypes.STRING, allowNull: false, unique: true }, // User's email
  password: { type: DataTypes.STRING, allowNull: false }, // Encrypted password
  role: { type: DataTypes.STRING, allowNull: false }, // User's role ('admin' or 'user')
});

export default User;

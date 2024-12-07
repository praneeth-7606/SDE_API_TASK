import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Train from './trainmodel.js';

const Booking = sequelize.define('Booking', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id',
    },
  },
  trainId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Trains', 
      key: 'id',
    },
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seats_booked: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Bookings', 
  timestamps: true, 
});
Booking.belongsTo(Train, { as: 'train', foreignKey: 'trainId' });

export default Booking;

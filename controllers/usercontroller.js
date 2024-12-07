import Train from "../models/trainmodel.js";
import Booking from "../models/bookingmodel.js";
import sequelize from '../config/db.js';

export const getavailabletrains = async (req, res) => {
  const { source, destination } = req.body; 
  try {
    if (!source || !destination) {
      return res.status(400).json({ error: 'Source and destination are required.' });
    }

    const trains = await Train.findAll({
      where: { source: source.trim().toLowerCase(), destination: destination.trim().toLowerCase() },
    });

    if (trains.length === 0) {
      return res.status(404).json({ message: 'No trains available between these stations.' });
    }

    res.status(200).json(trains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const bookseat = async (req, res) => {
  const { train_id, source, destination, number_of_seats } = req.body;

  if (!train_id || !source || !destination || !number_of_seats) {
    return res.status(400).json({
      error: 'train_id, source, destination, and number_of_seats are required.',
    });
  }

  const transaction = await sequelize.transaction(); 

  try {
   
    const train = await Train.findOne({
      where: {
        id: train_id,
        source: source.trim().toLowerCase(),
        destination: destination.trim().toLowerCase(),
      },
      lock: transaction.LOCK.UPDATE, 
      transaction,
    });

    if (!train) {
      await transaction.rollback(); 
      return res.status(404).json({ error: 'Train not found for the specified source and destination.' });
    }

    if (train.available_seats < number_of_seats) {
      await transaction.rollback(); 
      return res.status(400).json({
        error: `Only ${train.available_seats} seats are available.`,
      });
    }

    // Deduct the seats
    train.available_seats -= number_of_seats;
    await train.save({ transaction });

    // Create a booking
    const booking = await Booking.create(
      {
        userId: req.user.id,
        trainId: train_id,
        source: source.trim(),
        destination: destination.trim(),
        seats_booked: number_of_seats,
      },
      { transaction }
    );

    await transaction.commit(); 
    res.status(201).json({
      message: 'Booking successful!',
      booking,
    });
  } catch (err) {
    await transaction.rollback(); 
    res.status(500).json({
      error: 'An error occurred while booking seats.',
      details: err.message,
    });
  }
};






export const getuserbookings = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log('Fetching bookings for user:', userId);

    const bookings = await Booking.findAll({
      where: { userId },
      include: [
        {
          model: Train,
          as: 'train', 
          attributes: ['train_name', 'source', 'destination', 'total_seats'],
        },
      ],
      attributes: ['id', 'source', 'destination', 'seats_booked', 'createdAt'],
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user.' });
    }

    res.status(200).json({ bookings });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: err.message });
  }
};
// import Train from '../models/train.js';
import Train from "../models/trainmodel.js";

export const addtrain = async (req, res) => {
  const { train_name, source, destination, total_seats } = req.body;

  try {
  
    if (!train_name || !source || !destination || !total_seats) {
      return res.status(400).json({ error: 'All fields (train_name, source, destination, total_seats) are required.' });
    }


    const existingTrain = await Train.findOne({
      where: {
        train_name: train_name.trim(),
        source: source.trim().toLowerCase(),
        destination: destination.trim().toLowerCase(),
      },
    });

    if (existingTrain) {
      return res.status(400).json({ error: 'A train with the same name, source, and destination already exists.' });
    }


    const newTrain = await Train.create({
      train_name: train_name.trim(),
      source: source.trim().toLowerCase(),
      destination: destination.trim().toLowerCase(),
      total_seats,
      available_seats: total_seats, 
    });

    res.status(201).json({
      message: 'Train added successfully!',
      train: newTrain,
    });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while adding the train.', details: err.message });
  }
};



export const gettrains = async (req, res) => {
  try {

    const trains = await Train.findAll({
      attributes: ['id', 'train_name', 'source', 'destination', 'total_seats', 'available_seats'],
    });

    // Check if any trains exist
    if (!trains || trains.length === 0) {
      return res.status(404).json({ message: 'No trains found.' });
    }

    // Respond with the list of trains
    res.status(200).json({ trains });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching trains.', details: err.message });
  }
};
